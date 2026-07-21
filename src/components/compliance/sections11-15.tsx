import { useState } from 'react';
import {
  FileBadge, Globe, ShieldCheck, Mail, FileText, Plus, Download,
  CheckCircle, XCircle, Clock, AlertTriangle, Eye, Lock, Unlock,
  ArrowRight, History, Send, Trash2, Search, Calendar, Scale,
} from 'lucide-react';
import { Badge, Button, Tooltip, StatCard, Toggle } from '../ui';
import { SectionShell, VerificationBadge, ChecklistItem } from './shared';

// ===== 11. REGULATORY BONDING / LICENSING TRACKER =====
export function BondingView() {
  const licenses = [
    { id: 'LIC-01', name: 'ATOL (Air Travel Org. Trust)', jurisdiction: 'UK', vendor: 'Planviry Hospitality LLC', expiry: 'Dec 31, 2025', status: 'active' as const, coverage: '$1.2M' },
    { id: 'LIC-02', name: 'Travel Agent Bond', jurisdiction: 'California, US', vendor: 'Planviry Hospitality LLC', expiry: 'Sep 15, 2025', status: 'active' as const, coverage: '$50K' },
    { id: 'LIC-03', name: 'Seller of Travel Registration', jurisdiction: 'Florida, US', vendor: 'Planviry Hospitality LLC', expiry: 'Jan 30, 2026', status: 'active' as const, coverage: '—' },
    { id: 'LIC-04', name: 'Package Travel Regulations', jurisdiction: 'EU', vendor: 'Alpine Adventures GmbH', expiry: 'Aug 1, 2025', status: 'expiring' as const, coverage: '€500K' },
    { id: 'LIC-05', name: 'IATA Accreditation', jurisdiction: 'Global', vendor: 'Planviry Hospitality LLC', expiry: 'Mar 12, 2026', status: 'active' as const, coverage: '—' },
    { id: 'LIC-06', name: 'Consumer Protection Bond', jurisdiction: 'Australia', vendor: 'Coastal Retreats Inc.', expiry: 'Jul 20, 2025', status: 'expired' as const, coverage: 'AUD 100K' },
  ];

  const statusMeta = {
    active: { variant: 'success' as const, label: 'Active' },
    expiring: { variant: 'warning' as const, label: 'Expiring Soon' },
    expired: { variant: 'danger' as const, label: 'Expired' },
  };

  return (
    <SectionShell
      title="Regulatory Bonding & Licensing Tracker"
      description="ATOL-equivalent, travel agent bonding, and jurisdiction-specific trust schemes"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add license</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Licenses" value="4" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Expiring (30d)" value="1" icon={<Clock className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Expired" value="1" icon={<XCircle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Total Coverage" value="$1.75M" icon={<ShieldCheck className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>

      {statusMeta && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-red-50 border-red-200 text-red-800 text-sm">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span><span className="font-semibold">1 license expired</span> — Coastal Retreats Inc. (Australia Consumer Protection Bond). Listings in this jurisdiction are paused until renewed.</span>
          <Button variant="danger" size="sm" className="ml-auto">Renew now</Button>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Licenses & Bonds</p></div>
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>License</th><th>Jurisdiction</th><th>Vendor</th><th>Coverage</th><th>Expiry</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {licenses.map((l) => (
              <tr key={l.id} className={l.status === 'expired' ? 'bg-red-50/30' : l.status === 'expiring' ? 'bg-amber-50/20' : ''}>
                <td><span className="font-mono text-xs text-slate-400">{l.id}</span></td>
                <td className="font-medium text-slate-800">{l.name}</td>
                <td><span className="pill bg-slate-100 text-slate-600 text-xs">{l.jurisdiction}</span></td>
                <td className="text-sm text-slate-600">{l.vendor}</td>
                <td className="text-sm font-medium text-slate-700">{l.coverage}</td>
                <td className="text-xs text-slate-400">{l.expiry}</td>
                <td><Badge variant={statusMeta[l.status].variant} dot>{statusMeta[l.status].label}</Badge></td>
                <td>
                  <div className="flex gap-1">
                    <Tooltip content="View document" position="top"><button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button></Tooltip>
                    {(l.status === 'expiring' || l.status === 'expired') && <Button variant="secondary" size="sm">Renew</Button>}
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

// ===== 12. REGION-SPECIFIC CONSUMER PROTECTION RULE ENGINE =====
export function ConsumerProtectionView() {
  const regions = [
    { code: 'US-CA', name: 'California, USA', rules: 12, active: true, lastUpdated: 'Jul 1' },
    { code: 'US-FL', name: 'Florida, USA', rules: 8, active: true, lastUpdated: 'Jul 1' },
    { code: 'EU', name: 'European Union (PCR)', rules: 24, active: true, lastUpdated: 'Jul 10' },
    { code: 'UK', name: 'United Kingdom (ATOL)', rules: 16, active: true, lastUpdated: 'Jul 5' },
    { code: 'AU', name: 'Australia (ACL)', rules: 14, active: true, lastUpdated: 'Jun 28' },
    { code: 'CA', name: 'Canada', rules: 10, active: true, lastUpdated: 'Jul 1' },
    { code: 'BR', name: 'Brazil (CDC)', rules: 18, active: false, lastUpdated: 'Jun 15' },
  ];

  const rules = [
    { region: 'EU', rule: '14-day cooling-off period', desc: 'Consumer may cancel within 14 days without penalty', enforcement: 'auto', active: true },
    { region: 'US-CA', rule: 'Full refund for cancellation 30+ days', desc: 'California Seller of Travel law requires full refund', enforcement: 'auto', active: true },
    { region: 'UK', rule: 'ATOL protection notice', desc: 'Display ATOL certificate at checkout for flight-inclusive packages', enforcement: 'display', active: true },
    { region: 'AU', rule: 'Non-refundable deposit limit', desc: 'Max 10% non-refundable deposit under ACL', enforcement: 'auto', active: true },
    { region: 'EU', rule: 'Travel organizer liability', desc: 'Platform is liable for all travel services in package', enforcement: 'policy', active: true },
    { region: 'US-FL', rule: 'Disclose registration number', desc: 'FL Seller of Travel registration must appear on all materials', enforcement: 'display', active: true },
  ];

  return (
    <SectionShell
      title="Region-Specific Consumer Protection Rule Engine"
      description="Enforces different refund, disclosure, and cancellation rules per country/jurisdiction"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add rule</Button>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Active Regions</p>
          {regions.map((r) => (
            <div key={r.code} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-800">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.rules} rules · Updated {r.lastUpdated}</p>
                </div>
              </div>
              <Toggle checked={r.active} onChange={() => {}} />
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 card">
          <div className="card-header">
            <p className="section-title">Active Rules</p>
            <Button variant="secondary" size="sm">Edit rules</Button>
          </div>
          <div className="divide-y divide-slate-100">
            {rules.map((r, i) => (
              <div key={i} className="px-5 py-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="pill bg-sky-50 text-sky-700 text-xs">{r.region}</span>
                      <p className="text-sm font-medium text-slate-800">{r.rule}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{r.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={r.enforcement === 'auto' ? 'success' : r.enforcement === 'display' ? 'info' : 'warning'} size="sm">{r.enforcement}</Badge>
                    <Toggle checked={r.active} onChange={() => {}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 13. REGIONAL PRIVACY LAW COMPLIANCE MANAGER =====
export function PrivacyView() {
  const regulations = [
    { code: 'GDPR', name: 'EU General Data Protection Regulation', region: 'European Union', obligations: 12, compliant: true, lastAudit: 'Jun 2025' },
    { code: 'CCPA', name: 'California Consumer Privacy Act', region: 'California, USA', obligations: 8, compliant: true, lastAudit: 'May 2025' },
    { code: 'LGPD', name: 'Lei Geral de Proteção de Dados', region: 'Brazil', obligations: 10, compliant: true, lastAudit: 'Apr 2025' },
    { code: 'PIPL', name: 'Personal Information Protection Law', region: 'China', obligations: 14, compliant: false, lastAudit: 'Mar 2025' },
    { code: 'POPIA', name: 'Protection of Personal Information Act', region: 'South Africa', obligations: 9, compliant: true, lastAudit: 'Jun 2025' },
    { code: 'PDPA', name: 'Personal Data Protection Act', region: 'Singapore', obligations: 8, compliant: true, lastAudit: 'May 2025' },
  ];

  return (
    <SectionShell
      title="Regional Privacy Law Compliance Manager"
      description="GDPR, CCPA, LGPD, PIPL, POPIA — one console tracking obligations per region"
      actions={<Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export compliance report</Button>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {regulations.map((r) => (
          <div key={r.code} className={`card p-5 ${!r.compliant ? 'border-red-300' : ''}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.compliant ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{r.code}</p>
                  <p className="text-xs text-slate-500">{r.name}</p>
                </div>
              </div>
              <Badge variant={r.compliant ? 'success' : 'danger'} dot>{r.compliant ? 'Compliant' : 'Non-Compliant'}</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
              <div><p className="text-[10px] text-slate-400 uppercase">Region</p><p className="text-sm font-medium text-slate-700">{r.region}</p></div>
              <div><p className="text-[10px] text-slate-400 uppercase">Obligations</p><p className="text-sm font-medium text-slate-700">{r.obligations}</p></div>
              <div><p className="text-[10px] text-slate-400 uppercase">Last Audit</p><p className="text-sm font-medium text-slate-700">{r.lastAudit}</p></div>
            </div>
            {!r.compliant && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-red-600">
                <AlertTriangle className="w-3.5 h-3.5" />
                Cross-border data transfer mechanism required. Implement Standard Contractual Clauses.
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header"><p className="section-title">Key Obligations — GDPR</p></div>
        <div className="card-body grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <div>
            <ChecklistItem label="Lawful basis for processing" status="done" detail="Consent + legitimate interest documented" />
            <ChecklistItem label="Data Processing Register (RoPA)" status="done" detail="Updated Jun 2025" />
            <ChecklistItem label="DPO appointed" status="done" detail="Klaus Bauer — registered with supervisory authority" />
            <ChecklistItem label="Cross-border transfer mechanism" status="done" detail="SCCs in place with all sub-processors" />
          </div>
          <div>
            <ChecklistItem label="72-hour breach notification" status="done" detail="0 breaches in last 12 months" />
            <ChecklistItem label="Privacy by design assessment" status="done" detail="All new features reviewed" />
            <ChecklistItem label="DPIA for high-risk processing" status="done" detail="3 DPIAs on file" />
            <ChecklistItem label="Sub-processor list published" status="done" detail="Updated quarterly" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 14. DATA SUBJECT REQUEST (DSAR) FULFILLMENT =====
export function DSARView() {
  const requests = [
    { id: 'DSAR-042', subject: 'Sophia Martinez', type: 'Export', region: 'EU (GDPR)', submitted: 'Jul 12', deadline: 'Jul 26', status: 'processing' as const, progress: 40 },
    { id: 'DSAR-041', subject: 'Marcus Chen', type: 'Delete', region: 'CA (CCPA)', submitted: 'Jul 10', deadline: 'Aug 9', status: 'review' as const, progress: 20 },
    { id: 'DSAR-040', subject: 'Aisha Patel', type: 'Export', region: 'EU (GDPR)', submitted: 'Jul 8', deadline: 'Jul 22', status: 'completed' as const, progress: 100 },
    { id: 'DSAR-039', subject: 'David Kim', type: 'Rectify', region: 'CA (CCPA)', submitted: 'Jul 6', deadline: 'Aug 5', status: 'completed' as const, progress: 100 },
    { id: 'DSAR-038', subject: 'Priya Nair', type: 'Delete', region: 'EU (GDPR)', submitted: 'Jul 4', deadline: 'Jul 18', status: 'overdue' as const, progress: 60 },
  ];

  const statusMeta = {
    processing: { variant: 'info' as const, label: 'Processing' },
    review: { variant: 'warning' as const, label: 'In Review' },
    completed: { variant: 'success' as const, label: 'Completed' },
    overdue: { variant: 'danger' as const, label: 'Overdue' },
  };

  return (
    <SectionShell
      title="Data Subject Request (DSAR) Fulfillment Center"
      description="Cross-module 'export/delete my data' execution with regulatory deadline tracking"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New request</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Requests" value="3" icon={<Clock className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Overdue" value="1" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Completed (30d)" value="8" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Avg Fulfillment" value="3.2 days" icon={<Clock className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">DSAR Queue</p></div>
        <table className="data-table">
          <thead>
            <tr><th>Request ID</th><th>Subject</th><th>Type</th><th>Region</th><th>Submitted</th><th>Deadline</th><th>Progress</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className={r.status === 'overdue' ? 'bg-red-50/30' : ''}>
                <td><span className="font-mono text-xs text-slate-400">{r.id}</span></td>
                <td className="font-medium text-slate-800">{r.subject}</td>
                <td>
                  <span className={`pill text-xs ${r.type === 'Delete' ? 'bg-red-50 text-red-700' : r.type === 'Export' ? 'bg-sky-50 text-sky-700' : 'bg-amber-50 text-amber-700'}`}>{r.type}</span>
                </td>
                <td className="text-xs text-slate-500">{r.region}</td>
                <td className="text-xs text-slate-400">{r.submitted}</td>
                <td className={`text-xs ${r.status === 'overdue' ? 'text-red-600 font-medium' : 'text-slate-400'}`}>{r.deadline}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${r.status === 'completed' ? 'bg-emerald-500' : r.status === 'overdue' ? 'bg-red-500' : 'bg-sky-500'}`} style={{ width: `${r.progress}%` }} />
                    </div>
                    <span className="text-xs text-slate-500">{r.progress}%</span>
                  </div>
                </td>
                <td><Badge variant={statusMeta[r.status].variant} dot>{statusMeta[r.status].label}</Badge></td>
                <td>
                  {r.status !== 'completed' && <Button variant="secondary" size="sm">Process</Button>}
                  {r.status === 'completed' && r.type === 'Export' && <Button variant="ghost" size="sm" icon={<Download className="w-3 h-3" />}>Download</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header"><p className="section-title">DSAR Pipeline — Sophia Martinez (Export)</p></div>
        <div className="card-body">
          <div className="flex items-center gap-2">
            {[
              { step: 'Identity verified', done: true },
              { step: 'Data collected', done: true },
              { step: 'Cross-module scan', done: false },
              { step: 'Review & redact', done: false },
              { step: 'Package & deliver', done: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className={`flex flex-col items-center gap-1 flex-1`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${s.done ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {s.done ? '✓' : i + 1}
                  </div>
                  <span className={`text-[10px] text-center ${s.done ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>{s.step}</span>
                </div>
                {i < 4 && <ArrowRight className="w-3 h-3 text-slate-300 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 15. TERMS OF SERVICE / POLICY VERSION MANAGER =====
export function ToSView() {
  const policies = [
    { id: 'TOS-v4.2', name: 'Terms of Service — Global', version: '4.2', effective: 'Jul 1, 2025', status: 'active' as const, regions: 'All', changes: 14 },
    { id: 'TOS-v4.1', name: 'Terms of Service — Global', version: '4.1', effective: 'Mar 1, 2025', status: 'archived' as const, regions: 'All', changes: 8 },
    { id: 'PP-v3.0', name: 'Privacy Policy — EU/UK', version: '3.0', effective: 'Jun 15, 2025', status: 'active' as const, regions: 'EU, UK', changes: 22 },
    { id: 'PP-v2.4', name: 'Privacy Policy — US', version: '2.4', effective: 'May 1, 2025', status: 'active' as const, regions: 'US', changes: 6 },
    { id: 'RR-v1.5', name: 'Refund & Cancellation Policy', version: '1.5', effective: 'Jul 10, 2025', status: 'active' as const, regions: 'All', changes: 4 },
    { id: 'HCP-v1.0', name: 'Host Contract — Vendor Agreement', version: '1.0', effective: 'Jan 1, 2025', status: 'active' as const, regions: 'All', changes: 0 },
  ];

  const statusMeta = {
    active: { variant: 'success' as const, label: 'Active' },
    archived: { variant: 'neutral' as const, label: 'Archived' },
    draft: { variant: 'warning' as const, label: 'Draft' },
  };

  return (
    <SectionShell
      title="Terms of Service / Policy Version Manager"
      description="Generates and versions T&Cs per business type and region with full audit trail"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New version</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Policies" value="5" icon={<FileText className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Archived Versions" value="18" icon={<History className="w-4 h-4" />} iconColor="bg-slate-100 text-slate-500" />
        <StatCard label="Pending Re-consent" value="2,840" icon={<Mail className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Avg Acceptance Rate" value="94.2%" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Policy Versions</p></div>
        <table className="data-table">
          <thead>
            <tr><th>Policy ID</th><th>Name</th><th>Version</th><th>Effective Date</th><th>Regions</th><th>Changes</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {policies.map((p) => (
              <tr key={p.id}>
                <td><span className="font-mono text-xs text-slate-400">{p.id}</span></td>
                <td className="font-medium text-slate-800">{p.name}</td>
                <td><span className="pill bg-sky-50 text-sky-700 text-xs">v{p.version}</span></td>
                <td className="text-xs text-slate-400">{p.effective}</td>
                <td className="text-xs text-slate-500">{p.regions}</td>
                <td className={p.changes > 0 ? 'text-amber-600 font-medium' : 'text-slate-400'}>{p.changes} changes</td>
                <td><Badge variant={statusMeta[p.status].variant} dot>{statusMeta[p.status].label}</Badge></td>
                <td>
                  <div className="flex gap-1">
                    <Tooltip content="View document" position="top"><button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button></Tooltip>
                    <Tooltip content="View diff" position="top"><button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><History className="w-3.5 h-3.5" /></button></Tooltip>
                    <Tooltip content="Download" position="top"><button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Download className="w-3.5 h-3.5" /></button></Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header"><p className="section-title">Recent Changes — ToS v4.2</p></div>
        <div className="card-body space-y-2">
          {[
            { section: '§4.3 Cancellation', change: 'Added 14-day cooling-off period for EU consumers', type: 'added' },
            { section: '§7.1 Liability', change: 'Clarified platform liability cap at booking value', type: 'modified' },
            { section: '§9.2 Data Processing', change: 'Updated sub-processor list with 3 new vendors', type: 'modified' },
            { section: '§12.5 Force Majeure', change: 'Added pandemic-specific clause', type: 'added' },
          ].map((c, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
              <Badge variant={c.type === 'added' ? 'success' : 'warning'} size="sm">{c.type}</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{c.section}</p>
                <p className="text-xs text-slate-500 mt-0.5">{c.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
