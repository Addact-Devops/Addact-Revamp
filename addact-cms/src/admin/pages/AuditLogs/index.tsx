import React, { useState, useEffect, useCallback } from 'react';
import { useFetchClient } from '@strapi/admin/strapi-admin';

interface ChangeDetail {
  field: string;
  before: string | null;
  after: string | null;
}

interface AuditLog {
  id: number | string;
  targetDocumentId: string;
  userName: string;
  userEmail: string;
  action: 'Create' | 'Update' | 'Delete' | 'Publish' | 'Unpublish' | 'Login' | 'Logout';
  contentType: string;
  // updatedFields stores either:
  //   string[]        — legacy plain field names (old logs, Delete, Publish/Unpublish)
  //   ChangeDetail[]  — rich {field, before, after} objects (new Update logs)
  updatedFields: (string | ChangeDetail)[] | null;
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

// ─── Changes Detail Modal ─────────────────────────────────────────────────────

interface ChangesDetailModalProps {
  isOpen: boolean;
  log: AuditLog | null;
  onClose: () => void;
}

// Helper: check if an updatedFields item is a rich ChangeDetail object
const isRichItem = (item: string | ChangeDetail): item is ChangeDetail =>
  typeof item === 'object' && item !== null && 'field' in item;

const getFieldName = (item: string | ChangeDetail): string =>
  typeof item === 'object' && item !== null && 'field' in item ? item.field : String(item);

const ChangesDetailModal: React.FC<ChangesDetailModalProps> = ({ isOpen, log, onClose }) => {
  if (!isOpen || !log) return null;

  const fields = log.updatedFields || [];
  const richItems = fields.filter(isRichItem) as ChangeDetail[];
  const plainItems = fields.filter((f) => !isRichItem(f)) as string[];
  const hasRichDetails = richItems.length > 0;
  const hasPlainFields = plainItems.length > 0;
  const hasAnyData = fields.length > 0;

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Create': return { bg: '#eafbe7', color: '#2d8a20', border: '#b7ebad' };
      case 'Update': return { bg: '#e8f4fe', color: '#0066cc', border: '#b3d9fd' };
      case 'Delete': return { bg: '#fcebea', color: '#b00020', border: '#f5c6cb' };
      case 'Publish': return { bg: '#f0e6ff', color: '#6e00f5', border: '#d8b9ff' };
      case 'Unpublish': return { bg: '#fff3d1', color: '#b26b00', border: '#fde68a' };
      default: return { bg: '#e0f2fe', color: '#0369a1', border: '#bae6fd' };
    }
  };

  const actionColors = getActionColor(log.action);

  return (
    <div style={detailOverlayStyle} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={detailContainerStyle}>
        {/* Modal Header */}
        <div style={detailHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
            <span style={{ ...badgeStyle, backgroundColor: actionColors.bg, color: actionColors.color, border: `1px solid ${actionColors.border}`, flexShrink: 0 }}>
              {log.action}
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#32324d', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {log.contentType || 'N/A'}
              </div>
              {log.targetDocumentId && (
                <div style={{ fontSize: '11px', color: '#4945ff', fontFamily: 'monospace', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {log.targetDocumentId}
                </div>
              )}
            </div>
          </div>
          <button style={closeButtonStyle} onClick={onClose} title="Close">✕</button>
        </div>

        {/* Meta row */}
        <div style={metaRowStyle}>
          <span style={metaChipStyle}>👤 {log.userName || 'Unknown'}</span>
          <span style={metaChipStyle}>✉️ {log.userEmail || 'N/A'}</span>
          <span style={metaChipStyle}>🕒 {new Date(log.createdAt).toLocaleString()}</span>
          {log.ipAddress && <span style={metaChipStyle}>🌐 {log.ipAddress}</span>}
        </div>

        {/* Body */}
        <div style={detailBodyStyle}>
          {/* ── Rich before/after diff (new logs) ── */}
          {hasRichDetails && (
            <>
              <div style={sectionTitleStyle}>
                <span style={{ marginRight: '8px' }}>🔍</span>
                Field Changes ({richItems.length} field{richItems.length !== 1 ? 's' : ''} modified)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {richItems.map((detail, idx) => (
                  <div key={idx} style={changeRowStyle}>
                    {/* Field name */}
                    <div style={fieldNameStyle}>
                      <code style={{ ...codeStyle, fontSize: '12px', backgroundColor: '#f0f0f5', color: '#32324d' }}>
                        {detail.field}
                      </code>
                    </div>
                    {/* Before → After */}
                    <div style={beforeAfterRowStyle}>
                      <div style={beforeCellStyle}>
                        <div style={diffLabelStyle}>
                          <span style={{ color: '#b00020', fontWeight: 700, marginRight: '4px' }}>−</span> Before
                        </div>
                        <div style={beforeValueStyle}>
                          {detail.before != null && detail.before !== ''
                            ? detail.before
                            : <em style={{ color: '#8e8ea9', fontStyle: 'italic' }}>empty / not set</em>}
                        </div>
                      </div>
                      <div style={arrowStyle}>→</div>
                      <div style={afterCellStyle}>
                        <div style={diffLabelStyle}>
                          <span style={{ color: '#2d8a20', fontWeight: 700, marginRight: '4px' }}>+</span> After
                        </div>
                        <div style={afterValueStyle}>
                          {detail.after != null && detail.after !== ''
                            ? detail.after
                            : <em style={{ color: '#8e8ea9', fontStyle: 'italic' }}>empty / cleared</em>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── Plain field list (old logs / Delete / Publish) ── */}
          {hasPlainFields && (
            <div style={{ marginTop: hasRichDetails ? '20px' : '0' }}>
              <div style={sectionTitleStyle}>
                <span style={{ marginRight: '8px' }}>📋</span>
                {log.action === 'Delete' ? 'Deleted Record Snapshot' : `Affected Fields (${plainItems.length})`}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {plainItems.map((field, idx) => (
                  <div key={idx} style={plainFieldRowStyle}>
                    <span style={{ marginRight: '8px', fontSize: '14px' }}>{log.action === 'Delete' ? '🗑️' : '✏️'}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#32324d', wordBreak: 'break-word' }}>{field}</span>
                  </div>
                ))}
                {log.action === 'Update' && (
                  <div style={{ marginTop: '12px', padding: '10px 14px', backgroundColor: '#fff8e1', border: '1px solid #fde68a', borderRadius: '6px', fontSize: '12px', color: '#856404' }}>
                    ℹ️ Before/After values are available only for logs created after this feature was deployed. These are older logs showing only the changed field names.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Empty state ── */}
          {!hasAnyData && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8e8ea9' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📭</div>
              <div style={{ fontSize: '14px' }}>No field details recorded for this action.</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={detailFooterStyle}>
          <div style={{ fontSize: '12px', color: '#8e8ea9' }}>
            {log.os || ''} · {log.browser || ''} · {log.deviceType || ''}
          </div>
          <button style={btnPrimaryStyle} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};


// ─── Main Page ────────────────────────────────────────────────────────────────


const AuditLogsPage: React.FC = () => {
  const { get } = useFetchClient();
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

  // Changes Detail Modal
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);

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

  const handleOpenDetail = (log: AuditLog) => {
    setSelectedLog(log);
    setDetailModalOpen(true);
  };

  const getActionBadgeStyle = (action: string) => {
    switch (action) {
      case 'Create': return badgeCreateStyle;
      case 'Update': return badgeUpdateStyle;
      case 'Delete': return badgeDeleteStyle;
      case 'Publish': return badgePublishStyle;
      case 'Unpublish': return badgeUnpublishStyle;
      case 'Login':
      case 'Logout': return badgeAuthStyle;
      default: return badgeDefaultStyle;
    }
  };

  const hasChangesInfo = (log: AuditLog) =>
    Boolean(log.updatedFields && log.updatedFields.length > 0);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={retentionBadgeStyle}>
            <span style={retentionDotStyle}></span>
            🕒 30-Day Auto Retention
          </div>
          <button style={btnExportStyle} onClick={handleExport}>
            📥 Export JSON
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
          <input type="date" style={inputStyle} value={startDate} onChange={(e) => { setStartDate(e.target.value); setPage(1); }} />
        </div>

        <div style={filterGroupStyle}>
          <label style={labelStyle}>End Date</label>
          <input type="date" style={inputStyle} value={endDate} onChange={(e) => { setEndDate(e.target.value); setPage(1); }} />
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
                <th style={thStyle}>Date &amp; Time</th>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Action</th>
                <th style={thStyle}>Content Type</th>
                <th style={thStyle}>Doc ID</th>
                <th style={thStyle}>Details / Changes</th>
                <th style={thStyle}>IP Address</th>
                <th style={thStyle}>System / Device</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={trStyle}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 500 }}>{new Date(log.createdAt).toLocaleDateString()}</div>
                    <div style={{ fontSize: '11px', color: '#666687' }}>{new Date(log.createdAt).toLocaleTimeString()}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600, color: '#32324d' }}>{log.userName || 'Unknown'}</div>
                    <div style={{ fontSize: '11px', color: '#666687' }}>{log.userEmail || 'N/A'}</div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ ...badgeStyle, ...getActionBadgeStyle(log.action) }}>{log.action}</span>
                  </td>
                  <td style={tdStyle}>
                    <code style={codeStyle}>{log.contentType || 'N/A'}</code>
                  </td>
                  <td style={tdStyle}>
                    {log.targetDocumentId ? (
                      <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#4945ff' }}>{log.targetDocumentId}</span>
                    ) : (
                      <span style={{ color: '#8e8ea9' }}>—</span>
                    )}
                  </td>

                  {/* ── Details / Changes Cell ── */}
                  <td style={tdStyle}>
                    {hasChangesInfo(log) ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {/* Preview chips — first 3 fields */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {(log.updatedFields || []).slice(0, 3).map((item, idx) => {
                            const fieldName = getFieldName(item);
                            return (
                              <span
                                key={`${fieldName}-${idx}`}
                                style={
                                  log.action === 'Delete'
                                    ? { backgroundColor: '#fef3f2', color: '#b42318', border: '1px solid #fecdca', fontSize: '11px', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace' }
                                    : fieldChipStyle
                                }
                              >
                                {fieldName}
                              </span>
                            );
                          })}
                          {/* +N more badge */}
                          {Boolean(log.updatedFields && log.updatedFields.length > 3) && (
                            <span style={moreChipStyle}>
                              +{log.updatedFields!.length - 3} more
                            </span>
                          )}
                        </div>
                        {/* View Details button */}
                        <button style={viewDetailsBtnStyle} onClick={() => handleOpenDetail(log)} title="View full change details">
                          🔍 View Details
                        </button>
                      </div>
                    ) : (
                      <span style={{ color: '#8e8ea9' }}>—</span>
                    )}
                  </td>

                  <td style={tdStyle}>
                    <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>{log.ipAddress || '—'}</div>
                    {log.location && (
                      <div style={{ fontSize: '11px', color: '#271fe0', marginTop: '2px', fontWeight: 600 }}>📍 {log.location}</div>
                    )}
                    {log.clientId && (
                      <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#4945ff', marginTop: '2px', wordBreak: 'break-all' }} title={`Persistent Client ID: ${log.clientId}`}>
                        🆔 {log.clientId}
                      </div>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {log.systemUser && (
                      <div style={{ fontWeight: 600, color: '#271fe0', fontSize: '12px' }}>👤 {log.systemUser}</div>
                    )}
                    <div style={{ fontSize: '11px', color: '#666687' }}>{log.os || 'Unknown OS'} · {log.browser || 'Unknown Browser'}</div>
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
          <button style={btnPageStyle} disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
          <span style={{ fontSize: '13px', color: '#4945ff', fontWeight: 600 }}>
            Page {pagination.page} of {pagination.pageCount} ({pagination.total} total logs)
          </span>
          <button style={btnPageStyle} disabled={page >= pagination.pageCount} onClick={() => setPage((p) => Math.min(pagination.pageCount, p + 1))}>Next</button>
        </div>
      )}

      {/* Changes Detail Modal */}
      <ChangesDetailModal isOpen={detailModalOpen} log={selectedLog} onClose={() => setDetailModalOpen(false)} />
    </div>
  );
};

// ─── Inline Styles ─────────────────────────────────────────────────────────────

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

const retentionBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '20px',
  padding: '6px 14px',
  fontSize: '12.5px',
  fontWeight: 600,
  color: '#15803d',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
};

const retentionDotStyle: React.CSSProperties = {
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  backgroundColor: '#16a34a',
  display: 'inline-block',
  boxShadow: '0 0 6px rgba(22, 163, 74, 0.6)',
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

const moreChipStyle: React.CSSProperties = {
  backgroundColor: '#e8f4fe',
  color: '#0066cc',
  fontSize: '11px',
  padding: '2px 6px',
  borderRadius: '3px',
  fontFamily: 'monospace',
  fontWeight: 600,
};

const viewDetailsBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: '#f5f5ff',
  border: '1px solid #d3d3ff',
  borderRadius: '4px',
  padding: '4px 10px',
  fontSize: '11px',
  fontWeight: 600,
  color: '#4945ff',
  cursor: 'pointer',
  width: 'fit-content',
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

const btnPrimaryStyle: React.CSSProperties = {
  backgroundColor: '#4945ff',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 20px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#ffffff',
  cursor: 'pointer',
};

// ─── Detail Modal Styles ──────────────────────────────────────────────────────

const detailOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.55)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '20px',
  backdropFilter: 'blur(2px)',
};

const detailContainerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '860px',
  maxHeight: '85vh',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
};

const detailHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 24px',
  borderBottom: '1px solid #eaeaef',
  backgroundColor: '#f6f6f9',
  gap: '12px',
};

const metaRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  padding: '12px 24px',
  borderBottom: '1px solid #eaeaef',
  backgroundColor: '#fafafa',
};

const metaChipStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #eaeaef',
  borderRadius: '20px',
  padding: '3px 10px',
  fontSize: '11.5px',
  color: '#32324d',
  fontWeight: 500,
};

const detailBodyStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: '20px 24px',
};

const detailFooterStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 24px',
  borderTop: '1px solid #eaeaef',
  backgroundColor: '#f6f6f9',
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '18px',
  color: '#666687',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
  lineHeight: 1,
  flexShrink: 0,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 700,
  color: '#32324d',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
};

const changeRowStyle: React.CSSProperties = {
  backgroundColor: '#fafafa',
  border: '1px solid #eaeaef',
  borderRadius: '8px',
  padding: '12px 14px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const fieldNameStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const beforeAfterRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
};

const diffLabelStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: '#8e8ea9',
  marginBottom: '4px',
  display: 'flex',
  alignItems: 'center',
};

const beforeCellStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: '#fff5f5',
  border: '1px solid #fecdca',
  borderRadius: '6px',
  padding: '10px 12px',
  minWidth: 0,
  maxHeight: '340px',
  overflowY: 'auto',
};

const afterCellStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '6px',
  padding: '10px 12px',
  minWidth: 0,
  maxHeight: '340px',
  overflowY: 'auto',
};

const beforeValueStyle: React.CSSProperties = {
  fontSize: '12.5px',
  color: '#7f1d1d',
  fontFamily: 'monospace',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  lineHeight: '1.5',
};

const afterValueStyle: React.CSSProperties = {
  fontSize: '12.5px',
  color: '#14532d',
  fontFamily: 'monospace',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  lineHeight: '1.5',
};

const arrowStyle: React.CSSProperties = {
  fontSize: '18px',
  color: '#8e8ea9',
  flexShrink: 0,
  marginTop: '24px',
};

const plainFieldRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  backgroundColor: '#f6f6f9',
  border: '1px solid #eaeaef',
  borderRadius: '6px',
  padding: '10px 14px',
};


export default AuditLogsPage;
