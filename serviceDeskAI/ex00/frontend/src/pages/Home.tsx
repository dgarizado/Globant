import React from 'react';

export default function Home({ onNavigate }: { onNavigate: (v: string) => void }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Welcome to ServiceDeskAI</h2>
      <p className="text-slate-600">A small demo frontend to interact with the ServiceDesk API.</p>

      <div className="space-x-2">
        <button
          onClick={() => onNavigate('tickets')}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          View Tickets
        </button>
        <button onClick={() => onNavigate('login')} className="px-3 py-2 border rounded">
          Login
        </button>
      </div>

      <div className="pt-4 text-sm text-slate-500">
        Tip: Use the seeded admin account in development to explore features.
      </div>
    </section>
  );
}
