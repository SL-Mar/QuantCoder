import '../styles/globals.css';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

// ✅ Hardcode dark mode here (runs immediately on load)
if (typeof window !== 'undefined') {
  document.documentElement.classList.add('dark');
}

export default function MyApp({ Component, pageProps }: any) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <footer className="flex justify-between items-center p-6 bg-gray-200 dark:bg-gray-800">
        <div className="text-left">
          <p className="text-lg">&copy; 2024 - SL Mar</p>
        </div>
        <div className="text-center">
          <Link href="/conditions" className="text-blue-600 hover:underline mx-2">
            Terms of Use
          </Link>
          <span className="mx-2">|</span>
          <Link href="/disclaimer" className="text-blue-600 hover:underline mx-2">
            Disclaimer
          </Link>
        </div>
        <div className="text-right">
          <a
            href="https://github.com/SL-Mar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <FontAwesomeIcon className="text-gray-800 dark:text-gray-200 hover:text-blue-600" icon={faGithub} size="lg" />
          </a>
          <a
            href="https://medium.com/@sl_mar/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center ml-2"
          >
            <FontAwesomeIcon className="text-gray-800 dark:text-gray-200 hover:text-blue-600" icon={faMedium} size="lg" />
          </a>
        </div>
      </footer>
    </div>
  );
}
