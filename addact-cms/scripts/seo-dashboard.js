/**
 * Premium SEO Bulk Update Dashboard for Strapi v5
 * 
 * This script starts an HTTP server with a beautiful GUI to manage
 * SEO metaRobots updates visually.
 * 
 * Usage:
 *   node scripts/seo-dashboard.js
 */

const { createStrapi } = require('@strapi/strapi');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 1338;
let appInstance = null;

// --- HTML Template ---
const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Strapi SEO Power Tool</title>
    <style>
        :root {
            --bg: #0f172a;
            --card: rgba(30, 41, 59, 0.7);
            --primary: #2dd4bf;
            --secondary: #8b5cf6;
            --text: #f8fafc;
            --text-dim: #94a3b8;
            --border: rgba(255, 255, 255, 0.1);
            --accent: #2dd4bf;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { 
            background: var(--bg); 
            color: var(--text);
            min-height: 100vh;
            background-image: radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%);
            padding: 40px;
        }

        .container { max-width: 1000px; margin: 0 auto; }
        
        header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 40px; 
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border);
        }
        
        h1 { font-size: 2rem; background: linear-gradient(to right, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .dashboard { display: grid; grid-template-columns: 300px 1fr; gap: 30px; }

        .panel { 
            background: var(--card); backdrop-filter: blur(12px); 
            border: 1px solid var(--border); border-radius: 16px; padding: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        h2 { font-size: 1.1rem; margin-bottom: 20px; color: var(--primary); display: flex; align-items: center; gap: 10px; }

        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-dim); }
        
        select, input[type="text"] {
            width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border);
            background: rgba(15, 23, 42, 0.5); color: var(--text); outline: none; transition: 0.3s;
        }
        select:focus, input[type="text"]:focus { border-color: var(--primary); }

        .toggle-group { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 0.9rem; cursor: pointer; }
        
        .btn {
            width: 100%; padding: 14px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer;
            transition: 0.3s; margin-top: 10px; text-transform: uppercase; letter-spacing: 1px;
        }
        .btn-primary { background: var(--primary); color: #000; }
        .btn-primary:hover { background: #5eead4; transform: translateY(-2px); }
        .btn-secondary { background: transparent; border: 1px solid var(--primary); color: var(--primary); }
        .btn-secondary:hover { background: rgba(45, 212, 191, 0.1); }

        .table-container { max-height: 500px; overflow-y: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; font-size: 0.8rem; color: var(--text-dim); border-bottom: 1px solid var(--border); }
        td { padding: 12px; font-size: 0.9rem; border-bottom: 1px solid var(--border); }
        tr:hover { background: rgba(255,255,255,0.02); }

        .checkbox-custom { width: 18px; height: 18px; cursor: pointer; accent-color: var(--primary); }

        .status-pill { padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 500; }
        .pill-single { background: rgba(139, 92, 246, 0.2); color: #a78bfa; }
        .pill-collection { background: rgba(45, 212, 191, 0.2); color: #2dd4bf; }

        .console {
            margin-top: 30px; background: #020617; border-radius: 12px; padding: 20px; font-family: 'Fira Code', monospace;
            font-size: 0.85rem; color: #10b981; border: 1px solid var(--border); max-height: 200px; overflow-y: auto;
        }
        .console-line { margin-bottom: 4px; }
        .text-error { color: #f43f5e; }
        .text-info { color: #38bdf8; }

        .progress-bar { height: 4px; width: 100%; background: #1e293b; border-radius: 2px; margin-top: 10px; overflow: hidden; display: none; }
        .progress-inner { height: 100%; width: 0%; background: var(--primary); transition: 0.5s; }

        .search { margin-bottom: 15px; position: relative; }
        .search input { padding-left: 35px; }
        .search::before { content: '🔍'; position: absolute; left: 12px; top: 12px; font-size: 0.9rem; opacity: 0.5; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>SEO Power Tool</h1>
            <div id="strapi-status" class="status-pill" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b;">Initializing Strapi...</div>
        </header>

        <div class="dashboard">
            <aside class="panel">
                <h2>⚙️ Configuration</h2>
                
                <div class="form-group">
                    <label>metaRobots Value</label>
                    <select id="meta-value">
                        <option value="index,follow">index, follow</option>
                        <option value="noindex,nofollow">noindex, nofollow</option>
                        <option value="index">index</option>
                        <option value="noindex">noindex</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="toggle-group"><input type="checkbox" id="dry-run" checked class="checkbox-custom"> Dry Run Mode</label>
                    <label class="toggle-group"><input type="checkbox" id="auto-publish" class="checkbox-custom"> Auto-Publish</label>
                </div>

                <button id="run-btn" class="btn btn-primary" disabled>Execute Update</button>
                <button id="refresh-btn" class="btn btn-secondary">Refresh List</button>
                
                <div class="progress-bar" id="progress-container"><div class="progress-inner" id="progress-bar"></div></div>
            </aside>

            <main class="panel">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>📂 Content Types</h2>
                    <span id="select-count" style="font-size: 0.8rem; color: var(--text-dim);">0 selected</span>
                </div>

                <div class="search">
                    <input type="text" id="search-input" placeholder="Search Content Types...">
                </div>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 40px;"><input type="checkbox" id="select-all" class="checkbox-custom"></th>
                                <th>UID</th>
                                <th>KIND</th>
                            </tr>
                        </thead>
                        <tbody id="type-list">
                            <!-- JS populated -->
                        </tbody>
                    </table>
                </div>
            </main>
        </div>

        <div class="console" id="console">
            <div class="console-line text-info">Dashboard loaded. Waiting for Strapi...</div>
        </div>
    </div>

    <script>
        const elements = {
            runBtn: document.getElementById('run-btn'),
            refreshBtn: document.getElementById('refresh-btn'),
            typeList: document.getElementById('type-list'),
            console: document.getElementById('console'),
            progressBar: document.getElementById('progress-bar'),
            progressContainer: document.getElementById('progress-container'),
            selectAll: document.getElementById('select-all'),
            search: document.getElementById('search-input'),
            selectCount: document.getElementById('select-count'),
            status: document.getElementById('strapi-status'),
            metaValue: document.getElementById('meta-value'),
            dryRun: document.getElementById('dry-run'),
            autoPublish: document.getElementById('auto-publish')
        };

        let allTypes = [];

        function log(msg, type = '') {
            const div = document.createElement('div');
            div.className = 'console-line ' + (type ? 'text-' + type : '');
            div.innerText = \`[\${new Date().toLocaleTimeString()}] \${msg}\`;
            elements.console.appendChild(div);
            elements.console.scrollTop = elements.console.scrollHeight;
        }

        async function fetchTypes() {
            log('Loading content types...');
            try {
                const res = await fetch('/api/types');
                const data = await res.json();
                allTypes = data.types;
                renderTypes();
                elements.runBtn.disabled = false;
                elements.status.innerText = 'Connected';
                elements.status.style.background = 'rgba(16, 185, 129, 0.2)';
                elements.status.style.color = '#10b981';
                log(\`Loaded \${allTypes.length} content types.\`);
            } catch (err) {
                log('Error loading types: ' + err.message, 'error');
            }
        }

        function renderTypes() {
            const filter = elements.search.value.toLowerCase();
            const filtered = allTypes.filter(t => t.uid.toLowerCase().includes(filter));
            
            elements.typeList.innerHTML = filtered.map((t, i) => \`
                <tr>
                    <td><input type="checkbox" class="type-check checkbox-custom" data-uid="\${t.uid}" data-seo="\${t.seoFieldName}" data-kind="\${t.kind}"></td>
                    <td>\${t.uid}</td>
                    <td><span class="status-pill \${t.kind === 'singleType' ? 'pill-single' : 'pill-collection'}">\${t.kind}</span></td>
                </tr>
            \`).join('');
            
            document.querySelectorAll('.type-check').forEach(cb => {
                cb.addEventListener('change', updateCount);
            });
        }

        function updateCount() {
            const selected = document.querySelectorAll('.type-check:checked').length;
            elements.selectCount.innerText = \`\${selected} selected\`;
        }

        elements.selectAll.addEventListener('change', (e) => {
            document.querySelectorAll('.type-check').forEach(cb => cb.checked = e.target.checked);
            updateCount();
        });

        elements.search.addEventListener('input', renderTypes);
        elements.refreshBtn.addEventListener('click', fetchTypes);

        elements.runBtn.addEventListener('click', async () => {
            const selected = Array.from(document.querySelectorAll('.type-check:checked')).map(cb => ({
                uid: cb.dataset.uid,
                seoFieldName: cb.dataset.seo,
                kind: cb.dataset.kind
            }));

            if (selected.length === 0) return alert('Please select at least one Content Type.');

            if (!elements.dryRun.checked && !confirm(\`Are you sure you want to update \${selected.length} types in LIVE mode?\`)) return;

            elements.runBtn.disabled = true;
            elements.progressContainer.style.display = 'block';
            elements.progressBar.style.width = '0%';
            log(\`Starting update process for \${selected.length} types...\`, 'info');

            for (let i = 0; i < selected.length; i++) {
                const type = selected[i];
                log(\`Processing \${type.uid}...\`);
                
                try {
                    const res = await fetch('/api/update', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type,
                            value: elements.metaValue.value,
                            dryRun: elements.dryRun.checked,
                            autoPublish: elements.autoPublish.checked
                        })
                    });
                    const result = await res.json();
                    if (result.success) {
                        log(\`✔ \${type.uid}: \${result.message}\`);
                    } else {
                        log(\`❌ \${type.uid}: \${result.error}\`, 'error');
                    }
                } catch (err) {
                    log(\`❌ \${type.uid}: \${err.message}\`, 'error');
                }
                
                elements.progressBar.style.width = \`\${((i + 1) / selected.length) * 100}%\`;
            }

            log('🎯 Process Finished!', 'info');
            elements.runBtn.disabled = false;
        });

        // Initial Load
        fetchTypes();
    </script>
</body>
</html>
`;

// --- Server Utility ---

async function startServer() {
  console.log('🚀 Loading Strapi v5...');
  appInstance = await createStrapi({ distDir: 'dist' }).load();

  const server = http.createServer(async (req, res) => {
    const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
    
    // Serve GUI
    if (parsedUrl.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(HTML_CONTENT);
      return;
    }

    // API: Get Types
    if (parsedUrl.pathname === '/api/types') {
      const allTypes = appInstance.contentTypes;
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
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ types: availableTypes }));
      return;
    }

    // API: Update
    if (parsedUrl.pathname === '/api/update' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        const { type, value, dryRun, autoPublish } = JSON.parse(body);
        const { uid, seoFieldName, kind } = type;

        try {
          let entries = [];
          if (kind === 'singleType') {
            const single = await appInstance.entityService.findMany(uid, { 
              publicationState: 'preview',
              populate: [seoFieldName]
            });
            if (single) entries = [single];
          } else {
            let start = 0;
            const limit = 100;
            while (true) {
              const batch = await appInstance.entityService.findMany(uid, {
                start, limit, publicationState: 'preview', populate: [seoFieldName]
              });
              if (!batch || batch.length === 0) break;
              entries = entries.concat(batch);
              start += limit;
            }
          }

          let updatedCount = 0;
          for (const entry of entries) {
            if (!dryRun) {
              await appInstance.entityService.update(uid, entry.id, {
                data: { [seoFieldName]: { ...(entry[seoFieldName] || {}), metaRobots: value } }
              });
              if (autoPublish) {
                try { await appInstance.entityService.publish(uid, entry.id); } catch (e) {}
              }
            }
            updatedCount++;
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: `${dryRun ? 'Mode: Dry Run. Would update' : 'Updated'} ${updatedCount} entries.` }));
        } catch (err) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }

    // 404
    res.writeHead(404);
    res.end();
  });

  server.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`\n✅ SEO Dashboard is running at: ${url}`);
    console.log('🚀 Opening your browser...');
    
    const start = (process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open');
    exec(`${start} ${url}`);
  });
}

startServer().catch(err => {
  console.error('\n💥 Startup Error:', err.message);
  process.exit(1);
});
