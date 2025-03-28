import dynamic from 'next/dynamic';
import SummaryViewer from '../components/SummaryViewer';

// Dynamically load PDF viewer
const PDFViewer = dynamic(() => import('../components/PDFViewer').catch(() => null), { ssr: false });

export default function SummariesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow h-[80vh] overflow-auto">
        <PDFViewer />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow h-[80vh] overflow-auto">
        <SummaryViewer summary={undefined} extractSummary={function (): void {
          throw new Error('Function not implemented.');
        } } saveSummary={function (): void {
          throw new Error('Function not implemented.');
        } } pdfFile={undefined} isLoading={false} />
      </div>
    </div>
  );
}
