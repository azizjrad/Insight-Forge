
import React, { useState } from 'react';
import { Upload, FileText, FilePlus, Check, X, Table } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

interface DataImportProps {
  onDataImport?: (data: any[]) => void;
  acceptedFormats?: string[];
  maxSizeInMB?: number;
}

const DataImport: React.FC<DataImportProps> = ({ 
  onDataImport, 
  acceptedFormats = ['.csv', '.xls', '.xlsx'], 
  maxSizeInMB = 5 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<any[] | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSizeInMB) {
      toast.error(`File size exceeds the maximum limit of ${maxSizeInMB}MB`);
      return false;
    }

    // Check file extension
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 1);
    const isAcceptedFormat = acceptedFormats.some(format => 
      format.toLowerCase().includes(fileExtension)
    );

    if (!isAcceptedFormat) {
      toast.error(`File format not supported. Please upload ${acceptedFormats.join(', ')} files`);
      return false;
    }

    return true;
  };

  const parseCSV = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length) {
            toast.error(`Error parsing CSV: ${results.errors[0].message}`);
            reject(results.errors);
          } else {
            resolve(results.data as any[]);
          }
        },
        error: (error) => {
          toast.error(`Error parsing CSV: ${error.message}`);
          reject(error);
        }
      });
    });
  };

  const parseExcel = async (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          if (!e.target?.result) {
            reject(new Error("Failed to read file"));
            return;
          }
          
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          if (parsedData.length < 2) {
            reject(new Error("Excel file must contain data with headers"));
            return;
          }
          
          const headers = parsedData[0] as string[];
          const rows = parsedData.slice(1);
          
          // Convert rows to objects with headers as keys
          const result = rows.map(row => {
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = (row as any[])[index];
            });
            return obj;
          });
          
          resolve(result);
        } catch (error: any) {
          toast.error(`Error parsing Excel: ${error.message}`);
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        toast.error('Error reading file');
        reject(error);
      };
      
      reader.readAsBinaryString(file);
    });
  };

  const handleFile = async (file: File) => {
    if (!validateFile(file)) return;

    setIsLoading(true);
    setUploadedFile(file);
    
    try {
      let parsedData: any[] = [];
      
      if (file.name.toLowerCase().endsWith('.csv')) {
        parsedData = await parseCSV(file);
      } else if (file.name.toLowerCase().match(/\.(xlsx|xls)$/)) {
        parsedData = await parseExcel(file);
      }
      
      if (parsedData.length > 0) {
        const headers = Object.keys(parsedData[0]);
        setHeaders(headers);
        setPreviewData(parsedData.slice(0, 5)); // Show first 5 rows as preview
        
        if (onDataImport) {
          onDataImport(parsedData);
        }
        
        toast.success(`Successfully imported ${parsedData.length} records from ${file.name}`);
      } else {
        toast.warning('No data found in the file');
      }
    } catch (error: any) {
      console.error("Import error:", error);
      toast.error(`Error importing file: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportComplete = () => {
    if (previewData && previewData.length > 0 && onDataImport) {
      onDataImport(previewData);
      toast.success('Data imported successfully!');
    }
  };

  const handleCancel = () => {
    setUploadedFile(null);
    setPreviewData(null);
    setHeaders([]);
  };

  return (
    <div className="space-y-4">
      {!uploadedFile ? (
        <div 
          className={`border-2 border-dashed rounded-md p-6 transition-colors ${
            isDragging ? 'border-accent bg-accent/5' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <Upload size={36} className={isDragging ? 'text-accent' : 'text-gray-400'} />
            <p className="text-sm text-gray-600">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: {acceptedFormats.join(', ')} (Max {maxSizeInMB}MB)
            </p>
            <button 
              type="button"
              onClick={() => document.getElementById('fileInput')?.click()}
              className="mt-2 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Browse Files'}
            </button>
            <input
              id="fileInput"
              type="file"
              accept={acceptedFormats.join(',')}
              className="hidden"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <FileText size={24} className="text-accent" />
            <div className="flex-1">
              <p className="font-medium">{uploadedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(uploadedFile.size / 1024).toFixed(2)} KB • {
                  new Date(uploadedFile.lastModified).toLocaleDateString()
                }
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCancel}
                className="p-1 text-gray-500 hover:text-gray-700"
                title="Cancel"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {previewData && previewData.length > 0 && (
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Table size={16} className="text-gray-500" />
                  <span className="font-medium text-sm">Data Preview (First 5 rows)</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {headers.map((header, index) => (
                        <th 
                          key={index}
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {headers.map((header, cellIndex) => (
                          <td 
                            key={`${rowIndex}-${cellIndex}`}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {row[header]?.toString() || ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleImportComplete}
              className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 flex items-center space-x-2"
              disabled={!previewData || previewData.length === 0}
            >
              <Check size={16} />
              <span>Import Data</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataImport;
