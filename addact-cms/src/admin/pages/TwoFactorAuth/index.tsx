import React, { useState, useEffect, useCallback } from 'react';
import { useFetchClient } from '@strapi/admin/strapi-admin';

interface AdminUserSummary {
  id: number | string;
  name: string;
  email: string;
  username: string;
  isActive: boolean;
  roles: string[];
  is2FAEnabled: boolean;
  recoveryCodesCount: number;
  createdAt: string;
}

interface OverviewStats {
  totalUsers: number;
  enabledCount: number;
  pendingCount: number;
}

// Modern SVG Icons
const ShieldIcon = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ShieldCheckIcon = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const UsersIcon = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClockIcon = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const KeyIcon = ({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-1.5 1.5L16 7l-2-2-4 4a6.5 6.5 0 1 0 8 8l4-4-2-2 1.5-1.5L22 4l-1-2z" />
    <circle cx="7.5" cy="16.5" r="1.5" />
  </svg>
);

const RefreshIcon = ({ size = 15, spinning = false }: { size?: number; spinning?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: 'transform 0.4s ease',
      transform: spinning ? 'rotate(180deg)' : 'none',
    }}
  >
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const SearchIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const AlertTriangleIcon = ({ size = 22, color = '#dc2626' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const DownloadIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CopyIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Helpers
const getInitials = (name?: string, email?: string): string => {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email && email.trim()) {
    return email.slice(0, 2).toUpperCase();
  }
  return 'AD';
};

const getAvatarGradient = (str: string): string => {
  const gradients = [
    'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    'linear-gradient(135deg, #db2777 0%, #e11d48 100%)',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash + str.charCodeAt(i)) % gradients.length;
  }
  return gradients[hash];
};

const TwoFactorAuthDashboard: React.FC = () => {
  const { get, post } = useFetchClient();

  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Management Overview Data
  const [stats, setStats] = useState<OverviewStats>({ totalUsers: 0, enabledCount: 0, pendingCount: 0 });
  const [users, setUsers] = useState<AdminUserSummary[]>([]);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'enabled' | 'pending'>('all');

  // Action Modals State
  const [resetModalUser, setResetModalUser] = useState<AdminUserSummary | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // Regenerated Codes Modal State
  const [regeneratedModal, setRegeneratedModal] = useState<{
    user: AdminUserSummary;
    codes: string[];
    copied: boolean;
  } | null>(null);

  // Confirm Regenerate Confirmation Modal
  const [confirmRegenerateUser, setConfirmRegenerateUser] = useState<AdminUserSummary | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Verify admin privileges
      const statusRes = await get('/api/admin-2fa/status');
      if (statusRes.data) {
        setIsAdmin(Boolean(statusRes.data.isAdmin));
        if (!statusRes.data.isAdmin) {
          setLoading(false);
          return;
        }
      }

      // 2. Fetch centralized overview
      const overviewRes = await get('/api/admin-2fa/users-overview');
      if (overviewRes.data && overviewRes.data.data) {
        setStats(overviewRes.data.data.stats || { totalUsers: 0, enabledCount: 0, pendingCount: 0 });
        setUsers(overviewRes.data.data.users || []);
      }
    } catch (err: any) {
      const status = err?.status || err?.response?.status;
      if (status === 403) {
        setIsAdmin(false);
      } else {
        setError(err?.response?.data?.error?.message || err?.message || 'Failed to load 2FA management data.');
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [get]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  // Handle Admin Reset User 2FA
  const handleExecuteReset = async () => {
    if (!resetModalUser) return;
    setActionLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await post('/api/admin-2fa/admin-reset-user', {
        targetUserId: resetModalUser.id,
      });

      if (res.data && res.data.success) {
        setSuccess(`2FA has been successfully reset for ${resetModalUser.email}. They will be prompted to set up 2FA on their next login.`);
        setResetModalUser(null);
        await fetchData();
      } else {
        setError(res.data?.message || 'Failed to reset 2FA.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || err?.response?.data?.message || 'Failed to reset 2FA for user.');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Admin Regenerate User Recovery Codes
  const handleExecuteRegenerateCodes = async () => {
    if (!confirmRegenerateUser) return;
    setActionLoading(true);
    setError(null);
    setSuccess(null);
    const target = confirmRegenerateUser;
    setConfirmRegenerateUser(null);

    try {
      const res = await post('/api/admin-2fa/admin-regenerate-codes', {
        targetUserId: target.id,
      });

      if (res.data && res.data.success && Array.isArray(res.data.recoveryCodes)) {
        setRegeneratedModal({
          user: target,
          codes: res.data.recoveryCodes,
          copied: false,
        });
        setSuccess(`New emergency recovery codes generated for ${target.email}.`);
        await fetchData();
      } else {
        setError(res.data?.message || 'Failed to regenerate recovery codes.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || err?.response?.data?.message || 'Failed to regenerate recovery codes.');
    } finally {
      setActionLoading(false);
    }
  };

  const downloadRegeneratedCodesTxt = () => {
    if (!regeneratedModal) return;
    const { user, codes } = regeneratedModal;
    const fileContent = `====================================================
ADDACT CMS - EMERGENCY RECOVERY BACKUP CODES
====================================================
User: ${user.name} (${user.email})
Generated by Administrator: ${new Date().toLocaleString()}

IMPORTANT SECURITY INSTRUCTIONS:
- Each recovery code is single-use and will be burned after login.
- Provide these backup codes securely to the user.
- If the user loses their phone, they can use any of these codes to log in.

RECOVERY CODES:
${codes.map((c, i) => `${i + 1}. ${c}`).join('\n')}

====================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-codes-${user.username || 'user'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyRegeneratedCodes = () => {
    if (!regeneratedModal) return;
    navigator.clipboard.writeText(regeneratedModal.codes.join('\n'));
    setRegeneratedModal({ ...regeneratedModal, copied: true });
    setTimeout(() => {
      setRegeneratedModal((prev) => (prev ? { ...prev, copied: false } : null));
    }, 2000);
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.username && u.username.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchSearch) return false;
    if (statusFilter === 'enabled') return u.is2FAEnabled;
    if (statusFilter === 'pending') return !u.is2FAEnabled;
    return true;
  });

  const coveragePct = stats.totalUsers > 0 ? Math.round((stats.enabledCount / stats.totalUsers) * 100) : 0;

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingCardStyle}>
          <div style={spinnerStyle} />
          <div style={{ marginTop: '16px', fontWeight: 600, color: '#334155' }}>
            Loading 2FA security infrastructure...
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
            Synchronizing cryptographic status and access controls
          </div>
        </div>
      </div>
    );
  }

  // Access Denied for Non-Admin roles
  if (!isAdmin) {
    return (
      <div style={containerStyle}>
        <div style={emptyCardStyle}>
          <div style={alertCircleLarge}>
            <AlertTriangleIcon size={32} color="#dc2626" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Access Restricted
          </div>
          <div style={{ color: '#64748b', maxWidth: '440px', lineHeight: '1.6', fontSize: '14px' }}>
            Administrator privileges are strictly required to manage two-factor authentication policies and emergency access credentials.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Modern Top Security Banner & Header */}
      <div style={headerCardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={shieldLogoPill}>
            <ShieldIcon size={26} color="#4f46e5" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={titleStyle}>2FA & Security Center</h1>
              <span style={liveStatusPill}>
                <span style={liveDot} />
                Enforced Policy
              </span>
            </div>
            <p style={subtitleStyle}>
              Audit, enforce, and govern multi-factor authentication across all Strapi administrator accounts
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            style={btnRefreshStyle}
            onClick={handleManualRefresh}
            title="Refresh 2FA status"
          >
            <RefreshIcon size={14} spinning={isRefreshing} />
            <span>Sync Status</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div style={errorBannerStyle}>
          <AlertTriangleIcon size={18} color="#b91c1c" />
          <span style={{ flex: 1, marginLeft: '10px' }}>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            style={closeBannerBtn}
          >
            ✕
          </button>
        </div>
      )}

      {success && (
        <div style={successBannerStyle}>
          <div style={successIconCircle}>
            <CheckIcon size={14} />
          </div>
          <span style={{ flex: 1, marginLeft: '10px' }}>{success}</span>
          <button
            type="button"
            onClick={() => setSuccess(null)}
            style={{ ...closeBannerBtn, color: '#059669' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Modern Metric Cards Grid */}
      <div style={statsGridStyle}>
        {/* Card 1: Total Accounts */}
        <div style={statCardStyle}>
          <div style={statTopRow}>
            <span style={statLabelStyle}>Total Admin Accounts</span>
            <div style={{ ...statIconBadge, background: '#f1f5f9', color: '#475569' }}>
              <UsersIcon size={18} />
            </div>
          </div>
          <div style={statValueStyle}>{stats.totalUsers}</div>
          <div style={statFooterText}>Active administrators in system</div>
        </div>

        {/* Card 2: 2FA Active */}
        <div style={{ ...statCardStyle, borderColor: '#a7f3d0' }}>
          <div style={statTopRow}>
            <span style={{ ...statLabelStyle, color: '#047857' }}>2FA Protected</span>
            <div style={{ ...statIconBadge, background: '#ecfdf5', color: '#059669' }}>
              <ShieldCheckIcon size={18} />
            </div>
          </div>
          <div style={{ ...statValueStyle, color: '#059669' }}>
            {stats.enabledCount}
            <span style={percentPill}>{coveragePct}%</span>
          </div>
          {/* Progress bar visual */}
          <div style={progressTrack}>
            <div style={{ ...progressBar, width: `${coveragePct}%` }} />
          </div>
          <div style={statFooterText}>{coveragePct}% compliance rate</div>
        </div>

        {/* Card 3: Pending Setup */}
        <div style={{ ...statCardStyle, borderColor: stats.pendingCount > 0 ? '#fde68a' : '#e2e8f0' }}>
          <div style={statTopRow}>
            <span style={{ ...statLabelStyle, color: stats.pendingCount > 0 ? '#b45309' : '#64748b' }}>
              Pending Setup
            </span>
            <div style={{ ...statIconBadge, background: stats.pendingCount > 0 ? '#fffbeb' : '#f8fafc', color: stats.pendingCount > 0 ? '#d97706' : '#94a3b8' }}>
              <ClockIcon size={18} />
            </div>
          </div>
          <div style={{ ...statValueStyle, color: stats.pendingCount > 0 ? '#d97706' : '#64748b' }}>
            {stats.pendingCount}
          </div>
          <div style={statFooterText}>Prompted automatically on next login</div>
        </div>

        {/* Card 4: Key Vault Status */}
        <div style={statCardStyle}>
          <div style={statTopRow}>
            <span style={statLabelStyle}>Emergency Key Vault</span>
            <div style={{ ...statIconBadge, background: '#e0e7ff', color: '#4f46e5' }}>
              <KeyIcon size={18} />
            </div>
          </div>
          <div style={{ ...statValueStyle, color: '#4f46e5' }}>Online</div>
          <div style={statFooterText}>8 Single-use recovery backup keys per user</div>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div style={filterCardStyle}>
        <div style={searchWrapper}>
          <span style={searchIconPos}>
            <SearchIcon size={16} />
          </span>
          <input
            type="text"
            placeholder="Search administrators by name, email, or username..."
            style={modernSearchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={clearSearchBtn}
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Filter Segmented Pills */}
        <div style={filterPillsGroup}>
          <button
            type="button"
            style={statusFilter === 'all' ? activeFilterPill : inactiveFilterPill}
            onClick={() => setStatusFilter('all')}
          >
            All Accounts
            <span style={statusFilter === 'all' ? activeFilterCount : inactiveFilterCount}>
              {users.length}
            </span>
          </button>
          <button
            type="button"
            style={statusFilter === 'enabled' ? activeFilterPill : inactiveFilterPill}
            onClick={() => setStatusFilter('enabled')}
          >
            2FA Active
            <span style={statusFilter === 'enabled' ? activeFilterCount : inactiveFilterCount}>
              {stats.enabledCount}
            </span>
          </button>
          <button
            type="button"
            style={statusFilter === 'pending' ? activeFilterPill : inactiveFilterPill}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
            <span style={statusFilter === 'pending' ? activeFilterCount : inactiveFilterCount}>
              {stats.pendingCount}
            </span>
          </button>
        </div>
      </div>

      {/* Modern Users Table */}
      <div style={tableWrapperStyle}>
        {filteredUsers.length === 0 ? (
          <div style={emptyTableStyle}>
            <div style={{ marginBottom: '8px', color: '#94a3b8' }}>
              <SearchIcon size={32} />
            </div>
            <div style={{ fontWeight: 600, color: '#334155', fontSize: '15px' }}>No administrator matches found</div>
            <div style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>
              Try adjusting your search query or status filter.
            </div>
          </div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={theadRowStyle}>
                <th style={{ ...thStyle, width: '32%' }}>Administrator</th>
                <th style={{ ...thStyle, width: '18%' }}>Roles</th>
                <th style={{ ...thStyle, width: '18%' }}>2FA Status</th>
                <th style={{ ...thStyle, width: '16%' }}>Backup Keys</th>
                <th style={{ ...thStyle, width: '16%', textAlign: 'right' }}>Security Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const initials = getInitials(u.name, u.email);
                const avatarBg = getAvatarGradient(u.email || String(u.id));

                return (
                  <tr key={u.id} style={trStyle}>
                    {/* User Info with Avatar */}
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ ...avatarCircle, background: avatarBg }}>
                          {initials}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={userNameStyle}>{u.name || u.username || 'Administrator'}</span>
                            {u.username && <span style={usernameTag}>@{u.username}</span>}
                          </div>
                          <div style={userEmailStyle}>{u.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Roles */}
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {u.roles.map((r, i) => {
                          const isSuper = r.toLowerCase().includes('super');
                          return (
                            <span key={i} style={isSuper ? superRoleBadge : regularRoleBadge}>
                              {r}
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    {/* 2FA Status */}
                    <td style={tdStyle}>
                      {u.is2FAEnabled ? (
                        <span style={statusActiveBadge}>
                          <span style={pulsingGreenDot} />
                          Enforced & Active
                        </span>
                      ) : (
                        <span style={statusPendingBadge}>
                          <span style={pendingAmberDot} />
                          Pending Setup
                        </span>
                      )}
                    </td>

                    {/* Recovery Keys */}
                    <td style={tdStyle}>
                      {u.is2FAEnabled ? (
                        u.recoveryCodesCount > 0 ? (
                          <div style={keyVaultBadge}>
                            <KeyIcon size={12} color="#0369a1" />
                            <span>{u.recoveryCodesCount} / 8 available</span>
                          </div>
                        ) : (
                          <div style={keyVaultExhaustedBadge}>
                            <AlertTriangleIcon size={12} color="#b91c1c" />
                            <span>Exhausted (0/8)</span>
                          </div>
                        )
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '13px' }}>—</span>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px', justifyContent: 'flex-end' }}>
                        {u.is2FAEnabled ? (
                          <>
                            <button
                              type="button"
                              title="Regenerate single-use recovery backup codes"
                              style={btnSecondaryAction}
                              onClick={() => setConfirmRegenerateUser(u)}
                            >
                              <KeyIcon size={13} color="#475569" />
                              <span>Regenerate Keys</span>
                            </button>
                            <button
                              type="button"
                              title="Revoke 2FA key and reset authenticator setup"
                              style={btnDangerAction}
                              onClick={() => setResetModalUser(u)}
                            >
                              <span>Reset 2FA</span>
                            </button>
                          </>
                        ) : (
                          <span style={awaitingBadge}>
                            Awaiting Login
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmation Modal: Reset User 2FA */}
      {resetModalUser && (
        <div style={modalOverlayStyle}>
          <div style={modalCardStyle}>
            <div style={modalIconCircleRed}>
              <AlertTriangleIcon size={26} color="#dc2626" />
            </div>
            <h3 style={modalTitleStyle}>Reset Two-Factor Authentication</h3>
            <p style={modalMessageStyle}>
              Are you sure you want to revoke 2FA for <strong style={{ color: '#0f172a' }}>{resetModalUser.name}</strong> ({resetModalUser.email})?
            </p>
            <div style={modalWarningBox}>
              <div style={{ fontWeight: 600, color: '#991b1b', marginBottom: '4px' }}>Security Impact:</div>
              Their current authenticator key and all backup recovery codes will be permanently invalidated. They will be forced to re-enroll 2FA upon their next login.
            </div>

            <div style={modalActionsStyle}>
              <button
                type="button"
                style={btnCancelModal}
                disabled={actionLoading}
                onClick={() => setResetModalUser(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                style={btnExecuteDanger}
                disabled={actionLoading}
                onClick={handleExecuteReset}
              >
                {actionLoading ? 'Revoking Access...' : 'Yes, Revoke & Reset 2FA'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Regenerate Recovery Codes */}
      {confirmRegenerateUser && (
        <div style={modalOverlayStyle}>
          <div style={modalCardStyle}>
            <div style={modalIconCircleBlue}>
              <KeyIcon size={26} color="#4f46e5" />
            </div>
            <h3 style={modalTitleStyle}>Regenerate Emergency Recovery Keys</h3>
            <p style={modalMessageStyle}>
              Generate a fresh batch of single-use emergency backup keys for <strong style={{ color: '#0f172a' }}>{confirmRegenerateUser.name}</strong> ({confirmRegenerateUser.email}).
            </p>
            <div style={modalInfoBox}>
              All previous backup keys will be immediately revoked. 8 new 8-character codes will be generated for you to transmit to the user securely.
            </div>

            <div style={modalActionsStyle}>
              <button
                type="button"
                style={btnCancelModal}
                disabled={actionLoading}
                onClick={() => setConfirmRegenerateUser(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                style={btnExecutePrimary}
                disabled={actionLoading}
                onClick={handleExecuteRegenerateCodes}
              >
                {actionLoading ? 'Generating Keys...' : 'Generate 8 New Keys'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal: Display Regenerated Codes */}
      {regeneratedModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalCardStyle, maxWidth: '560px' }}>
            <div style={modalIconCircleGreen}>
              <CheckIcon size={26} />
            </div>
            <h3 style={modalTitleStyle}>Emergency Keys Generated</h3>
            <p style={{ ...modalMessageStyle, marginBottom: '14px' }}>
              Backup codes for <strong style={{ color: '#0f172a' }}>{regeneratedModal.user.name}</strong> ({regeneratedModal.user.email}). Each code is single-use and will be burned after login.
            </p>

            {/* Keys Display Grid */}
            <div style={codeBoxGrid}>
              {regeneratedModal.codes.map((c, i) => (
                <div key={i} style={codeItemCard}>
                  <span style={codeNumberBadge}>{i + 1}</span>
                  <code style={codeText}>{c}</code>
                </div>
              ))}
            </div>

            <div style={modalActionsStyle}>
              <button
                type="button"
                style={btnDownloadTxt}
                onClick={downloadRegeneratedCodesTxt}
              >
                <DownloadIcon size={14} />
                <span>Download (.txt)</span>
              </button>
              <button
                type="button"
                style={regeneratedModal.copied ? btnCopiedDone : btnCopyAll}
                onClick={copyRegeneratedCodes}
              >
                {regeneratedModal.copied ? (
                  <>
                    <CheckIcon size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon size={14} />
                    <span>Copy All</span>
                  </>
                )}
              </button>
              <button
                type="button"
                style={btnDoneModal}
                onClick={() => setRegeneratedModal(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// Modern, Sleek, Enterprise Styles
// ==========================================

const containerStyle: React.CSSProperties = {
  padding: '32px 40px',
  backgroundColor: '#f8fafc',
  minHeight: '100vh',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  color: '#0f172a',
  boxSizing: 'border-box',
};

const headerCardStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  padding: '24px 28px',
  borderRadius: '16px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
  marginBottom: '24px',
};

const shieldLogoPill: React.CSSProperties = {
  width: '52px',
  height: '52px',
  borderRadius: '14px',
  background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
  border: '1px solid #c7d2fe',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 800,
  color: '#0f172a',
  margin: 0,
  letterSpacing: '-0.02em',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '13.5px',
  color: '#64748b',
  margin: '4px 0 0 0',
  lineHeight: 1.5,
};

const liveStatusPill: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: '#ecfdf5',
  border: '1px solid #a7f3d0',
  color: '#065f46',
  padding: '3px 10px',
  borderRadius: '9999px',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
};

const liveDot: React.CSSProperties = {
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: '#10b981',
  boxShadow: '0 0 6px rgba(16, 185, 129, 0.7)',
};

const btnRefreshStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#ffffff',
  border: '1px solid #cbd5e1',
  borderRadius: '10px',
  padding: '9px 16px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#334155',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
  gap: '16px',
  marginBottom: '24px',
};

const statCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '20px 22px',
  borderRadius: '16px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.03)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const statTopRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const statLabelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const statIconBadge: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const statValueStyle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: 800,
  color: '#0f172a',
  letterSpacing: '-0.02em',
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
};

const percentPill: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  backgroundColor: '#dcfce7',
  color: '#15803d',
  padding: '2px 8px',
  borderRadius: '9999px',
};

const progressTrack: React.CSSProperties = {
  width: '100%',
  height: '6px',
  backgroundColor: '#f1f5f9',
  borderRadius: '9999px',
  margin: '10px 0 6px 0',
  overflow: 'hidden',
};

const progressBar: React.CSSProperties = {
  height: '100%',
  background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
  borderRadius: '9999px',
  transition: 'width 0.4s ease',
};

const statFooterText: React.CSSProperties = {
  fontSize: '12.5px',
  color: '#64748b',
};

const filterCardStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#ffffff',
  padding: '16px 20px',
  borderRadius: '14px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
  marginBottom: '20px',
};

const searchWrapper: React.CSSProperties = {
  position: 'relative',
  flex: '1 1 320px',
  maxWidth: '460px',
};

const searchIconPos: React.CSSProperties = {
  position: 'absolute',
  left: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#94a3b8',
  pointerEvents: 'none',
  display: 'flex',
};

const modernSearchInput: React.CSSProperties = {
  width: '100%',
  padding: '10px 36px 10px 40px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  backgroundColor: '#f8fafc',
  fontSize: '13.5px',
  color: '#0f172a',
  outline: 'none',
  boxSizing: 'border-box',
};

const clearSearchBtn: React.CSSProperties = {
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'transparent',
  border: 'none',
  color: '#94a3b8',
  cursor: 'pointer',
  fontSize: '12px',
};

const filterPillsGroup: React.CSSProperties = {
  display: 'inline-flex',
  gap: '6px',
  background: '#f1f5f9',
  padding: '4px',
  borderRadius: '10px',
};

const activeFilterPill: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '7px 14px',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  color: '#0f172a',
  fontWeight: 700,
  fontSize: '12.5px',
  border: 'none',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  cursor: 'pointer',
};

const inactiveFilterPill: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '7px 14px',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  color: '#64748b',
  fontWeight: 600,
  fontSize: '12.5px',
  border: 'none',
  cursor: 'pointer',
};

const activeFilterCount: React.CSSProperties = {
  backgroundColor: '#eef2ff',
  color: '#4f46e5',
  fontSize: '11px',
  fontWeight: 700,
  padding: '1px 7px',
  borderRadius: '9999px',
};

const inactiveFilterCount: React.CSSProperties = {
  backgroundColor: '#e2e8f0',
  color: '#64748b',
  fontSize: '11px',
  fontWeight: 700,
  padding: '1px 7px',
  borderRadius: '9999px',
};

const errorBannerStyle: React.CSSProperties = {
  backgroundColor: '#fef2f2',
  color: '#991b1b',
  border: '1px solid #fecaca',
  padding: '12px 18px',
  borderRadius: '12px',
  marginBottom: '20px',
  fontSize: '13.5px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
};

const successBannerStyle: React.CSSProperties = {
  backgroundColor: '#f0fdf4',
  color: '#166534',
  border: '1px solid #bbf7d0',
  padding: '12px 18px',
  borderRadius: '12px',
  marginBottom: '20px',
  fontSize: '13.5px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
};

const successIconCircle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#22c55e',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const closeBannerBtn: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '#991b1b',
  fontWeight: 'bold',
  fontSize: '14px',
};

const tableWrapperStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.03)',
  overflow: 'hidden',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
};

const theadRowStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  borderBottom: '1px solid #e2e8f0',
};

const thStyle: React.CSSProperties = {
  padding: '14px 20px',
  fontSize: '11.5px',
  fontWeight: 700,
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const trStyle: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
  transition: 'background-color 0.15s ease',
};

const tdStyle: React.CSSProperties = {
  padding: '16px 20px',
  fontSize: '13.5px',
  color: '#0f172a',
  verticalAlign: 'middle',
};

const avatarCircle: React.CSSProperties = {
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.5px',
  flexShrink: 0,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const userNameStyle: React.CSSProperties = {
  fontWeight: 700,
  color: '#0f172a',
  fontSize: '14px',
};

const usernameTag: React.CSSProperties = {
  fontSize: '11.5px',
  color: '#64748b',
  fontWeight: 500,
};

const userEmailStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  marginTop: '2px',
};

const superRoleBadge: React.CSSProperties = {
  backgroundColor: '#ede9fe',
  color: '#6d28d9',
  fontSize: '11.5px',
  fontWeight: 700,
  padding: '3px 9px',
  borderRadius: '6px',
  border: '1px solid #ddd6fe',
};

const regularRoleBadge: React.CSSProperties = {
  backgroundColor: '#f1f5f9',
  color: '#475569',
  fontSize: '11.5px',
  fontWeight: 600,
  padding: '3px 9px',
  borderRadius: '6px',
  border: '1px solid #e2e8f0',
};

const statusActiveBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  backgroundColor: '#ecfdf5',
  border: '1px solid #a7f3d0',
  color: '#065f46',
  padding: '5px 12px',
  borderRadius: '9999px',
  fontSize: '12px',
  fontWeight: 700,
};

const pulsingGreenDot: React.CSSProperties = {
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  backgroundColor: '#10b981',
  boxShadow: '0 0 6px rgba(16, 185, 129, 0.7)',
};

const statusPendingBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  backgroundColor: '#fffbeb',
  border: '1px solid #fde68a',
  color: '#92400e',
  padding: '5px 12px',
  borderRadius: '9999px',
  fontSize: '12px',
  fontWeight: 700,
};

const pendingAmberDot: React.CSSProperties = {
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  backgroundColor: '#f59e0b',
};

const keyVaultBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  color: '#0369a1',
  padding: '4px 10px',
  borderRadius: '8px',
  fontSize: '12px',
  fontWeight: 600,
};

const keyVaultExhaustedBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  color: '#b91c1c',
  padding: '4px 10px',
  borderRadius: '8px',
  fontSize: '12px',
  fontWeight: 700,
};

const awaitingBadge: React.CSSProperties = {
  fontSize: '12px',
  color: '#94a3b8',
  fontStyle: 'italic',
};

const btnSecondaryAction: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: '#ffffff',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  padding: '6px 12px',
  fontSize: '12.5px',
  fontWeight: 600,
  color: '#334155',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const btnDangerAction: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
  padding: '6px 12px',
  fontSize: '12.5px',
  fontWeight: 600,
  color: '#dc2626',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const emptyTableStyle: React.CSSProperties = {
  padding: '60px 20px',
  textAlign: 'center',
};

const loadingCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '60px 40px',
  borderRadius: '16px',
  textAlign: 'center',
  maxWidth: '480px',
  margin: '80px auto',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
};

const spinnerStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  border: '3px solid #e2e8f0',
  borderTopColor: '#4f46e5',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
  margin: '0 auto',
};

const emptyCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '60px 40px',
  borderRadius: '16px',
  textAlign: 'center',
  maxWidth: '480px',
  margin: '80px auto',
  border: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const alertCircleLarge: React.CSSProperties = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
};

// Modal Styles
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.65)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 99999,
  padding: '20px',
  boxSizing: 'border-box',
};

const modalCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  padding: '32px 36px',
  maxWidth: '480px',
  width: '100%',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  border: '1px solid #e2e8f0',
  textAlign: 'center',
  boxSizing: 'border-box',
};

const modalIconCircleRed: React.CSSProperties = {
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px auto',
};

const modalIconCircleBlue: React.CSSProperties = {
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  backgroundColor: '#eef2ff',
  border: '1px solid #c7d2fe',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px auto',
};

const modalIconCircleGreen: React.CSSProperties = {
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  backgroundColor: '#ecfdf5',
  border: '1px solid #a7f3d0',
  color: '#059669',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px auto',
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 800,
  color: '#0f172a',
  margin: '0 0 10px 0',
  letterSpacing: '-0.02em',
};

const modalMessageStyle: React.CSSProperties = {
  fontSize: '13.5px',
  color: '#64748b',
  lineHeight: '1.6',
  margin: '0 0 18px 0',
};

const modalWarningBox: React.CSSProperties = {
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '10px',
  padding: '12px 14px',
  fontSize: '12.5px',
  color: '#b91c1c',
  textAlign: 'left',
  lineHeight: '1.5',
  marginBottom: '24px',
};

const modalInfoBox: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  padding: '12px 14px',
  fontSize: '12.5px',
  color: '#475569',
  textAlign: 'left',
  lineHeight: '1.5',
  marginBottom: '24px',
};

const modalActionsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
};

const btnCancelModal: React.CSSProperties = {
  padding: '10px 18px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  backgroundColor: '#ffffff',
  color: '#475569',
  fontWeight: 600,
  fontSize: '13.5px',
  cursor: 'pointer',
};

const btnExecuteDanger: React.CSSProperties = {
  padding: '10px 18px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#dc2626',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '13.5px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)',
};

const btnExecutePrimary: React.CSSProperties = {
  padding: '10px 18px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#4f46e5',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '13.5px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)',
};

const codeBoxGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '14px',
  marginBottom: '22px',
};

const codeItemCard: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  padding: '8px 12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const codeNumberBadge: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  color: '#94a3b8',
};

const codeText: React.CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: '13.5px',
  fontWeight: 800,
  color: '#0f172a',
  letterSpacing: '1px',
};

const btnDownloadTxt: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '10px 16px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  backgroundColor: '#ffffff',
  color: '#334155',
  fontWeight: 600,
  fontSize: '13px',
  cursor: 'pointer',
};

const btnCopyAll: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '10px 16px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  backgroundColor: '#ffffff',
  color: '#334155',
  fontWeight: 600,
  fontSize: '13px',
  cursor: 'pointer',
};

const btnCopiedDone: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '10px 16px',
  borderRadius: '10px',
  border: '1px solid #86efac',
  backgroundColor: '#f0fdf4',
  color: '#16a34a',
  fontWeight: 700,
  fontSize: '13px',
  cursor: 'pointer',
};

const btnDoneModal: React.CSSProperties = {
  padding: '10px 22px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#4f46e5',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '13.5px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.25)',
};

export default TwoFactorAuthDashboard;
