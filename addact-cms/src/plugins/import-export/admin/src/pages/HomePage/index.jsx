import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/admin/strapi-admin';
import {
  Box,
  Button,
  Typography,
  Flex,
  SingleSelect,
  SingleSelectOption,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Checkbox,
  Textarea,
  Alert,
  Badge,
  Modal,
  TextInput,
  Loader,
  ProgressBar,
} from '@strapi/design-system';
import { Download, Upload, Eye, ArrowClockwise, Check, WarningCircle } from '@strapi/icons';
import { chunkArray, aggregateImportResults } from '../../utils/chunking';

const HomePage = () => {
  const { get, post } = useFetchClient();

  const [contentTypes, setContentTypes] = useState([]);
  const [selectedContentType, setSelectedContentType] = useState('');
  const [loadingContentTypes, setLoadingContentTypes] = useState(true);

  // Tab state
  const [activeTab, setActiveTab] = useState('export'); // 'export' | 'import'

  // Selection & Search State
  const [exportMode, setExportMode] = useState('all'); // 'all' | 'selected'
  const [entriesList, setEntriesList] = useState([]);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportLogs, setExportLogs] = useState([]);
  const [importLogs, setImportLogs] = useState([]);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayField, setDisplayField] = useState('');

  // Derived matchable display fields
  const currentSchema = contentTypes.find((ct) => ct.uid === selectedContentType);
  const displayFields = (currentSchema?.matchableFields || []).filter((f) => f !== 'documentId');

  // Auto-select preferred display field when schema changes
  useEffect(() => {
    if (currentSchema) {
      const fields = (currentSchema.matchableFields || []).filter((f) => f !== 'documentId');
      if (fields.length > 0) {
        setDisplayField(fields[0]);
      } else {
        setDisplayField('');
      }
    }
  }, [selectedContentType, currentSchema]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);

  // Import State
  const [importInputMode, setImportInputMode] = useState('upload'); // 'upload' | 'paste'
  const [jsonText, setJsonText] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [matchingKey, setMatchingKey] = useState('auto');
  const [publicationStateMode, setPublicationStateMode] = useState('preserve');

  // Preview & Import Results
  const [previewing, setPreviewing] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  // 1. Fetch available Content Types on mount
  useEffect(() => {
    fetchContentTypes();
  }, []);

  const fetchContentTypes = async () => {
    setLoadingContentTypes(true);
    try {
      const response = await get('/import-export/content-types');
      const types = response.data?.data || [];
      setContentTypes(types);
      if (types.length > 0) {
        setSelectedContentType(types[0].uid);
      }
    } catch (err) {
      setStatusMessage({ type: 'danger', message: `Failed to load content types: ${err.message}` });
    } finally {
      setLoadingContentTypes(false);
    }
  };

  // 2. Reset pagination & selection when content type changes
  useEffect(() => {
    if (selectedContentType) {
      setCurrentPage(1);
      setSelectedDocumentIds([]);
      setSearchQuery('');
    }
  }, [selectedContentType]);

  // 3. Fetch entries whenever content type, page, pageSize, or search query changes
  useEffect(() => {
    if (selectedContentType) {
      fetchEntries(selectedContentType, currentPage, pageSize, searchQuery);
    }
  }, [selectedContentType, currentPage, pageSize, searchQuery]);

  const fetchEntries = async (uid, page, size, search) => {
    setLoadingEntries(true);
    try {
      const response = await get(
        `/import-export/entries/${uid}?page=${page}&pageSize=${size}&search=${encodeURIComponent(search)}`
      );
      setEntriesList(response.data?.data?.entries || []);
      setTotalEntries(response.data?.data?.total || 0);
    } catch (err) {
      setEntriesList([]);
      setTotalEntries(0);
    } finally {
      setLoadingEntries(false);
    }
  };

  // Toggle Selection Logic
  const currentPageDocumentIds = entriesList.map((e) => e.documentId).filter(Boolean);
  const isAllCurrentPageSelected =
    currentPageDocumentIds.length > 0 &&
    currentPageDocumentIds.every((docId) => selectedDocumentIds.includes(docId));

  const handleToggleSelectAllCurrentPage = () => {
    if (isAllCurrentPageSelected) {
      // Unselect all items on current page
      setSelectedDocumentIds(selectedDocumentIds.filter((id) => !currentPageDocumentIds.includes(id)));
    } else {
      // Add all missing items on current page
      const newSelections = new Set([...selectedDocumentIds, ...currentPageDocumentIds]);
      setSelectedDocumentIds(Array.from(newSelections));
    }
  };

  const handleToggleSelectEntry = (docId) => {
    if (selectedDocumentIds.includes(docId)) {
      setSelectedDocumentIds(selectedDocumentIds.filter((id) => id !== docId));
    } else {
      setSelectedDocumentIds([...selectedDocumentIds, docId]);
    }
  };

  // Execute Export
  const handleExport = async () => {
    if (!selectedContentType) return;
    setExporting(true);
    setExportProgress(0);
    setExportLogs([]);
    setImportLogs([]);
    setShowLogsModal(true);
    setStatusMessage(null);

    const isSingleType = currentSchema?.kind === 'singleType';
    const totalToExport = exportMode === 'selected' ? selectedDocumentIds.length : (isSingleType ? 1 : totalEntries);
    const CHUNK_SIZE = 50;

    let finalExportJson = null;
    let accumulatedData = [];

    try {
      if (isSingleType) {
        setExportLogs(prev => [...prev, `Exporting Single Type...`]);
        const response = await post('/import-export/export', {
          contentType: selectedContentType,
          selectionMode: 'all',
        });
        finalExportJson = response.data;
        setExportProgress(100);
        setExportLogs(prev => [...prev, `Single Type exported successfully.`]);
      } else {
        if (exportMode === 'selected') {
          const chunks = chunkArray(selectedDocumentIds, CHUNK_SIZE);
          for (let i = 0; i < chunks.length; i++) {
            setExportLogs(prev => [...prev, `Fetching selected chunk ${i + 1}/${chunks.length} (${chunks[i].length} items)...`]);
            const response = await post('/import-export/export', {
              contentType: selectedContentType,
              selectionMode: 'selected',
              selectedDocumentIds: chunks[i],
            });
            if (!finalExportJson) finalExportJson = { ...response.data, data: [] };
            const fetchedData = response.data.data || [];
            accumulatedData = accumulatedData.concat(fetchedData);
            setExportProgress(Math.round(((i + 1) / chunks.length) * 100));
            const newLogs = fetchedData.map(entry => `Exported entry: ${entry.documentId || entry.id}`);
            setExportLogs(prev => [...prev, ...newLogs]);
          }
        } else {
          // Export All - Paginate
          let fetched = 0;
          let i = 1;
          while (fetched < totalToExport || totalToExport === 0) {
            const limit = CHUNK_SIZE;
            setExportLogs(prev => [...prev, `Fetching chunk ${i} (Offset: ${fetched}, Limit: ${limit})...`]);
            const response = await post('/import-export/export', {
              contentType: selectedContentType,
              selectionMode: 'all',
              start: fetched,
              limit,
            });
            
            if (!finalExportJson) finalExportJson = { ...response.data, data: [] };
            const fetchedData = response.data.data || [];
            accumulatedData = accumulatedData.concat(fetchedData);
            fetched += fetchedData.length;
            const newLogs = fetchedData.map(entry => `Exported entry: ${entry.documentId || entry.id}`);
            setExportLogs(prev => [...prev, ...newLogs]);
            
            if (totalToExport > 0) {
              setExportProgress(Math.round((Math.min(fetched, totalToExport) / totalToExport) * 100));
            }
            i++;

            if (fetchedData.length < limit || totalToExport === 0) {
              break; // No more data available
            }
          }
        }
        finalExportJson.data = accumulatedData;
        setExportProgress(100);
        setExportLogs(prev => [...prev, `Export completed. Total items: ${accumulatedData.length}`]);
      }

      // Trigger Browser JSON File Download
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(finalExportJson, null, 2));
      const downloadAnchor = document.createElement('a');
      const safeName = (selectedContentType.split('.').pop() || 'content').toLowerCase();
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `${safeName}_export_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setStatusMessage({ type: 'success', message: 'Content exported successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'danger', message: `Export failed: ${err.message}` });
      setExportLogs(prev => [...prev, `Error: ${err.message}`]);
    } finally {
      setExporting(false);
    }
  };

  // Read JSON Payload from file or text
  const getParsedPayload = async () => {
    if (importInputMode === 'upload') {
      if (!uploadedFile) throw new Error('Please select a JSON file to upload.');
      const text = await uploadedFile.text();
      return JSON.parse(text);
    } else {
      if (!jsonText.trim()) throw new Error('Please paste valid JSON content.');
      return JSON.parse(jsonText);
    }
  };

  // Execute Dry Run Preview
  const handlePreview = async () => {
    setPreviewing(true);
    setStatusMessage(null);
    try {
      const payload = await getParsedPayload();
      const response = await post('/import-export/preview', {
        data: payload,
        matchingKey,
        publicationStateMode,
      });

      setPreviewData(response.data?.data);
      setShowPreviewModal(true);
    } catch (err) {
      setStatusMessage({ type: 'danger', message: `Preview failed: ${err.message}` });
    } finally {
      setPreviewing(false);
    }
  };

  // Execute Import
  const handleImport = async () => {
    setImporting(true);
    setImportProgress(0);
    setImportLogs([]);
    setExportLogs([]);
    setShowLogsModal(true);
    setStatusMessage(null);
    setShowPreviewModal(false);
    try {
      setImportLogs(prev => [...prev, `Parsing payload...`]);
      const payload = await getParsedPayload();
      
      let finalResult = null;

      if (Array.isArray(payload.data)) {
        // Collection Type - perform chunking
        const CHUNK_SIZE = 50;
        const chunks = chunkArray(payload.data, CHUNK_SIZE);
        const results = [];
        
        setImportLogs(prev => [...prev, `Detected Collection Type. Starting import in ${chunks.length} chunks...`]);
        for (let i = 0; i < chunks.length; i++) {
          setImportLogs(prev => [...prev, `Importing chunk ${i + 1}/${chunks.length} (${chunks[i].length} items)...`]);
          
          const chunkPayload = { ...payload, data: chunks[i] };
          const itemLogs = chunks[i].map(item => `> Enqueuing item: ${item.documentId || item.id || item.title || item.name || 'Unknown'}`);
          setImportLogs(prev => [...prev, ...itemLogs]);

          const response = await post('/import-export/import', {
            data: chunkPayload,
            matchingKey,
            publicationStateMode,
          });
          const chunkResult = response.data?.data;
          results.push(chunkResult);
          
          if (chunkResult) {
            setImportLogs(prev => [...prev, `Chunk ${i + 1} Result: ${chunkResult.created} created, ${chunkResult.updated} updated, ${chunkResult.skipped} skipped, ${chunkResult.failed} failed.`]);
            if (chunkResult.errors?.length > 0) {
              setImportLogs(prev => [...prev, ...chunkResult.errors.map(err => `Error [${err.identifier}]: ${err.error}`)]);
            }
          }
          
          // Update progress
          const progress = Math.round(((i + 1) / chunks.length) * 100);
          setImportProgress(progress);
        }
        
        finalResult = aggregateImportResults(results);
        setImportLogs(prev => [...prev, `All chunks imported successfully. Finalizing...`]);
      } else {
        // Single Type - no chunking
        setImportLogs(prev => [...prev, `Detected Single Type. Importing...`]);
        const response = await post('/import-export/import', {
          data: payload,
          matchingKey,
          publicationStateMode,
        });
        finalResult = response.data?.data;
        
        if (finalResult) {
          setImportLogs(prev => [...prev, `Single Type Result: ${finalResult.created} created, ${finalResult.updated} updated, ${finalResult.skipped} skipped, ${finalResult.failed} failed.`]);
          if (finalResult.errors?.length > 0) {
            setImportLogs(prev => [...prev, ...finalResult.errors.map(err => `Error [${err.identifier}]: ${err.error}`)]);
          }
        }
        
        setImportProgress(100);
        setImportLogs(prev => [...prev, `Single Type imported successfully.`]);
      }

      setImportResult(finalResult);
      setStatusMessage({ type: 'success', message: 'Import operation completed!' });
      if (selectedContentType) fetchEntries(selectedContentType, currentPage, pageSize, searchQuery);
    } catch (err) {
      setStatusMessage({ type: 'danger', message: `Import failed: ${err.message}` });
      setImportLogs(prev => [...prev, `Error: ${err.message}`]);
    } finally {
      setImporting(false);
    }
  };

  // Reset & Refresh UI State
  const handleResetUI = async () => {
    setStatusMessage(null);
    setImportResult(null);
    setJsonText('');
    setUploadedFile(null);
    setSelectedDocumentIds([]);
    setSearchQuery('');
    setCurrentPage(1);
    setExportMode('all');
    setExportProgress(0);
    setExportLogs([]);
    setImportProgress(0);
    setImportLogs([]);
    setShowLogsModal(false);
    setDisplayField('');

    const currentType = selectedContentType;
    await fetchContentTypes();
    
    // If content type didn't change, manually re-fetch entries to refresh the list
    if (currentType) {
      fetchEntries(currentType, 1, pageSize, '');
    }
  };

  const totalPages = Math.ceil(totalEntries / pageSize) || 1;

  return (
    <Box padding={8} background="neutral100">
      <Flex direction="column" alignItems="stretch" gap={6}>
        {/* Header Title */}
        <Box background="neutral0" padding={6} hasRadius shadow="filterShadow">
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="alpha" as="h1">
                Content Import & Export
              </Typography>
              <Typography variant="epsilon" textColor="neutral600" as="p" style={{ marginTop: '4px' }}>
                Migrate entries, single types, components, relations, and media between Strapi v5 environments.
              </Typography>
            </Box>
            <Flex gap={2}>
              <Button startIcon={<ArrowClockwise />} onClick={handleResetUI} variant="tertiary">
                Reset / Refresh UI
              </Button>
            </Flex>
          </Flex>
        </Box>

        {/* Global Alert Notification */}
        {statusMessage && (
          <Alert
            title={statusMessage.type === 'success' ? 'Success' : 'Error'}
            variant={statusMessage.type}
            onClose={() => setStatusMessage(null)}
          >
            {statusMessage.message}
          </Alert>
        )}

        {/* Two-Column Side-by-Side Workspace */}
        <Flex gap={6} alignItems="stretch" wrap="wrap">
          {/* Left Column: Export Content */}
          <Box flex="1" background="neutral0" padding={6} hasRadius shadow="filterShadow" style={{ minWidth: '480px', display: 'flex', flexDirection: 'column' }}>
            <Flex direction="column" alignItems="stretch" gap={4} style={{ flex: 1 }}>
              <Box marginBottom={2}>
                <Typography variant="beta" as="h2">Export Content</Typography>
                <Typography variant="pi" textColor="neutral600" as="p" style={{ marginTop: '2px' }}>
                  Select a Content Type and download its entries as a JSON file.
                </Typography>
              </Box>

              {/* Source Content Type Picker */}
              <SingleSelect
                label="Source Content Type"
                placeholder="Select a Content Type to export..."
                value={selectedContentType}
                onChange={setSelectedContentType}
                disabled={loadingContentTypes}
              >
                {contentTypes.map((ct) => (
                  <SingleSelectOption key={ct.uid} value={ct.uid}>
                    {ct.displayName} ({ct.kind === 'singleType' ? 'Single Type' : 'Collection Type'})
                  </SingleSelectOption>
                ))}
              </SingleSelect>

              {currentSchema && (
                <Box padding={3} background="neutral100" hasRadius>
                  <Typography variant="pi" textColor="neutral600" as="p">
                    <strong>Schema UID:</strong> {currentSchema.uid}
                  </Typography>
                  {currentSchema.uniqueKeys && currentSchema.uniqueKeys.length > 0 && (
                    <Typography variant="pi" textColor="neutral600" as="p" style={{ marginTop: '2px' }}>
                      <strong>Identity Keys:</strong> {currentSchema.uniqueKeys.join(', ')}
                    </Typography>
                  )}
                </Box>
              )}

              {selectedContentType && (
                <>
                  <Flex gap={4} marginTop={2} alignItems="center" justifyContent="space-between">
                    <Flex gap={4}>
                      <Button
                        variant={exportMode === 'all' ? 'default' : 'secondary'}
                        onClick={() => setExportMode('all')}
                        size="S"
                      >
                        Export All ({totalEntries})
                      </Button>
                      <Button
                        variant={exportMode === 'selected' ? 'default' : 'secondary'}
                        onClick={() => setExportMode('selected')}
                        size="S"
                      >
                        Select Entries ({selectedDocumentIds.length})
                      </Button>
                    </Flex>
                    <Box>
                      <Button
                        startIcon={<Download />}
                        onClick={handleExport}
                        loading={exporting}
                        disabled={!selectedContentType || (exportMode === 'selected' && selectedDocumentIds.length === 0)}
                        size="S"
                      >
                        {exportMode === 'selected'
                          ? `Export Selected (${selectedDocumentIds.length})`
                          : `Export All (${totalEntries})`}
                      </Button>
                    </Box>
                  </Flex>

                  {exportMode === 'selected' && (
                    <Box marginTop={2}>
                      <Flex gap={3} alignItems="flex-end" marginBottom={4}>
                        <Box flex="1">
                          <TextInput
                            placeholder="Search entries..."
                            value={searchQuery}
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                              setCurrentPage(1);
                            }}
                            style={{ width: '100%' }}
                          />
                        </Box>
                        {displayFields.length > 0 && (
                          <Box style={{ minWidth: '180px' }}>
                            <SingleSelect
                              label="Display entries by"
                              value={displayField}
                              onChange={setDisplayField}
                              size="S"
                            >
                              {displayFields.map((field) => (
                                <SingleSelectOption key={field} value={field}>
                                  {field}
                                </SingleSelectOption>
                              ))}
                            </SingleSelect>
                          </Box>
                        )}
                      </Flex>

                      {loadingEntries ? (
                        <Flex justifyContent="center" padding={6}>
                          <Loader>Loading entries...</Loader>
                        </Flex>
                      ) : entriesList.length === 0 ? (
                        <Typography variant="omega" textColor="neutral500">
                          No entries found.
                        </Typography>
                      ) : (
                        <>
                          <Table colCount={3} rowCount={entriesList.length + 1}>
                            <Thead>
                              <Tr>
                                <Th>
                                  <input
                                    type="checkbox"
                                    checked={isAllCurrentPageSelected}
                                    onChange={handleToggleSelectAllCurrentPage}
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                  />
                                </Th>
                                <Th>
                                  <Typography variant="sigma">{displayField || 'Identifier'}</Typography>
                                </Th>
                                <Th>
                                  <Typography variant="sigma">documentId</Typography>
                                </Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {entriesList.map((entry) => {
                                const isChecked = selectedDocumentIds.includes(entry.documentId);
                                const displayVal =
                                  displayField && entry[displayField] !== undefined && entry[displayField] !== null
                                    ? String(entry[displayField])
                                    : entry.documentId;
                                return (
                                  <Tr key={entry.documentId || entry.id}>
                                    <Td>
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleToggleSelectEntry(entry.documentId)}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                      />
                                    </Td>
                                    <Td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      <Typography>
                                        {displayVal}
                                      </Typography>
                                    </Td>
                                    <Td>
                                      <Typography textColor="neutral500">{entry.documentId?.substring(0, 8)}...</Typography>
                                    </Td>
                                  </Tr>
                                );
                              })}
                            </Tbody>
                          </Table>

                          {/* Pagination */}
                          <Flex justifyContent="space-between" alignItems="center" marginTop={4}>
                            <Button
                              variant="tertiary"
                              disabled={currentPage <= 1}
                              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                              size="S"
                            >
                              Prev
                            </Button>
                            <Typography variant="pi" textColor="neutral600">
                              Page {currentPage} of {totalPages}
                            </Typography>
                            <Button
                              variant="tertiary"
                              disabled={currentPage >= totalPages}
                              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                              size="S"
                            >
                              Next
                            </Button>
                          </Flex>
                        </>
                      )}
                    </Box>
                  )}

                  {exporting && (
                    <Box marginTop={4}>
                      <Flex direction="column" alignItems="stretch" gap={2}>
                        <Flex justifyContent="space-between">
                          <Typography variant="pi" fontWeight="bold">Export Progress</Typography>
                          <Typography variant="pi">{exportProgress}%</Typography>
                        </Flex>
                        <ProgressBar value={exportProgress} size="M" />
                      </Flex>
                    </Box>
                  )}


                </>
              )}
            </Flex>
          </Box>

          {/* Right Column: Import Content */}
          <Box flex="1" background="neutral0" padding={6} hasRadius shadow="filterShadow" style={{ minWidth: '480px', display: 'flex', flexDirection: 'column' }}>
            <Flex direction="column" alignItems="stretch" gap={4} style={{ flex: 1 }}>
              <Box marginBottom={2}>
                <Typography variant="beta" as="h2">Import Content</Typography>
                <Typography variant="pi" textColor="neutral600" as="p" style={{ marginTop: '2px' }}>
                  Upload or paste exported JSON. Target Content Type is auto-detected from the file.
                </Typography>
              </Box>

              {/* Import Source Mode */}
              <Flex gap={4}>
                <Button
                  variant={importInputMode === 'upload' ? 'default' : 'secondary'}
                  onClick={() => setImportInputMode('upload')}
                  size="S"
                >
                  Upload JSON File
                </Button>
                <Button
                  variant={importInputMode === 'paste' ? 'default' : 'secondary'}
                  onClick={() => setImportInputMode('paste')}
                  size="S"
                >
                  Paste Raw JSON
                </Button>
              </Flex>

              {importInputMode === 'upload' ? (
                <Box background="neutral100" padding={6} hasRadius style={{ border: '2px dashed #ccc', textAlign: 'center' }}>
                  <Flex direction="column" alignItems="center" gap={3}>
                    <Upload width="32px" height="32px" />
                    <Typography variant="epsilon">Select an exported .json file to import</Typography>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => setUploadedFile(e.target.files[0])}
                      style={{ marginTop: '8px' }}
                    />
                    {uploadedFile && (
                      <Typography variant="pi" textColor="success600" style={{ marginTop: '4px' }}>
                        Selected: {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                      </Typography>
                    )}
                  </Flex>
                </Box>
              ) : (
                <Textarea
                  label="Raw JSON Data"
                  placeholder="Paste exported JSON array or object here..."
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  rows={8}
                />
              )}

              <Box marginTop={4}>
                <Button 
                  startIcon={<Upload />} 
                  variant="default" 
                  onClick={handleImport} 
                  loading={importing}
                  size="L"
                  fullWidth
                >
                  Execute Import
                </Button>
              </Box>

              {importing && (
                <Box marginTop={4}>
                  <Flex direction="column" alignItems="stretch" gap={2}>
                    <Flex justifyContent="space-between">
                      <Typography variant="pi" fontWeight="bold">Import Progress</Typography>
                      <Typography variant="pi">{importProgress}%</Typography>
                    </Flex>
                    <ProgressBar value={importProgress} size="M" />
                  </Flex>
                </Box>
              )}



              {/* Import Results Card */}
              {importResult && (
                <Box background="neutral100" padding={6} hasRadius marginTop={4}>
                  <Flex direction="column" gap={3}>
                    <Typography variant="delta">Import Results</Typography>
                    <Flex gap={3} wrap="wrap">
                      <Badge active variant="success">Created: {importResult.created}</Badge>
                      <Badge active variant="secondary">Updated: {importResult.updated}</Badge>
                      <Badge active variant="warning">Skipped: {importResult.skipped}</Badge>
                      <Badge active variant="danger">Failed: {importResult.failed}</Badge>
                    </Flex>

                    {importResult.warnings && importResult.warnings.length > 0 && (
                      <Box marginTop={2}>
                        <Typography variant="pi" textColor="warning700" as="p">
                          <strong>Warnings & Missing Relations:</strong>
                        </Typography>
                        <ul>
                          {importResult.warnings.map((w, idx) => (
                            <li key={idx} style={{ listStyleType: 'disc', marginLeft: '16px', marginTop: '4px' }}>
                              <Typography variant="pi" textColor="warning600">
                                {w}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )}

                    {importResult.errors && importResult.errors.length > 0 && (
                      <Box marginTop={2}>
                        <Typography variant="pi" textColor="danger700" as="p">
                          <strong>Errors:</strong>
                        </Typography>
                        <ul>
                          {importResult.errors.map((e, idx) => (
                            <li key={idx} style={{ listStyleType: 'disc', marginLeft: '16px', marginTop: '4px' }}>
                              <Typography variant="pi" textColor="danger600">
                                {e.identifier}: {e.error}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )}
                  </Flex>
                </Box>
              )}
            </Flex>
          </Box>
        </Flex>

        {/* Logs Modal Popup */}
        {showLogsModal && (exportLogs.length > 0 || importLogs.length > 0) && (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            zIndex={1000}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box background="neutral0" padding={6} hasRadius shadow="tableShadow" style={{ width: '800px', maxWidth: '90vw', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
              <Flex justifyContent="space-between" marginBottom={4}>
                <Typography variant="beta">
                  {exportLogs.length > 0 ? 'Export Logs' : 'Import Logs'}
                </Typography>
                <Button 
                  variant="tertiary" 
                  onClick={() => setShowLogsModal(false)}
                >
                  Close
                </Button>
              </Flex>
              <Box background="neutral150" padding={4} hasRadius style={{ flex: 1, overflowY: 'auto' }}>
                <ul style={{ marginTop: 0, padding: 0, listStyle: 'none' }}>
                  {(exportLogs.length > 0 ? exportLogs : importLogs).map((log, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      <Typography variant="pi" textColor="neutral700">{'>'} {log}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Box>
        )}

      </Flex>
    </Box>
  );
};

export default HomePage;
