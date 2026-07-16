import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Bell, CreditCard, Globe, Key, Plug, Users, Building2, FileText, Trash2, ChevronRight, ToggleLeft, ToggleRight, Edit, Plus } from 'lucide-react';
import { Badge, Button, Tooltip } from '../components/ui';

const settingsSections = [
  { id: '/settings/profile', label: 'Business Profile', icon: Building2, desc: 'Legal entity, branding, contact info' },
  { id: '/settings/users', label: 'Users', icon: Users, desc: 'Manage team members and access' },
  { id: '/settings/roles', label: 'Roles & Permissions', icon: Shield, desc: 'Granular RBAC configuration' },
  { id: '/settings/payments', label: 'Payments', icon: CreditCard, desc: 'Payment methods, gateways, and settings' },
  { id: '/settings/taxes', label: 'Taxes', icon: FileText, desc: 'Tax rates, remittance, and exemptions' },
  { id: '/settings/notifications', label: 'Notifications', icon: Bell, desc: 'Email, SMS, and push preferences' },
  { id: '/settings/integrations', label: 'Integrations', icon: Plug, desc: 'OTAs, calendars, CRMs, and webhooks' },
  { id: '/settings/security', label: 'Security', icon: Shield, desc: '2FA, sessions, API keys, audit log' },
  { id: '/settings/api', label: 'API Keys', icon: Key, desc: 'Manage API keys and webhooks' },
  { id: '/settings/subscription', label: 'Subscription', icon: CreditCard, desc: 'Plan, billing, and add-ons' },
  { id: '/settings/legal', label: 'Legal & Privacy', icon: FileText, desc: 'Terms, privacy, data export, deletion' },
];

function SettingsNav({ active }: { active: string }) {
  const navigate = useNavigate();
  return (
    <div className="w-64 border-r border-slate-200 bg-white flex-shrink-0 min-h-full">
      <div className="p-4 space-y-0.5">
        {settingsSections.map((s) => {
          const Icon = s.icon;
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => navigate(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">{s.label}</span>
              <ChevronRight className={`w-3.5 h-3.5 ml-auto ${isActive ? 'text-sky-500' : 'text-slate-300'}`} />
            </button>
          );
        })}
        <div className="pt-4 border-t border-slate-200 mt-4">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">Delete account</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Business Profile</h2>
        <p className="text-sm text-slate-500">Your legal entity information and branding.</p>
      </div>
      <div className="space-y-4">
        {[
          { label: 'Business Name', value: 'Planviry Hospitality LLC', type: 'text' },
          { label: 'Email', value: 'contact@planviry.com', type: 'email' },
          { label: 'Phone', value: '+1 (555) 842-9100', type: 'tel' },
          { label: 'Website', value: 'https://planviry.com', type: 'url' },
          { label: 'Business Address', value: '420 Ocean Drive, Miami FL 33139', type: 'text' },
          { label: 'EIN', value: '••-•••4821', type: 'text' },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{f.label}</label>
            <input type={f.type} defaultValue={f.value} className="input" />
          </div>
        ))}
        <div className="pt-4">
          <Button variant="primary">Save changes</Button>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    booking_confirm: true, booking_cancel: true, payment_received: true,
    payment_failed: true, review_new: true, message_new: true,
    task_assigned: false, report_weekly: true,
  });

  const groups = [
    { heading: 'Bookings', items: [
      { id: 'booking_confirm', label: 'Booking confirmed', sub: 'Email + SMS + Push' },
      { id: 'booking_cancel', label: 'Booking cancelled', sub: 'Email + SMS' },
    ]},
    { heading: 'Payments', items: [
      { id: 'payment_received', label: 'Payment received', sub: 'Email' },
      { id: 'payment_failed', label: 'Payment failed', sub: 'Email + Push' },
    ]},
    { heading: 'Communications', items: [
      { id: 'review_new', label: 'New review received', sub: 'Email + Push' },
      { id: 'message_new', label: 'New message', sub: 'Push' },
    ]},
    { heading: 'Operations', items: [
      { id: 'task_assigned', label: 'Task assigned to me', sub: 'Push' },
      { id: 'report_weekly', label: 'Weekly performance report', sub: 'Email' },
    ]},
  ];

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Notification Preferences</h2>
        <p className="text-sm text-slate-500">Choose what you get notified about and how.</p>
      </div>
      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g.heading}>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{g.heading}</p>
            <div className="card divide-y divide-slate-100">
              {g.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                  </div>
                  <Tooltip content={toggles[item.id] ? 'Disable' : 'Enable'} position="left">
                    <button
                      onClick={() => setToggles((t) => ({ ...t, [item.id]: !t[item.id] }))}
                      className={`transition-colors ${toggles[item.id] ? 'text-sky-600' : 'text-slate-300'}`}
                    >
                      {toggles[item.id] ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsSettings() {
  return (
    <div className="p-8 max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Integrations</h2>
        <p className="text-sm text-slate-500">Connect your tools, OTAs, calendars, and external services.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: 'Airbnb', type: 'OTA', connected: true, icon: '🏠' },
          { name: 'Booking.com', type: 'OTA', connected: false, icon: '🏨' },
          { name: 'Google Calendar', type: 'Calendar', connected: true, icon: '📅' },
          { name: 'iCal', type: 'Calendar', connected: false, icon: '📆' },
          { name: 'Stripe', type: 'Payments', connected: true, icon: '💳' },
          { name: 'Mailchimp', type: 'Email Marketing', connected: false, icon: '📧' },
          { name: 'Zapier', type: 'Automation', connected: true, icon: '⚡' },
          { name: 'Slack', type: 'Communications', connected: false, icon: '💬' },
        ].map((intg) => (
          <div key={intg.name} className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xl flex-shrink-0">
              {intg.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">{intg.name}</p>
              <p className="text-xs text-slate-400">{intg.type}</p>
            </div>
            {intg.connected ? (
              <div className="flex items-center gap-2">
                <Badge variant="success" dot>Connected</Badge>
                <Button variant="ghost" size="sm">Manage</Button>
              </div>
            ) : (
              <Button variant="secondary" size="sm" icon={<Plug className="w-3.5 h-3.5" />}>Connect</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Security</h2>
        <p className="text-sm text-slate-500">2FA, sessions, and account security settings.</p>
      </div>
      <div className="card divide-y divide-slate-100">
        {[
          { title: 'Two-factor authentication', desc: 'Add an extra layer of security to your account', enabled: true },
          { title: 'Login notifications', desc: 'Get notified of new sign-ins from unrecognized devices', enabled: true },
          { title: 'Session timeout', desc: 'Automatically log out after 8 hours of inactivity', enabled: false },
        ].map((s) => (
          <div key={s.title} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">{s.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
            </div>
            <Badge variant={s.enabled ? 'success' : 'neutral'} dot>{s.enabled ? 'Enabled' : 'Disabled'}</Badge>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><p className="section-title">Active Sessions</p></div>
        <div className="divide-y divide-slate-100">
          {[
            { device: 'MacBook Pro — Chrome', location: 'Miami, FL', last: 'Active now', current: true },
            { device: 'iPhone 15 Pro — Safari', location: 'Miami, FL', last: '2 hours ago', current: false },
          ].map((s) => (
            <div key={s.device} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                  {s.device}
                  {s.current && <Badge variant="success" size="sm">Current</Badge>}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{s.location} · {s.last}</p>
              </div>
              {!s.current && <Button variant="danger" size="sm">Revoke</Button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SubscriptionSettings() {
  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Subscription & Billing</h2>
        <p className="text-sm text-slate-500">Manage your plan, payment method, and invoices.</p>
      </div>
      <div className="bg-gradient-to-br from-sky-600 to-sky-700 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sky-200 text-sm">Current plan</p>
            <p className="text-2xl font-bold mt-1">Pro Vendor</p>
            <p className="text-sky-200 text-sm mt-1">$199/month · Renews Aug 1, 2025</p>
          </div>
          <Button variant="secondary" size="sm" className="border-white/20 text-white hover:bg-white/10">Upgrade</Button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
          <div><p className="text-sky-200 text-xs">Listings</p><p className="font-bold">10 / 25</p></div>
          <div><p className="text-sky-200 text-xs">Team seats</p><p className="font-bold">4 / 10</p></div>
          <div><p className="text-sky-200 text-xs">API calls</p><p className="font-bold">42K / 100K</p></div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><p className="section-title">Billing History</p></div>
        <table className="data-table">
          <thead>
            <tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {[
              { date: 'Jul 1', desc: 'Pro Vendor — July 2025', amount: '$199', status: 'paid' },
              { date: 'Jun 1', desc: 'Pro Vendor — June 2025', amount: '$199', status: 'paid' },
              { date: 'May 1', desc: 'Pro Vendor — May 2025', amount: '$199', status: 'paid' },
            ].map((b) => (
              <tr key={b.date}>
                <td className="text-xs text-slate-400">{b.date}</td>
                <td className="text-slate-700">{b.desc}</td>
                <td className="font-semibold text-slate-800">{b.amount}</td>
                <td><Badge variant="success" dot>Paid</Badge></td>
                <td><Button variant="ghost" size="sm">Download</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const subTabs = settingsSections.map((s) => ({ id: s.id, label: s.label }));

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = subTabs.find((t) => location.pathname.startsWith(t.id))?.id || '/settings/profile';

  return (
    <div className="min-h-full">
      <div className="page-header">
        <h1 className="text-xl font-semibold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account, team, integrations, and platform configuration</p>
      </div>
      <div className="flex min-h-[calc(100vh-8rem)]">
        <SettingsNav active={active} />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<ProfileSettings />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/notifications" element={<NotificationSettings />} />
            <Route path="/integrations" element={<IntegrationsSettings />} />
            <Route path="/security" element={<SecuritySettings />} />
            <Route path="/subscription" element={<SubscriptionSettings />} />
            <Route path="/*" element={<ProfileSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
