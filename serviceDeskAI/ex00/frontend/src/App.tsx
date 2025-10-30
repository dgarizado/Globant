import React, { useState } from 'react';
import Tickets from './pages/Tickets';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Service from './pages/Service';
import UserHome from './pages/UserHome';

type View = 'home' | 'tickets' | 'login' | 'admin' | 'service' | 'user';
type User = { name?: string; email?: string; role?: string } | null;

export default function App() {
  const [view, setView] = useState<View>('home');
  const [user, setUser] = useState<User>(null);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">ServiceDeskAI</h1>
        <p className="text-sm text-slate-600">Small demo frontend for your ServiceDesk API</p>
      </header>

      <main>
        {view === 'home' && (
          <Home
            onNavigate={setView}
            user={user}
            onLogin={(u: User) => {
              setUser(u);
              const role = u?.role;
              setView(role === 'admin' ? 'admin' : role === 'service' ? 'service' : 'tickets');
            }}
          />
        )}


  {view === 'tickets' && <Tickets />}

  {view === 'user' && <UserHome user={user} />}

  {view === 'service' && <Service user={user} />}

  {view === 'admin' && <Admin user={user} />}

        {view === 'login' && <Login onLogin={() => setView('tickets')} />}
      </main>
    </div>
  );
}