import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUser, faInfoCircle, faEnvelope,
  faCodeBranch, faNewspaper, faCog, faUnlock,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useAuth } from '../lib/useAuth';

const Header = () => {
  const { user, username } = useAuth();

  return (
    <header className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        QuantCoder FS
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        A quant finance research platform
      </p>

      <nav className="mt-2">
        <ul className="flex space-x-6 items-center">
          <li>
            <Link href="/" className="text-gray-800 dark:text-gray-200 hover:underline">
              <FontAwesomeIcon icon={faHome} className="mr-1" />
              Home
            </Link>
          </li>
          <li>
            <Link href="/test-workspace" className="text-gray-800 dark:text-gray-200 hover:underline">
              <FontAwesomeIcon icon={faCodeBranch} className="mr-1" />
              Test Workspace
            </Link>
          </li>
          <li>
            {user ? (
              <span className="text-gray-800 dark:text-gray-200 italic">
                <FontAwesomeIcon icon={faUnlock} className="mr-1" />
                Logged as {username}
              </span>
            ) : (
              <Link href="/login" className="text-gray-800 dark:text-gray-200 hover:underline">
                <FontAwesomeIcon icon={faUser} className="mr-1" />
                Login
              </Link>
            )}
          </li>
          <li>
            <Link href="/news" className="text-gray-800 dark:text-gray-200 hover:underline">
              <FontAwesomeIcon icon={faNewspaper} className="mr-1" />
              News
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-800 dark:text-gray-200 hover:underline">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-800 dark:text-gray-200 hover:underline">
              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
              Contact
            </Link>
          </li>
          <li>
            <Link href="/settings" className="text-gray-800 dark:text-gray-200 hover:underline">
              <FontAwesomeIcon icon={faCog} className="mr-1" />
              Settings
            </Link>
          </li>

          {/* 🔓 Logout at the end */}
          {user && (
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
                className="text-gray-800 dark:text-gray-200 hover:underline text-sm flex items-center"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
                Log out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
