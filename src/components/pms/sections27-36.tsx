import { useState } from 'react';
import {
  Users, Plus, Search, FileText, Download, Eye, Upload,
  CheckCircle, XCircle, Clock, AlertTriangle, MessageSquare,
  Lock, UserCircle, Phone, Mail, MapPin, Star, PenTool,
  Flag, Shield, Calendar, DollarSign, CreditCard,
} from 'lucide-react';
import { Badge, Button, StatCard, Tabs } from '../ui';
import { SectionShell, StatusBadge, InfoRow, StepIndicator, ProgressBar } from './shared';

// 27. Tenant Directory
export function TenantDirectoryView() {
  const tenants = [
    { id: 'T-001', name: 'Sophia Martinez', email: 'sophia@mail.com', phone: '+1 (555) 101-2000', unit: '101', lease: 'Active', rent: '$2,200', balance: '$0' },
    { id: 'T-002', name: 'Marcus Chen', email: 'marcus@mail.com', phone: '+1 (555) 102-3000', unit: '102', lease: 'Active', rent: '$2,800', balance: '$0' },
    { id: 'T-003', name: 'Aisha Patel', email: 'aisha@mail.com', phone: '+1 (555) 103-4000', unit: '201', lease: 'Active', rent: '$2,200', balance: '$1,100' },
    { id: 'T-004', name: 'David Kim', email: 'david@mail.com', phone: '+1 (555) 104-5000', unit: '301', lease: 'Active', rent: '$5,400', balance: '$0' },
    { id: 'T-005', name: 'Liam Torres', email: 'liam@mail.com', phone: '+1 (555) 105-6000', unit: '—', lease: 'Expired', rent: '—', balance: '$0' },
    { id: 'T-006', name: 'Emma Wilson', email: 'emma@mail.com', phone: '+1 (555) 106-7000', unit: '205', lease: 'Active', rent: '$2,800', balance: '$2,800' },
  ];
  return (
    <SectionShell title="Tenant Directory" description="Searchable and sortable data table"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Tenant</Button>}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Tenants" value="142" icon={<Users className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Active Leases" value="128" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Past Due" value="8" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Pending Apps" value="4" icon={<Clock className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
      </div>
      <div className="card overflow-hidden">
        <div className="card-header">
          <div className="relative w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" /><input className="input pl-9 h-8 text-xs" placeholder="Search tenants..." /></div>
          <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>
        </div>
        <table className="data-table">
          <thead><tr><th>ID</th><th>Name</th><th>Contact</th><th>Unit</th><th>Lease</th><th>Rent</th><th>Balance</th><th></th></tr></thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.id} className={t.balance !== '$0' ? 'bg-red-50/20' : ''}>
                <td><span className="font-mono text-xs text-slate-400">{t.id}</span></td>
                <td className="font-medium text-slate-800">{t.name}</td>
                <td><div className="text-xs"><p className="text-slate-600">{t.email}</p><p className="text-slate-400">{t.phone}</p></div></td>
                <td>{t.unit}</td>
                <td><StatusBadge status={t.lease === 'Active' ? 'active' : 'expired'} /></td>
                <td className="font-medium text-slate-700">{t.rent}</td>
                <td className={t.balance !== '$0' ? 'text-red-600 font-bold' : 'text-emerald-600'}>{t.balance}</td>
                <td><button className="p-1 text-slate-400 hover:text-slate-700"><Eye className="w-3.5 h-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 28. Tenant Profile Page
export function TenantProfileView() {
  const [tab, setTab] = useState('overview');
  const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'lease', label: 'Lease History' }, { id: 'payments', label: 'Payment History' }];
  return (
    <SectionShell title="Tenant Profile Page" description="Contact info, lease history, payment history tabs">
      <div className="card p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">SM</div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-slate-800">Sophia Martinez</p>
            <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" />sophia@mail.com</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" />+1 (555) 101-2000</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />Unit 101, Oceanview Condos</span>
            </div>
          </div>
          <Badge variant="success" dot>Active Tenant</Badge>
        </div>
      </div>
      <div className="card">
        <div className="tab-nav">{tabs.map((t) => <button key={t.id} className={`tab-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>)}</div>
        <div className="p-6">
          {tab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div><InfoRow label="Tenant ID" value="T-001" /><InfoRow label="Move-in Date" value="Jan 15, 2024" /><InfoRow label="Lease End" value="Dec 31, 2025" /><InfoRow label="Monthly Rent" value="$2,200" /><InfoRow label="Security Deposit" value="$2,200" /><InfoRow label="Balance Due" value="$0.00" /></div>
              <div><p className="text-xs font-semibold text-slate-400 uppercase mb-2">Emergency Contacts</p><div className="space-y-2"><div className="p-3 bg-slate-50 rounded-lg"><p className="text-sm font-medium text-slate-800">Carlos Martinez</p><p className="text-xs text-slate-400">Brother · +1 (555) 200-3000</p></div><div className="p-3 bg-slate-50 rounded-lg"><p className="text-sm font-medium text-slate-800">Elena Martinez</p><p className="text-xs text-slate-400">Mother · +1 (555) 300-4000</p></div></div></div>
            </div>
          )}
          {tab === 'lease' && (
            <table className="data-table">
              <thead><tr><th>Lease ID</th><th>Unit</th><th>Start</th><th>End</th><th>Rent</th><th>Status</th></tr></thead>
              <tbody>
                {[{ id: 'L-2024-001', unit: '101', start: 'Jan 2024', end: 'Dec 2025', rent: '$2,200', status: 'active' }, { id: 'L-2023-045', unit: '103', start: 'Jun 2023', end: 'May 2024', rent: '$1,800', status: 'expired' }].map((l) => (
                  <tr key={l.id}><td className="font-mono text-xs">{l.id}</td><td>{l.unit}</td><td className="text-xs">{l.start}</td><td className="text-xs">{l.end}</td><td>{l.rent}</td><td><StatusBadge status={l.status as any} /></td></tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === 'payments' && (
            <table className="data-table">
              <thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
              <tbody>
                {[['Jul 1, 2025', '$2,200', 'ACH', 'paid'], ['Jun 1, 2025', '$2,200', 'ACH', 'paid'], ['May 1, 2025', '$2,200', 'Card', 'paid'], ['Apr 1, 2025', '$2,200', 'ACH', 'paid']].map((p, i) => (
                  <tr key={i}><td className="text-xs">{p[0]}</td><td className="font-medium">{p[1]}</td><td className="text-xs">{p[2]}</td><td><StatusBadge status={p[3] as any} /></td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </SectionShell>
  );
}

// 29. Tenant Application Form
export function TenantAppView() {
  const [step, setStep] = useState(1);
  const steps = ['Personal', 'Employment', 'Documents', 'Review'];
  return (
    <SectionShell title="Tenant Application Form" description="Multi-step form with document uploads (ID, income proof)">
      <div className="card p-6">
        <div className="mb-6"><StepIndicator steps={steps} current={step} /></div>
        {step === 0 && (
          <div className="space-y-4 max-w-xl">
            <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">First Name</label><input className="input" /></div><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Last Name</label><input className="input" /></div></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Email</label><input className="input" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Phone</label><input className="input" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Current Address</label><input className="input" /></div>
            <Button variant="primary" onClick={() => setStep(1)}>Next</Button>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4 max-w-xl">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Employer</label><input className="input" /></div>
            <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Position</label><input className="input" /></div><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Annual Income</label><input className="input" placeholder="$65,000" /></div></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Employment Duration</label><input className="input" placeholder="2 years" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Supervisor Contact</label><input className="input" /></div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep(0)}>Back</Button><Button variant="primary" onClick={() => setStep(2)}>Next</Button></div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4 max-w-xl">
            <p className="text-sm font-medium text-slate-700">Upload Required Documents</p>
            {[['Government ID', 'Driver license or passport'], ['Income Proof', 'Last 2 pay stubs or W-2'], ['Bank Statement', 'Last 30 days'], ['References', 'Previous landlord letter']].map(([label, hint]) => (
              <div key={label} className="border-2 border-dashed border-slate-200 rounded-lg p-4 hover:border-sky-300 transition-colors cursor-pointer">
                <div className="flex items-center gap-3"><Upload className="w-5 h-5 text-slate-400" /><div><p className="text-sm font-medium text-slate-700">{label}</p><p className="text-xs text-slate-400">{hint}</p></div></div>
              </div>
            ))}
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep(1)}>Back</Button><Button variant="primary" onClick={() => setStep(3)}>Next</Button></div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4 max-w-xl">
            <p className="text-sm font-medium text-slate-700">Review Application</p>
            <div className="card bg-slate-50 p-4 space-y-2"><InfoRow label="Name" value="John Smith" /><InfoRow label="Email" value="john@mail.com" /><InfoRow label="Income" value="$65,000/yr" /><InfoRow label="Documents" value="4 uploaded" /></div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep(2)}>Back</Button><Button variant="primary" icon={<CheckCircle className="w-4 h-4" />}>Submit Application</Button></div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}

// 30. Tenant Screening Status
export function ScreeningView() {
  return (
    <SectionShell title="Tenant Screening Status" description="Progress tracker (submitted → background check → approved)">
      <div className="space-y-3">
        {[
          { name: 'John Smith', app: 'APP-024', stage: 3, status: 'approved' },
          { name: 'Lisa Park', app: 'APP-023', stage: 2, status: 'pending' },
          { name: 'Tom Reed', app: 'APP-022', stage: 1, status: 'pending' },
          { name: 'Anna Lee', app: 'APP-021', stage: 0, status: 'pending' },
          { name: 'Bob Cole', app: 'APP-020', stage: 2, status: 'denied' },
        ].map((t) => {
          const stages = ['Submitted', 'Background Check', 'Credit Check', 'Approved'];
          return (
            <div key={t.app} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold">{t.name.split(' ').map(n => n[0]).join('')}</div><div><p className="text-sm font-semibold text-slate-800">{t.name}</p><p className="text-xs text-slate-400 font-mono">{t.app}</p></div></div>
                <StatusBadge status={t.status as any} />
              </div>
              <div className="flex items-center gap-1">
                {stages.map((s, i) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < t.stage ? 'bg-emerald-500 text-white' : i === t.stage && t.status === 'approved' ? 'bg-emerald-500 text-white' : i === t.stage ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'}`}>{i < t.stage || (i === t.stage && t.status === 'approved') ? '✓' : i + 1}</div>
                      <span className="text-[10px] text-slate-500 mt-1">{s}</span>
                    </div>
                    {i < stages.length - 1 && <div className={`h-px flex-1 mx-1 ${i < t.stage ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

// 31. Tenant Communication Log
export function CommLogView() {
  return (
    <SectionShell title="Tenant Communication Log" description="Timeline/thread view of messages">
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold">SM</div><div><p className="text-sm font-semibold text-slate-800">Sophia Martinez</p><p className="text-xs text-slate-400">Unit 101 · 8 messages</p></div></div>
        <div className="space-y-4">
          {[
            { from: 'tenant', msg: 'Hi, the AC in unit 101 is not cooling properly.', time: 'Jul 14, 2:30 PM' },
            { from: 'manager', msg: 'Thanks for letting us know. I\'ll send a technician tomorrow morning.', time: 'Jul 14, 3:15 PM' },
            { from: 'tenant', msg: 'Perfect, I\'ll be home after 9 AM.', time: 'Jul 14, 3:20 PM' },
            { from: 'manager', msg: 'Technician scheduled for 10 AM tomorrow. Ticket #WO-042.', time: 'Jul 14, 4:00 PM' },
            { from: 'tenant', msg: 'AC is working great now. Thank you!', time: 'Jul 15, 1:00 PM' },
          ].map((m, i) => (
            <div key={i} className={`flex ${m.from === 'tenant' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[70%] ${m.from === 'tenant' ? 'bg-slate-100' : 'bg-sky-500 text-white'} rounded-2xl px-4 py-2.5`}>
                <p className="text-sm">{m.msg}</p>
                <p className={`text-[10px] mt-1 ${m.from === 'tenant' ? 'text-slate-400' : 'text-sky-100'}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
          <input className="input flex-1" placeholder="Type a message..." />
          <Button variant="primary" icon={<MessageSquare className="w-4 h-4" />}>Send</Button>
        </div>
      </div>
    </SectionShell>
  );
}

// 32. Tenant Document Vault
export function DocVaultView() {
  return (
    <SectionShell title="Tenant Document Vault" description="Secure file storage with access permissions"
      actions={<Button variant="primary" size="sm" icon={<Upload className="w-3.5 h-3.5" />}>Upload</Button>}>
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead><tr><th>Document</th><th>Category</th><th>Uploaded</th><th>Access</th><th></th></tr></thead>
          <tbody>
            {[
              { name: 'Lease Agreement.pdf', cat: 'Lease', date: 'Jan 15, 2024', access: 'Tenant + Manager' },
              { name: 'Driver License.jpg', cat: 'ID', date: 'Jan 10, 2024', access: 'Manager only' },
              { name: 'Pay Stub Dec.pdf', cat: 'Income', date: 'Jan 12, 2024', access: 'Manager only' },
              { name: 'Move-in Checklist.pdf', cat: 'Inspection', date: 'Jan 15, 2024', access: 'Tenant + Manager' },
              { name: 'Renters Insurance.pdf', cat: 'Insurance', date: 'Jan 20, 2024', access: 'Tenant + Manager' },
            ].map((d) => (
              <tr key={d.name}>
                <td className="flex items-center gap-2 font-medium text-slate-800"><FileText className="w-4 h-4 text-slate-400" />{d.name}</td>
                <td><span className="pill bg-sky-50 text-sky-700 text-xs">{d.cat}</span></td>
                <td className="text-xs text-slate-400">{d.date}</td>
                <td className="text-xs text-slate-600"><Lock className="w-3 h-3 inline mr-1" />{d.access}</td>
                <td><div className="flex gap-1"><button className="p-1 text-slate-400 hover:text-slate-700"><Eye className="w-3.5 h-3.5" /></button><button className="p-1 text-slate-400 hover:text-slate-700"><Download className="w-3.5 h-3.5" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 33. Tenant Portal (Self-Service)
export function TenantPortalView() {
  return (
    <SectionShell title="Tenant Portal (Self-Service)" description="Separate dashboard for tenants (pay rent, submit requests)">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Next Payment" value="$2,200" sub="Due Aug 1" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Lease Ends" value="Dec 31" sub="5 months left" icon={<Calendar className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Open Requests" value="1" icon={<MessageSquare className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Balance" value="$0.00" icon={<CreditCard className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-6"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><DollarSign className="w-5 h-5" /></div><p className="text-sm font-semibold text-slate-800">Pay Rent</p></div><div className="space-y-3"><div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between"><div><p className="text-sm font-medium text-slate-800">July Rent</p><p className="text-xs text-slate-400">Due Jul 1 · $2,200</p></div><Badge variant="success" size="sm" dot>Paid</Badge></div><Button variant="primary" className="w-full">Pay Next Month</Button></div></div>
        <div className="card p-6"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><MessageSquare className="w-5 h-5" /></div><p className="text-sm font-semibold text-slate-800">Submit Request</p></div><div className="space-y-2"><div className="p-3 bg-slate-50 rounded-lg"><p className="text-sm font-medium text-slate-800">AC Repair — Unit 101</p><p className="text-xs text-slate-400 mt-0.5">Submitted Jul 14 · In Progress</p></div><Button variant="secondary" className="w-full">New Maintenance Request</Button></div></div>
      </div>
    </SectionShell>
  );
}

// 34. Emergency Contact Management
export function EmergencyContactsView() {
  return (
    <SectionShell title="Emergency Contact Management" description="Repeatable form fields">
      <div className="card p-6 max-w-2xl">
        <div className="space-y-3">
          {[
            { name: 'Carlos Martinez', rel: 'Brother', phone: '+1 (555) 200-3000', email: 'carlos@mail.com' },
            { name: 'Elena Martinez', rel: 'Mother', phone: '+1 (555) 300-4000', email: 'elena@mail.com' },
          ].map((c, i) => (
            <div key={i} className="flex items-end gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label><input className="input" defaultValue={c.name} /></div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Relationship</label><input className="input" defaultValue={c.rel} /></div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Phone</label><input className="input" defaultValue={c.phone} /></div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email</label><input className="input" defaultValue={c.email} /></div>
              </div>
              <Button variant="ghost" size="sm" icon={<XCircle className="w-3.5 h-3.5" />}>Remove</Button>
            </div>
          ))}
        </div>
        <Button variant="secondary" size="sm" className="mt-3" icon={<Plus className="w-3.5 h-3.5" />}>Add Contact</Button>
        <div className="mt-4 pt-4 border-t border-slate-100"><Button variant="primary">Save Contacts</Button></div>
      </div>
    </SectionShell>
  );
}

// 35. Move-in/Move-out Checklist
export function MoveChecklistView() {
  const [type, setType] = useState('movein');
  return (
    <SectionShell title="Move-in / Move-out Checklist" description="Interactive checklist with signature capture">
      <div className="card p-6">
        <div className="flex gap-2 mb-4"><button onClick={() => setType('movein')} className={`px-4 py-2 rounded-lg text-sm font-medium ${type === 'movein' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'}`}>Move-In</button><button onClick={() => setType('moveout')} className={`px-4 py-2 rounded-lg text-sm font-medium ${type === 'moveout' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'}`}>Move-Out</button></div>
        <div className="space-y-2">
          {['Living room — walls clean, no damage', 'Kitchen — appliances working, clean', 'Bedroom — carpet/floors clean', 'Bathroom — fixtures working, caulk intact', 'Balcony — railing secure, clean', 'Smoke detectors tested', 'Keys handed over (2 sets)', 'Parking pass assigned'].map((item, i) => (
            <label key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
              <input type="checkbox" defaultChecked={Math.random() > 0.4} className="w-5 h-5 rounded" />
              <span className="text-sm text-slate-700 flex-1">{item}</span>
              <span className="text-xs text-slate-400">Notes</span>
              <input className="input h-7 w-32 text-xs" placeholder="Add note..." />
            </label>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100">
          <p className="text-sm font-semibold text-slate-700 mb-2">Tenant Signature</p>
          <div className="h-24 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400"><PenTool className="w-6 h-6 mr-2" />Sign here</div>
          <div className="flex gap-2 mt-3"><Button variant="primary">Complete & Save</Button><Button variant="ghost">Clear Signature</Button></div>
        </div>
      </div>
    </SectionShell>
  );
}

// 36. Tenant Notes/Flags
export function TenantNotesView() {
  return (
    <SectionShell title="Tenant Notes & Flags" description="Internal notes with visibility controls (staff-only)">
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold">DK</div><div><p className="text-sm font-semibold text-slate-800">David Kim — Unit 301</p><p className="text-xs text-slate-400">3 internal notes · 2 flags</p></div></div>
        <div className="space-y-3">
          {[
            { type: 'flag', color: 'red', icon: Flag, text: 'Late payment 3x in last 6 months', author: 'James Doe', date: 'Jul 10', visible: 'Staff only' },
            { type: 'note', color: 'slate', icon: FileText, text: 'Requested lease extension, open to 2-year renewal', author: 'Lisa Torres', date: 'Jul 5', visible: 'Staff only' },
            { type: 'flag', color: 'amber', icon: AlertTriangle, text: 'Noise complaint from unit 302 (Jun 20)', author: 'Tom Walsh', date: 'Jun 20', visible: 'Staff only' },
            { type: 'note', color: 'slate', icon: FileText, text: 'Excellent tenant, always pays via autopay', author: 'James Doe', date: 'May 15', visible: 'Staff only' },
          ].map((n, i) => (
            <div key={i} className={`p-3 rounded-lg border ${n.color === 'red' ? 'bg-red-50 border-red-200' : n.color === 'amber' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-start gap-3"><n.icon className={`w-4 h-4 mt-0.5 ${n.color === 'red' ? 'text-red-500' : n.color === 'amber' ? 'text-amber-500' : 'text-slate-400'}`} /><div className="flex-1"><p className="text-sm text-slate-700">{n.text}</p><div className="flex items-center gap-3 mt-1"><span className="text-xs text-slate-400">By {n.author} · {n.date}</span><Badge variant="neutral" size="sm"><Lock className="w-2.5 h-2.5 inline mr-1" />{n.visible}</Badge></div></div></div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <textarea className="input min-h-[60px]" placeholder="Add internal note (staff only)..." />
          <div className="flex gap-2 mt-2"><Button variant="primary" size="sm">Add Note</Button><Button variant="secondary" size="sm" icon={<Flag className="w-3.5 h-3.5" />}>Add Flag</Button></div>
        </div>
      </div>
    </SectionShell>
  );
}
