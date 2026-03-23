/**
 * Interactive Numbered Bulk Update & Auto-Publish SEO metaRobots Script for Strapi v5
 * 
 * Usage:
 *   node scripts/update-seo-robots.js
 * 
 * This version uses the Strapi v5 Document Service for safe updates and publishing.
 */

const { createStrapi } = require('@strapi/strapi');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

function parseRange(input, max) {
  const selectedIndices = new Set();
  const parts = input.split(',').map(p => p.trim());

  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(p => parseInt(p.trim()));
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          if (i > 0 && i <= max) selectedIndices.add(i - 1);
        }
      }
    } else {
      const idx = parseInt(part);
      if (!isNaN(idx) && idx > 0 && idx <= max) {
        selectedIndices.add(idx - 1);
      }
    }
  }
  return Array.from(selectedIndices).sort((a, b) => a - b);
}

async function run() {
  console.log('🚀 Checking component schema...');
  
  let enumValues = ['index', 'noindex', 'follow', 'nofollow'];
  try {
    const seoSchemaPath = path.join(process.cwd(), 'src', 'components', 'shared', 'seo.json');
    const seoSchema = JSON.parse(fs.readFileSync(seoSchemaPath, 'utf8'));
    if (seoSchema.attributes && seoSchema.attributes.metaRobots && seoSchema.attributes.metaRobots.enum) {
      enumValues = seoSchema.attributes.metaRobots.enum;
    }
  } catch (err) {
    console.warn('⚠️ Could not read seo.json schema.');
  }

  console.log('\n--- Interactive SEO Update Utility ---');
  
  // 1. Select Value
  console.log('\nAvailable metaRobots values:');
  enumValues.forEach((val, index) => {
    console.log(`${index + 1}. ${val}`);
  });
  
  const valueChoice = await question(`\nSelect a value (1-${enumValues.length}) or type one manually: `);
  let newValue = '';
  const valIdx = parseInt(valueChoice) - 1;
  if (!isNaN(valIdx) && enumValues[valIdx]) {
    newValue = enumValues[valIdx];
  } else {
    newValue = valueChoice.trim();
  }

  if (!newValue) {
    console.log('❌ No value provided. Exiting.');
    rl.close();
    process.exit(0);
  }

  // 2. Load Strapi to get Content Types
  console.log('\n🚀 Loading Strapi engine to fetch content types...');
  const app = await createStrapi({ distDir: 'dist' }).load();

  const allTypes = app.contentTypes;
  const availableTypes = [];

  for (const uid in allTypes) {
    if (!uid.startsWith('api::')) continue;
    const contentType = allTypes[uid];
    const seoFieldName = Object.keys(contentType.attributes).find(
      (key) => contentType.attributes[key].type === 'component' && contentType.attributes[key].component === 'shared.seo'
    );
    if (seoFieldName) {
      availableTypes.push({ uid, seoFieldName, kind: contentType.kind });
    }
  }

  if (availableTypes.length === 0) {
    console.log('❌ No Content Types found with an SEO component.');
    await app.destroy();
    rl.close();
    process.exit(0);
  }

  // 3. Select Content Types
  console.log('\nDetected Content Types with SEO:');
  availableTypes.forEach((t, i) => {
    console.log(`${(i + 1).toString().padStart(3)}: ${t.uid}`);
  });

  const selectionInput = await question('\nEnter numbers to update (e.g. "1, 3, 5-8") or type "all": ');
  
  let selectedTypes = [];
  if (selectionInput.toLowerCase().trim() === 'all') {
    selectedTypes = availableTypes;
  } else {
    const indices = parseRange(selectionInput, availableTypes.length);
    selectedTypes = indices.map(i => availableTypes[i]);
  }

  if (selectedTypes.length === 0) {
    console.log('❌ No types selected. Exiting.');
    await app.destroy();
    rl.close();
    process.exit(0);
  }

  // 4. Auto-Publish Option
  const publishChoice = await question(`\nAuto-publish updated entries? (y/n, default: n): `);
  const autoPublish = publishChoice.toLowerCase() === 'y';

  // 5. Select Mode
  const modeChoice = await question(`\nSelected ${selectedTypes.length} types. \nRun as DRY RUN? (y/n, default: y): `);
  const dryRun = modeChoice.toLowerCase() !== 'n';

  if (!dryRun) {
    const doubleCheck = await question(`⚠️  CAUTION: This will update ${selectedTypes.length} types to "${newValue}". Are you SURE? (type "yes"): `);
    if (doubleCheck.toLowerCase() !== 'yes') {
      console.log('Aborted.');
      await app.destroy();
      rl.close();
      process.exit(0);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(` Target Value:    ${newValue}`);
  console.log(` Auto-Publish:    ${autoPublish ? 'YES' : 'NO'}`);
  console.log(` Mode:            ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
  console.log('='.repeat(60));

  for (const { uid, seoFieldName, kind } of selectedTypes) {
    console.log(`\n📂 Processing: ${uid}`);

    try {
      let entries = [];
      if (kind === 'singleType') {
        const single = await app.documents(uid).findFirst({ 
          status: 'draft',
          populate: [seoFieldName]
        });
        if (single) entries = [single];
      } else {
        let start = 0;
        const limit = 100;
        while (true) {
          const batch = await app.documents(uid).findMany({
            start, limit, status: 'draft', populate: [seoFieldName]
          });
          if (!batch || batch.length === 0) break;
          entries = entries.concat(batch);
          start += limit;
        }
      }

      for (const entry of entries) {
        if (!dryRun) {
          await app.documents(uid).update({
            documentId: entry.documentId,
            data: { [seoFieldName]: { ...(entry[seoFieldName] || {}), metaRobots: newValue } },
            status: 'draft'
          });
          
          if (autoPublish) {
            try {
              await app.documents(uid).publish({
                documentId: entry.documentId
              });
            } catch (pErr) {
              // Ignore if not applicable
            }
          }
        }
      }
      console.log(`  ${dryRun ? 'Would update' : '✔ Updated'} ${entries.length} entries.`);
    } catch (err) {
      console.error(`  ❌ Error in ${uid}:`, err.message);
    }
  }

  console.log('\n🎯 Done! SEO update process finished.');
  await app.destroy();
  rl.close();
  process.exit(0);
}

run().catch(err => {
  console.error('\n💥 Error:', err.message);
  if (rl) rl.close();
  process.exit(1);
});
