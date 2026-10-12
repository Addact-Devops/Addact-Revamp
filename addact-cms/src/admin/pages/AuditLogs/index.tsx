import React, { useState, useEffect, useCallback } from 'react';
import { useFetchClient } from '@strapi/admin/strapi-admin';

interface AuditLog {
  id: number | string;
  targetDocumentId: string;
  userName: string;
  userEmail: string;
  action: 'Create' | 'Update' | 'Delete' | 'Publish' | 'Unpublish' | 'Login' | 'Logout';
  contentType: string;
  updatedFields: string[] | null;
  ipAddress: string;
  clientId?: string;
  location?: string;
  browser: string;
  os: string;
  deviceType: string;
  systemUser?: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isDanger = true,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContainerStyle}>
        <h3 style={modalTitleStyle}>{title}</h3>
        <p style={modalMessageStyle}>{message}</p>
        <div style={modalActionsStyle}>
          <button style={btnCancelStyle} onClick={onCancel}>
            {cancelText}
          </button>
          <button
            style={isDanger ? btnDangerStyle : btnPrimaryStyle}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const TrashIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const AuditLogsPage: React.FC = () => {
  const { get, del } = useFetchClient();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 20, pageCount: 1, total: 0 });
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [contentTypeFilter, setContentTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const fetchContentTypes = useCallback(async () => {
    try {
      const res = await get('/api/audit-logs/content-types');
      if (res.data?.data) {
        setContentTypes(res.data.data);
      }
    } catch (e) {
      console.error('Failed to fetch content types', e);
    }
  }, [get]);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('pageSize', '20');

      if (actionFilter !== 'all') queryParams.append('action', actionFilter);
      if (contentTypeFilter !== 'all') queryParams.append('contentType', contentTypeFilter);
      if (searchTerm.trim()) queryParams.append('search', searchTerm.trim());
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);

      const res = await get(`/api/audit-logs/logs?${queryParams.toString()}`);
      if (res.data) {
        setLogs(res.data.data || []);
        if (res.data.pagination) {
          setPagination(res.data.pagination);
        }
      }
    } catch (err: any) {
      console.error('AuditLogs fetch error:', err);
      const status = err?.status || err?.response?.status;
      if (status === 403) {
        setError('Access Denied: You do not have permission to view Audit Logs.');
      } else {
        setError('Failed to load audit logs. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [get, page, actionFilter, contentTypeFilter, searchTerm, startDate, endDate]);

  useEffect(() => {
    fetchContentTypes();
  }, [fetchContentTypes]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Single Delete Confirmation
  const handleDeleteLog = (log: AuditLog) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Audit Log',
      message: `Are you sure you want to delete log #${log.id} (${log.action} on ${log.contentType})? This action cannot be undone.`,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          await del(`/api/audit-logs/logs/${log.id}`);
          fetchLogs();
        } catch (e) {
          alert('Failed to delete log.');
        }
      },
    });
  };

  // Delete All Confirmation
  const handleDeleteAll = () => {
    const isFiltered = actionFilter !== 'all' || contentTypeFilter !== 'all' || startDate || endDate;
    const confirmMessage = isFiltered
      ? 'Are you sure you want to delete all audit logs matching current filter criteria? This action cannot be undone.'
      : 'Are you sure you want to delete ALL audit logs from the database? This action cannot be undone.';

    setConfirmModal({
      isOpen: true,
      title: isFiltered ? 'Delete Filtered Audit Logs' : 'Delete All Audit Logs',
      message: confirmMessage,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          const queryParams = new URLSearchParams();
          if (actionFilter !== 'all') queryParams.append('action', actionFilter);
          if (contentTypeFilter !== 'all') queryParams.append('contentType', contentTypeFilter);
          if (startDate) queryParams.append('startDate', startDate);
          if (endDate) queryParams.append('endDate', endDate);

          await del(`/api/audit-logs/logs?${queryParams.toString()}`);
          setPage(1);
          fetchLogs();
        } catch (e) {
          alert('Failed to delete logs.');
        }
      },
    });
  };

  const handleExport = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (actionFilter !== 'all') queryParams.append('action', actionFilter);
      if (contentTypeFilter !== 'all') queryParams.append('contentType', contentTypeFilter);
      if (searchTerm.trim()) queryParams.append('search', searchTerm.trim());
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);

      const res = await get(`/api/audit-logs/export?${queryParams.toString()}`);
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(res.data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `audit-logs-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      alert('Failed to export logs.');
    }
  };

  const getActionBadgeStyle = (action: string) => {
    switch (action) {
      case 'Create':
        return badgeCreateStyle;
      case 'Update':
        return badgeUpdateStyle;
      case 'Delete':
        return badgeDeleteStyle;
      case 'Publish':
        return badgePublishStyle;
      case 'Unpublish':
        return badgeUnpublishStyle;
      case 'Login':
      case 'Logout':
        return badgeAuthStyle;
      default:
        return badgeDefaultStyle;
    }
  };

  if (error && error.includes('Access Denied')) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#32324d', margin: '0 0 12px 0' }}>Access Denied</h2>
          <p style={{ fontSize: '14px', color: '#666687', maxWidth: '440px', margin: '0 auto', lineHeight: '1.5' }}>
            You do not have permission to view Audit Logs. This section is strictly restricted to Super Admin and Admin users.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Audit Logs</h1>
          <p style={subtitleStyle}>Track and monitor administrative actions and system modifications</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={btnExportStyle} onClick={handleExport}>
            📥 Export JSON
          </button>
          <button style={btnDeleteAllStyle} onClick={handleDeleteAll}>
            <TrashIcon /> Delete All Logs
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={filterContainerStyle}>
        <div style={filterGroupStyle}>
          <label style={labelStyle}>Action</label>
          <select style={selectStyle} value={actionFilter} onChange={(e) => { setActionFilter(e.target.value); setPage(1); }}>
            <option value="all">All Actions</option>
            <option value="Create">Create</option>
            <option value="Update">Update</option>
            <option value="Delete">Delete</option>
            <option value="Publish">Publish</option>
            <option value="Unpublish">Unpublish</option>
            <option value="Login">Login</option>
            <option value="Logout">Logout</option>
          </select>
        </div>

        <div style={filterGroupStyle}>
          <label style={labelStyle}>Search</label>
          <input
            type="text"
            placeholder="User, Doc ID, Content..."
            style={inputStyle}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          />
        </div>

        <div style={filterGroupStyle}>
          <label style={labelStyle}>Start Date</label>
          <input
            type="date"
            style={inputStyle}
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
          />
        </div>

        <div style={filterGroupStyle}>
          <label style={labelStyle}>End Date</label>
          <input
            type="date"
            style={inputStyle}
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <div style={errorBannerStyle}>{error}</div>}

      {/* Table Container */}
      <div style={tableWrapperStyle}>
        {loading ? (
          <div style={loadingStyle}>Loading audit logs...</div>
        ) : logs.length === 0 ? (
          <div style={emptyStyle}>No audit logs found matching your criteria.</div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={theadRowStyle}>
                <th style={thStyle}>Date & Time</th>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Action</th>
                <th style={thStyle}>Content Type</th>
                <th style={thStyle}>Doc ID</th>
                <th style={thStyle}>Details / Changes</th>
                <th style={thStyle}>IP Address</th>
                <th style={thStyle}>System / Device</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={trStyle}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 500 }}>
                      {new Date(log.createdAt).toLocaleDateString()}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666687' }}>
                      {new Date(log.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600, color: '#32324d' }}>{log.userName || 'Unknown'}</div>
                    <div style={{ fontSize: '11px', color: '#666687' }}>{log.userEmail || 'N/A'}</div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ ...badgeStyle, ...getActionBadgeStyle(log.action) }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <code style={codeStyle}>{log.contentType || 'N/A'}</code>
                  </td>
                  <td style={tdStyle}>
                    {log.targetDocumentId ? (
                      <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#4945ff' }}>
                        {log.targetDocumentId}
                      </span>
                    ) : (
                      <span style={{ color: '#8e8ea9' }}>—</span>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {log.updatedFields && log.updatedFields.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {log.updatedFields.map((field) => (
                          <span
                            key={field}
                            style={
                              log.action === 'Delete'
                                ? {
                                    backgroundColor: '#fef3f2',
                                    color: '#b42318',
                                    border: '1px solid #fecdca',
                                    fontSize: '11px',
                                    padding: '2px 6px',
                                    borderRadius: '3px',
                                    fontFamily: 'monospace',
                                  }
                                : fieldChipStyle
                            }
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: '#8e8ea9' }}>—</span>
                    )}
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>{log.ipAddress || '—'}</div>
                    {log.location && (
                      <div style={{ fontSize: '11px', color: '#271fe0', marginTop: '2px', fontWeight: 600 }}>
                        📍 {log.location}
                      </div>
                    )}
                    {log.clientId && (
                      <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#4945ff', marginTop: '2px', wordBreak: 'break-all' }} title={`Persistent Client ID: ${log.clientId}`}>
                        🆔 {log.clientId}
                      </div>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {log.systemUser && (
                      <div style={{ fontWeight: 600, color: '#271fe0', fontSize: '12px' }}>
                        👤 {log.systemUser}
                      </div>
                    )}
                    <div style={{ fontSize: '11px', color: '#666687' }}>
                      {log.os || 'Unknown OS'} · {log.browser || 'Unknown Browser'}
                    </div>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button
                      title="Delete log entry"
                      style={btnRowDeleteStyle}
                      onClick={() => handleDeleteLog(log)}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      {pagination.pageCount > 1 && (
        <div style={paginationStyle}>
          <button
            style={btnPageStyle}
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span style={{ fontSize: '13px', color: '#4945ff', fontWeight: 600 }}>
            Page {pagination.page} of {pagination.pageCount} ({pagination.total} total logs)
          </span>
          <button
            style={btnPageStyle}
            disabled={page >= pagination.pageCount}
            onClick={() => setPage((p) => Math.min(pagination.pageCount, p + 1))}
          >
            Next
          </button>
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

// Inline Styles for Strapi Admin design compliance
const containerStyle: React.CSSProperties = {
  padding: '32px 56px',
  backgroundColor: '#f6f6f9',
  minHeight: '100vh',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: 700,
  color: '#32324d',
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#666687',
  marginTop: '4px',
};

const btnExportStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #dcdce4',
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#32324d',
  cursor: 'pointer',
};

const btnDeleteAllStyle: React.CSSProperties = {
  backgroundColor: '#d92d20',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#ffffff',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
};

const filterContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '4px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  marginBottom: '24px',
};

const filterGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  flex: '1 1 180px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: '#32324d',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const selectStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '4px',
  border: '1px solid #dcdce4',
  backgroundColor: '#ffffff',
  fontSize: '14px',
  color: '#32324d',
  outline: 'none',
};

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '4px',
  border: '1px solid #dcdce4',
  fontSize: '14px',
  color: '#32324d',
  outline: 'none',
};

const errorBannerStyle: React.CSSProperties = {
  backgroundColor: '#fcebea',
  color: '#b00020',
  padding: '12px 16px',
  borderRadius: '4px',
  marginBottom: '20px',
  fontSize: '14px',
};

const tableWrapperStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  overflowX: 'auto',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
};

const theadRowStyle: React.CSSProperties = {
  backgroundColor: '#f6f6f9',
  borderBottom: '1px solid #eaeaef',
};

const thStyle: React.CSSProperties = {
  padding: '14px 16px',
  fontSize: '11px',
  fontWeight: 700,
  color: '#666687',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const trStyle: React.CSSProperties = {
  borderBottom: '1px solid #eaeaef',
};

const tdStyle: React.CSSProperties = {
  padding: '14px 16px',
  fontSize: '13px',
  color: '#32324d',
  verticalAlign: 'middle',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
};

const badgeCreateStyle: React.CSSProperties = { backgroundColor: '#eafbe7', color: '#2d8a20' };
const badgeUpdateStyle: React.CSSProperties = { backgroundColor: '#e8f4fe', color: '#0066cc' };
const badgeDeleteStyle: React.CSSProperties = { backgroundColor: '#fcebea', color: '#b00020' };
const badgePublishStyle: React.CSSProperties = { backgroundColor: '#f0e6ff', color: '#6e00f5' };
const badgeUnpublishStyle: React.CSSProperties = { backgroundColor: '#fff3d1', color: '#b26b00' };
const badgeAuthStyle: React.CSSProperties = { backgroundColor: '#e0f2fe', color: '#0369a1' };
const badgeDefaultStyle: React.CSSProperties = { backgroundColor: '#f0f0f5', color: '#666687' };

const codeStyle: React.CSSProperties = {
  backgroundColor: '#f0f0f5',
  padding: '2px 6px',
  borderRadius: '3px',
  fontSize: '12px',
  fontFamily: 'monospace',
  color: '#32324d',
};

const fieldChipStyle: React.CSSProperties = {
  backgroundColor: '#eaeaef',
  color: '#32324d',
  fontSize: '11px',
  padding: '2px 6px',
  borderRadius: '3px',
  fontFamily: 'monospace',
};

const btnRowDeleteStyle: React.CSSProperties = {
  backgroundColor: '#fcebea',
  border: '1px solid #f5c6cb',
  color: '#d92d20',
  cursor: 'pointer',
  padding: '6px 10px',
  borderRadius: '4px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
};

const loadingStyle: React.CSSProperties = {
  padding: '40px',
  textAlign: 'center',
  color: '#666687',
  fontSize: '14px',
};

const emptyStyle: React.CSSProperties = {
  padding: '40px',
  textAlign: 'center',
  color: '#666687',
  fontSize: '14px',
};

const paginationStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
};

const btnPageStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #dcdce4',
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#32324d',
  cursor: 'pointer',
};

// Confirm Modal Styles
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalContainerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '24px 32px',
  maxWidth: '480px',
  width: '90%',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
};

const modalTitleStyle: React.CSSProperties = {
  margin: '0 0 12px 0',
  fontSize: '18px',
  fontWeight: 700,
  color: '#32324d',
};

const modalMessageStyle: React.CSSProperties = {
  margin: '0 0 24px 0',
  fontSize: '14px',
  color: '#666687',
  lineHeight: '1.5',
};

const modalActionsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
};

const btnCancelStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #dcdce4',
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#32324d',
  cursor: 'pointer',
};

const btnDangerStyle: React.CSSProperties = {
  backgroundColor: '#d92d20',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#ffffff',
  cursor: 'pointer',
};

const btnPrimaryStyle: React.CSSProperties = {
  backgroundColor: '#4945ff',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#ffffff',
  cursor: 'pointer',
};

export default AuditLogsPage;
