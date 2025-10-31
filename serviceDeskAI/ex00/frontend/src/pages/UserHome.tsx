import React, { useRef, useState } from 'react';

type User = { name?: string; email?: string; role?: string } | null;

export default function UserHome({ user }: { user?: User }) {
  const [active, setActive] = useState<'none' | 'create' | 'track'>('none');

  // Create ticket state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Track state
  const [tickets, setTickets] = useState<any[] | null>(null);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [queryId, setQueryId] = useState('');

  const handleCreate = async (e?: React.FormEvent) => {
    e && e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!title.trim()) return setError('Please provide a title');

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // Use FormData to allow optional photo upload
      const form = new FormData();
      form.append('title', title);
      form.append('description', description);
      if (photoFile) form.append('photo', photoFile);

      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          // NOTE: Do NOT set Content-Type; the browser will set multipart boundary
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: form,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || 'Failed to create ticket');
      } else {
        setSuccess('Ticket created successfully');
        setTitle('');
        setDescription('');
        setPhotoFile(null);
        setPreview(null);
      }
    } catch (err: any) {
      setError(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const loadTickets = async () => {
    setLoadingTickets(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/tickets', {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || 'Failed to load tickets');
        setTickets([]);
      } else {
        // backend returns { tickets } or { message }
        setTickets(data.tickets || []);
      }
    } catch (err: any) {
      setError(err?.message || 'Network error');
    } finally {
      setLoadingTickets(false);
    }
  };

  const filtered = () => {
    if (!tickets) return [];
    if (!queryId.trim()) return tickets;
    const query = queryId.trim().toLowerCase();
    // Filter by status
    return tickets.filter((t: any) => (t.status || 'open').toLowerCase() === query);
    
  };

  return (
    <section className="space-y-4">
      <h2 className="title">Welcome, {user?.name || 'User'}</h2>
      <p className="muted">Create new tickets or track your existing reports.</p>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn-primary" onClick={() => setActive('create')}>Create new ticket</button>
          <button className="btn-secondary" onClick={() => { setActive('track'); loadTickets(); }}>Track a ticket</button>
        </div>

        {active === 'create' && (
          <div className="card">
            <h3 className="font-medium">Create ticket</h3>
            <form onSubmit={handleCreate} className="space-y-3 mt-3">
              {error && <div className="text-red-600">{error}</div>}
              {success && <div className="text-emerald-600">{success}</div>}

              <label className="block">
                <span className="text-xs text-slate-600">Title</span>
                <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>

              <label className="block">
                <span className="text-xs text-slate-600">Description</span>
                <textarea className="mt-1 block w-full rounded-md border px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>

              <div className="flex items-center gap-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files && e.target.files[0];
                    if (f) {
                      setPhotoFile(f);
                      setPreview(URL.createObjectURL(f));
                    } else {
                      setPhotoFile(null);
                      setPreview(null);
                    }
                  }}
                />

                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  title="Upload photo"
                >
                  📷
                </button>

                {preview && (
                  <img src={preview} alt="preview" className="w-20 h-20 object-cover rounded" />
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button className="btn-primary" disabled={loading}>{loading ? 'Creating…' : 'Create ticket'}</button>
                  <button type="button" className="btn-secondary" onClick={() => { setActive('none'); setPhotoFile(null); setPreview(null); }}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        )}

        {active === 'track' && (
          <div className="card">
            <h3 className="font-medium">Your tickets</h3>
            <div className="mt-3 space-y-2">
              <label className="block">
                <span className="text-xs text-slate-600">Filter by status</span>
                <select className="mt-1 block w-full rounded-md border px-3 py-2" value={queryId} onChange={(e) => setQueryId(e.target.value)}>
                  <option value="">All statuses</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </label>

              {loadingTickets ? (
                <div className="muted">Loading…</div>
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : (!tickets || tickets.length === 0) ? (
                <div className="muted">You have no tickets yet.</div>
              ) : (
                <ul className="space-y-3">
                  {filtered().map((t: any) => (
                    <li key={t._id} className="ticket-card">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{t.title}</h4>
                        <span className="text-xs text-slate-500">{t.status || 'open'}</span>
                      </div>
                      {t.description && <p className="muted mt-1">{t.description}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
