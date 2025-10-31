import React, { useEffect, useState } from 'react';

type Ticket = {
  _id: string;
  title: string;
  description?: string;
  status?: string;
  createdAt?: string;
};

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/tickets', { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
        if (!res.ok) throw new Error('Failed to fetch tickets');
        const data = await res.json();
        // backend returns { tickets } or maybe an array
        setTickets(data.tickets || data);
      } catch (err) {
        console.error(err);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="muted">Loading tickets…</div>;
  if (!tickets || tickets.length === 0 )
    return <div className="muted">No tickets yet.</div>;

  return (
    <ul className="space-y-3">
      {tickets.map((t) => (
        <li key={t._id} className="ticket-card">
          <div className="flex justify-between">
            <h3 className="font-medium">{t.title}</h3>
            <span className="text-xs text-slate-500">{t.status || 'open'}</span>
          </div>
          {t.description && <p className="muted mt-1">{t.description}</p>}
          <div className="text-xs text-slate-400 mt-2">{t.createdAt}</div>
        </li>
      ))}
    </ul>
  );
}