import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface SavedSummariesListProps {
  summaries: string[];
  onLoad: (filename: string) => void;
  onDelete: (filename: string) => void;
}

const SavedSummariesList: React.FC<SavedSummariesListProps> = ({
  summaries,
  onLoad,
  onDelete,
}) => {
  return (
    <div className="h-full bg-gray-900 text-white p-4 rounded-xl shadow-md overflow-auto">
      <h2 className="text-lg font-semibold mb-4">📁 Saved Summaries</h2>
      <ul className="space-y-2">
        {summaries.map((filename) => (
          <li
            key={filename}
            className="group flex items-center justify-between bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded cursor-pointer"
          >
            <button
              onClick={() => onLoad(filename)}
              className="flex items-center gap-2 text-left text-sm w-full"
            >
              <FontAwesomeIcon icon={faFileAlt} className="text-blue-400" />
              <span className="truncate">{filename}</span>
            </button>
            <button
              onClick={() => onDelete(filename)}
              className="text-red-400 hover:text-red-600 ml-2 hidden group-hover:block"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedSummariesList;
