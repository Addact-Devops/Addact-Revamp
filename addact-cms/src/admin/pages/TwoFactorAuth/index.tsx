import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/admin/strapi-admin';

const TwoFactorAuthPage: React.FC = () => {
  const { get, post } = useFetchClient();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [setupData, setSetupData] = useState<{ qrCode: string; secret: string } | null>(null);
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [showRecoveryCodes, setShowRecoveryCodes] = useState<boolean>(false);
  const [copiedCodes, setCopiedCodes] = useState<boolean>(false);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await get('/api/admin-2fa/status');
      if (res.data) {
        setIsEnabled(Boolean(res.data.isEnabled));
        setUserEmail(res.data.email || '');
        if (Array.isArray(res.data.recoveryCodes)) {
          setRecoveryCodes(res.data.recoveryCodes);
        }
      } else {
        setError('Failed to load 2FA status.');
      }
    } catch (err: any) {
      setError('Network error fetching 2FA status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleStartSetup = async () => {
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      const res = await post('/api/admin-2fa/setup', {});
      if (res.data && res.data.qrCode) {
        setSetupData({ qrCode: res.data.qrCode, secret: res.data.secret });
      } else {
        setError('Failed to start 2FA setup.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Failed to connect to server for 2FA setup.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEnable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.trim().length !== 6) {
      setError('Please enter a valid 6-digit verification code.');
      return;
    }
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      const res = await post('/api/admin-2fa/enable', {
        token: code.trim(),
        secret: setupData?.secret,
      });

      if (res.data && res.data.success) {
        setSuccess('2-Factor Authentication is now active! Your account is fully protected.');
        setIsEnabled(true);
        if (Array.isArray(res.data.recoveryCodes)) {
          setRecoveryCodes(res.data.recoveryCodes);
        }
        setSetupData(null);
        setCode('');
      } else {
        setError(res.data?.message || 'Invalid 6-digit code. Please check your Authenticator app.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || err?.response?.data?.message || 'Invalid 6-digit code. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDisable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.trim().length < 6) {
      setError('Please enter a verification code to confirm disabling 2FA.');
      return;
    }
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      const res = await post('/api/admin-2fa/disable', {
        token: code.trim(),
      });

      if (res.data && res.data.success) {
        setSuccess('2-Factor Authentication has been disabled for your account.');
        setIsEnabled(false);
        setRecoveryCodes([]);
        setCode('');
      } else {
        setError(res.data?.message || 'Invalid code. Could not disable 2FA.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Invalid code. Could not disable 2FA.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopySecret = () => {
    if (setupData?.secret) {
      navigator.clipboard.writeText(setupData.secret);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const downloadRecoveryCodes = () => {
    if (!recoveryCodes || recoveryCodes.length === 0) return;
    const fileContent = `====================================================
ADDACT CMS - EMERGENCY RECOVERY BACKUP CODES
====================================================
Protected Email: ${userEmail || 'Admin User'}
Date Downloaded: ${new Date().toLocaleString()}

IMPORTANT SECURITY NOTICE:
- Keep these codes in a secure and confidential place.
- Each code can ONLY be used ONCE to log into Strapi Admin if you lose access to your phone/authenticator app.

RECOVERY CODES:
${recoveryCodes.map((c, i) => `${i + 1}. ${c}`).join('\n')}

====================================================`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `addact-cms-2fa-backup-codes.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyRecoveryCodes = () => {
    if (!recoveryCodes || recoveryCodes.length === 0) return;
    navigator.clipboard.writeText(recoveryCodes.join('\n'));
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
  };

  const handleRegenerateCodes = async () => {
    if (!window.confirm('Generating new recovery codes will invalidate all existing backup codes. Continue?')) {
      return;
    }
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      const res = await post('/api/admin-2fa/regenerate-codes', {});
      if (res.data && res.data.recoveryCodes) {
        setRecoveryCodes(res.data.recoveryCodes);
        setSuccess('Successfully generated new emergency recovery codes!');
        setShowRecoveryCodes(true);
      } else {
        setError('Failed to regenerate recovery codes.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Failed to regenerate recovery codes.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #4945ff',
          borderRadius: '50%',
          margin: '0 auto 16px auto',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#64748b', fontSize: '15px', fontWeight: 500 }}>Loading 2FA security settings...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      padding: '40px 24px',
      maxWidth: '840px',
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#0f172a',
      lineHeight: 1.5,
    }}>
      {/* Header Banner Card */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        borderRadius: '20px',
        padding: '32px 36px',
        color: '#ffffff',
        boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.15), 0 10px 10px -5px rgba(15, 23, 42, 0.04)',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '32px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        {/* Decorative Background Blur */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          background: 'rgba(99, 102, 241, 0.25)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            }}>
              🔑
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                Two-Factor Authentication
              </h1>
              <p style={{ margin: '6px 0 0 0', color: '#cbd5e1', fontSize: '14px', fontWeight: 400 }}>
                Secure your Strapi Admin account with standard TOTP Google Authenticator or Authy.
              </p>
            </div>
          </div>

          <div>
            {isEnabled ? (
              <div style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                color: '#4ade80',
                padding: '8px 16px',
                borderRadius: '30px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(8px)',
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                2FA Active
              </div>
            ) : (
              <div style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#fbbf24',
                padding: '8px 16px',
                borderRadius: '30px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(8px)',
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24' }} />
                Not Enabled
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alert Notifications */}
      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#991b1b',
          padding: '16px 20px',
          borderRadius: '14px',
          marginBottom: '24px',
          fontSize: '14px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.05)'
        }}>
          <span style={{ fontSize: '18px' }}>⚠️</span>
          <div style={{ flex: 1 }}>{error}</div>
        </div>
      )}

      {success && (
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          color: '#166534',
          padding: '16px 20px',
          borderRadius: '14px',
          marginBottom: '24px',
          fontSize: '14px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.05)'
        }}>
          <span style={{ fontSize: '18px' }}>✅</span>
          <div style={{ flex: 1 }}>{success}</div>
        </div>
      )}

      {/* Main Body */}
      {isEnabled ? (
        /* Enabled State UI */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Account Protection Status */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
              Account Protection Status
            </h3>
            <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '14px' }}>
              Your account is currently protected by TOTP two-factor authentication. Every login attempt will require your 6-digit code or a single-use emergency recovery code.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}>
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Protected Email</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>{userEmail || 'Admin User'}</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Security Standard</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>RFC 6238 TOTP (30s Window)</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Compatible Apps</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>Google, Authy, Microsoft</div>
              </div>
            </div>
          </div>

          {/* Emergency Backup Recovery Codes Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                  🛡️ Emergency Recovery Backup Codes
                </h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                  If you lose your phone or access to your Authenticator app, use these single-use codes to log in.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setShowRecoveryCodes(!showRecoveryCodes)}
                  style={{
                    padding: '8px 16px',
                    background: showRecoveryCodes ? '#e2e8f0' : '#4945ff',
                    color: showRecoveryCodes ? '#1e293b' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {showRecoveryCodes ? '🙈 Hide Codes' : '👁️ Show Recovery Codes'}
                </button>

                <button
                  type="button"
                  onClick={downloadRecoveryCodes}
                  disabled={recoveryCodes.length === 0}
                  style={{
                    padding: '8px 16px',
                    background: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: recoveryCodes.length === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  📥 Download (.txt)
                </button>

                <button
                  type="button"
                  onClick={copyRecoveryCodes}
                  disabled={recoveryCodes.length === 0}
                  style={{
                    padding: '8px 16px',
                    background: copiedCodes ? '#22c55e' : '#475569',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: recoveryCodes.length === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {copiedCodes ? '✓ Copied!' : '📋 Copy All'}
                </button>

                <button
                  type="button"
                  onClick={handleRegenerateCodes}
                  disabled={submitting}
                  style={{
                    padding: '8px 16px',
                    background: '#f1f5f9',
                    color: '#334155',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  🔄 Regenerate
                </button>
              </div>
            </div>

            {/* Codes Grid / Masked View */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '24px',
              marginTop: '16px',
            }}>
              {!showRecoveryCodes ? (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔒</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Backup codes are hidden for security
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    Click "👁️ Show Recovery Codes" above to view or copy your 8 emergency codes.
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                    gap: '12px',
                  }}>
                    {recoveryCodes.map((c, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          fontFamily: 'monospace',
                          fontSize: '16px',
                          fontWeight: 700,
                          letterSpacing: '2px',
                          color: '#0f172a',
                          textAlign: 'center',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                  <p style={{ margin: '16px 0 0 0', fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
                    * Each code can be used ONCE. After logging in with a code, it will be automatically burned.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Disable 2FA Danger Section */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          }}>
            <div style={{
              background: '#fff5f5',
              borderRadius: '14px',
              padding: '24px',
              border: '1px solid #fed7d7'
            }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: '#9b2c2c' }}>
                Disable 2-Factor Authentication
              </h4>
              <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#742a2a' }}>
                To turn off 2FA, enter your current 6-digit code or an emergency recovery code:
              </p>

              <form onSubmit={handleDisable} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  maxLength={12}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="00000"
                  style={{
                    width: '200px',
                    textAlign: 'center',
                    letterSpacing: '3px',
                    fontSize: '16px',
                    fontWeight: 800,
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '2px solid #feb2b2',
                    outline: 'none',
                    background: '#ffffff',
                    color: '#1e293b',
                    textTransform: 'uppercase',
                  }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '12px 24px',
                    background: '#e53e3e',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(229, 62, 62, 0.25)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {submitting ? 'Disabling...' : 'Disable 2FA'}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* Disabled / Setup Flow UI */
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '36px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        }}>
          {!setupData ? (
            /* Intro / Start Setup Screen */
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                background: '#e0e7ff',
                color: '#4945ff',
                fontSize: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                boxShadow: '0 10px 20px rgba(73, 69, 255, 0.15)'
              }}>
                🛡️
              </div>

              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>
                Add an Extra Layer of Security
              </h2>
              <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '520px', margin: '0 auto 32px auto', lineHeight: 1.6 }}>
                Two-factor authentication adds a second layer of defense to your Strapi Admin account. You will scan a QR code using an app on your phone (Google Authenticator, Authy, or Microsoft Authenticator).
              </p>

              <button
                onClick={handleStartSetup}
                disabled={submitting}
                style={{
                  padding: '16px 36px',
                  background: 'linear-gradient(135deg, #4945ff 0%, #3730a3 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 10px 20px rgba(73, 69, 255, 0.3)',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.01em',
                }}
              >
                {submitting ? 'Generating Setup QR Code...' : 'Setup 2-Factor Authentication →'}
              </button>
            </div>
          ) : (
            /* Active Setup Step-by-Step Screen */
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 24px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                Set Up Authenticator App
              </h2>

              {/* Step 1 */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{
                    background: '#4945ff',
                    color: '#ffffff',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    fontSize: '14px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>1</span>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>
                    Scan QR Code in your Mobile App
                  </h3>
                </div>
                <p style={{ margin: '0 0 20px 36px', fontSize: '14px', color: '#64748b' }}>
                  Open Google Authenticator, Authy, or Microsoft Authenticator on your smartphone and scan the QR code below:
                </p>

                <div style={{
                  marginLeft: '36px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '32px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    background: '#ffffff',
                    padding: '12px',
                    borderRadius: '14px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #cbd5e1'
                  }}>
                    <img
                      src={setupData.qrCode}
                      alt="2FA Setup QR Code"
                      style={{ width: '180px', height: '180px', display: 'block' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Can't scan the QR code?
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 12px 0' }}>
                      Enter this manual secret key into your authenticator app:
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <code style={{
                        background: '#e2e8f0',
                        color: '#0f172a',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '15px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        flex: 1,
                        overflowX: 'auto'
                      }}>
                        {setupData.secret}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopySecret}
                        style={{
                          padding: '8px 14px',
                          background: copiedKey ? '#22c55e' : '#475569',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {copiedKey ? '✓ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{
                    background: '#4945ff',
                    color: '#ffffff',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    fontSize: '14px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>2</span>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>
                    Enter 6-Digit Code to Activate 2FA
                  </h3>
                </div>
                <p style={{ margin: '0 0 20px 36px', fontSize: '14px', color: '#64748b' }}>
                  Enter the 6-digit verification code generated by your app to complete setup:
                </p>

                <form onSubmit={handleEnable} style={{ marginLeft: '36px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="000000"
                      style={{
                        width: '200px',
                        textAlign: 'center',
                        letterSpacing: '8px',
                        fontSize: '24px',
                        fontWeight: 800,
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '2px solid #4945ff',
                        outline: 'none',
                        background: '#ffffff',
                        color: '#0f172a',
                        boxShadow: '0 0 0 4px rgba(73, 69, 255, 0.1)',
                      }}
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        padding: '14px 28px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: 700,
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        boxShadow: '0 6px 16px rgba(34, 197, 94, 0.3)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {submitting ? 'Verifying...' : 'Verify & Enable 2FA →'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuthPage;
