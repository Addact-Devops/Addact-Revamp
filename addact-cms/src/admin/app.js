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

function prompt2FACodeModal(email) {
  return new Promise((resolve) => {
    const existing = document.getElementById('strapi-2fa-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'strapi-2fa-modal-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(8px);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
      background: #ffffff;
      width: 100%;
      max-width: 420px;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      border: 1px solid #e2e8f0;
      text-align: center;
    `;

    card.innerHTML = `
      <div style="font-size: 40px; margin-bottom: 12px;">🔑</div>
      <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #0f172a;">Two-Factor Authentication</h2>
      <p style="margin: 0 0 20px 0; font-size: 14px; color: #64748b; line-height: 1.5;">
        Account <strong style="color: #4945ff;">${email || ''}</strong> is protected with 2FA.<br/>
        Enter the 6-digit Authenticator code or an Emergency Recovery Code:
      </p>

      <input id="strapi-2fa-otp-input" type="text" maxlength="12" placeholder="000000" style="
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        letter-spacing: 4px;
        font-size: 22px;
        font-weight: 700;
        padding: 12px 16px;
        border: 2px solid #cbd5e1;
        border-radius: 10px;
        outline: none;
        margin-bottom: 20px;
        color: #1e293b;
        text-transform: uppercase;
      " autofocus />

      <div id="strapi-2fa-error-msg" style="display: none; color: #ef4444; font-size: 13px; font-weight: 600; margin-bottom: 16px;"></div>

      <div style="display: flex; gap: 12px;">
        <button id="strapi-2fa-cancel-btn" style="
          flex: 1;
          padding: 12px;
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          color: #475569;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
        ">Cancel</button>
        <button id="strapi-2fa-submit-btn" style="
          flex: 1;
          padding: 12px;
          border: none;
          background: #4945ff;
          color: #ffffff;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
        ">Verify & Login</button>
      </div>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    const input = card.querySelector('#strapi-2fa-otp-input');
    const cancelBtn = card.querySelector('#strapi-2fa-cancel-btn');
    const submitBtn = card.querySelector('#strapi-2fa-submit-btn');
    const errorMsg = card.querySelector('#strapi-2fa-error-msg');

    setTimeout(() => input && input.focus(), 100);

    const submitAction = () => {
      const val = (input.value || '').trim();
      const cleanVal = val.replace(/\s+/g, '');
      if (!cleanVal || cleanVal.length < 6) {
        errorMsg.style.display = 'block';
        errorMsg.textContent = 'Please enter a valid 6-digit code or emergency recovery code.';
        return;
      }
      overlay.remove();
      resolve(cleanVal);
    };

    cancelBtn.onclick = () => {
      overlay.remove();
      resolve(null);
    };

    submitBtn.onclick = submitAction;

    input.onkeydown = (e) => {
      if (e.key === 'Enter') submitAction();
    };
  });
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

    app.addMenuLink({
      to: "plugins/2fa-security",
      icon: () => "🔑",
      name: "2fa-security",
      permissions: [],
      Component: async () => {
        const component = await import("./pages/TwoFactorAuth");
        return component;
      },
      intlLabel: {
        id: "2fa-security.name",
        defaultMessage: "2FA Security",
      },
    });
  },
  bootstrap(app) {
    const clientId = getOrCreateClientId();

    // Attach X-Client-Id header cleanly to Strapi Admin API calls & handle 2FA Login Interception
    if (typeof window !== 'undefined' && window.fetch) {
      const originalFetch = window.fetch;
      window.fetch = async function (input, init) {
        let urlStr = '';
        try {
          urlStr = typeof input === 'string' ? input : (input && input.url) ? input.url : '';
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

        const response = await originalFetch.call(this, input, init);

        // Intercept /admin/login response to check if 2FA code is needed
        if (urlStr.includes('/admin/login')) {
          try {
            const clonedRes = response.clone();
            const body = await clonedRes.json();
            if (body?.data?.requires2FA) {
              const code = await prompt2FACodeModal(body.data.email);
              if (code) {
                // If challengeToken is returned, call /api/admin-2fa/verify-login
                if (body.data.challengeToken) {
                  const verifyRes = await originalFetch.call(this, '/api/admin-2fa/verify-login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      ...(clientId ? { 'X-Client-Id': clientId } : {}),
                    },
                    body: JSON.stringify({
                      challengeToken: body.data.challengeToken,
                      token: code,
                    }),
                  });

                  if (verifyRes.ok) {
                    try {
                      const verifyData = await verifyRes.clone().json();
                      const token = verifyData?.data?.token;
                      const user = verifyData?.data?.user;
                      if (token) {
                        localStorage.setItem('jwtToken', JSON.stringify(token));
                        sessionStorage.setItem('jwtToken', JSON.stringify(token));
                        if (user) {
                          localStorage.setItem('userInfo', JSON.stringify(user));
                          sessionStorage.setItem('userInfo', JSON.stringify(user));
                        }
                        setTimeout(() => {
                          window.location.href = '/admin';
                        }, 50);
                      }
                    } catch (e) {}
                  }

                  return verifyRes;
                }

                // Fallback: Retry login with X-2FA-Code header
                const newInit = { ...init };
                if (newInit.headers instanceof Headers) {
                  newInit.headers.set('X-2FA-Code', code);
                } else if (Array.isArray(newInit.headers)) {
                  newInit.headers.push(['X-2FA-Code', code]);
                } else {
                  newInit.headers = {
                    ...(newInit.headers || {}),
                    'X-2FA-Code': code,
                  };
                }
                return await originalFetch.call(this, input, newInit);
              }
            }
          } catch (e) {}
        }

        return response;
      };
    }
  },
};
