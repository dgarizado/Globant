// ...existing code...
import React from 'react';

type User = { name?: string } | null;

export default function Home({
  onNavigate,
  user,
}: {
  onNavigate: (v: string) => void;
  user?: User;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">ServiceDeskAI</h2>

      {user ? (
        <>
          <p className="text-slate-600">
            Welcome back, <span className="font-medium">{user.name || 'User'}</span>. Manage your tickets or view your account below.
          </p>

          <div className="space-x-2">
            <button
              onClick={() => onNavigate('tickets')}
              className="px-3 py-2 bg-gray-600 text-white rounded"
            >
              View Tickets
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="px-3 py-2 border rounded"
            >
              Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-slate-600">A small demo frontend to interact with the ServiceDesk API.</p>

          <div className="p-4 border rounded bg-slate-50">
            <p className="text-sm text-slate-700 mb-2">
              You are not logged in. Please sign in to access your tickets and create requests.
            </p>

            <div className="space-x-2">
              <button
                onClick={() => onNavigate('login')}
                className="px-3 py-2 bg-gray-600 text-white rounded"
              >
                log in 
              </button>
              
            </div>
          </div>

          <div className="pt-4 text-sm text-slate-500">
            Tip: Use the seeded admin account in development to explore features.
          </div>
        </>
      )}
    </section>
  );
}
// ...existing code...