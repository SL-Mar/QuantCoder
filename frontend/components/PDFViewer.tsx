'use client';

import React, { useEffect, useState } from 'react';

interface PDFViewerProps {
  content?: string | File;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ content = '/test.pdf' }) => {
  const [objectUrl, setObjectUrl] = useState<string>('');

  useEffect(() => {
    if (content instanceof File) {
      const url = URL.createObjectURL(content);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof content === 'string') {
      setObjectUrl(content);
    }
  }, [content]);

  return (
    <div className="w-full h-full bg-gray-800 rounded-xl overflow-hidden">
      {objectUrl ? (
        <object
          data={objectUrl}
          type="application/pdf"
          className="w-full h-full border-none"
        >
          <p className="text-white p-4">
            Unable to display PDF.{' '}
            <a href={objectUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-400">
              Download
            </a>{' '}
            instead.
          </p>
        </object>
      ) : (
        <p className="text-white p-4">Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFViewer;
