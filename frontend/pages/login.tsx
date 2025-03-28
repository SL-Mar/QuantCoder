import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const next = (router.query.next as string) || '/summarisation';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      router.push(next);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0f172a] text-white">
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-xl shadow">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <input
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded"
          onClick={handleLogin}
        >
          Log In
        </button>
        {error && (
          <p className="mt-4 text-red-400 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
}
