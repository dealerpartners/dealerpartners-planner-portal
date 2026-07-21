import { useState } from 'react';
import {
  User, Shield, FileText, RefreshCw, Gavel, Plus, Download, Filter,
  CheckCircle, XCircle, Clock, AlertTriangle, Eye, MoreHorizontal,
  TrendingUp, DollarSign, Calendar, Search, Scale, Lock, Unlock, ArrowRight,
} from 'lucide-react';
import { Badge, Button, Tooltip, StatCard, Toggle } from '../ui';
import { SectionShell, RiskGauge, VerificationBadge, ChecklistItem } from './shared';

// ===== 6. GUEST / ACTOR RISK SCORING =====
export function RiskGuestView() {
  const guests = [
    { id: 'G-4821', name: 'Sophia Martinez', fraudScore: 12, cancelRate: 2.1, chargebacks: 0, disputes: 0, status: 'low' as const },
    { id: 'G-4820', name: 'Marcus Chen', fraudScore: 28, cancelRate: 5.4, chargebacks: 1, disputes: 1, status: 'medium' as const },
    { id: 'G-4819', name: 'Aisha Patel', fraudScore: 8, cancelRate: 1.2, chargebacks: 0, disputes: 0, status: 'low' as const },
    { id: 'G-4818', name: 'David Kim', fraudScore: 65, cancelRate: 18.2, chargebacks: 3, disputes: 4, status: 'high' as const },
    { id: 'G-4817', name: 'Priya Nair', fraudScore: 15, cancelRate: 3.8, chargebacks: 0, disputes: 1, status: 'low' as const },
  ];

  const statusMeta = {
    low: { variant: 'success' as const, label: 'Low Risk' },
    medium: { variant: 'warning' as const, label: 'Medium Risk' },
    high: { variant: 'danger' as const, label: 'High Risk' },
  };

  return (
    <SectionShell
      title="Guest / Actor Risk Scoring"
      description="Reuses the fraud scoring from the booking engine, surfaced here for cross-module review"
      actions={<Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Low Risk Guests" value="8,420" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Medium Risk" value="284" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="High Risk" value="42" icon={<Shield className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Auto-Blocked (30d)" value="18" icon={<XCircle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header">
          <p className="section-title">Guest Risk Profiles</p>
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input type="text" placeholder="Search guests..." className="input pl-9 h-8 text-xs" />
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Guest ID</th><th>Name</th><th>Fraud Score</th><th>Cancel Rate</th><th>Chargebacks</th><th>Disputes</th><th>Risk Level</th><th></th></tr>
          </thead>
          <tbody>
            {guests.map((g) => (
              <tr key={g.id} className={g.status === 'high' ? 'bg-red-50/30' : g.status === 'medium' ? 'bg-amber-50/20' : ''}>
                <td><span className="font-mono text-xs text-slate-400">{g.id}</span></td>
                <td className="font-medium text-slate-800">{g.name}</td>
                <td><RiskGauge score={g.fraudScore} /></td>
                <td className={g.cancelRate > 10 ? 'text-red-600 font-medium' : 'text-slate-600'}>{g.cancelRate}%</td>
                <td className={g.chargebacks > 2 ? 'text-red-600 font-bold' : 'text-slate-600'}>{g.chargebacks}</td>
                <td className="text-slate-600">{g.disputes}</td>
                <td><Badge variant={statusMeta[g.status].variant} dot>{statusMeta[g.status].label}</Badge></td>
                <td>
                  <div className="flex gap-1">
                    <Tooltip content="View profile" position="top"><button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button></Tooltip>
                    {g.status === 'high' && <Button variant="danger" size="sm">Block</Button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header"><p className="section-title">Scoring Signals — David Kim (G-4818)</p><Badge variant="danger" dot>High Risk</Badge></div>
        <div className="card-body grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <div>
            <ChecklistItem label="3 chargebacks in 90 days" status="failed" detail="Threshold: max 1" />
            <ChecklistItem label="4 disputes filed" status="failed" detail="Pattern: post-stay refund abuse" />
            <ChecklistItem label="18.2% cancellation rate" status="failed" detail="Platform avg: 4.2%" />
          </div>
          <div>
            <ChecklistItem label="Account age: 8 months" status="done" detail="Not a new-account risk" />
            <ChecklistItem label="KYC verified" status="done" detail="Passport — passed liveness" />
            <ChecklistItem label="Payment method stable" status="done" detail="Same card for 6 months" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 7. INSURANCE / UNDERWRITING =====
export function InsuranceView() {
  const products = [
    { id: 'INS-01', name: 'Trip Protection', desc: 'Cancellation + interruption coverage', active: true, policies: 1240, premium: '$24', payout: '$8,400', claims: 12 },
    { id: 'INS-02', name: 'Damage Protection', desc: 'Property damage up to $5,000', active: true, policies: 842, premium: '$15', payout: '$12,200', claims: 28 },
    { id: 'INS-03', name: 'Event Cancellation', desc: 'Full event refund + vendor costs', active: true, policies: 184, premium: '$120', payout: '$4,800', claims: 3 },
    { id: 'INS-04', name: 'Medical Coverage', desc: 'On-trip medical emergencies', active: false, policies: 0, premium: '$35', payout: '$0', claims: 0 },
  ];

  return (
    <SectionShell
      title="Insurance & Underwriting Management"
      description="Platform-issued trip protection, damage protection, and event cancellation coverage"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New product</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Policies" value="2,266" icon={<Shield className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Premiums Collected" value="$84,200" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Claims Paid (YTD)" value="$25,400" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Loss Ratio" value="30.2%" sub="Target: <40%" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.active ? 'bg-sky-50 text-sky-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.desc}</p>
                </div>
              </div>
              <Toggle checked={p.active} onChange={() => {}} />
            </div>
            <div className="grid grid-cols-4 gap-3 pt-3 border-t border-slate-100">
              <div><p className="text-[10px] text-slate-400 uppercase">Policies</p><p className="text-sm font-bold text-slate-800">{p.policies.toLocaleString()}</p></div>
              <div><p className="text-[10px] text-slate-400 uppercase">Premium</p><p className="text-sm font-bold text-slate-800">{p.premium}</p></div>
              <div><p className="text-[10px] text-slate-400 uppercase">Paid Out</p><p className="text-sm font-bold text-amber-600">{p.payout}</p></div>
              <div><p className="text-[10px] text-slate-400 uppercase">Claims</p><p className="text-sm font-bold text-slate-800">{p.claims}</p></div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header"><p className="section-title">Underwriting Rules — Trip Protection</p><Button variant="secondary" size="sm">Edit rules</Button></div>
        <div className="card-body space-y-2">
          {[
            { rule: 'Max trip value', value: '$10,000', type: 'limit' },
            { rule: 'Min trip duration', value: '1 night', type: 'requirement' },
            { rule: 'Max trip duration', value: '30 nights', type: 'limit' },
            { rule: 'Refund window', value: 'Up to 24h before check-in', type: 'coverage' },
            { rule: 'Pre-existing conditions', value: 'Not covered', type: 'exclusion' },
            { rule: 'Force majeure', value: 'Covered up to $2,000', type: 'coverage' },
          ].map((r) => (
            <div key={r.rule} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <span className="text-sm text-slate-700">{r.rule}</span>
              <div className="flex items-center gap-2">
                <Badge variant={r.type === 'limit' ? 'warning' : r.type === 'exclusion' ? 'danger' : r.type === 'coverage' ? 'success' : 'info'} size="sm">{r.type}</Badge>
                <span className="text-sm font-medium text-slate-800">{r.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 8. CLAIMS PROCESSING =====
export function ClaimsView() {
  const claims = [
    { id: 'CLM-0421', policy: 'Trip Protection', claimant: 'Sophia Martinez', amount: '$1,240', reason: 'Flight cancellation', filed: 'Jul 12', status: 'review' as const },
    { id: 'CLM-0420', policy: 'Damage Protection', claimant: 'James Doe (vendor)', amount: '$2,800', reason: 'Property damage — broken furniture', filed: 'Jul 10', status: 'investigating' as const },
    { id: 'CLM-0419', policy: 'Event Cancellation', claimant: 'Corporate Events Inc.', amount: '$4,800', reason: 'Venue flood — full cancellation', filed: 'Jul 8', status: 'approved' as const },
    { id: 'CLM-0418', policy: 'Trip Protection', claimant: 'Marcus Chen', amount: '$680', reason: 'Medical emergency', filed: 'Jul 6', status: 'paid' as const },
    { id: 'CLM-0417', policy: 'Damage Protection', claimant: 'Liam Torres', amount: '$320', reason: 'Minor damage — stained carpet', filed: 'Jul 4', status: 'denied' as const },
  ];

  const statusMeta = {
    review: { variant: 'warning' as const, label: 'In Review' },
    investigating: { variant: 'info' as const, label: 'Investigating' },
    approved: { variant: 'success' as const, label: 'Approved' },
    paid: { variant: 'success' as const, label: 'Paid' },
    denied: { variant: 'danger' as const, label: 'Denied' },
  };

  return (
    <SectionShell
      title="Claims Processing Console"
      description="Intake, review, and payout workflow for all insurance products"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New claim</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Claims" value="12" icon={<Clock className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Approved (30d)" value="8" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Denied (30d)" value="3" icon={<XCircle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Avg Resolution" value="4.2 days" icon={<Clock className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header">
          <p className="section-title">Claims Queue</p>
          <div className="flex gap-2">
            <select className="select h-8 w-32 text-xs">
              <option>All statuses</option><option>In Review</option><option>Investigating</option><option>Approved</option><option>Paid</option><option>Denied</option>
            </select>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Claim ID</th><th>Policy</th><th>Claimant</th><th>Amount</th><th>Reason</th><th>Filed</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {claims.map((c) => (
              <tr key={c.id}>
                <td><span className="font-mono text-xs text-slate-400">{c.id}</span></td>
                <td className="text-xs text-slate-500">{c.policy}</td>
                <td className="font-medium text-slate-800">{c.claimant}</td>
                <td className="font-semibold text-slate-800">{c.amount}</td>
                <td className="text-xs text-slate-600 max-w-[180px]">{c.reason}</td>
                <td className="text-xs text-slate-400">{c.filed}</td>
                <td><Badge variant={statusMeta[c.status].variant} dot>{statusMeta[c.status].label}</Badge></td>
                <td>
                  {(c.status === 'review' || c.status === 'investigating') && (
                    <div className="flex gap-1">
                      <Button variant="secondary" size="sm">Review</Button>
                      <Tooltip content="Approve" position="top"><button className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"><CheckCircle className="w-3.5 h-3.5" /></button></Tooltip>
                      <Tooltip content="Deny" position="top"><button className="p-1 text-red-600 hover:bg-red-50 rounded"><XCircle className="w-3.5 h-3.5" /></button></Tooltip>
                    </div>
                  )}
                  {c.status === 'approved' && <Button variant="primary" size="sm">Process payout</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// ===== 9. SANCTIONS LIST AUTO-UPDATE FEED =====
export function SanctionsFeedView() {
  const feeds = [
    { list: 'OFAC SDN', country: 'US', lastSync: '2 hours ago', entries: 8421, newEntries: 14, status: 'current' as const },
    { list: 'EU Consolidated', country: 'EU', lastSync: '4 hours ago', entries: 12482, newEntries: 3, status: 'current' as const },
    { list: 'UN Security Council', country: 'Global', lastSync: '6 hours ago', entries: 6840, newEntries: 0, status: 'current' as const },
    { list: 'UK HMT Sanctions', country: 'UK', lastSync: '1 day ago', entries: 4210, newEntries: 8, status: 'stale' as const },
    { list: 'PEP Database', country: 'Global', lastSync: '3 hours ago', entries: 842000, newEntries: 142, status: 'current' as const },
    { list: 'FATF Grey List', country: 'Global', lastSync: '1 week ago', entries: 24, newEntries: 0, status: 'stale' as const },
  ];

  const statusMeta = {
    current: { variant: 'success' as const, label: 'Current' },
    stale: { variant: 'warning' as const, label: 'Stale' },
    failed: { variant: 'danger' as const, label: 'Failed' },
  };

  return (
    <SectionShell
      title="Sanctions List Auto-Update Feed"
      description="Keeps screening current against OFAC, EU, UN, and other global watchlists"
      actions={<Button variant="primary" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>Sync all now</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Lists Tracked" value="6" icon={<FileText className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Total Entries" value="873,977" icon={<Search className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
        <StatCard label="New Entries (7d)" value="167" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Auto-Sync Rate" value="99.2%" icon={<RefreshCw className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Watchlist Feeds</p></div>
        <table className="data-table">
          <thead>
            <tr><th>List</th><th>Jurisdiction</th><th>Last Sync</th><th>Total Entries</th><th>New (7d)</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {feeds.map((f) => (
              <tr key={f.list} className={f.status === 'stale' ? 'bg-amber-50/20' : ''}>
                <td className="font-medium text-slate-800">{f.list}</td>
                <td><span className="pill bg-slate-100 text-slate-600 text-xs">{f.country}</span></td>
                <td className="text-xs text-slate-400">{f.lastSync}</td>
                <td className="text-slate-700">{f.entries.toLocaleString()}</td>
                <td className={f.newEntries > 0 ? 'text-amber-600 font-medium' : 'text-slate-400'}>{f.newEntries}</td>
                <td><Badge variant={statusMeta[f.status].variant} dot>{statusMeta[f.status].label}</Badge></td>
                <td><Button variant="ghost" size="sm" icon={<RefreshCw className="w-3 h-3" />}>Sync</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header"><p className="section-title">Sync Schedule</p></div>
        <div className="card-body space-y-3">
          {[
            { schedule: 'Every 2 hours', lists: 'OFAC SDN, EU Consolidated, PEP Database' },
            { schedule: 'Every 6 hours', lists: 'UN Security Council' },
            { schedule: 'Daily at 6:00 AM UTC', lists: 'UK HMT Sanctions' },
            { schedule: 'Weekly on Mondays', lists: 'FATF Grey List' },
          ].map((s) => (
            <div key={s.schedule} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-800">{s.schedule}</p>
                <p className="text-xs text-slate-400">{s.lists}</p>
              </div>
              <Toggle checked={true} onChange={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 10. DISPUTE ARBITRATION =====
export function DisputesView() {
  const disputes = [
    { id: 'ARB-042', type: 'Refund denied', parties: 'Sophia Martinez vs. Coastal Retreats Inc.', amount: '$420', module: 'Bookings', filed: 'Jul 11', status: 'open' as const, escalated: true },
    { id: 'ARB-041', type: 'Property damage', parties: 'James Doe vs. David Kim', amount: '$280', module: 'Orders', filed: 'Jul 8', status: 'hearing' as const, escalated: false },
    { id: 'ARB-040', type: 'Service quality', parties: 'Marcus Chen vs. Urban Events Co.', amount: '$680', module: 'Bookings', filed: 'Jul 6', status: 'mediation' as const, escalated: false },
    { id: 'ARB-039', type: 'Saga partial failure', parties: 'Aisha Patel vs. Platform (auto)', amount: '$1,240', module: 'Orders → Bookings', filed: 'Jul 4', status: 'resolved' as const, escalated: true },
  ];

  const statusMeta = {
    open: { variant: 'danger' as const, label: 'Open' },
    hearing: { variant: 'warning' as const, label: 'In Hearing' },
    mediation: { variant: 'info' as const, label: 'Mediation' },
    resolved: { variant: 'success' as const, label: 'Resolved' },
  };

  return (
    <SectionShell
      title="Dispute Arbitration Console"
      description="Cross-module disputes including saga failures, liability determination, and mediation"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Open dispute</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Disputes" value="3" icon={<Gavel className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="In Mediation" value="1" icon={<Scale className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Resolved (30d)" value="8" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Avg Resolution" value="6.4 days" icon={<Clock className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
      </div>

      <div className="space-y-3">
        {disputes.map((d) => (
          <div key={d.id} className={`card p-5 ${d.escalated ? 'border-l-4 border-l-red-400' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${d.status === 'resolved' ? 'bg-emerald-50 text-emerald-600' : d.status === 'open' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                  <Gavel className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">{d.id}</span>
                    <span className="pill bg-slate-100 text-slate-600 text-xs">{d.type}</span>
                    {d.escalated && <Badge variant="danger" size="sm">Escalated</Badge>}
                  </div>
                  <p className="text-sm font-semibold text-slate-800 mt-1">{d.parties}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-slate-500">Module: <span className="font-medium text-slate-700">{d.module}</span></span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-500">Filed: {d.filed}</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs font-semibold text-slate-700">{d.amount}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant={statusMeta[d.status].variant} dot>{statusMeta[d.status].label}</Badge>
                {d.status !== 'resolved' && <Button variant="secondary" size="sm">Mediate</Button>}
              </div>
            </div>
            {d.type === 'Saga partial failure' && (
              <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/50 -mx-5 -mb-5 px-5 py-3 rounded-b-xl">
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Saga trace:</span> Payment succeeded → Booking confirmed → Inventory allocated → Resource assignment failed (staff unavailable) → Compensation saga triggered → Refund issued but inventory still blocked.
                  <span className="font-semibold text-slate-700"> Liability:</span> Platform (auto-compensation).
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
