import fevicon from "./extensions/addact-logo-white.svg";
import mainlogo from "./extensions/addact-logo-white.svg";

function getOrCreateClientId() {
  try {
    let clientId = localStorage.getItem('strapi_audit_client_id');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!clientId || !uuidRegex.test(clientId)) {
      clientId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          });
      localStorage.setItem('strapi_audit_client_id', clientId);
    }
    return clientId;
  } catch (e) {
    return null;
  }
}

export default {
  config: {
    head: {
      favicon: fevicon,
    },
    menu: {
      logo: fevicon,
    },
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Addxp Technologies",
        "app.components.LeftMenu.navbrand.workplace":
          "Digital Customer Experience Management Solution",
        "Auth.form.welcome.title": "Addact Technologies Pvt Ltd",
        "Auth.form.welcome.subtitle": "Login to your account",
        "Settings.profile.form.section.experience.interfaceLanguageHelp":
          "Preference changes will apply only to you.",
      },
    },
    locales: [],
  },
  register(app) {
    app.addMenuLink({
      to: "plugins/audit-logs",
      icon: () => "🛡️",
      name: "audit-logs",
      permissions: [],
      Component: async () => {
        const component = await import("./pages/AuditLogs");
        return component;
      },
      intlLabel: {
        id: "audit-logs.name",
        defaultMessage: "Audit Logs",
      },
    });
  },
  bootstrap(app) {
    const clientId = getOrCreateClientId();

    // Attach X-Client-Id header cleanly to Strapi Admin API calls only
    if (typeof window !== 'undefined' && window.fetch) {
      const originalFetch = window.fetch;
      window.fetch = function (input, init) {
        try {
          const urlStr = typeof input === 'string' ? input : (input && input.url) ? input.url : '';
          if (urlStr.includes('/admin/') || urlStr.includes('/content-manager/') || urlStr.includes('/api/')) {
            init = init || {};
            if (init.headers instanceof Headers) {
              if (clientId) init.headers.set('X-Client-Id', clientId);
            } else if (Array.isArray(init.headers)) {
              if (clientId) init.headers.push(['X-Client-Id', clientId]);
            } else {
              init.headers = {
                ...(init.headers || {}),
                ...(clientId ? { 'X-Client-Id': clientId } : {}),
              };
            }
          }
        } catch (e) {}
        return originalFetch.call(this, input, init);
      };
    }
  },
};
