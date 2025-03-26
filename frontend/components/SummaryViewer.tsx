// components/SummaryViewer.tsx
import React from 'react';
import { Summary } from '../types';

interface SummaryViewerProps {
    summary: Summary | null;
    extractSummary: () => void;
    saveSummary: () => void;
    pdfFile: File | null;
    isLoading: boolean;
}

export default function SummaryViewer({ summary, extractSummary, saveSummary, pdfFile, isLoading }: SummaryViewerProps) {
    return (
        <div
            style={{
                background: '#282a36',
                borderRadius: '4px',
                padding: '16px',
                border: '1px solid #44475a',
                height: 'calc(100vh - 50px)',
                overflowY: 'auto',
            }}
        >
            {summary ? (
                <div>
                    <h3 style={{ color: '#bd93f9', marginBottom: '16px' }}>{summary.filename}</h3>
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'system-ui, sans-serif' }}>{summary.summary}</pre>
                    <button
                        onClick={saveSummary}
                        style={{
                            marginTop: '20px',
                            background: '#50fa7b',
                            color: '#1e1e2f',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Save Summary
                    </button>
                </div>
            ) : (
                <div style={{ textAlign: 'center', color: '#6272a4' }}>
                    {pdfFile ? 'Click the button below to extract the summary' : 'Summary will appear here'}
                </div>
            )}

            {pdfFile && !summary && (
                <button
                    onClick={extractSummary}
                    disabled={isLoading}
                    style={{
                        marginTop: '20px',
                        background: '#bd93f9',
                        color: '#f8f8f2',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                    }}
                >
                    Extract Summary
                </button>
            )}
        </div>
    );
}
