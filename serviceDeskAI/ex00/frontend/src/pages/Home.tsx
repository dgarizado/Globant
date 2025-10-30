// ...existing code...
import React, { useState } from 'react';

type User = { name?: string; email?: string } | null;

export default function Home({
  onNavigate,
  user,
  onLogin,
}: {
  onNavigate: (v: React.SetStateAction<'home' | 'tickets' | 'login' | 'admin' | 'service' | 'user'>) => void;
  user?: User;
  onLogin?: (u: User) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e && e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || 'Login failed');
        setLoading(false);
        return;
      }

      if (data.token) {
        try {
          localStorage.setItem('token', data.token);
        } catch (err) {
          console.warn('Failed to store token in localStorage', err);
        }
      }
      const returnedUser = data.user || { name: email.split('@')[0] || 'User', email };
      onLogin?.(returnedUser);
    } catch (err: any) {
      setError(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h2 className="title">ServiceDeskAI</h2>

      {user ? (
        <div className="space-y-4 text-center">
          <p className="text-slate-600">
            Welcome back, <span className="font-medium">{user.name || 'User'}</span>.
          </p>

          <div className="flex justify-center gap-2">
            <button onClick={() => onNavigate('tickets')} className="btn-primary">
              View Tickets
            </button>
            <button onClick={() => onNavigate('login')} className="btn-secondary">
              Account
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <p className="muted mb-4 text-center">Welcome — report issues quickly from your phone or desktop.</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block">
              <span className="text-xs text-slate-600">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                aria-label="email"
              />
            </label>

            <label className="block"> 
              <span className="text-xs text-slate-600">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="password"
                aria-label="password"
              />
            </label>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </div>

            <div className="note">Note: this is a minimal demo.</div>
          </form>
        </div>
      )}
    </section>
  );
}
