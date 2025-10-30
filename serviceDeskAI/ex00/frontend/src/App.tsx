import React from 'react';
import Tickets from './pages/Tickets';

export default function App() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">ServiceDeskAI — Tickets</h1>
        <p className="text-sm text-slate-600">Small demo frontend for your ServiceDesk API</p>
      </header>

      <main>
        <Tickets />
      </main>
    </div>
  );
}