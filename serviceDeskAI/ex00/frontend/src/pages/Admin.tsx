import React, { useState } from 'react';

type User = { name?: string; email?: string; role?: string } | null;

export default function Admin({ user }: { user?: User }) {
  const [active, setActive] = useState<'none' | 'create' | 'manage' | 'reports'>('none');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e?: React.FormEvent) => {
    e && e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill name, email and password');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || 'Failed to create user');
      } else {
        setSuccess('User created successfully');
        setName('');
        setEmail('');
        setPassword('');
        setRole('user');
      }
    } catch (err: any) {
      setError(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="title">Admin Dashboard</h2>
      <p className="muted">Welcome, {user?.name || 'Admin'}. From here you can manage users, offices and view analytics.</p>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn-primary" onClick={() => setActive('create')}>Create new User</button>
          <button className="btn-primary" onClick={() => setActive('manage')}>Manage Users and Offices</button>
          <button className="btn-secondary" onClick={() => setActive('reports')}>View Reports</button>
        </div>

        {active === 'create' && (
          <div className="card">
            <h3 className="font-medium">Create new user</h3>
            <form onSubmit={handleCreate} className="space-y-3 mt-3">
              {error && <div className="text-red-600">{error}</div>}
              {success && <div className="text-emerald-600">{success}</div>}

              <label className="block">
                <span className="text-xs text-slate-600">Name</span>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
              </label>

              <label className="block">
                <span className="text-xs text-slate-600">Email</span>
                <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>

              <label className="block">
                <span className="text-xs text-slate-600">Password</span>
                <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>

              <label className="block">
                <span className="text-xs text-slate-600">Role</span>
                <select className="mt-1 block w-full rounded-md border px-3 py-2" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="user">Standard user</option>
                  <option value="service">Service desk</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <div className="flex items-center gap-2">
                <button className="btn-primary" disabled={loading}>{loading ? 'Creating…' : 'Create user'}</button>
                <button type="button" className="btn-secondary" onClick={() => setActive('none')}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {active === 'manage' && (
          <div className="card">
            <h3 className="font-medium">Manage Users and Offices</h3>
            <p className="muted mt-2">This section will list users and offices for management (placeholder).</p>
          </div>
        )}

        {active === 'reports' && (
          <div className="card">
            <h3 className="font-medium">Reports</h3>
            <p className="muted mt-2">Analytics and system reports will appear here (placeholder).</p>
          </div>
        )}
      </div>
    </section>
  );
}
