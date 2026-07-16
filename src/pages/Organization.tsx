import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Plus, Search, MoreHorizontal, Building2, MapPin, Users, Shield, UserPlus, Mail, Edit, Trash2 } from 'lucide-react';
import { Badge, Button, Tooltip } from '../components/ui';

const people = [
  { id: 1, name: 'James Doe', email: 'james@planviry.com', role: 'Owner', type: 'team', status: 'active', joined: 'Jan 2023' },
  { id: 2, name: 'Jessica Reyes', email: 'jessica@planviry.com', role: 'Manager', type: 'team', status: 'active', joined: 'Mar 2023' },
  { id: 3, name: 'Tom Walsh', email: 'tom@planviry.com', role: 'Staff', type: 'team', status: 'active', joined: 'Jun 2023' },
  { id: 4, name: 'Ana Lima', email: 'ana@planviry.com', role: 'Contractor', type: 'team', status: 'inactive', joined: 'Sep 2023' },
  { id: 5, name: 'Sophia Martinez', email: 'sophia@gmail.com', role: 'Guest', type: 'guest', status: 'active', joined: 'Feb 2024' },
  { id: 6, name: 'Marcus Chen', email: 'marcus@corp.com', role: 'Guest', type: 'guest', status: 'active', joined: 'Apr 2024' },
];

const invites = [
  { email: 'new.staff@email.com', role: 'Staff', sent: 'Jul 10', expires: 'Jul 24', status: 'pending' },
  { email: 'manager2@email.com', role: 'Manager', sent: 'Jul 8', expires: 'Jul 22', status: 'accepted' },
];

function BusinessProfile() {
  return (
    <div className="p-6 max-w-3xl space-y-6">
      <div className="card">
        <div className="card-header">
          <p className="section-title">Business Information</p>
          <Button variant="primary" size="sm" icon={<Edit className="w-3.5 h-3.5" />}>Edit</Button>
        </div>
        <div className="card-body space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-sky-600 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Planviry Hospitality LLC</h2>
              <p className="text-sm text-slate-500">Premium vacation rentals & experiences</p>
              <Badge variant="success" dot className="mt-1">Verified</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            {[
              { label: 'Legal Entity', value: 'LLC' },
              { label: 'EIN', value: '••-•••4821' },
              { label: 'Business Type', value: 'Hospitality & Tourism' },
              { label: 'Founded', value: '2021' },
              { label: 'Primary Currency', value: 'USD' },
              { label: 'Tax Status', value: 'Active' },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-xs text-slate-400">{f.label}</p>
                <p className="text-sm font-medium text-slate-800 mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PeopleView() {
  const [tab, setTab] = useState<'team' | 'guests' | 'contacts'>('team');
  const filtered = people.filter((p) => tab === 'team' ? p.type === 'team' : p.type === 'guest');

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-2">
        {(['team', 'guests', 'contacts'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${tab === t ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {t}
          </button>
        ))}
        <div className="ml-auto">
          <Button variant="primary" size="sm" icon={<UserPlus className="w-3.5 h-3.5" />}>Invite member</Button>
        </div>
      </div>
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      {p.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span className="font-medium text-slate-800">{p.name}</span>
                  </div>
                </td>
                <td className="text-slate-500 text-xs">{p.email}</td>
                <td>
                  <span className={`pill text-xs font-medium ${p.role === 'Owner' ? 'bg-sky-50 text-sky-700' : p.role === 'Manager' ? 'bg-violet-50 text-violet-700' : 'bg-slate-100 text-slate-600'}`}>
                    {p.role}
                  </span>
                </td>
                <td><Badge variant={p.status === 'active' ? 'success' : 'neutral'} dot>{p.status}</Badge></td>
                <td className="text-xs text-slate-400">{p.joined}</td>
                <td>
                  <div className="flex gap-1">
                    <Tooltip content="Edit" position="top"><button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Edit className="w-3.5 h-3.5" /></button></Tooltip>
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

function TeamsView() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { name: 'Operations', members: 4, lead: 'Jessica Reyes', roles: ['Manager', 'Staff', 'Staff', 'Contractor'] },
          { name: 'Housekeeping', members: 3, lead: 'Ana Lima', roles: ['Lead', 'Staff', 'Staff'] },
          { name: 'Guest Relations', members: 2, lead: 'Tom Walsh', roles: ['Manager', 'Staff'] },
        ].map((team) => (
          <div key={team.name} className="card">
            <div className="card-header">
              <div>
                <p className="section-title">{team.name}</p>
                <p className="section-sub">{team.members} members</p>
              </div>
              <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
            </div>
            <div className="card-body">
              <p className="text-xs text-slate-400 mb-2">Team Lead</p>
              <p className="text-sm font-medium text-slate-800 mb-3">{team.lead}</p>
              <p className="text-xs text-slate-400 mb-2">Roles</p>
              <div className="flex flex-wrap gap-1">
                {team.roles.map((r, i) => (
                  <span key={i} className="pill bg-slate-100 text-slate-600 text-xs">{r}</span>
                ))}
              </div>
              <Button variant="secondary" size="sm" className="mt-4 w-full justify-center" icon={<UserPlus className="w-3.5 h-3.5" />}>
                Add member
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvitesView() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">2 pending invites</p>
        <Button variant="primary" size="sm" icon={<Mail className="w-3.5 h-3.5" />}>Send invite</Button>
      </div>
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr><th>Email</th><th>Role</th><th>Sent</th><th>Expires</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {invites.map((inv) => (
              <tr key={inv.email}>
                <td className="text-slate-700">{inv.email}</td>
                <td><span className="pill bg-slate-100 text-slate-600 text-xs">{inv.role}</span></td>
                <td className="text-xs text-slate-400">{inv.sent}</td>
                <td className="text-xs text-slate-400">{inv.expires}</td>
                <td><Badge variant={inv.status === 'accepted' ? 'success' : 'warning'} dot>{inv.status}</Badge></td>
                <td>
                  <div className="flex gap-1">
                    <Button variant="secondary" size="sm">Resend</Button>
                    <Button variant="ghost" size="sm">Revoke</Button>
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

const subTabs = [
  { id: '/organization/profile', label: 'Business Profile' },
  { id: '/organization/locations', label: 'Locations' },
  { id: '/organization/people', label: 'People' },
  { id: '/organization/teams', label: 'Teams' },
  { id: '/organization/guests', label: 'Guest Profiles' },
  { id: '/organization/invites', label: 'Invites' },
];

export default function Organization() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = subTabs.find((t) => location.pathname.startsWith(t.id))?.id || '/organization/profile';

  return (
    <div className="min-h-full">
      <div className="page-header">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Organization</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage your business, teams, people, and guests</p>
          </div>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>Add</Button>
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
        <Route path="/" element={<BusinessProfile />} />
        <Route path="/profile" element={<BusinessProfile />} />
        <Route path="/people" element={<PeopleView />} />
        <Route path="/guests" element={<PeopleView />} />
        <Route path="/teams" element={<TeamsView />} />
        <Route path="/invites" element={<InvitesView />} />
        <Route path="/*" element={<BusinessProfile />} />
      </Routes>
    </div>
  );
}
