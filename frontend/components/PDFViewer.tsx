'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';

interface PDFViewerProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onExtractSummary: () => void;
  isLoading: boolean;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  selectedFile,
  onFileSelect,
  onExtractSummary,
  isLoading
}) => {
  const [objectUrl, setObjectUrl] = useState<string>('');

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setObjectUrl('');
    }
  }, [selectedFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full h-full bg-gray-800 rounded-xl overflow-hidden flex flex-col gap-4">
      {/* Upload + Extract Row */}
      <div className="flex items-center gap-4 px-4 pt-4">
        {/* Upload */}
        <label
          htmlFor="file-upload"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer shadow-sm text-sm font-medium transition"
        >
          <FontAwesomeIcon icon={faCloudArrowUp} />
          <span>PDF</span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          className="hidden"
        />

        {/* Extract Summary (only if file selected) */}
        {selectedFile && (
          <button
            onClick={onExtractSummary}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-medium transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            <span>{isLoading ? 'Extracting...' : 'Summary'}</span>
          </button>
        )}
      </div>

      {/* PDF Viewer */}
      <div className="flex-grow overflow-auto bg-gray-900 rounded-md">
        {objectUrl ? (
          <object
            data={objectUrl}
            type="application/pdf"
            className="w-full h-full border-none"
          >
            <p className="text-white p-4">
              Unable to display PDF.{' '}
              <a
                href={objectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400"
              >
                Download
              </a>{' '}
              instead.
            </p>
          </object>
        ) : (
          <p className="text-gray-400 text-sm p-4 text-center">
            Select a PDF file to preview it here.
          </p>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
