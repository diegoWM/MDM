import * as XLSX from 'xlsx';

export interface ExportData {
  [key: string]: any;
}

export const exportToCSV = (data: ExportData[], filename: string) => {
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  // Get headers from the first object, excluding internal fields
  const headers = Object.keys(data[0]).filter(key => 
    !['id', 'hasIssues', 'hasPendingChanges'].includes(key)
  );

  // Create CSV content
  const csvContent = [
    // Header row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (data: ExportData[], filename: string, sheetName: string = 'Data') => {
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  // Filter out internal fields
  const cleanData = data.map(row => {
    const cleanRow: ExportData = {};
    Object.keys(row).forEach(key => {
      if (!['id', 'hasIssues', 'hasPendingChanges'].includes(key)) {
        cleanRow[key] = row[key];
      }
    });
    return cleanRow;
  });

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(cleanData);

  // Auto-size columns
  const columnWidths = Object.keys(cleanData[0]).map(key => {
    const maxLength = Math.max(
      key.length,
      ...cleanData.map(row => String(row[key] || '').length)
    );
    return { wch: Math.min(maxLength + 2, 50) }; // Cap at 50 characters
  });
  worksheet['!cols'] = columnWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Save file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const getExportFilename = (tableName: string, format: 'csv' | 'excel') => {
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const cleanTableName = tableName.toLowerCase().replace(/\s+/g, '_');
  return `${cleanTableName}_export_${timestamp}`;
};