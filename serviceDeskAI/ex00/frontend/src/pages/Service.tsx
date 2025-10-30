import React from 'react';

type User = { name?: string; email?: string } | null;

export default function Service({ user }: { user?: User }) {
  return (
    <section className="space-y-4">
      <h2 className="title">Service Desk</h2>
      <p className="muted">Hello {user?.name || 'Service Agent'}. Manage tickets and contact users from this view.</p>

      <div className="grid gap-4">
        <div className="ticket-card">
          <h3 className="font-medium">Manage Tickets</h3>
          <p className="muted">List, assign, update status and comment on tickets here. (Placeholder)</p>
          <div className="mt-3">
            <button className="btn-primary">Open ticket queue</button>
          </div>
        </div>

        <div className="ticket-card">
          <h3 className="font-medium">Contact Users</h3>
          <p className="muted">Search and contact users related to tickets. (Placeholder)</p>
          <div className="mt-3">
            <button className="btn-primary">Open contacts</button>
          </div>
        </div>
      </div>
    </section>
  );
}
