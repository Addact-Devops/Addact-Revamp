import { Shield, Key } from "@strapi/icons";
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
      background: rgba(15, 23, 42, 0.76);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      padding: 20px;
      box-sizing: border-box;
      animation: strapiFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    const card = document.createElement('div');
    card.style.cssText = `
      background: #ffffff;
      width: 100%;
      max-width: 440px;
      border-radius: 24px;
      padding: 36px 32px 32px 32px;
      box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(226, 232, 240, 0.8), 0 0 60px -15px rgba(79, 70, 229, 0.15);
      border: 1px solid rgba(226, 232, 240, 0.9);
      text-align: center;
      position: relative;
      box-sizing: border-box;
      animation: strapiSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    card.innerHTML = `
      <style>
        @keyframes strapiFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes strapiSlideUp { from { opacity: 0; transform: translateY(14px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        #strapi-2fa-otp-input:focus {
          border-color: #4f46e5 !important;
          background: #ffffff !important;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.14) !important;
        }
        #strapi-2fa-submit-btn:hover {
          filter: brightness(1.06);
          box-shadow: 0 8px 24px -4px rgba(79, 70, 229, 0.45);
          transform: translateY(-1px);
        }
        #strapi-2fa-cancel-btn:hover {
          background: #f1f5f9 !important;
          color: #0f172a !important;
        }
      </style>

      <!-- Security Status Badge -->
      <div style="display: inline-flex; align-items: center; gap: 7px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 5px 14px; border-radius: 9999px; margin-bottom: 20px;">
        <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.7);"></span>
        <span style="font-size: 11px; font-weight: 700; color: #475569; letter-spacing: 0.6px; text-transform: uppercase;">Zero-Trust Verification</span>
      </div>

      <!-- High-End Glowing Shield Icon -->
      <div style="width: 60px; height: 60px; margin: 0 auto 18px auto; border-radius: 20px; background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); border: 1px solid #c7d2fe; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px -4px rgba(99, 102, 241, 0.25);">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M12 8v4"/>
          <path d="M12 16h.01"/>
        </svg>
      </div>

      <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">Two-Factor Authentication</h2>
      
      <!-- Account Pill -->
      <div style="display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; border: 1px solid #e2e8f0; color: #334155; padding: 4px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 600; margin-bottom: 18px; max-width: 90%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>${email || 'Admin User'}</span>
      </div>

      <p style="margin: 0 0 22px 0; font-size: 13.5px; color: #64748b; line-height: 1.55;">
        Enter the 6-digit code from your authenticator app (Google Authenticator, Microsoft Authenticator, 1Password)
      </p>

      <div style="margin-bottom: 20px;">
        <input id="strapi-2fa-otp-input" type="text" maxlength="12" placeholder="000 000" style="
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          letter-spacing: 8px;
          font-size: 26px;
          font-weight: 800;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          padding: 14px 16px;
          border: 2px solid #cbd5e1;
          border-radius: 14px;
          outline: none;
          background: #f8fafc;
          color: #0f172a;
          transition: all 0.2s ease;
          text-transform: uppercase;
        " autofocus />
      </div>

      <div id="strapi-2fa-error-msg" style="display: none; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 13px; font-weight: 600; padding: 11px 14px; border-radius: 10px; margin-bottom: 18px; text-align: left; line-height: 1.4;"></div>

      <div style="display: flex; gap: 12px;">
        <button id="strapi-2fa-cancel-btn" style="
          flex: 1;
          padding: 13px 18px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #475569;
          font-weight: 600;
          font-size: 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.15s ease;
        ">Cancel</button>
        <button id="strapi-2fa-submit-btn" style="
          flex: 1.4;
          padding: 13px 18px;
          border: none;
          background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
        ">
          <span>Verify & Login</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
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

function getAuthToken() {
  try {
    // 1. Check LocalStorage and SessionStorage
    const raw = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (typeof parsed === 'string' && parsed) return parsed;
      } catch (e) {
        return raw.replace(/^"|"$/g, '');
      }
    }

    // 2. Check document.cookie (Strapi v5 standard fallback)
    if (typeof document !== 'undefined' && document.cookie) {
      const match = document.cookie.match(/(?:^|;\s*)jwtToken=([^;]+)/);
      if (match && match[1]) {
        return decodeURIComponent(match[1]);
      }
    }

    return null;
  } catch (e) {
    return null;
  }
}

function applyMenuVisibility(isAdmin) {
  if (typeof document === 'undefined') return;
  let styleEl = document.getElementById('strapi-2fa-menu-visibility');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'strapi-2fa-menu-visibility';
    document.head.appendChild(styleEl);
  }
  if (!isAdmin) {
    styleEl.textContent = `
      a[href*="/plugins/2fa-security"],
      a[to="plugins/2fa-security"],
      li:has(a[href*="/plugins/2fa-security"]),
      [data-testid*="2fa-security"] {
        display: none !important;
      }
    `;
  } else {
    styleEl.textContent = '';
  }
}

function showPostLogin2FASetupModal(token, clientId) {
  if (typeof document === 'undefined') return;
  if (document.getElementById('strapi-2fa-setup-modal-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'strapi-2fa-setup-modal-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    padding: 24px;
    box-sizing: border-box;
    animation: strapiFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  const card = document.createElement('div');
  card.style.cssText = `
    background: #ffffff;
    width: 100%;
    max-width: 530px;
    max-height: 94vh;
    overflow-y: auto;
    border-radius: 24px;
    padding: 36px 34px 32px 34px;
    box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(226, 232, 240, 0.8), 0 0 80px -20px rgba(79, 70, 229, 0.15);
    border: 1px solid rgba(226, 232, 240, 0.9);
    text-align: center;
    position: relative;
    box-sizing: border-box;
    animation: strapiSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  card.innerHTML = `
    <style>
      @keyframes strapiFadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes strapiSlideUp { from { opacity: 0; transform: translateY(14px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes strapiSpin { to { transform: rotate(360deg); } }
    </style>

    <div style="display: inline-flex; align-items: center; gap: 7px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 5px 14px; border-radius: 9999px; margin-bottom: 20px;">
      <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #4f46e5; box-shadow: 0 0 8px rgba(79, 70, 229, 0.6);"></span>
      <span style="font-size: 11px; font-weight: 700; color: #475569; letter-spacing: 0.6px; text-transform: uppercase;">Security Enrollment</span>
    </div>

    <div style="width: 60px; height: 60px; margin: 0 auto 18px auto; border-radius: 20px; background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); border: 1px solid #c7d2fe; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px -4px rgba(99, 102, 241, 0.2);">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    </div>

    <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">Activate Two-Factor Protection</h2>
    <p style="margin: 0 0 24px 0; font-size: 13.5px; color: #64748b; line-height: 1.5;">
      Initializing secure cryptographic credentials...
    </p>

    <div style="display: flex; justify-content: center; padding: 32px 0;">
      <div style="width: 40px; height: 40px; border: 3px solid #e2e8f0; border-top-color: #4f46e5; border-radius: 50%; animation: strapiSpin 0.8s linear infinite;"></div>
    </div>
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  // Fetch 2FA Setup secret & QR
  fetch('/api/admin-2fa/setup', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      ...(clientId ? { 'X-Client-Id': clientId } : {}),
    },
  })
    .then((res) => res.json())
    .then((raw) => {
      const data = raw?.data || raw;
      const qrCodeUrl = data?.qrCode;
      const secretKey = data?.secret;

      if (!qrCodeUrl || !secretKey) {
        throw new Error(data?.error?.message || raw?.error?.message || 'Failed to initialize 2FA setup');
      }

      card.innerHTML = `
        <style>
          #strapi-2fa-setup-code-input:focus {
            border-color: #4f46e5 !important;
            background: #ffffff !important;
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.14) !important;
          }
          #strapi-2fa-setup-verify-btn:hover {
            filter: brightness(1.06);
            box-shadow: 0 8px 24px -4px rgba(79, 70, 229, 0.45);
            transform: translateY(-1px);
          }
          .app-badge {
            background: #f1f5f9;
            color: #475569;
            font-size: 11px;
            font-weight: 600;
            padding: 4px 9px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
          }
        </style>

        <!-- Top Header & Security Level -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
          <div style="display: inline-flex; align-items: center; gap: 7px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 5px 12px; border-radius: 9999px;">
            <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #4f46e5; box-shadow: 0 0 6px rgba(79, 70, 229, 0.5);"></span>
            <span style="font-size: 11px; font-weight: 700; color: #475569; letter-spacing: 0.5px; text-transform: uppercase;">Zero-Trust Policy</span>
          </div>
          <span style="font-size: 11.5px; font-weight: 700; color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 3px 10px; border-radius: 9999px;">
            Mandatory Security
          </span>
        </div>

        <h2 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
          Enforce Two-Factor Authentication
        </h2>
        <p style="margin: 0 0 16px 0; font-size: 13px; color: #64748b; line-height: 1.5;">
          Scan the QR code using your corporate or mobile authenticator application:
        </p>

        <!-- Supported Authenticators Bar -->
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-bottom: 16px;">
          <span class="app-badge">Google Authenticator</span>
          <span class="app-badge">Microsoft Authenticator</span>
          <span class="app-badge">1Password</span>
          <span class="app-badge">Authy</span>
        </div>

        <!-- High-Tech QR Code Container with Viewfinder styling -->
        <div style="
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 14px;
          margin-bottom: 16px;
          display: inline-block;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          position: relative;
        ">
          <img src="${qrCodeUrl}" alt="2FA QR Code" style="width: 175px; height: 175px; display: block; margin: 0 auto; border-radius: 8px;" />
        </div>

        <!-- Secret Key Box -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; margin-bottom: 18px; font-size: 12px; color: #475569; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <span style="font-weight: 600; color: #64748b;">Manual Secret:</span>
          <code style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; font-weight: 800; color: #0f172a; letter-spacing: 1px;">${secretKey}</code>
          <button id="strapi-2fa-copy-key-btn" style="
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            padding: 4px 10px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            color: #334155;
            transition: all 0.15s ease;
          ">Copy</button>
        </div>

        <!-- Code Input Section -->
        <label style="display: block; text-align: left; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
          Enter 6-Digit Authenticator Code
        </label>
        <input id="strapi-2fa-setup-code-input" type="text" maxlength="6" placeholder="000 000" style="
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          letter-spacing: 8px;
          font-size: 26px;
          font-weight: 800;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          padding: 13px 16px;
          border: 2px solid #cbd5e1;
          border-radius: 12px;
          outline: none;
          background: #f8fafc;
          margin-bottom: 12px;
          color: #0f172a;
          transition: all 0.2s ease;
        " autofocus />

        <div id="strapi-2fa-setup-error" style="display: none; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; padding: 11px 14px; border-radius: 10px; font-size: 13px; font-weight: 600; margin-bottom: 16px; text-align: left; line-height: 1.4;"></div>

        <div style="margin-bottom: 6px;">
          <button id="strapi-2fa-setup-verify-btn" style="
            width: 100%;
            padding: 14px 18px;
            border: none;
            background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
            color: #ffffff;
            font-weight: 700;
            font-size: 14px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.15s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 14px rgba(79, 70, 229, 0.28);
          ">
            <span>Verify & Activate 2FA</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      `;

      const copyKeyBtn = card.querySelector('#strapi-2fa-copy-key-btn');
      const codeInput = card.querySelector('#strapi-2fa-setup-code-input');
      const verifyBtn = card.querySelector('#strapi-2fa-setup-verify-btn');
      const errorBox = card.querySelector('#strapi-2fa-setup-error');

      if (copyKeyBtn) {
        copyKeyBtn.onclick = () => {
          navigator.clipboard?.writeText(secretKey);
          copyKeyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyKeyBtn.textContent = 'Copy';
          }, 2000);
        };
      }

      const handleVerify = async () => {
        const tokenCode = (codeInput?.value || '').trim();
        if (!tokenCode || tokenCode.length !== 6) {
          if (errorBox) {
            errorBox.style.display = 'block';
            errorBox.textContent = 'Please enter a valid 6-digit code from your authenticator app.';
          }
          return;
        }

        if (errorBox) errorBox.style.display = 'none';
        if (verifyBtn) {
          verifyBtn.disabled = true;
          verifyBtn.textContent = 'Verifying...';
        }

        try {
          const enableRes = await fetch('/api/admin-2fa/enable', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
              ...(clientId ? { 'X-Client-Id': clientId } : {}),
            },
            body: JSON.stringify({
              token: tokenCode,
              secret: secretKey,
            }),
          });

          const enableData = await enableRes.json();

          if (!enableRes.ok || !enableData.success) {
            throw new Error(enableData?.error?.message || enableData?.message || 'Invalid verification code. Please try again.');
          }

          sessionStorage.setItem('strapi_2fa_setup_completed', 'true');

          card.innerHTML = `
            <div style="width: 60px; height: 60px; margin: 0 auto 18px auto; border-radius: 50%; background: #ecfdf5; border: 1px solid #a7f3d0; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #0f172a;">
              2FA Activated Successfully!
            </h2>
            <p style="margin: 0 0 24px 0; font-size: 13.5px; color: #64748b; line-height: 1.55;">
              Two-Factor Authentication is now active on your account. You will be prompted for an authenticator code on future logins.
            </p>

            <button id="strapi-2fa-finish-btn" style="
              width: 100%;
              padding: 14px 18px;
              border: none;
              background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
              color: #ffffff;
              font-weight: 700;
              font-size: 14px;
              border-radius: 12px;
              cursor: pointer;
              transition: all 0.15s ease;
              box-shadow: 0 4px 14px rgba(79, 70, 229, 0.28);
            ">Continue to Admin Panel</button>
          `;

          const finishBtn = card.querySelector('#strapi-2fa-finish-btn');
          if (finishBtn) {
            finishBtn.onclick = () => {
              overlay.remove();
              window.location.reload();
            };
          }
        } catch (err) {
          if (errorBox) {
            errorBox.style.display = 'block';
            errorBox.textContent = err.message || 'Verification failed. Please check the code.';
          }
          if (verifyBtn) {
            verifyBtn.disabled = false;
            verifyBtn.textContent = 'Verify & Activate 2FA';
          }
        }
      };

      if (verifyBtn) verifyBtn.onclick = handleVerify;
      if (codeInput) {
        codeInput.onkeydown = (e) => {
          if (e.key === 'Enter') handleVerify();
        };
        setTimeout(() => codeInput.focus(), 150);
      }
    })
    .catch((err) => {
      card.innerHTML = `
        <div style="width: 60px; height: 60px; margin: 0 auto 18px auto; border-radius: 20px; background: #fef2f2; border: 1px solid #fecaca; display: flex; align-items: center; justify-content: center;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 800; color: #dc2626;">Failed to initialize 2FA</h2>
        <p style="margin: 0 0 20px 0; font-size: 14px; color: #64748b; line-height: 1.5;">${err.message || 'An error occurred while preparing 2FA setup.'}</p>
        <button id="strapi-2fa-close-err-btn" style="
          padding: 12px 22px;
          border: none;
          background: #4f46e5;
          color: #ffffff;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
        ">Retry Setup</button>
      `;
      const closeBtn = card.querySelector('#strapi-2fa-close-err-btn');
      if (closeBtn) {
        closeBtn.onclick = () => {
          overlay.remove();
          showPostLogin2FASetupModal(token, clientId);
        };
      }
    });
}

let isChecking2FAStatus = false;

function checkAndPromptPostLogin2FA(clientId) {
  if (typeof window === 'undefined') return;

  const path = window.location.pathname;
  if (path.includes('/auth/login') || path.includes('/auth/register') || path.includes('/auth/forgot-password')) {
    return;
  }

  // If setup modal or 2FA login modal is already displayed, don't trigger another fetch
  if (document.getElementById('strapi-2fa-setup-modal-overlay') || document.getElementById('strapi-2fa-modal-overlay')) {
    return;
  }

  if (isChecking2FAStatus) return;

  const token = getAuthToken();
  if (!token) return;

  isChecking2FAStatus = true;

  fetch('/api/admin-2fa/status', {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      ...(clientId ? { 'X-Client-Id': clientId } : {}),
    },
  })
    .then((res) => res.json())
    .then((json) => {
      isChecking2FAStatus = false;
      // Support both flat response { isEnabled: false } and wrapped { data: { isEnabled: false } }
      const data = json?.data || json;
      if (!data) return;

      const isEnabled = typeof data.isEnabled === 'boolean' ? data.isEnabled : json?.isEnabled;
      const isAdmin = typeof data.isAdmin === 'boolean' ? data.isAdmin : json?.isAdmin;

      // Apply RBAC sidebar visibility if explicitly provided
      if (typeof isAdmin === 'boolean') {
        applyMenuVisibility(isAdmin);
      }

      // 2FA is strictly MANDATORY: If 2FA is NOT enabled, always enforce setup popup
      if (isEnabled === false) {
        showPostLogin2FASetupModal(token, clientId);
      }
    })
    .catch(() => {
      isChecking2FAStatus = false;
    });
}

// ==========================================
// 1-Hour Inactivity Auto-Logout System
// ==========================================

const INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour (60 minutes)

function showSessionExpiredNoticeIfNeeded() {
  if (typeof document === 'undefined') return;
  try {
    const timedOut = sessionStorage.getItem('strapi_session_timed_out');
    if (!timedOut) return;
    sessionStorage.removeItem('strapi_session_timed_out');

    if (document.getElementById('strapi-session-timeout-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'strapi-session-timeout-banner';
    banner.style.cssText = `
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999999;
      background: #ffffff;
      border: 1px solid #fed7aa;
      border-left: 5px solid #f97316;
      padding: 14px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      max-width: 90%;
      animation: strapiBannerSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    banner.innerHTML = `
      <style>
        @keyframes strapiBannerSlideDown {
          from { opacity: 0; transform: translate(-50%, -16px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      </style>
      <div style="width: 34px; height: 34px; border-radius: 10px; background: #fff7ed; border: 1px solid #ffedd5; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <div>
        <div style="font-size: 13.5px; font-weight: 700; color: #0f172a;">Session Expired (Security Timeout)</div>
        <div style="font-size: 12.5px; color: #64748b; margin-top: 2px;">You were automatically logged out due to 1 hour of inactivity. Please log in again.</div>
      </div>
      <button id="strapi-timeout-dismiss-btn" style="
        background: transparent;
        border: none;
        color: #94a3b8;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        padding: 4px 8px;
        margin-left: 8px;
        line-height: 1;
      ">✕</button>
    `;

    document.body.appendChild(banner);

    const closeBtn = banner.querySelector('#strapi-timeout-dismiss-btn');
    if (closeBtn) closeBtn.onclick = () => banner.remove();
    setTimeout(() => {
      if (banner && banner.parentNode) banner.remove();
    }, 10000);
  } catch (e) {}
}

function showInactivityWarningModal(secondsLeft, onStayLoggedIn) {
  if (typeof document === 'undefined') return;
  let modal = document.getElementById('strapi-inactivity-warning-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'strapi-inactivity-warning-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 9999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      padding: 20px;
      box-sizing: border-box;
      animation: strapiFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    modal.innerHTML = `
      <div style="
        background: #ffffff;
        border-radius: 24px;
        padding: 34px 30px;
        max-width: 420px;
        width: 100%;
        text-align: center;
        box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(226, 232, 240, 0.8);
        border: 1px solid rgba(226, 232, 240, 0.9);
        box-sizing: border-box;
        animation: strapiSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        <div style="display: inline-flex; align-items: center; gap: 7px; background: #fff7ed; border: 1px solid #fed7aa; padding: 5px 12px; border-radius: 9999px; margin-bottom: 18px;">
          <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #ea580c;"></span>
          <span style="font-size: 11px; font-weight: 700; color: #c2410c; letter-spacing: 0.5px; text-transform: uppercase;">Inactivity Alert</span>
        </div>

        <div style="width: 58px; height: 58px; border-radius: 18px; background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border: 1px solid #fed7aa; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; box-shadow: 0 8px 16px -4px rgba(234, 88, 12, 0.2);">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>

        <h3 style="margin: 0 0 8px 0; font-size: 21px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">Session Expiring Soon</h3>
        <p style="margin: 0 0 18px 0; font-size: 13.5px; color: #64748b; line-height: 1.5;">
          You have been idle. For system security, your Strapi session will automatically end in:
        </p>

        <div style="margin-bottom: 22px;">
          <span id="strapi-inactivity-countdown" style="
            display: inline-block;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 28px;
            font-weight: 800;
            color: #ea580c;
            background: #fff7ed;
            border: 1px solid #fed7aa;
            padding: 8px 22px;
            border-radius: 12px;
            letter-spacing: 1px;
          ">${secondsLeft}s</span>
        </div>

        <div>
          <button id="strapi-inactivity-stay-btn" style="
            width: 100%;
            padding: 13px 20px;
            border: none;
            background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
            color: #ffffff;
            font-weight: 700;
            font-size: 14px;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(79, 70, 229, 0.25);
            transition: all 0.15s ease;
          ">
            Stay Logged In
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const stayBtn = modal.querySelector('#strapi-inactivity-stay-btn');
    if (stayBtn) {
      stayBtn.onclick = () => {
        dismissInactivityWarningModal();
        if (onStayLoggedIn) onStayLoggedIn();
      };
    }
  } else {
    const countdownEl = modal.querySelector('#strapi-inactivity-countdown');
    if (countdownEl) countdownEl.textContent = `${secondsLeft}s`;
  }
}

function dismissInactivityWarningModal() {
  if (typeof document === 'undefined') return;
  const modal = document.getElementById('strapi-inactivity-warning-modal');
  if (modal) modal.remove();
}

async function executeAutoLogout(token, clientId) {
  // 1. Send clean logout request so AuditLog registers 'Action: Logout'
  if (token) {
    try {
      await fetch('/admin/logout', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
          ...(clientId ? { 'X-Client-Id': clientId } : {}),
        },
      });
    } catch (e) {}
  }

  // 2. Clear credentials from client storage and cookies
  try {
    localStorage.removeItem('jwtToken');
    sessionStorage.removeItem('jwtToken');
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('strapi_2fa_setup_completed');
    localStorage.removeItem('strapi_last_active_time');
    sessionStorage.setItem('strapi_session_timed_out', 'true');
    // Clear cookie as well
    document.cookie = 'jwtToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  } catch (e) {}

  // 3. Clean direct redirect to admin login page
  window.location.replace('/admin/auth/login');
}

function setupInactivityTimeout(clientId) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const path = window.location.pathname;
  if (path.includes('/auth/login') || path.includes('/auth/register') || path.includes('/auth/forgot-password')) {
    setTimeout(showSessionExpiredNoticeIfNeeded, 300);
    return;
  }

  // Initialize active timestamp if not already present
  if (!localStorage.getItem('strapi_last_active_time')) {
    localStorage.setItem('strapi_last_active_time', String(Date.now()));
  }

  let isLoggingOut = false;

  const checkInactivity = () => {
    if (isLoggingOut) return;
    const currentPath = window.location.pathname;
    if (currentPath.includes('/auth/login') || currentPath.includes('/auth/register')) return;

    const token = getAuthToken();
    if (!token) return;

    const lastActiveStr = localStorage.getItem('strapi_last_active_time');
    const lastActive = lastActiveStr ? parseInt(lastActiveStr, 10) : Date.now();
    const idleTime = Date.now() - lastActive;

    // Direct auto-logout immediately when 1 hour of inactivity is reached
    if (idleTime >= INACTIVITY_TIMEOUT_MS) {
      isLoggingOut = true;
      executeAutoLogout(token, clientId);
    }
  };

  let lastThrottle = 0;
  const recordActivity = () => {
    if (isLoggingOut) return;
    const now = Date.now();

    // Check if idle time ALREADY exceeded 1 hour before updating the timestamp!
    // (This is critical when user re-opens laptop or comes back next day)
    const lastActiveStr = localStorage.getItem('strapi_last_active_time');
    if (lastActiveStr) {
      const lastActive = parseInt(lastActiveStr, 10);
      if (now - lastActive >= INACTIVITY_TIMEOUT_MS) {
        checkInactivity();
        return;
      }
    }

    if (now - lastThrottle > 4000) {
      lastThrottle = now;
      localStorage.setItem('strapi_last_active_time', String(now));
    }
  };

  const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
  activityEvents.forEach((evt) => {
    window.addEventListener(evt, recordActivity, { passive: true });
  });

  // Check immediately when user switches tabs or wakes up computer
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkInactivity();
    }
  });
  window.addEventListener('focus', checkInactivity);

  // Periodic inactivity check every 5 seconds
  const intervalId = setInterval(() => {
    if (isLoggingOut) {
      clearInterval(intervalId);
      return;
    }
    checkInactivity();
  }, 5000);
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
      icon: Shield,
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
      icon: Key,
      name: "2fa-security",
      permissions: [],
      Component: async () => {
        const component = await import("./pages/TwoFactorAuth");
        return component;
      },
      intlLabel: {
        id: "2fa-security.name",
        defaultMessage: "2FA Management",
      },
    });
  },
  bootstrap(app) {
    const clientId = getOrCreateClientId();

    // Setup 1-Hour Inactivity Auto-Logout
    setupInactivityTimeout(clientId);

    // Check if user role is known, otherwise keep 2FA menu visible by default
    try {
      const userRaw = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
      if (userRaw) {
        const userObj = JSON.parse(userRaw);
        const roles = Array.isArray(userObj.roles)
          ? userObj.roles.map((r) => (typeof r === 'string' ? r : r.code || r.name || '')).map((s) => s.toLowerCase())
          : [];
        const isSuperOrAdmin = roles.some((r) => r.includes('super-admin') || r.includes('admin') || r.includes('administrator'));
        applyMenuVisibility(isSuperOrAdmin);
      } else {
        applyMenuVisibility(true);
      }
    } catch (e) {
      applyMenuVisibility(true);
    }

    // Schedule post-login 2FA checks when admin loads
    setTimeout(() => checkAndPromptPostLogin2FA(clientId), 800);
    setTimeout(() => checkAndPromptPostLogin2FA(clientId), 2000);

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

        // When user data or information is fetched after login, check 2FA status
        if (urlStr.includes('/admin/users/me') || urlStr.includes('/admin/information')) {
          setTimeout(() => checkAndPromptPostLogin2FA(clientId), 600);
        }

        // Intercept /admin/login response to check if 2FA code is needed
        if (urlStr.includes('/admin/login')) {
          try {
            const clonedRes = response.clone();
            const body = await clonedRes.json();

            // Clear session skip flag on fresh login
            sessionStorage.removeItem('strapi_2fa_setup_skipped');

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
                        localStorage.setItem('isLoggedIn', 'true');
                        try {
                          document.cookie = `jwtToken=${encodeURIComponent(token)}; path=/; max-age=2592000; SameSite=Lax`;
                        } catch (e) {}
                        if (user) {
                          localStorage.setItem('userInfo', JSON.stringify(user));
                          sessionStorage.setItem('userInfo', JSON.stringify(user));
                        }
                        localStorage.setItem('strapi_last_active_time', String(Date.now()));
                        sessionStorage.removeItem('strapi_session_timed_out');
                        sessionStorage.removeItem('strapi_2fa_setup_skipped');
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
            } else if (body?.data?.token) {
              // Direct login successful without 2FA challenge (e.g. 2FA is reset or not yet configured)
              const token = body.data.token;
              const user = body.data.user;
              if (token) {
                localStorage.setItem('jwtToken', JSON.stringify(token));
                sessionStorage.setItem('jwtToken', JSON.stringify(token));
                localStorage.setItem('isLoggedIn', 'true');
                try {
                  document.cookie = `jwtToken=${encodeURIComponent(token)}; path=/; max-age=2592000; SameSite=Lax`;
                } catch (e) {}
                if (user) {
                  localStorage.setItem('userInfo', JSON.stringify(user));
                  sessionStorage.setItem('userInfo', JSON.stringify(user));
                }
                localStorage.setItem('strapi_last_active_time', String(Date.now()));
                sessionStorage.removeItem('strapi_session_timed_out');
                sessionStorage.removeItem('strapi_2fa_setup_skipped');
              }
            }
          } catch (e) {}
        }

        return response;
      };
    }
  },
};
