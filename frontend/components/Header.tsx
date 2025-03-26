import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faInfoCircle, faEnvelope, faCodeBranch, faNewspaper, faCog } from '@fortawesome/free-solid-svg-icons'; // Import relevant icons
import Link from 'next/link';

const Header = () => {
    return (
        <header className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-800">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                QuantCoder FS
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                A quant finance research platform
            </p>
            <nav className="mt-2">
                <ul className="flex space-x-6">
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
                        <Link href="/login" className="text-gray-800 dark:text-gray-200 hover:underline">
                            <FontAwesomeIcon icon={faUser} className="mr-1" />
                            Login
                        </Link>
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
                </ul>
            </nav>
        </header>
    );
};

export default Header;
