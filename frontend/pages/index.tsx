/*
 * Copyright 2024 - SL MAR - Sebastien M. LAIGNEL
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 relative">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">Welcome to QuantCoder FS</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Build smarter trading strategies with AI-powered tools to access fundamental data, search for finance articles, generate summaries, and generate Python code.
        </p>
      </div>

      {/* Navigation Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">

        <Link
          href="/summarisation"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
        >
          <h2 className="text-xl font-bold text-green-600 dark:text-green-400">Summary Generation</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Generate concise and actionable summaries with an AI summarizer.
          </p>
        </Link>
        
      </div>
    </div>
  );
}