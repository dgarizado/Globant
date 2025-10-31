import React, { useEffect, useState } from 'react';
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

  
  useEffect(() => {
    const fromHash = window.location.hash ? (window.location.hash.slice(1) as View) : null;
    if (fromHash) setView(fromHash);

    const onHash = () => {
      const v = window.location.hash ? (window.location.hash.slice(1) as View) : 'home';
      setView(v);
    };

    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (to: React.SetStateAction<View>) => {
    setView((prev) => {
      const next = typeof to === 'function' ? (to as (p: View) => View)(prev) : to;
      try {
        window.location.hash = `#${next}`;
      } catch (err) {
        console.warn('Failed to set URL hash', err);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">ServiceDeskAI</h1>
        <p className="text-sm text-slate-600">Small demo frontend for your ServiceDesk API</p>
      </header>

      <main>
        {view === 'home' && (
          <Home
            onNavigate={navigate}
            user={user}
            onLogin={(u: User) => {
              setUser(u);
              const role = u?.role;
              const target: View = role === 'admin' ? 'admin' : role === 'service' ? 'service' : 'user';
              navigate(target);
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
    </div>
  );
}