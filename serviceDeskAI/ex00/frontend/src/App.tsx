import React, { useState } from 'react';
import Tickets from './pages/Tickets';
import Home from './pages/Home';
import Login from './pages/Login';

type View = 'home' | 'tickets' | 'login';

export default function App() {
  const [view, setView] = useState<View>('home');

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">ServiceDeskAI</h1>
        <p className="text-sm text-slate-600">Small demo frontend for your ServiceDesk API</p>


      </header>

      <main>
        {view === 'home' && <Home onNavigate={setView} />}
        {view === 'tickets' && <Tickets />}
        {view === 'login' && <Login onLogin={() => setView('tickets')} />}
      </main>
    </div>
  );
}