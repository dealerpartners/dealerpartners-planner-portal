import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, ChevronDown, ChevronRight, MessageSquare, AlertTriangle, BookOpen, ExternalLink, MoreHorizontal } from 'lucide-react';
import { Badge, Button, StatCard, Tooltip } from '../components/ui';

const tickets = [
  { id: 'TK-1241', subject: 'Requesting full refund after early departure', user: 'Sophia Martinez', priority: 'high', status: 'open', category: 'Refund', created: 'Jul 12', assigned: 'Jessica Reyes' },
  { id: 'TK-1240', subject: 'Unable to access digital key for cabin', user: 'Liam Torres', priority: 'urgent', status: 'open', category: 'Access', created: 'Jul 12', assigned: 'Tom Walsh' },
  { id: 'TK-1239', subject: 'Billing discrepancy on invoice #INV-4421', user: 'Marcus Chen', priority: 'medium', status: 'in_progress', category: 'Billing', created: 'Jul 11', assigned: 'Jessica Reyes' },
  { id: 'TK-1238', subject: 'How do I add a co-host to my account?', user: 'Priya Nair', priority: 'low', status: 'resolved', category: 'Account', created: 'Jul 10', assigned: 'Auto' },
  { id: 'TK-1237', subject: 'Pool heater not working on arrival', user: 'David Kim', priority: 'high', status: 'resolved', category: 'Maintenance', created: 'Jul 9', assigned: 'Tom Walsh' },
];

const statusMeta: Record<string, { variant: 'danger' | 'warning' | 'info' | 'success' | 'neutral' }> = {
  open: { variant: 'danger' },
  in_progress: { variant: 'info' },
  resolved: { variant: 'success' },
  closed: { variant: 'neutral' },
};

const priorityMeta: Record<string, { variant: 'danger' | 'warning' | 'info' | 'neutral' }> = {
  urgent: { variant: 'danger' },
  high: { variant: 'warning' },
  medium: { variant: 'info' },
  low: { variant: 'neutral' },
};

const kbArticles = [
  { title: 'How to manage booking cancellations', views: 1420, helpful: '94%', category: 'Bookings' },
  { title: 'Setting up your cancellation policy', views: 980, helpful: '91%', category: 'Policies' },
  { title: 'Payout schedule and settlement', views: 870, helpful: '89%', category: 'Payments' },
  { title: 'Digital key setup for your property', views: 640, helpful: '88%', category: 'Access' },
  { title: 'How to add team members', views: 580, helpful: '96%', category: 'Account' },
  { title: 'Troubleshooting booking sync issues', views: 420, helpful: '82%', category: 'Integrations' },
];

function TicketsView() {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Open Tickets" value="3" icon={<MessageSquare className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="In Progress" value="1" icon={<MessageSquare className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Avg Response Time" value="1.4h" change="Well within SLA" changeType="up" icon={<MessageSquare className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="CSAT Score" value="4.8/5" change="Last 30 days" icon={<MessageSquare className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input type="text" placeholder="Search tickets..." className="input pl-9 h-9" />
        </div>
        <select className="select h-9 w-36 text-sm">
          <option>All priorities</option>
          <option>Urgent</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className="select h-9 w-32 text-sm">
          <option>All statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <div className="ml-auto">
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New ticket</Button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Subject</th><th>User</th><th>Category</th><th>Priority</th><th>Assigned</th><th>Created</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="cursor-pointer">
                <td><span className="font-mono text-xs text-slate-400">{t.id}</span></td>
                <td>
                  <p className="font-medium text-slate-800 max-w-xs truncate">{t.subject}</p>
                </td>
                <td className="text-sm text-slate-600">{t.user}</td>
                <td><span className="pill bg-slate-100 text-slate-600 text-xs">{t.category}</span></td>
                <td><Badge variant={priorityMeta[t.priority].variant} dot>{t.priority}</Badge></td>
                <td className="text-xs text-slate-500">{t.assigned}</td>
                <td className="text-xs text-slate-400">{t.created}</td>
                <td><Badge variant={statusMeta[t.status].variant} dot>{t.status.replace('_', ' ')}</Badge></td>
                <td>
                  <div className="flex gap-1">
                    <Tooltip content="View ticket" position="top">
                      <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><ExternalLink className="w-3.5 h-3.5" /></button>
                    </Tooltip>
                    <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KnowledgeBase() {
  const [openCat, setOpenCat] = useState<string | null>('Bookings');
  const categories = ['Bookings', 'Payments', 'Policies', 'Account', 'Integrations', 'Access'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input type="text" placeholder="Search knowledge base..." className="input pl-9 h-10 text-sm" />
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New article</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Categories</p>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setOpenCat(c === openCat ? null : c)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${openCat === c ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {c}
              </div>
              {openCat === c ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
        <div className="lg:col-span-2 space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Popular Articles</p>
          {kbArticles.map((a) => (
            <div key={a.title} className="card p-4 flex items-center gap-3 hover:shadow-sm transition-shadow cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800">{a.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {a.views.toLocaleString()} views · {a.helpful} helpful · <span className="pill bg-slate-100 text-slate-500 text-[10px]">{a.category}</span>
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DisputesView() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">2 active disputes</p>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>File dispute</Button>
      </div>
      <div className="space-y-3">
        {[
          { id: 'DIS-042', type: 'Refund denied', parties: 'Sophia Martinez vs. James Doe', amount: '$420', filed: 'Jul 11', status: 'open', escalated: true },
          { id: 'DIS-041', type: 'Property damage claim', parties: 'James Doe vs. David Kim', amount: '$280', filed: 'Jul 8', status: 'in_review', escalated: false },
        ].map((d) => (
          <div key={d.id} className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${d.escalated ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">{d.id}</span>
                    <span className="pill bg-slate-100 text-slate-600 text-xs">{d.type}</span>
                    {d.escalated && <Badge variant="danger" size="sm">Escalated</Badge>}
                  </div>
                  <p className="text-sm font-semibold text-slate-800 mt-1">{d.parties}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Amount in dispute: <span className="font-semibold text-slate-700">{d.amount}</span> · Filed {d.filed}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant={d.status === 'open' ? 'danger' : 'warning'} dot>{d.status.replace('_', ' ')}</Badge>
                <Button variant="secondary" size="sm">Mediate</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const subTabs = [
  { id: '/support/tickets', label: 'Tickets' },
  { id: '/support/kb', label: 'Knowledge Base' },
  { id: '/support/disputes', label: 'Disputes' },
  { id: '/support/escalation', label: 'Escalation' },
];

export default function Support() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = subTabs.find((t) => location.pathname.startsWith(t.id))?.id || '/support/tickets';

  return (
    <div className="min-h-full">
      <div className="page-header">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Support</h1>
            <p className="text-sm text-slate-500 mt-0.5">Tickets, knowledge base, disputes, and escalation management</p>
          </div>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>New ticket</Button>
        </div>
        <div className="tab-nav">
          {subTabs.map((t) => (
            <button key={t.id} className={`tab-item ${active === t.id ? 'active' : ''}`} onClick={() => navigate(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<TicketsView />} />
        <Route path="/tickets" element={<TicketsView />} />
        <Route path="/kb" element={<KnowledgeBase />} />
        <Route path="/disputes" element={<DisputesView />} />
        <Route path="/*" element={<TicketsView />} />
      </Routes>
    </div>
  );
}
