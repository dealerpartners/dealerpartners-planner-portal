import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, CheckCircle, XCircle, Eye, AlertTriangle, BarChart3, Store, Megaphone, ShieldCheck, MoreHorizontal } from 'lucide-react';
import { Badge, Button, StatCard, Tooltip } from '../components/ui';

const applications = [
  { id: 'VA-0041', name: 'Coastal Retreats Inc.', type: 'Villa / Vacation Rental', submitted: 'Jul 10', status: 'pending', listings: 8, contact: 'diana@coastal.com' },
  { id: 'VA-0040', name: 'Urban Events Co.', type: 'Event Venues', submitted: 'Jul 8', status: 'reviewing', listings: 3, contact: 'sam@urbanevents.com' },
  { id: 'VA-0039', name: 'Wilderness Trails LLC', type: 'Outdoor Experiences', submitted: 'Jul 6', status: 'approved', listings: 12, contact: 'ben@wildtrails.com' },
  { id: 'VA-0038', name: 'City Bites Tour Co.', type: 'Food Tours', submitted: 'Jul 2', status: 'rejected', listings: 2, contact: 'info@citybites.com' },
];

const statusMeta: Record<string, { variant: 'warning' | 'info' | 'success' | 'danger'; label: string }> = {
  pending: { variant: 'warning', label: 'Pending review' },
  reviewing: { variant: 'info', label: 'Under review' },
  approved: { variant: 'success', label: 'Approved' },
  rejected: { variant: 'danger', label: 'Rejected' },
};

function ApplicationsView() {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="New Applications" value="14" change="This week" icon={<Store className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Under Review" value="6" icon={<Eye className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Approved (7d)" value="8" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Rejection Rate" value="12%" icon={<XCircle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input type="text" placeholder="Search applications..." className="input pl-9 h-9" />
        </div>
        <select className="select h-9 w-40 text-sm">
          <option>All statuses</option>
          <option>Pending</option>
          <option>Under review</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Vendor</th><th>Type</th><th>Submitted</th><th>Listings</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {applications.map((a) => {
              const s = statusMeta[a.status];
              return (
                <tr key={a.id}>
                  <td><span className="font-mono text-xs text-slate-400">{a.id}</span></td>
                  <td>
                    <div>
                      <p className="font-medium text-slate-800">{a.name}</p>
                      <p className="text-xs text-slate-400">{a.contact}</p>
                    </div>
                  </td>
                  <td className="text-xs text-slate-500">{a.type}</td>
                  <td className="text-xs text-slate-400">{a.submitted}</td>
                  <td>{a.listings}</td>
                  <td><Badge variant={s.variant} dot>{s.label}</Badge></td>
                  <td>
                    <div className="flex gap-1">
                      <Tooltip content="Review application" position="top">
                        <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button>
                      </Tooltip>
                      {a.status === 'pending' || a.status === 'reviewing' ? (
                        <>
                          <Tooltip content="Approve" position="top">
                            <button className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"><CheckCircle className="w-3.5 h-3.5" /></button>
                          </Tooltip>
                          <Tooltip content="Reject" position="top">
                            <button className="p-1 text-red-600 hover:bg-red-50 rounded"><XCircle className="w-3.5 h-3.5" /></button>
                          </Tooltip>
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdvertisingView() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Campaigns" value="6" icon={<Megaphone className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Total Impressions" value="84.2K" change="This month" icon={<Eye className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
        <StatCard label="Click-through Rate" value="3.4%" change="+0.8% vs last" changeType="up" icon={<BarChart3 className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Ad Spend" value="$2,840" sub="This month" icon={<Megaphone className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
      </div>

      <div className="flex items-center justify-between">
        <p className="section-title">Active Campaigns</p>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New campaign</Button>
      </div>
      <div className="space-y-3">
        {[
          { name: 'Summer Getaway Spotlight', type: 'Sponsored Listing', budget: '$800/mo', impressions: '24.1K', ctr: '4.2%', spend: '$640', status: 'active' },
          { name: 'Desert Retreat Feature', type: 'Featured Placement', budget: '$400/mo', impressions: '12.8K', ctr: '2.8%', spend: '$320', status: 'active' },
          { name: 'Flash Sale — July 4th', type: 'Promoted Campaign', budget: '$200', impressions: '8.4K', ctr: '6.1%', spend: '$200', status: 'completed' },
        ].map((c) => (
          <div key={c.name} className="card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
              <Megaphone className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">{c.name}</p>
              <p className="text-xs text-slate-500">{c.type} · Budget: {c.budget}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center flex-shrink-0">
              <div><p className="text-xs text-slate-400">Impressions</p><p className="text-sm font-semibold text-slate-800">{c.impressions}</p></div>
              <div><p className="text-xs text-slate-400">CTR</p><p className="text-sm font-semibold text-emerald-600">{c.ctr}</p></div>
              <div><p className="text-xs text-slate-400">Spend</p><p className="text-sm font-semibold text-slate-800">{c.spend}</p></div>
            </div>
            <Badge variant={c.status === 'active' ? 'success' : 'neutral'} dot>{c.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformHealth() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Platform Uptime" value="99.98%" change="30 days" changeType="up" icon={<ShieldCheck className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Active Vendors" value="284" change="+12 this month" changeType="up" icon={<Store className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="GMV (30d)" value="$1.24M" change="+21.4% vs last" changeType="up" icon={<BarChart3 className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
        <StatCard label="Churn Rate" value="1.8%" change="Vendors/month" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header"><p className="section-title">Vendor Growth</p></div>
          <div className="card-body">
            <div className="flex items-end gap-2 h-32">
              {[180, 195, 201, 218, 228, 241, 256, 270, 284].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-sky-500 rounded-t" style={{ height: `${(v / 284) * 112}px` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><p className="section-title">Moderation Queue</p></div>
          <div className="card-body space-y-2">
            {[
              { type: 'New listing review', count: 14, priority: 'normal' },
              { type: 'Reported content', count: 3, priority: 'high' },
              { type: 'Vendor appeals', count: 2, priority: 'medium' },
              { type: 'Policy violations', count: 1, priority: 'high' },
            ].map((m) => (
              <div key={m.type} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-700">{m.type}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{m.count}</span>
                  <Badge variant={m.priority === 'high' ? 'danger' : m.priority === 'medium' ? 'warning' : 'neutral'} size="sm">{m.priority}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const subTabs = [
  { id: '/marketplace/applications', label: 'Vendor Applications' },
  { id: '/marketplace/directory', label: 'Vendor Directory' },
  { id: '/marketplace/claims', label: 'Claims' },
  { id: '/marketplace/commissions', label: 'Commissions' },
  { id: '/marketplace/moderation', label: 'Moderation' },
  { id: '/marketplace/advertising', label: 'Advertising' },
  { id: '/marketplace/health', label: 'Platform Health' },
];

export default function Marketplace() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = subTabs.find((t) => location.pathname.startsWith(t.id))?.id || '/marketplace/applications';

  return (
    <div className="min-h-full">
      <div className="page-header">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Marketplace</h1>
            <p className="text-sm text-slate-500 mt-0.5">Platform administration — vendors, moderation, ads, and health</p>
          </div>
          <Badge variant="info" dot>Platform Admin</Badge>
        </div>
        <div className="tab-nav overflow-x-auto">
          {subTabs.map((t) => (
            <button key={t.id} className={`tab-item flex-shrink-0 ${active === t.id ? 'active' : ''}`} onClick={() => navigate(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<ApplicationsView />} />
        <Route path="/applications" element={<ApplicationsView />} />
        <Route path="/advertising" element={<AdvertisingView />} />
        <Route path="/health" element={<PlatformHealth />} />
        <Route path="/*" element={<ApplicationsView />} />
      </Routes>
    </div>
  );
}
