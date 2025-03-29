'use client';

import React, { useState } from 'react';
import { Summary } from '../types/summary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFloppyDisk,
  faMagic,
  faCopy,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface SummaryViewerProps {
  summary: Summary | null;
  extractSummary: () => void;
  saveSummary: () => void;
  pdfFile: File | null;
  isLoading: boolean;
}

export default function SummaryViewer({
  summary,
  extractSummary,
  saveSummary,
  pdfFile,
  isLoading,
}: SummaryViewerProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleSave = () => {
    saveSummary();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  // Keep for fallback or testing
  const renderWithBoldSections = (text: string) => {
    const lines = text.split('\n');
    const sectionTitlePattern = /^([A-Z][A-Za-z0-9\s]{2,50})\s*$/;

    return lines.map((line, idx) => {
      if (
        sectionTitlePattern.test(line.trim()) &&
        idx < lines.length - 1 &&
        lines[idx + 1].match(/^[-=]{3,}$/)
      ) {
        return (
          <p
            key={idx}
            className="font-bold text-indigo-300 mt-6 mb-2 text-base tracking-wide uppercase"
          >
            {line.trim()}
          </p>
        );
      } else if (!lines[idx - 1]?.match(/^[-=]{3,}$/)) {
        return (
          <p key={idx} className="mb-2 leading-relaxed">
            {line}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="w-full h-full bg-gray-800 rounded-xl overflow-hidden flex flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4">
        {summary ? (
          <>
            <h3 className="text-sm font-semibold text-indigo-400 break-words">
              📄 {summary.filename}
            </h3>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded text-white text-sm font-medium transition ${
                  isLoading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
                <span>Save</span>
              </button>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition"
              >
                <FontAwesomeIcon icon={faCopy} />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </>
        ) : (
          <div className="text-gray-500 text-sm">
            {pdfFile ? 'Click extract to generate summary' : 'Summary will appear here'}
          </div>
        )}
      </div>

      {/* Summary Text */}
      <div className="flex-grow overflow-auto px-4 pb-4">
        {summary ? (
          <div className="bg-gray-900 text-gray-100 rounded-md px-6 py-4 text-[0.95rem] font-serif overflow-auto h-full shadow-inner">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl text-indigo-400 font-bold mt-4 mb-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl text-indigo-300 font-semibold mt-3 mb-2" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-lg text-indigo-200 font-medium mt-2 mb-1" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-gray-100 leading-relaxed mb-3" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside mb-4 pl-4" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="mb-1" {...props} />
                ),
              }}
            >
              {summary.summary}
            </ReactMarkdown>
          </div>
        ) : (
          pdfFile &&
          !summary && (
            <div className="text-center text-gray-500 flex-grow flex items-center justify-center">
              Select extract to generate summary
            </div>
          )
        )}
      </div>

      {/* Toast */}
      {saved && (
        <div className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-1 text-sm rounded shadow-lg flex items-center gap-2">
          <FontAwesomeIcon icon={faCheckCircle} />
          <span>Summary saved</span>
        </div>
      )}
    </div>
  );
}
