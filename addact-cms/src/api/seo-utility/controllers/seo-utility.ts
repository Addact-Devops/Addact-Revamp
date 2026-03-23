import fs from 'fs';
import path from 'path';

/**
 * SEO Utility Controller
 * 
 * Serves the GUI and handles bulk updates directly via Strapi v5 Document Service.
 */

// GUI content is now loaded from gui.html

export default {
    async gui(ctx) { 
        const htmlPath = path.join(process.cwd(), 'src', 'api', 'seo-utility', 'controllers', 'gui.html');
        if (fs.existsSync(htmlPath)) {
            ctx.type = 'html';
            ctx.body = fs.readFileSync(htmlPath, 'utf8');
        } else {
            ctx.status = 404;
            ctx.body = 'GUI file not found at ' + htmlPath;
        }
    },
    async getTypes(ctx) {
        try {
            const allTypes = strapi.contentTypes;
            const availableTypes = [];
            for (const uid in allTypes) {
                if (!uid.startsWith('api::')) continue;
                const contentType = allTypes[uid];
                const seoField = Object.keys(contentType.attributes).find(k =>
                    contentType.attributes[k].type === 'component' &&
                    contentType.attributes[k].component === 'shared.seo'
                );
                if (seoField) {
                    const searchFields = ['Slug', 'slug', 'Title', 'title', 'name', 'subject', 'displayName', 'ReferenceTitle'];
                    const availableFields = searchFields.filter(f => contentType.attributes[f]);
                    const entries = await (strapi as any).documents(uid).findMany({
                        status: 'draft', populate: [seoField], fields: availableFields, limit: 1000
                    });
                    const entryDetails = entries.map(e => ({
                        id: e.documentId,
                        slug: (e as any).Slug || (e as any).slug,
                        title: (e as any).Title || (e as any).title || (e as any).ReferenceTitle || e.documentId,
                        metaRobots: e[seoField]?.metaRobots || 'N/A'
                    }));
                    availableTypes.push({ uid, seoFieldName: seoField, kind: contentType.kind, count: entries.length, entries: entryDetails });
                }
            }
            let enumValues = ['index,follow', 'noindex,nofollow'];
            try {
                const seoSchemaPath = path.join(process.cwd(), 'src', 'components', 'shared', 'seo.json');
                if (fs.existsSync(seoSchemaPath)) {
                    const seoSchema = JSON.parse(fs.readFileSync(seoSchemaPath, 'utf8'));
                    if (seoSchema.attributes?.metaRobots?.enum) enumValues = seoSchema.attributes.metaRobots.enum;
                }
            } catch (e) {}
            ctx.body = { types: availableTypes, enumValues };
        } catch (err) { ctx.body = { error: (err as any).message }; }
    },
    async update(ctx) {
        const { type, value, dryRun, autoPublish } = ctx.request.body;
        const { uid, seoFieldName, kind } = type;
        try {
            let entries = [];
            if (kind === 'singleType') {
                const single = await (strapi as any).documents(uid).findFirst({ status: 'draft', populate: [seoFieldName] });
                if (single) entries = [single];
            } else {
                let start = 0;
                while (true) {
                    const batch = await (strapi as any).documents(uid).findMany({ start, limit: 100, status: 'draft', populate: [seoFieldName] });
                    if (!batch || batch.length === 0) break;
                    entries = entries.concat(batch); start += 100;
                }
            }
            for (const entry of entries) {
                if (!dryRun) {
                    await (strapi as any).documents(uid).update({ documentId: entry.documentId, data: { [seoFieldName]: { ...(entry[seoFieldName] || {}), metaRobots: value } }, status: 'draft' });
                    if (autoPublish) try { await (strapi as any).documents(uid).publish({ documentId: entry.documentId }); } catch (e) {}
                }
            }
            ctx.body = { success: true, message: entries.length + ' entries processed.' };
        } catch (err) { ctx.body = { success: false, error: (err as Error).message }; }
    }
};
