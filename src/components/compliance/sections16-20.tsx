import { useState } from 'react';
import {
  ShieldCheck, Search, AlertTriangle, CheckCircle, XCircle, Clock,
  Plus, Download, Filter, Eye, MoreHorizontal, Lock, Unlock, FileText,
  Ban, Fingerprint, CreditCard, FileCheck, FolderOpen, Upload, History,
  Scale, Send, AlertOctagon,
} from 'lucide-react';
import { Badge, Button, Tooltip, StatCard, Toggle } from '../ui';
import { SectionShell, RiskGauge, VerificationBadge, ChecklistItem } from './shared';

// ===== 16. CONSENT LEDGER AUDIT CONSOLE =====
export function ConsentLedgerView() {
  const records = [
    { id: 'CON-4821', actor: 'Sophia Martinez', module: 'Marketing', consent: 'granted' as const, timestamp: 'Jul 10, 2:14 PM', version: 'PP-v3.0' },
    { id: 'CON-4820', actor: 'Marcus Chen', module: 'Marketing', consent: 'revoked' as const, timestamp: 'Jul 9, 4:30 PM', version: 'PP-v2.4' },
    { id: 'CON-4819', actor: 'Aisha Patel', module: 'Analytics', consent: 'granted' as const, timestamp: 'Jul 8, 10:00 AM', version: 'PP-v3.0' },
    { id: 'CON-4818', actor: 'David Kim', module: 'Third-party sharing', consent: 'denied' as const, timestamp: 'Jul 7, 6:15 PM', version: 'PP-v2.4' },
    { id: 'CON-4817', actor: 'Priya Nair', module: 'Marketing', consent: 'granted' as const, timestamp: 'Jul 6, 9:00 AM', version: 'PP-v3.0' },
    { id: 'CON-4816', actor: 'Liam Torres', module: 'Analytics', consent: 'expired' as const, timestamp: 'Jul 1, 12:00 PM', version: 'PP-v2.4' },
  ];

  const consentMeta = {
    granted: { variant: 'success' as const, label: 'Granted' },
    revoked: { variant: 'danger' as const, label: 'Revoked' },
    denied: { variant: 'neutral' as const, label: 'Denied' },
    expired: { variant: 'warning' as const, label: 'Expired' },
  };

  return (
    <SectionShell
      title="Consent Ledger Audit Console"
      description="Verifies consent state across every module for any actor — immutable audit trail"
      actions={<Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export ledger</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Records" value="14,820" icon={<History className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Active Consents" value="11,240" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Revoked (30d)" value="284" icon={<XCircle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Expiring (7d)" value="42" icon={<Clock className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header">
          <p className="section-title">Consent Records</p>
          <div className="flex gap-2">
            <select className="select h-8 w-36 text-xs">
              <option>All modules</option><option>Marketing</option><option>Analytics</option><option>Third-party sharing</option>
            </select>
            <select className="select h-8 w-32 text-xs">
              <option>All states</option><option>Granted</option><option>Revoked</option><option>Denied</option><option>Expired</option>
            </select>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Record ID</th><th>Actor</th><th>Module</th><th>Consent</th><th>Policy Version</th><th>Timestamp</th><th></th></tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td><span className="font-mono text-xs text-slate-400">{r.id}</span></td>
                <td className="font-medium text-slate-800">{r.actor}</td>
                <td className="text-xs text-slate-500">{r.module}</td>
                <td><Badge variant={consentMeta[r.consent].variant} dot>{consentMeta[r.consent].label}</Badge></td>
                <td><span className="font-mono text-xs text-slate-400">{r.version}</span></td>
                <td className="text-xs text-slate-400">{r.timestamp}</td>
                <td><Tooltip content="View full record" position="top"><button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button></Tooltip></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header"><p className="section-title">Consent State Matrix — Sophia Martinez</p></div>
        <div className="card-body">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { module: 'Marketing', state: 'granted' as const, date: 'Jul 10' },
              { module: 'Analytics', state: 'granted' as const, date: 'Jul 10' },
              { module: 'Third-party sharing', state: 'denied' as const, date: 'Jul 10' },
              { module: 'Profile data', state: 'granted' as const, date: 'Feb 14' },
              { module: 'Email campaigns', state: 'granted' as const, date: 'Jul 10' },
              { module: 'SMS notifications', state: 'granted' as const, date: 'Jul 10' },
              { module: 'Location tracking', state: 'denied' as const, date: 'Jul 10' },
              { module: 'Cookie targeting', state: 'revoked' as const, date: 'Jun 20' },
            ].map((c) => (
              <div key={c.module} className="border border-slate-200 rounded-lg p-3">
                <p className="text-xs text-slate-400">{c.module}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant={consentMeta[c.state].variant} size="sm" dot>{consentMeta[c.state].label}</Badge>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Since {c.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 17. FRAUD CASE INVESTIGATION WORKSPACE =====
export function FraudView() {
  const cases = [
    { id: 'FRD-042', title: 'Multi-account abuse — refund farming', suspect: 'David Kim (G-4818)', evidence: 8, risk: 82, status: 'investigating' as const, opened: 'Jul 10' },
    { id: 'FRD-041', title: 'Stolen card usage across 3 bookings', suspect: 'Guest #G-5104', evidence: 5, risk: 74, status: 'investigating' as const, opened: 'Jul 8' },
    { id: 'FRD-040', title: 'Fake listing — advance fee fraud', suspect: 'Vendor #V-3201', evidence: 12, risk: 91, status: 'frozen' as const, opened: 'Jul 6' },
    { id: 'FRD-039', title: 'Chargeback abuse pattern', suspect: 'Guest #G-4210', evidence: 6, risk: 68, status: 'banned' as const, opened: 'Jul 3' },
  ];

  const statusMeta = {
    investigating: { variant: 'warning' as const, label: 'Investigating' },
    frozen: { variant: 'info' as const, label: 'Account Frozen' },
    banned: { variant: 'danger' as const, label: 'Banned' },
    cleared: { variant: 'success' as const, label: 'Cleared' },
  };

  return (
    <SectionShell
      title="Fraud Case Investigation Workspace"
      description="Evidence collection, hold/release actions, and ban list management"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New case</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Cases" value="3" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Accounts Frozen" value="1" icon={<Lock className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Banned (30d)" value="4" icon={<Ban className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Avg Resolution" value="5.8 days" icon={<Clock className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>

      <div className="space-y-3">
        {cases.map((c) => (
          <div key={c.id} className={`card p-5 ${c.status === 'banned' ? 'border-l-4 border-l-red-500' : c.status === 'frozen' ? 'border-l-4 border-l-amber-400' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.risk >= 80 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">{c.id}</span>
                    <Badge variant={statusMeta[c.status].variant} dot>{statusMeta[c.status].label}</Badge>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 mt-1">{c.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Suspect: {c.suspect} · {c.evidence} evidence items · Opened {c.opened}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <RiskGauge score={c.risk} />
                <div className="flex gap-1">
                  {c.status === 'investigating' && (
                    <>
                      <Button variant="secondary" size="sm" icon={<Lock className="w-3 h-3" />}>Freeze</Button>
                      <Button variant="danger" size="sm" icon={<Ban className="w-3 h-3" />}>Ban</Button>
                    </>
                  )}
                  {c.status === 'frozen' && (
                    <>
                      <Button variant="secondary" size="sm" icon={<Unlock className="w-3 h-3" />}>Release</Button>
                      <Button variant="danger" size="sm" icon={<Ban className="w-3 h-3" />}>Ban</Button>
                    </>
                  )}
                  <Button variant="ghost" size="sm" icon={<Eye className="w-3.5 h-3.5" />}>Evidence</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header"><p className="section-title">Ban List</p><Button variant="secondary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add to ban list</Button></div>
        <table className="data-table">
          <thead>
            <tr><th>Ban ID</th><th>Entity</th><th>Type</th><th>Reason</th><th>Banned On</th><th>Scope</th><th></th></tr>
          </thead>
          <tbody>
            {[
              { id: 'BAN-014', entity: 'David Kim', type: 'Guest', reason: 'Chargeback abuse (3x)', date: 'Jul 12', scope: 'Platform-wide' },
              { id: 'BAN-013', entity: 'Vendor #V-3201', type: 'Vendor', reason: 'Fake listing / advance fee fraud', date: 'Jul 10', scope: 'Platform-wide' },
              { id: 'BAN-012', entity: 'Guest #G-4210', type: 'Guest', reason: 'Stolen card usage', date: 'Jul 8', scope: 'Platform-wide' },
              { id: 'BAN-011', entity: '192.168.1.42', type: 'IP', reason: 'Card testing', date: 'Jul 5', scope: 'Checkout' },
            ].map((b) => (
              <tr key={b.id}>
                <td><span className="font-mono text-xs text-slate-400">{b.id}</span></td>
                <td className="font-medium text-slate-800">{b.entity}</td>
                <td><span className="pill bg-slate-100 text-slate-600 text-xs">{b.type}</span></td>
                <td className="text-xs text-slate-600">{b.reason}</td>
                <td className="text-xs text-slate-400">{b.date}</td>
                <td className="text-xs text-slate-500">{b.scope}</td>
                <td><Button variant="ghost" size="sm">Appeal</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// ===== 18. CHARGEBACK NETWORK MANAGEMENT =====
export function ChargebacksView() {
  const chargebacks = [
    { id: 'CBK-042', guest: 'David Kim', amount: '$1,240', reason: 'Fraudulent — unauthorized', processor: 'Stripe', status: 'lost' as const, date: 'Jul 12', evidence: true },
    { id: 'CBK-041', guest: 'Marcus Chen', amount: '$680', reason: 'Service not rendered', processor: 'PayPal', status: 'challenging' as const, date: 'Jul 10', evidence: true },
    { id: 'CBK-040', guest: 'Sophia Martinez', amount: '$420', reason: 'Duplicate charge', processor: 'Stripe', status: 'won' as const, date: 'Jul 8', evidence: true },
    { id: 'CBK-039', guest: 'Aisha Patel', amount: '$320', reason: 'Product not as described', processor: 'Adyen', status: 'challenging' as const, date: 'Jul 6', evidence: false },
    { id: 'CBK-038', guest: 'Liam Torres', amount: '$2,100', reason: 'Fraudulent — unauthorized', processor: 'Stripe', status: 'won' as const, date: 'Jul 3', evidence: true },
  ];

  const statusMeta = {
    challenging: { variant: 'warning' as const, label: 'Challenging' },
    won: { variant: 'success' as const, label: 'Won' },
    lost: { variant: 'danger' as const, label: 'Lost' },
  };

  return (
    <SectionShell
      title="Chargeback Network Management"
      description="Aggregates disputes across all payment processors platform-wide"
      actions={<Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Disputes" value="2" icon={<CreditCard className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Win Rate" value="64%" change="+8% vs last quarter" changeType="up" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Lost (30d)" value="1" sub="$1,240" icon={<XCircle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Total Disputed" value="$4,760" sub="30d volume" icon={<CreditCard className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header">
          <p className="section-title">Chargeback Queue</p>
          <select className="select h-8 w-36 text-xs">
            <option>All processors</option><option>Stripe</option><option>PayPal</option><option>Adyen</option>
          </select>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>CBK ID</th><th>Guest</th><th>Amount</th><th>Reason</th><th>Processor</th><th>Evidence</th><th>Date</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {chargebacks.map((c) => (
              <tr key={c.id} className={c.status === 'lost' ? 'bg-red-50/30' : c.status === 'won' ? 'bg-emerald-50/20' : ''}>
                <td><span className="font-mono text-xs text-slate-400">{c.id}</span></td>
                <td className="font-medium text-slate-800">{c.guest}</td>
                <td className="font-semibold text-slate-800">{c.amount}</td>
                <td className="text-xs text-slate-600">{c.reason}</td>
                <td><span className="pill bg-slate-100 text-slate-600 text-xs">{c.processor}</span></td>
                <td>
                  {c.evidence ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-400" />}
                </td>
                <td className="text-xs text-slate-400">{c.date}</td>
                <td><Badge variant={statusMeta[c.status].variant} dot>{statusMeta[c.status].label}</Badge></td>
                <td>
                  {c.status === 'challenging' && <Button variant="primary" size="sm">Submit evidence</Button>}
                  {c.status === 'challenging' && !c.evidence && <Button variant="ghost" size="sm">Upload</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header"><p className="section-title">By Processor</p></div>
          <div className="card-body space-y-3">
            {[
              { processor: 'Stripe', total: 8, won: 5, lost: 2, pending: 1, rate: '62.5%' },
              { processor: 'PayPal', total: 4, won: 2, lost: 1, pending: 1, rate: '50%' },
              { processor: 'Adyen', total: 3, won: 2, lost: 0, pending: 1, rate: '66.7%' },
            ].map((p) => (
              <div key={p.processor} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{p.processor}</p>
                  <p className="text-xs text-slate-400">{p.total} total · {p.won} won · {p.lost} lost · {p.pending} pending</p>
                </div>
                <Badge variant={parseFloat(p.rate) >= 60 ? 'success' : 'warning'}>{p.rate} win rate</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><p className="section-title">Chargeback Rate Alert</p></div>
          <div className="card-body">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-600">Platform chargeback rate</span>
              <span className="text-lg font-bold text-amber-600">0.42%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full" style={{ width: '100%' }} />
              <div className="absolute h-3 w-0.5 bg-slate-800" style={{ left: '42%', top: 0 }} />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>0% (healthy)</span>
              <span className="text-amber-600 font-medium">0.42% (you)</span>
              <span className="text-red-600">1% (card scheme threshold)</span>
            </div>
            <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
              Your chargeback rate is within acceptable limits. Visa/MC monitoring threshold is 1%. Above 0.75% triggers automated mitigation rules.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 19. SAR FILING TOOL =====
export function SARView() {
  const reports = [
    { id: 'SAR-008', subject: 'Guest #G-4821', amount: '$38,400', pattern: 'Structuring — 4 payments under $10K', filed: 'Jul 14', status: 'draft' as const, reviewer: 'Unassigned' },
    { id: 'SAR-007', subject: 'Vendor #V-2104', amount: '$124,200', pattern: 'Velocity — 12x normal volume', filed: 'Jul 13', status: 'review' as const, reviewer: 'K. Bauer' },
    { id: 'SAR-006', subject: 'Guest #G-3982', amount: '$2,400', pattern: 'Card testing pattern', filed: 'Jul 8', status: 'filed' as const, reviewer: 'K. Bauer' },
    { id: 'SAR-005', subject: 'Vendor #V-1892', amount: '$50,000', pattern: 'Round-dollar layering', filed: 'Jul 2', status: 'filed' as const, reviewer: 'K. Bauer' },
  ];

  const statusMeta = {
    draft: { variant: 'warning' as const, label: 'Draft' },
    review: { variant: 'info' as const, label: 'In Review' },
    filed: { variant: 'success' as const, label: 'Filed' },
  };

  return (
    <SectionShell
      title="Suspicious Activity Report (SAR) Filing Tool"
      description="Compliance officer workflow for preparing, reviewing, and filing SARs with financial authorities"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New SAR</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Drafts" value="1" icon={<FileText className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="In Review" value="1" icon={<Clock className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Filed (YTD)" value="4" icon={<Send className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Avg Filing Time" value="3.4 days" icon={<Clock className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">SAR Queue</p></div>
        <table className="data-table">
          <thead>
            <tr><th>SAR ID</th><th>Subject</th><th>Amount</th><th>Pattern</th><th>Filed</th><th>Reviewer</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td><span className="font-mono text-xs text-slate-400">{r.id}</span></td>
                <td className="font-medium text-slate-800">{r.subject}</td>
                <td className="font-semibold text-slate-800">{r.amount}</td>
                <td className="text-xs text-slate-600 max-w-[180px]">{r.pattern}</td>
                <td className="text-xs text-slate-400">{r.filed}</td>
                <td className="text-xs text-slate-500">{r.reviewer}</td>
                <td><Badge variant={statusMeta[r.status].variant} dot>{statusMeta[r.status].label}</Badge></td>
                <td>
                  {r.status === 'draft' && <Button variant="primary" size="sm">Complete & submit</Button>}
                  {r.status === 'review' && <Button variant="secondary" size="sm">Review & file</Button>}
                  {r.status === 'filed' && <Button variant="ghost" size="sm" icon={<Download className="w-3 h-3" />}>Download</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-red-500" />
            <p className="section-title">SAR Draft — SAR-008</p>
          </div>
          <Badge variant="warning" dot>Draft</Badge>
        </div>
        <div className="card-body space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">Subject</label>
              <input type="text" defaultValue="Guest #G-4821" className="input" />
            </div>
            <div>
              <label className="field-label">Total Amount</label>
              <input type="text" defaultValue="$38,400" className="input" />
            </div>
          </div>
          <div>
            <label className="field-label">Suspicious Activity Description</label>
            <textarea
              defaultValue="Between Jul 12–14, subject made 4 separate payments of $9,600 each, each just below the $10,000 reporting threshold. All payments originated from different cards with the same billing address. Pattern is consistent with structuring (smurfing) to avoid AML reporting thresholds."
              className="textarea h-32"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">Reporting Jurisdiction</label>
              <select className="select">
                <option>FinCEN (US)</option><option>NCSC (UK)</option><option>FIU (EU)</option>
              </select>
            </div>
            <div>
              <label className="field-label">Filing Deadline</label>
              <input type="text" defaultValue="Jul 30, 2025 (30 days from detection)" className="input" readOnly />
            </div>
          </div>
          <div>
            <label className="field-label">Supporting Evidence</label>
            <div className="space-y-2">
              {['Transaction log (4 payments)', 'IP address records', 'Card BIN analysis', 'Account history (90d)'].map((e) => (
                <div key={e} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  {e}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-3 border-t border-slate-100">
            <Button variant="primary" icon={<Send className="w-4 h-4" />}>Submit for review</Button>
            <Button variant="secondary">Save draft</Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 20. THIRD-PARTY AUDIT / COMPLIANCE EVIDENCE REPOSITORY =====
export function AuditRepositoryView() {
  const frameworks = [
    { id: 'SOC2', name: 'SOC 2 Type II', status: 'current' as const, lastAudit: 'Jun 2025', nextAudit: 'Jun 2026', evidence: 142, controls: 84 },
    { id: 'PCI', name: 'PCI-DSS v4.0', status: 'current' as const, lastAudit: 'May 2025', nextAudit: 'May 2026', evidence: 98, controls: 64 },
    { id: 'ISO27001', name: 'ISO 27001:2022', status: 'current' as const, lastAudit: 'Apr 2025', nextAudit: 'Oct 2025', evidence: 186, controls: 114 },
    { id: 'GDPR', name: 'GDPR Compliance', status: 'current' as const, lastAudit: 'Jun 2025', nextAudit: 'Jun 2026', evidence: 42, controls: 28 },
    { id: 'HIPAA', name: 'HIPAA (if applicable)', status: 'not_required' as const, lastAudit: '—', nextAudit: '—', evidence: 0, controls: 0 },
  ];

  const statusMeta = {
    current: { variant: 'success' as const, label: 'Current' },
    expiring: { variant: 'warning' as const, label: 'Expiring' },
    not_required: { variant: 'neutral' as const, label: 'Not Required' },
  };

  return (
    <SectionShell
      title="Third-Party Audit / Compliance Evidence Repository"
      description="SOC 2, PCI-DSS, ISO 27001 evidence storage for external audits and certifications"
      actions={<Button variant="primary" size="sm" icon={<Upload className="w-3.5 h-3.5" />}>Upload evidence</Button>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {frameworks.map((f) => (
          <div key={f.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.status === 'current' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{f.name}</p>
                  <p className="text-xs text-slate-500">Last audit: {f.lastAudit} · Next: {f.nextAudit}</p>
                </div>
              </div>
              <Badge variant={statusMeta[f.status].variant} dot>{statusMeta[f.status].label}</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
              <div><p className="text-[10px] text-slate-400 uppercase">Evidence</p><p className="text-sm font-bold text-slate-800">{f.evidence}</p></div>
              <div><p className="text-[10px] text-slate-400 uppercase">Controls</p><p className="text-sm font-bold text-slate-800">{f.controls}</p></div>
              <div><p className="text-[10px] text-slate-400 uppercase">Coverage</p><p className="text-sm font-bold text-emerald-600">{f.controls > 0 ? '100%' : '—'}</p></div>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
              <Button variant="secondary" size="sm" icon={<FolderOpen className="w-3.5 h-3.5" />}>Browse evidence</Button>
              <Button variant="ghost" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export report</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <p className="section-title">Recent Evidence Uploads — SOC 2</p>
          <Button variant="secondary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>Filter</Button>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Evidence ID</th><th>Control</th><th>Description</th><th>Uploaded</th><th>By</th><th></th></tr>
          </thead>
          <tbody>
            {[
              { id: 'EV-042', control: 'CC6.1', desc: 'Access control review — Q2 2025', date: 'Jul 12', by: 'K. Bauer' },
              { id: 'EV-041', control: 'CC7.2', desc: 'Incident response procedure test', date: 'Jul 10', by: 'J. Reyes' },
              { id: 'EV-040', control: 'CC9.1', desc: 'Vendor risk assessment — payment processors', date: 'Jul 8', by: 'K. Bauer' },
              { id: 'EV-039', control: 'CC5.2', desc: 'Change management log — June 2025', date: 'Jul 5', by: 'T. Walsh' },
            ].map((e) => (
              <tr key={e.id}>
                <td><span className="font-mono text-xs text-slate-400">{e.id}</span></td>
                <td><span className="pill bg-sky-50 text-sky-700 text-xs">{e.control}</span></td>
                <td className="text-sm text-slate-700">{e.desc}</td>
                <td className="text-xs text-slate-400">{e.date}</td>
                <td className="text-xs text-slate-500">{e.by}</td>
                <td>
                  <div className="flex gap-1">
                    <Tooltip content="View" position="top"><button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button></Tooltip>
                    <Tooltip content="Download" position="top"><button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Download className="w-3.5 h-3.5" /></button></Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}
