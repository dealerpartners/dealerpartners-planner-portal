import { useState } from 'react';
import {
  Truck, Plus, Search, FileText, Download, Eye, Star,
  CheckCircle, XCircle, Clock, AlertTriangle, DollarSign,
  Shield, Award, FileCheck, Calendar, TrendingUp, Filter,
} from 'lucide-react';
import { Badge, Button, StatCard } from '../ui';
import { SectionShell, StatusBadge, InfoRow, ProgressBar, MiniChart } from './shared';

// 69. Vendor Directory
export function VendorDirectoryView() {
  return (
    <SectionShell title="Vendor Directory" description="Searchable list with contact and service category filters"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Vendor</Button>}>
      <div className="card overflow-hidden">
        <div className="card-header">
          <div className="flex gap-2">
            <div className="relative w-48"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" /><input className="input pl-9 h-8 text-xs" placeholder="Search vendors..." /></div>
            <select className="select h-8 w-36 text-xs"><option>All categories</option><option>HVAC</option><option>Plumbing</option><option>Electrical</option><option>Cleaning</option><option>Landscaping</option></select>
          </div>
        </div>
        <table className="data-table">
          <thead><tr><th>Vendor</th><th>Service</th><th>Contact</th><th>Rating</th><th>Jobs (30d)</th><th>Insurance</th><th>Status</th></tr></thead>
          <tbody>
            {[
              { name: 'CoolAir HVAC', service: 'HVAC', contact: 'Bob Lee · (555) 101-2000', rating: 4.8, jobs: 12, ins: 'Current', status: 'active' },
              { name: 'ProFix Maintenance', service: 'General', contact: 'Ann Park · (555) 102-3000', rating: 4.6, jobs: 28, ins: 'Current', status: 'active' },
              { name: 'ClearFlow Plumbing', service: 'Plumbing', contact: 'Joe Diaz · (555) 103-4000', rating: 4.4, jobs: 8, ins: 'Current', status: 'active' },
              { name: 'BrightSpark Electric', service: 'Electrical', contact: 'Sue Kim · (555) 104-5000', rating: 4.9, jobs: 6, ins: 'Expired', status: 'active' },
              { name: 'Spotless Cleaning Co.', service: 'Cleaning', contact: 'May Chen · (555) 105-6000', rating: 4.7, jobs: 42, ins: 'Current', status: 'active' },
              { name: 'GreenThumb Landscape', service: 'Landscaping', contact: 'Rob Cox · (555) 106-7000', rating: 4.2, jobs: 4, ins: 'Current', status: 'archived' },
            ].map((v) => (
              <tr key={v.name} className={v.ins === 'Expired' ? 'bg-red-50/20' : ''}>
                <td className="font-medium text-slate-800">{v.name}</td>
                <td><span className="pill bg-sky-50 text-sky-700 text-xs">{v.service}</span></td>
                <td className="text-xs text-slate-500">{v.contact}</td>
                <td><span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-current" />{v.rating}</span></td>
                <td>{v.jobs}</td>
                <td>{v.ins === 'Current' ? <Badge variant="success" size="sm" dot>Current</Badge> : <Badge variant="danger" size="sm" dot>Expired</Badge>}</td>
                <td><StatusBadge status={v.status as any} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 70. Vendor Profile
export function VendorProfileView() {
  return (
    <SectionShell title="Vendor Profile" description="Insurance docs, certifications, ratings">
      <div className="card p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl font-bold">CH</div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-slate-800">CoolAir HVAC Services</p>
            <p className="text-sm text-slate-500">HVAC Contractor · License #HVAC-FL-4821</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500"><span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-current" />4.8 (84 reviews)</span><span>·</span><span>42 jobs completed</span><span>·</span><span>Member since 2022</span></div>
          </div>
          <Badge variant="success" dot>Active</Badge>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Contact</p>
            <InfoRow label="Primary" value="Bob Lee" /><InfoRow label="Phone" value="(555) 101-2000" /><InfoRow label="Email" value="bob@coolair.com" /><InfoRow label="Address" value="120 Industrial Blvd, Miami FL" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Insurance & Certifications</p>
            <div className="space-y-2">
              {[['General Liability', '$2M', 'Current', 'success'], ['Workers Comp', '$1M', 'Current', 'success'], ['HVAC License', 'FL #4821', 'Current', 'success'], ['EPA Certification', 'Universal', 'Current', 'success'], ['Auto Insurance', '$1M', 'Expiring Aug 2025', 'warning']].map(([n, v, s, c]) => (
                <div key={n} className="flex items-center justify-between p-2 bg-slate-50 rounded"><div><p className="text-sm font-medium text-slate-700">{n}</p><p className="text-xs text-slate-400">{v}</p></div><Badge variant={c as any} size="sm">{s}</Badge></div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Performance</p>
            <div className="space-y-3">
              <div><div className="flex justify-between text-xs mb-1"><span>Response Time</span><span className="font-bold">2.4h avg</span></div><ProgressBar value={85} color="bg-emerald-500" /></div>
              <div><div className="flex justify-between text-xs mb-1"><span>On-Time Rate</span><span className="font-bold">94%</span></div><ProgressBar value={94} color="bg-sky-500" /></div>
              <div><div className="flex justify-between text-xs mb-1"><span>Satisfaction</span><span className="font-bold">4.8/5</span></div><ProgressBar value={96} color="bg-amber-500" /></div>
              <div><div className="flex justify-between text-xs mb-1"><span>Reissue Rate</span><span className="font-bold">3%</span></div><ProgressBar value={3} color="bg-red-500" /></div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 71. Vendor Invoice Submission
export function VendorInvoiceView() {
  return (
    <SectionShell title="Vendor Invoice Submission" description="Upload and line-item entry form"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New Invoice</Button>}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-4">Invoice Details</p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Invoice #</label><input className="input" defaultValue="INV-2025-042" /></div><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Date</label><input type="date" className="input" /></div></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Vendor</label><select className="input"><option>CoolAir HVAC Services</option><option>ProFix Maintenance</option></select></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Work Order</label><select className="input"><option>WO-049 — AC Repair · Unit 101</option><option>WO-050 — Dishwasher · Unit 205</option></select></div>
            <div className="space-y-2 pt-2">
              {[['AC Capacitor (OEM)', '$85.00'], ['Refrigerant R-410A', '$90.00'], ['Labor (1.5 hrs)', '$97.50'], ['Service call', '$50.00']].map(([item, amount]) => (
                <div key={item} className="flex items-center gap-2"><input className="input flex-1 text-sm" defaultValue={item} /><input className="input w-24 text-sm text-right" defaultValue={amount} /><button className="text-red-400 hover:text-red-600"><XCircle className="w-4 h-4" /></button></div>
              ))}
              <Button variant="secondary" size="sm" icon={<Plus className="w-3 h-3" />}>Add Line</Button>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-200"><span className="text-sm font-semibold text-slate-800">Total</span><span className="text-xl font-bold text-slate-800">$322.50</span></div>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center"><FileText className="w-6 h-6 text-slate-300 mx-auto mb-2" /><p className="text-sm text-slate-500">Upload signed invoice PDF</p></div>
            <Button variant="primary" className="w-full">Submit Invoice</Button>
          </div>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-4">Recent Invoices</p>
          <div className="space-y-2">
            {[
              { id: 'INV-042', vendor: 'CoolAir HVAC', amount: '$322', date: 'Jul 15', status: 'pending' },
              { id: 'INV-041', vendor: 'Spotless Cleaning', amount: '$1,200', date: 'Jul 10', status: 'approved' },
              { id: 'INV-040', vendor: 'ProFix', amount: '$180', date: 'Jul 8', status: 'paid' },
              { id: 'INV-039', vendor: 'ClearFlow', amount: '$450', date: 'Jul 5', status: 'paid' },
              { id: 'INV-038', vendor: 'BrightSpark', amount: '$220', date: 'Jul 2', status: 'denied' },
            ].map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div><p className="text-sm font-medium text-slate-800">{inv.vendor}</p><p className="text-xs text-slate-400 font-mono">{inv.id} · {inv.date}</p></div>
                <div className="flex items-center gap-3"><span className="text-sm font-bold text-slate-800">{inv.amount}</span><StatusBadge status={inv.status as any} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 72. Vendor Performance Tracking
export function VendorPerformanceView() {
  return (
    <SectionShell title="Vendor Performance Tracking" description="Rating and analytics dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Avg Rating" value="4.6" sub="All vendors" icon={<Star className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="On-Time Rate" value="91%" icon={<Clock className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Avg Response" value="3.2h" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Total Jobs (30d)" value="100" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Vendor Performance Comparison</p></div>
        <table className="data-table">
          <thead><tr><th>Vendor</th><th>Rating</th><th>On-Time %</th><th>Avg Response</th><th>Jobs (30d)</th><th>Reissue %</th><th>Score</th></tr></thead>
          <tbody>
            {[
              { v: 'CoolAir HVAC', r: 4.8, ot: 94, ar: '2.4h', j: 12, ri: 3, score: 92 },
              { v: 'ProFix', r: 4.6, ot: 88, ar: '3.8h', j: 28, ri: 5, score: 84 },
              { v: 'ClearFlow', r: 4.4, ot: 90, ar: '4.2h', j: 8, ri: 8, score: 78 },
              { v: 'BrightSpark', r: 4.9, ot: 96, ar: '1.8h', j: 6, ri: 0, score: 95 },
              { v: 'Spotless', r: 4.7, ot: 92, ar: '2.0h', j: 42, ri: 2, score: 90 },
            ].map((v) => (
              <tr key={v.v}>
                <td className="font-medium text-slate-800">{v.v}</td>
                <td><span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-current" />{v.r}</span></td>
                <td>{v.ot}%</td><td className="text-xs">{v.ar}</td><td>{v.j}</td><td className={v.ri > 5 ? 'text-amber-600' : 'text-slate-600'}>{v.ri}%</td>
                <td><div className="flex items-center gap-2"><ProgressBar value={v.score} color={v.score >= 90 ? 'bg-emerald-500' : v.score >= 75 ? 'bg-sky-500' : 'bg-amber-500'} /><span className="text-xs font-bold w-8">{v.score}</span></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Job Volume Trend (12 weeks)</p>
        <MiniChart data={[4, 6, 5, 8, 7, 9, 6, 8, 10, 12, 11, 12]} color="#0ea5e9" height={100} />
      </div>
    </SectionShell>
  );
}

// 73. Vendor Contract Management
export function VendorContractView() {
  return (
    <SectionShell title="Vendor Contract Management" description="Document storage with expiration alerts"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Contract</Button>}>
      <div className="card p-4 bg-amber-50 border-amber-200 mb-4">
        <div className="flex items-center gap-3"><AlertTriangle className="w-5 h-5 text-amber-600" /><div><p className="text-sm font-medium text-amber-800">2 contracts expiring within 60 days</p><p className="text-xs text-amber-600">Review and initiate renewal process.</p></div></div>
      </div>
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead><tr><th>Contract</th><th>Vendor</th><th>Type</th><th>Start</th><th>End</th><th>Days Left</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {[
              { c: 'MSA-001', v: 'CoolAir HVAC', t: 'Master Service', s: 'Jan 2024', e: 'Dec 2025', d: 164, st: 'active' },
              { c: 'MSA-002', v: 'Spotless Cleaning', t: 'Service Agreement', s: 'Mar 2024', e: 'Aug 2025', d: 42, st: 'active' },
              { c: 'MSA-003', v: 'ProFix', t: 'Master Service', s: 'Jun 2024', e: 'May 2026', d: 284, st: 'active' },
              { c: 'MSA-004', v: 'BrightSpark', t: 'Service Agreement', s: 'Jul 2024', e: 'Sep 2025', d: 72, st: 'active' },
              { c: 'MSA-005', v: 'GreenThumb', t: 'Seasonal', s: 'Apr 2024', e: 'Apr 2025', d: -30, st: 'expired' },
            ].map((c) => (
              <tr key={c.c} className={c.d < 60 && c.d > 0 ? 'bg-amber-50/20' : c.d < 0 ? 'bg-red-50/20 opacity-60' : ''}>
                <td><span className="font-mono text-xs text-slate-400">{c.c}</span></td>
                <td className="font-medium text-slate-800">{c.v}</td>
                <td className="text-xs">{c.t}</td>
                <td className="text-xs">{c.s}</td>
                <td className="text-xs">{c.e}</td>
                <td><span className={c.d < 60 && c.d > 0 ? 'text-amber-600 font-bold' : c.d < 0 ? 'text-red-600 font-bold' : 'text-slate-600'}>{c.d > 0 ? `${c.d}d` : 'Expired'}</span></td>
                <td><StatusBadge status={c.st as any} /></td>
                <td><div className="flex gap-1"><button className="p-1 text-slate-400 hover:text-slate-700"><Eye className="w-3.5 h-3.5" /></button><button className="p-1 text-slate-400 hover:text-slate-700"><Download className="w-3.5 h-3.5" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 74. Vendor Payment Processing
export function VendorPaymentView() {
  return (
    <SectionShell title="Vendor Payment Processing" description="Approve/pay invoice UI with status tracking">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Approval" value="4" icon={<Clock className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Approved" value="2" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Paid (30d)" value="$8,420" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Outstanding" value="$2,172" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Invoice Approval Queue</p><Button variant="secondary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>Filter</Button></div>
        <table className="data-table">
          <thead><tr><th>Invoice</th><th>Vendor</th><th>Amount</th><th>Submitted</th><th>WO</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {[
              { id: 'INV-042', v: 'CoolAir HVAC', a: '$322.50', d: 'Jul 15', wo: 'WO-049', s: 'pending' },
              { id: 'INV-041', v: 'Spotless Cleaning', a: '$1,200.00', d: 'Jul 10', wo: 'WO-046', s: 'approved' },
              { id: 'INV-040', v: 'ProFix', a: '$180.00', d: 'Jul 8', wo: 'WO-048', s: 'paid' },
              { id: 'INV-039', v: 'ClearFlow', a: '$450.00', d: 'Jul 5', wo: 'WO-045', s: 'paid' },
              { id: 'INV-038', v: 'BrightSpark', a: '$220.00', d: 'Jul 2', wo: 'WO-044', s: 'denied' },
            ].map((inv) => (
              <tr key={inv.id}>
                <td><span className="font-mono text-xs text-slate-400">{inv.id}</span></td>
                <td className="font-medium text-slate-800">{inv.v}</td>
                <td className="font-bold text-slate-800">{inv.a}</td>
                <td className="text-xs text-slate-400">{inv.d}</td>
                <td className="text-xs text-slate-500 font-mono">{inv.wo}</td>
                <td><StatusBadge status={inv.s as any} /></td>
                <td>
                  {inv.s === 'pending' && <div className="flex gap-1"><Button variant="primary" size="sm">Approve</Button><Button variant="danger" size="sm">Deny</Button></div>}
                  {inv.s === 'approved' && <Button variant="primary" size="sm" icon={<DollarSign className="w-3 h-3" />}>Pay Now</Button>}
                  {inv.s === 'paid' && <Button variant="ghost" size="sm">Receipt</Button>}
                  {inv.s === 'denied' && <Button variant="ghost" size="sm">Review</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}
