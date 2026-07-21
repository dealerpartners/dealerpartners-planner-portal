import { useState } from 'react';
import {
  FileSignature, Plus, FileText, PenTool, Download, Eye,
  RefreshCw, Bell, Calendar, Clock, AlertTriangle, CheckCircle,
  XCircle, UserPlus, History, ChevronRight, FileCheck,
} from 'lucide-react';
import { Badge, Button, StatCard, Toggle } from '../ui';
import { SectionShell, StatusBadge, InfoRow, StepIndicator, ProgressBar } from './shared';

// 37. Lease Creation Wizard
export function LeaseWizardView() {
  const [step, setStep] = useState(0);
  const steps = ['Terms', 'Dates', 'Rent', 'Review'];
  return (
    <SectionShell title="Lease Creation Wizard" description="Multi-step form (terms, dates, rent, deposit)"
      actions={<Button variant="secondary" size="sm">Save Draft</Button>}>
      <div className="card p-6">
        <div className="mb-6"><StepIndicator steps={steps} current={step} /></div>
        {step === 0 && (
          <div className="space-y-4 max-w-xl">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Lease Type</label><select className="input"><option>Fixed-term (12 months)</option><option>Month-to-month</option><option>Fixed-term (6 months)</option><option>Custom</option></select></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Property</label><select className="input"><option>Oceanview Condos — Unit 101</option><option>Downtown Lofts — Unit 205</option></select></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Tenant</label><select className="input"><option>Sophia Martinez</option><option>John Smith (Applicant)</option></select></div>
            <Button variant="primary" onClick={() => setStep(1)}>Next</Button>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4 max-w-xl">
            <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Start Date</label><input type="date" className="input" /></div><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">End Date</label><input type="date" className="input" /></div></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Move-in Date</label><input type="date" className="input" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Notice Period</label><select className="input"><option>30 days</option><option>60 days</option><option>90 days</option></select></div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep(0)}>Back</Button><Button variant="primary" onClick={() => setStep(2)}>Next</Button></div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4 max-w-xl">
            <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Monthly Rent ($)</label><input type="number" className="input" defaultValue="2200" /></div><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Security Deposit ($)</label><input type="number" className="input" defaultValue="2200" /></div></div>
            <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Late Fee ($)</label><input type="number" className="input" defaultValue="50" /></div><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Grace Period (days)</label><input type="number" className="input" defaultValue="5" /></div></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Pet Deposit ($)</label><input type="number" className="input" defaultValue="0" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Utilities Included</label><div className="flex flex-wrap gap-2">{['Water', 'Trash', 'Gas', 'Electric', 'Internet'].map((u) => <label key={u} className="flex items-center gap-1 text-sm"><input type="checkbox" /> {u}</label>)}</div></div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep(1)}>Back</Button><Button variant="primary" onClick={() => setStep(3)}>Next</Button></div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4 max-w-xl">
            <div className="card bg-slate-50 p-4"><InfoRow label="Lease Type" value="Fixed-term (12 months)" /><InfoRow label="Property" value="Unit 101, Oceanview" /><InfoRow label="Tenant" value="Sophia Martinez" /><InfoRow label="Start" value="Aug 1, 2025" /><InfoRow label="End" value="Jul 31, 2026" /><InfoRow label="Monthly Rent" value="$2,200" /><InfoRow label="Deposit" value="$2,200" /></div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep(2)}>Back</Button><Button variant="primary" icon={<FileSignature className="w-4 h-4" />}>Create & Send for Signature</Button></div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}

// 38. Lease Templates
export function LeaseTemplatesView() {
  return (
    <SectionShell title="Lease Templates" description="Template selector with variable placeholders"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New Template</Button>}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Standard 12-Month', desc: 'Fixed-term residential lease', uses: 84, vars: 12 },
          { name: 'Month-to-Month', desc: 'Flexible rental agreement', uses: 24, vars: 8 },
          { name: 'Commercial Lease', desc: 'For retail/office space', uses: 6, vars: 18 },
          { name: 'Sublease Agreement', desc: 'Tenant subletting form', uses: 3, vars: 10 },
          { name: 'Room Rental', desc: 'Single room in shared unit', uses: 12, vars: 8 },
          { name: 'Short-Term Rental', desc: '1-6 month furnished', uses: 18, vars: 14 },
        ].map((t) => (
          <div key={t.name} className="card p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-3"><div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center"><FileText className="w-5 h-5" /></div><Badge variant="neutral" size="sm">{t.uses} uses</Badge></div>
            <p className="text-sm font-semibold text-slate-800">{t.name}</p><p className="text-xs text-slate-500 mt-0.5">{t.desc}</p>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between"><span className="text-xs text-slate-400">{t.vars} variables</span><Button variant="ghost" size="sm">Use Template</Button></div>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-3">Available Variables</p>
        <div className="flex flex-wrap gap-2">
          {['{{tenant_name}}', '{{landlord_name}}', '{{property_address}}', '{{unit_number}}', '{{monthly_rent}}', '{{deposit}}', '{{lease_start}}', '{{lease_end}}', '{{late_fee}}', '{{grace_period}}', '{{notice_period}}', '{{pet_policy}}'].map((v) => (
            <span key={v} className="font-mono text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">{v}</span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// 39. E-Signature Integration
export function ESignatureView() {
  return (
    <SectionShell title="E-Signature Integration" description="Embedded signing widget (DocuSign/HelloSign iframe or SDK)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4"><div><p className="text-sm font-semibold text-slate-800">Lease Agreement — Unit 101</p><p className="text-xs text-slate-500">Sent to: Sophia Martinez · Jul 14</p></div><Badge variant="warning" dot>Awaiting Signature</Badge></div>
          <div className="h-80 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
            <FileSignature className="w-12 h-12 text-slate-300 mb-3" />
            <p className="text-sm text-slate-500">Document preview (embedded signing widget)</p>
            <p className="text-xs text-slate-400 mt-1">12 pages · PDF · DocuSign integration</p>
          </div>
          <div className="mt-4 flex gap-2"><Button variant="primary" icon={<PenTool className="w-4 h-4" />}>Send for Signature</Button><Button variant="ghost" icon={<Download className="w-4 h-4" />}>Download PDF</Button></div>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-3">Signing Status</p>
          <div className="space-y-3">
            {[
              { name: 'Landlord (James Doe)', status: 'signed', time: 'Jul 14, 10:30 AM' },
              { name: 'Tenant (Sophia Martinez)', status: 'pending', time: '—' },
              { name: 'Co-signer (Carlos Martinez)', status: 'pending', time: '—' },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div><p className="text-sm font-medium text-slate-800">{s.name}</p><p className="text-xs text-slate-400">{s.time}</p></div>
                {s.status === 'signed' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Clock className="w-5 h-5 text-amber-400" />}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100"><InfoRow label="Provider" value="DocuSign" /><InfoRow label="Envelope ID" value="EN-2024-8842" /><InfoRow label="Expires" value="Jul 21, 2025" /></div>
        </div>
      </div>
    </SectionShell>
  );
}

// 40. Lease Renewal Workflow
export function RenewalView() {
  return (
    <SectionShell title="Lease Renewal Workflow" description="Notification banner and renewal form pre-filled from existing lease" actions={<Button variant="primary" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>Start Renewal</Button>}>
      <div className="card p-4 bg-amber-50 border-amber-200">
        <div className="flex items-center gap-3"><AlertTriangle className="w-5 h-5 text-amber-600" /><div><p className="text-sm font-medium text-amber-800">8 leases expiring in the next 60 days</p><p className="text-xs text-amber-600">Review and send renewal offers to retain tenants.</p></div></div>
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Upcoming Lease Expirations</p></div>
        <table className="data-table">
          <thead><tr><th>Tenant</th><th>Unit</th><th>Lease End</th><th>Days Left</th><th>Current Rent</th><th>Proposed Rent</th><th>Action</th></tr></thead>
          <tbody>
            {[
              { tenant: 'Sophia Martinez', unit: '101', end: 'Sep 30', days: 72, current: '$2,200', proposed: '$2,300' },
              { tenant: 'Marcus Chen', unit: '102', end: 'Oct 15', days: 87, current: '$2,800', proposed: '$2,900' },
              { tenant: 'Aisha Patel', unit: '201', end: 'Aug 31', days: 42, current: '$2,200', proposed: '$2,300' },
              { tenant: 'David Kim', unit: '301', end: 'Nov 1', days: 104, current: '$5,400', proposed: '$5,600' },
            ].map((l) => (
              <tr key={l.tenant} className={l.days < 60 ? 'bg-amber-50/30' : ''}>
                <td className="font-medium text-slate-800">{l.tenant}</td><td>{l.unit}</td><td className="text-xs">{l.end}</td>
                <td><span className={l.days < 60 ? 'text-amber-600 font-bold' : 'text-slate-600'}>{l.days}d</span></td>
                <td>{l.current}</td><td className="text-emerald-600 font-medium">{l.proposed}</td>
                <td><Button variant="secondary" size="sm">Send Offer</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 41. Lease Termination/Eviction Tracking
export function TerminationView() {
  return (
    <SectionShell title="Lease Termination / Eviction Tracking" description="Status stepper with document requirements">
      <div className="space-y-3">
        {[
          { tenant: 'Emma Wilson', unit: '205', reason: 'Non-payment (2 months)', stage: 3, status: 'in_progress' },
          { tenant: 'Tom Reed', unit: '104', reason: 'Lease violation — unauthorized pet', stage: 1, status: 'pending' },
          { tenant: 'Lisa Park', unit: '302', reason: 'Lease expiry — move-out', stage: 4, status: 'completed' },
        ].map((c) => {
          const stages = ['Notice Served', 'Response Period', 'Court Filing', 'Eviction', 'Complete'];
          return (
            <div key={c.tenant} className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">{c.tenant.split(' ').map(n => n[0]).join('')}</div><div><p className="text-sm font-semibold text-slate-800">{c.tenant} — Unit {c.unit}</p><p className="text-xs text-slate-400">{c.reason}</p></div></div>
                <StatusBadge status={c.status as any} />
              </div>
              <div className="flex items-center gap-1">
                {stages.map((s, i) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1"><div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < c.stage ? 'bg-red-500 text-white' : i === c.stage && c.status === 'completed' ? 'bg-emerald-500 text-white' : i === c.stage ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400'}`}>{i < c.stage || (i === c.stage && c.status === 'completed') ? '✓' : i + 1}</div><span className="text-[10px] text-slate-500 mt-1">{s}</span></div>
                    {i < stages.length - 1 && <div className={`h-px flex-1 mx-1 ${i < c.stage ? 'bg-red-300' : 'bg-slate-200'}`} />}
                  </div>
                ))}
              </div>
              {c.stage < 4 && c.status !== 'completed' && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <p className="text-xs text-slate-500">Required docs:</p>
                  {['3-day notice', 'Court filing', 'Sheriff notice'].map((d) => <Badge variant="neutral" size="sm"><FileText className="w-2.5 h-2.5 inline mr-1" />{d}</Badge>)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

// 42. Lease Document Viewer
export function LeaseDocViewerView() {
  return (
    <SectionShell title="Lease Document Viewer" description="PDF viewer with annotation/highlight tools">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div><p className="text-sm font-semibold text-slate-800">Lease Agreement — L-2024-001</p><p className="text-xs text-slate-500">12 pages · Sophia Martinez · Unit 101</p></div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">Highlight</Button>
            <Button variant="ghost" size="sm">Annotate</Button>
            <Button variant="ghost" size="sm" icon={<Download className="w-3 h-3" />}>Download</Button>
          </div>
        </div>
        <div className="h-96 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
          <div className="text-center"><FileText className="w-12 h-12 text-slate-300 mb-2" /><p className="text-sm text-slate-500">PDF Document Preview</p><p className="text-xs text-slate-400 mt-1">Page 1 of 12</p></div>
        </div>
        <div className="flex items-center justify-between mt-3"><Button variant="ghost" size="sm">‹ Previous</Button><span className="text-xs text-slate-400">Page 1 / 12</span><Button variant="ghost" size="sm">Next ›</Button></div>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-3">Annotations</p>
        <div className="space-y-2">
          {[
            { page: 3, text: 'Clause 4.2: Late fee confirmed at $50', by: 'James Doe', color: 'amber' },
            { page: 7, text: 'Pet policy: No pets allowed without deposit', by: 'Lisa Torres', color: 'sky' },
          ].map((a, i) => (
            <div key={i} className={`p-3 rounded-lg text-sm ${a.color === 'amber' ? 'bg-amber-50' : 'bg-sky-50'}`}><span className="text-xs text-slate-400">Page {a.page}</span> · {a.text} <span className="text-xs text-slate-400">— {a.by}</span></div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// 43. Lease Expiration Alerts
export function ExpirationAlertsView() {
  return (
    <SectionShell title="Lease Expiration Alerts" description="Dashboard widget with countdown and date proximity sorting">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Expiring (30d)" value="3" icon={<Clock className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Expiring (60d)" value="5" icon={<Clock className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Expiring (90d)" value="8" icon={<Clock className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Renewed (30d)" value="12" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Expiration Timeline (Sorted by Proximity)</p></div>
        <table className="data-table">
          <thead><tr><th>Tenant</th><th>Unit</th><th>End Date</th><th>Days Left</th><th>Urgency</th><th></th></tr></thead>
          <tbody>
            {[
              { tenant: 'Aisha Patel', unit: '201', end: 'Aug 31, 2025', days: 42, urgency: 'critical' },
              { tenant: 'Sophia Martinez', unit: '101', end: 'Sep 30, 2025', days: 72, urgency: 'high' },
              { tenant: 'Marcus Chen', unit: '102', end: 'Oct 15, 2025', days: 87, urgency: 'medium' },
              { tenant: 'David Kim', unit: '301', end: 'Nov 1, 2025', days: 104, urgency: 'low' },
            ].map((l) => (
              <tr key={l.tenant} className={l.urgency === 'critical' ? 'bg-red-50/30' : l.urgency === 'high' ? 'bg-amber-50/20' : ''}>
                <td className="font-medium text-slate-800">{l.tenant}</td><td>{l.unit}</td><td className="text-xs">{l.end}</td>
                <td><span className={l.days < 60 ? 'text-red-600 font-bold' : l.days < 90 ? 'text-amber-600 font-medium' : 'text-slate-600'}>{l.days}d</span></td>
                <td><Badge variant={l.urgency === 'critical' ? 'danger' : l.urgency === 'high' ? 'warning' : l.urgency === 'medium' ? 'info' : 'neutral'} size="sm" dot>{l.urgency}</Badge></td>
                <td><Button variant="secondary" size="sm">Send Renewal</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 44. Co-signer/Guarantor Management
export function CosignerView() {
  return (
    <SectionShell title="Co-signer / Guarantor Management" description="Additional party form fields"
      actions={<Button variant="primary" size="sm" icon={<UserPlus className="w-3.5 h-3.5" />}>Add Co-signer</Button>}>
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold">CM</div><div><p className="text-sm font-semibold text-slate-800">Carlos Martinez</p><p className="text-xs text-slate-400">Co-signer for Sophia Martinez — Unit 101</p></div></div>
        <div className="grid grid-cols-2 gap-4 max-w-xl">
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Full Name</label><input className="input" defaultValue="Carlos Martinez" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Relationship</label><input className="input" defaultValue="Brother" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Email</label><input className="input" defaultValue="carlos@mail.com" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Phone</label><input className="input" defaultValue="+1 (555) 200-3000" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Annual Income</label><input className="input" defaultValue="$85,000" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Credit Score</label><input className="input" defaultValue="780" /></div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Verification Status</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded"><span className="text-sm text-slate-700">ID Verified</span><CheckCircle className="w-4 h-4 text-emerald-500" /></div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded"><span className="text-sm text-slate-700">Income Verified</span><CheckCircle className="w-4 h-4 text-emerald-500" /></div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded"><span className="text-sm text-slate-700">Credit Check</span><Clock className="w-4 h-4 text-amber-400" /></div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded"><span className="text-sm text-slate-700">E-signature</span><XCircle className="w-4 h-4 text-slate-300" /></div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 45. Lease Amendments
export function AmendmentsView() {
  return (
    <SectionShell title="Lease Amendments" description="Version history and diff viewer">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4"><div><p className="text-sm font-semibold text-slate-800">Lease L-2024-001 — Amendment History</p><p className="text-xs text-slate-500">3 versions · Sophia Martinez · Unit 101</p></div><Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New Amendment</Button></div>
        <div className="space-y-3">
          {[
            { ver: 'v3', date: 'Jul 10, 2025', change: 'Rent increased from $2,100 to $2,200', by: 'James Doe' },
            { ver: 'v2', date: 'Jan 15, 2025', change: 'Added pet clause (cat allowed, $300 deposit)', by: 'Lisa Torres' },
            { ver: 'v1', date: 'Jan 15, 2024', change: 'Original lease created', by: 'James Doe' },
          ].map((a) => (
            <div key={a.ver} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-bold">{a.ver}</div>
              <div className="flex-1"><p className="text-sm text-slate-700">{a.change}</p><p className="text-xs text-slate-400 mt-0.5">{a.date} · By {a.by}</p></div>
              <div className="flex gap-1"><Button variant="ghost" size="sm" icon={<Eye className="w-3 h-3" />}>View</Button><Button variant="ghost" size="sm" icon={<History className="w-3 h-3" />}>Diff</Button></div>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-3">Diff Viewer — v2 → v3</p>
        <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs space-y-1">
          <p className="text-red-400">- Monthly Rent: $2,100</p>
          <p className="text-emerald-400">+ Monthly Rent: $2,200</p>
          <p className="text-slate-500">  Late Fee: $50 (unchanged)</p>
          <p className="text-slate-500">  Grace Period: 5 days (unchanged)</p>
          <p className="text-red-400">- Lease End: Dec 31, 2024</p>
          <p className="text-emerald-400">+ Lease End: Dec 31, 2025</p>
        </div>
      </div>
    </SectionShell>
  );
}

// 46. Automated Lease Renewal Reminders
export function RenewalRemindersView() {
  return (
    <SectionShell title="Automated Lease Renewal Reminders" description="Scheduled notification settings UI">
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Reminder Schedule</p>
        <div className="space-y-3">
          {[
            { timing: '90 days before', channel: 'Email + SMS', template: 'Early renewal offer', active: true },
            { timing: '60 days before', channel: 'Email', template: 'Renewal reminder', active: true },
            { timing: '30 days before', channel: 'Email + SMS + Push', template: 'Urgent renewal notice', active: true },
            { timing: '14 days before', channel: 'Email + SMS', template: 'Final notice + move-out info', active: true },
            { timing: '7 days before', channel: 'SMS', template: 'Schedule move-out inspection', active: false },
          ].map((r) => (
            <div key={r.timing} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3"><Bell className="w-5 h-5 text-sky-500" /><div><p className="text-sm font-medium text-slate-800">{r.timing}</p><p className="text-xs text-slate-400">{r.channel} · {r.template}</p></div></div>
              <div className="flex items-center gap-2"><Button variant="ghost" size="sm">Edit</Button><Toggle checked={r.active} onChange={() => {}} /></div>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-3">Reminder Template Preview</p>
        <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-sky-400">
          <p className="text-sm text-slate-700">Hi Sophia, your lease for Unit 101 at Oceanview Condos expires on Sep 30, 2025. We'd love to have you stay! Reply YES to receive a renewal offer, or NO to schedule a move-out.</p>
          <p className="text-xs text-slate-400 mt-2">Sent 60 days before expiration · Email + SMS</p>
        </div>
      </div>
    </SectionShell>
  );
}


