import { useState } from 'react';
import {
  Building2, User, ShieldAlert, Activity, Gauge, FileCheck, Search,
  CheckCircle, XCircle, Clock, AlertTriangle, Eye, Download, Filter,
  Plus, MoreHorizontal, Fingerprint, ScanFace, Globe, TrendingUp,
} from 'lucide-react';
import { Badge, Button, Tooltip, StatCard, Toggle } from '../ui';
import { SectionShell, RiskGauge, VerificationBadge, ChecklistItem } from './shared';

// ===== 1. SUPPLIER KYB =====
export function KYBView() {
  const suppliers = [
    { id: 'KYB-0142', name: 'Coastal Retreats Inc.', country: 'US', ein: '••-•••4821', status: 'verified' as const, submitted: 'Jul 10', owner: 'Diana Wells', docs: 4 },
    { id: 'KYB-0141', name: 'Urban Events Co.', country: 'US', ein: '••-•••8864', status: 'pending' as const, submitted: 'Jul 12', owner: 'Sam Patel', docs: 2 },
    { id: 'KYB-0140', name: 'Wilderness Trails LLC', country: 'CA', ein: 'BN-••••291', status: 'verified' as const, submitted: 'Jul 6', owner: 'Ben Carter', docs: 5 },
    { id: 'KYB-0139', name: 'City Bites Tour Co.', country: 'US', ein: '••-•••1102', status: 'failed' as const, submitted: 'Jul 2', owner: 'Maria Lopez', docs: 1 },
    { id: 'KYB-0138', name: 'Alpine Adventures GmbH', country: 'DE', ein: 'DE-••••••44', status: 'pending' as const, submitted: 'Jul 14', owner: 'Klaus Bauer', docs: 3 },
  ];

  return (
    <SectionShell
      title="Supplier KYB — Know Your Business"
      description="Business registration, tax ID, and ownership verification for all vendors"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New KYB</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Verified" value="284" sub="All time" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Pending Review" value="12" icon={<Clock className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Failed" value="8" icon={<XCircle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Avg Time to Verify" value="2.4 days" icon={<Clock className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header">
          <p className="section-title">Business Verification Queue</p>
          <Button variant="secondary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>Filter</Button>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>KYB ID</th><th>Business</th><th>Country</th><th>Tax ID</th><th>Owner</th><th>Docs</th><th>Submitted</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id}>
                <td><span className="font-mono text-xs text-slate-400">{s.id}</span></td>
                <td className="font-medium text-slate-800">{s.name}</td>
                <td><span className="pill bg-slate-100 text-slate-600 text-xs">{s.country}</span></td>
                <td className="font-mono text-xs text-slate-500">{s.ein}</td>
                <td className="text-sm text-slate-600">{s.owner}</td>
                <td>{s.docs}/5</td>
                <td className="text-xs text-slate-400">{s.submitted}</td>
                <td><VerificationBadge status={s.status} /></td>
                <td>
                  <div className="flex gap-1">
                    <Tooltip content="Review documents" position="top">
                      <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button>
                    </Tooltip>
                    {s.status === 'pending' && (
                      <>
                        <Tooltip content="Approve" position="top">
                          <button className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"><CheckCircle className="w-3.5 h-3.5" /></button>
                        </Tooltip>
                        <Tooltip content="Reject" position="top">
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded"><XCircle className="w-3.5 h-3.5" /></button>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header"><p className="section-title">Required Documents Checklist</p></div>
        <div className="card-body">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Business Entity</p>
              <ChecklistItem label="Business registration certificate" status="done" detail="Filed: 2021-03-14" />
              <ChecklistItem label="Tax ID / EIN verification" status="done" detail="IRS verified" />
              <ChecklistItem label="Articles of incorporation" status="done" />
              <ChecklistItem label="Business license (jurisdiction)" status="pending" detail="Awaiting upload" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ownership & Control</p>
              <ChecklistItem label="Beneficial ownership disclosure (UBO)" status="done" detail="2 owners identified" />
              <ChecklistItem label="ID verification for owners (>25%)" status="done" />
              <ChecklistItem label="Insurance certificate" status="done" detail="General liability — $2M" />
              <ChecklistItem label="Bank account verification" status="pending" />
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 2. INDIVIDUAL KYC =====
export function KYCView() {
  const individuals = [
    { id: 'KYC-9821', name: 'James Doe', role: 'Host', idType: 'Passport', liveness: 'passed' as const, status: 'verified' as const, date: 'Jul 10' },
    { id: 'KYC-9820', name: 'Jessica Reyes', role: 'Manager', idType: "Driver's License", liveness: 'passed' as const, status: 'verified' as const, date: 'Jul 9' },
    { id: 'KYC-9819', name: 'Tom Walsh', role: 'Guide', idType: 'National ID', liveness: 'failed' as const, status: 'failed' as const, date: 'Jul 12' },
    { id: 'KYC-9818', name: 'Ana Lima', role: 'Driver', idType: "Driver's License", liveness: 'pending' as const, status: 'pending' as const, date: 'Jul 13' },
    { id: 'KYC-9817', name: 'Marcus Chen', role: 'Planner', idType: 'Passport', liveness: 'passed' as const, status: 'verified' as const, date: 'Jul 8' },
  ];

  const livenessMeta = {
    passed: { variant: 'success' as const, label: 'Passed' },
    failed: { variant: 'danger' as const, label: 'Failed' },
    pending: { variant: 'warning' as const, label: 'Pending' },
  };

  return (
    <SectionShell
      title="Individual KYC — Know Your Customer"
      description="ID verification and liveness checks for hosts, drivers, guides, and planners"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New KYC</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Verified Individuals" value="1,420" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Pending Liveness" value="8" icon={<ScanFace className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Failed Checks" value="3" icon={<XCircle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Avg Verify Time" value="4.2 min" icon={<Fingerprint className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card overflow-hidden">
          <div className="card-header"><p className="section-title">Verification Queue</p></div>
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Role</th><th>ID Type</th><th>Liveness</th><th>Status</th></tr>
            </thead>
            <tbody>
              {individuals.map((i) => (
                <tr key={i.id}>
                  <td><span className="font-mono text-xs text-slate-400">{i.id}</span></td>
                  <td className="font-medium text-slate-800">{i.name}</td>
                  <td><span className="pill bg-slate-100 text-slate-600 text-xs">{i.role}</span></td>
                  <td className="text-xs text-slate-500">{i.idType}</td>
                  <td><Badge variant={livenessMeta[i.liveness].variant} dot size="sm">{livenessMeta[i.liveness].label}</Badge></td>
                  <td><VerificationBadge status={i.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header"><p className="section-title">Liveness Check Detail — Tom Walsh</p></div>
          <div className="card-body space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="aspect-square bg-slate-200 rounded-lg mb-2 flex items-center justify-center">
                  <ScanFace className="w-12 h-12 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500 text-center">Selfie capture</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="aspect-square bg-slate-200 rounded-lg mb-2 flex items-center justify-center">
                  <Fingerprint className="w-12 h-12 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500 text-center">ID document</p>
              </div>
            </div>
            <div>
              <ChecklistItem label="Face match confidence" status="failed" detail="62% — below 80% threshold" />
              <ChecklistItem label="Document authenticity" status="done" detail="Passport verified" />
              <ChecklistItem label="Liveness detection" status="failed" detail="Possible spoof detected" />
              <ChecklistItem label="OFAC/PEP screening" status="done" detail="No matches" />
            </div>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" icon={<ScanFace className="w-3.5 h-3.5" />}>Request re-check</Button>
              <Button variant="danger" size="sm">Reject & ban</Button>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 3. SANCTIONS / OFAC / PEP SCREENING =====
export function SanctionsView() {
  const screenings = [
    { id: 'SCN-4421', entity: 'Coastal Retreats Inc.', type: 'Business', lists: 'OFAC, EU, UN', hits: 0, status: 'clear' as const, date: 'Jul 10' },
    { id: 'SCN-4420', entity: 'Diana Wells', type: 'Individual', lists: 'OFAC, PEP, EU', hits: 0, status: 'clear' as const, date: 'Jul 10' },
    { id: 'SCN-4419', entity: 'Alpine Adventures GmbH', type: 'Business', lists: 'OFAC, EU, UN', hits: 2, status: 'review' as const, date: 'Jul 14' },
    { id: 'SCN-4418', entity: 'Klaus Bauer', type: 'Individual', lists: 'OFAC, PEP, EU', hits: 1, status: 'review' as const, date: 'Jul 14' },
    { id: 'SCN-4417', entity: 'Marcus Chen', type: 'Individual', lists: 'OFAC, PEP', hits: 0, status: 'clear' as const, date: 'Jul 8' },
    { id: 'SCN-4416', entity: 'City Bites Tour Co.', type: 'Business', lists: 'OFAC, EU, UN', hits: 3, status: 'blocked' as const, date: 'Jul 2' },
  ];

  const statusMeta = {
    clear: { variant: 'success' as const, label: 'Clear' },
    review: { variant: 'warning' as const, label: 'Needs Review' },
    blocked: { variant: 'danger' as const, label: 'Blocked' },
  };

  return (
    <SectionShell
      title="Sanctions / OFAC / PEP Screening"
      description="Automated screening against global watchlists for every new supplier and high-value transaction"
      actions={<Button variant="secondary" size="sm" icon={<Search className="w-3.5 h-3.5" />}>Manual screening</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Screened (30d)" value="1,840" icon={<ShieldAlert className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Clear" value="1,832" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Needs Review" value="5" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Blocked" value="3" icon={<XCircle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header">
          <p className="section-title">Screening Results</p>
          <div className="flex items-center gap-2">
            <select className="select h-8 w-32 text-xs">
              <option>All statuses</option>
              <option>Clear</option>
              <option>Needs review</option>
              <option>Blocked</option>
            </select>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Screening ID</th><th>Entity</th><th>Type</th><th>Lists Checked</th><th>Hits</th><th>Date</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {screenings.map((s) => (
              <tr key={s.id} className={s.status === 'blocked' ? 'bg-red-50/40' : s.status === 'review' ? 'bg-amber-50/30' : ''}>
                <td><span className="font-mono text-xs text-slate-400">{s.id}</span></td>
                <td className="font-medium text-slate-800">{s.entity}</td>
                <td className="text-xs text-slate-500">{s.type}</td>
                <td className="text-xs text-slate-500">{s.lists}</td>
                <td>
                  {s.hits === 0 ? (
                    <span className="text-emerald-600 font-medium">0</span>
                  ) : (
                    <span className={`font-bold ${s.hits >= 3 ? 'text-red-600' : 'text-amber-600'}`}>{s.hits}</span>
                  )}
                </td>
                <td className="text-xs text-slate-400">{s.date}</td>
                <td><Badge variant={statusMeta[s.status].variant} dot>{statusMeta[s.status].label}</Badge></td>
                <td>
                  {s.status === 'review' && (
                    <Button variant="secondary" size="sm">Review hits</Button>
                  )}
                  {s.status === 'blocked' && (
                    <Button variant="ghost" size="sm">View details</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header"><p className="section-title">Match Detail — Alpine Adventures GmbH</p></div>
        <div className="card-body space-y-3">
          {[
            { list: 'EU Consolidated List', matchScore: 78, entity: 'Alpine Adventure Holdings (Liechtenstein)', note: 'Partial name match, different jurisdiction' },
            { list: 'PEP Database', matchScore: 45, entity: 'Klaus Bauer (political exposure)', note: 'Low-confidence PEP match — local council member' },
          ].map((m, i) => (
            <div key={i} className="flex items-start gap-4 p-3 bg-amber-50/50 border border-amber-200 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                  {m.matchScore}%
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">{m.list}</p>
                <p className="text-xs text-slate-600 mt-0.5">Matched entity: {m.entity}</p>
                <p className="text-xs text-slate-400 mt-0.5">{m.note}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="secondary" size="sm">Dismiss (false positive)</Button>
                <Button variant="danger" size="sm">Escalate</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 4. AML TRANSACTION MONITORING =====
export function AMLView() {
  const alerts = [
    { id: 'AML-0421', entity: 'Guest #G-4821', pattern: 'Structuring — 4 payments under $10K in 24h', amount: '$38,400', risk: 82, status: 'investigating' as const, date: 'Jul 14' },
    { id: 'AML-0420', entity: 'Vendor #V-2104', pattern: 'Velocity — 12x normal transaction volume', amount: '$124,200', risk: 74, status: 'investigating' as const, date: 'Jul 13' },
    { id: 'AML-0419', entity: 'Guest #G-3982', pattern: 'Card testing — 8 failed attempts then success', amount: '$2,400', risk: 61, status: 'flagged' as const, date: 'Jul 12' },
    { id: 'AML-0418', entity: 'Vendor #V-1892', pattern: 'Round-dollar transactions — possible layering', amount: '$50,000', risk: 55, status: 'cleared' as const, date: 'Jul 10' },
    { id: 'AML-0417', entity: 'Guest #G-5104', pattern: 'Geo-mismatch — IP vs billing country', amount: '$8,900', risk: 42, status: 'cleared' as const, date: 'Jul 9' },
  ];

  const statusMeta = {
    investigating: { variant: 'warning' as const, label: 'Investigating' },
    flagged: { variant: 'danger' as const, label: 'Flagged' },
    cleared: { variant: 'success' as const, label: 'Cleared' },
  };

  return (
    <SectionShell
      title="AML Transaction Monitoring"
      description="Flags unusual payment patterns across all modules — structuring, velocity, layering, and geo-anomalies"
      actions={<Button variant="secondary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>Filter rules</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Alerts" value="3" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" sparkline={[2,4,3,5,3,2,3]} />
        <StatCard label="Cleared (30d)" value="42" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="SARs Filed (YTD)" value="4" icon={<FileCheck className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Total Monitored" value="$48.2M" sub="30d volume" icon={<Activity className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header">
          <p className="section-title">Transaction Alerts</p>
          <div className="flex items-center gap-2">
            <select className="select h-8 w-36 text-xs">
              <option>All risk levels</option>
              <option>High (60+)</option>
              <option>Medium (40-59)</option>
              <option>Low (&lt;40)</option>
            </select>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Alert ID</th><th>Entity</th><th>Pattern Detected</th><th>Amount</th><th>Risk Score</th><th>Date</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id} className={a.status === 'investigating' ? 'bg-amber-50/30' : a.status === 'flagged' ? 'bg-red-50/40' : ''}>
                <td><span className="font-mono text-xs text-slate-400">{a.id}</span></td>
                <td className="font-medium text-slate-800">{a.entity}</td>
                <td className="text-xs text-slate-600 max-w-[200px]">{a.pattern}</td>
                <td className="font-semibold text-slate-800">{a.amount}</td>
                <td><RiskGauge score={a.risk} /></td>
                <td className="text-xs text-slate-400">{a.date}</td>
                <td><Badge variant={statusMeta[a.status].variant} dot>{statusMeta[a.status].label}</Badge></td>
                <td>
                  {a.status !== 'cleared' && (
                    <div className="flex gap-1">
                      <Button variant="secondary" size="sm">Investigate</Button>
                      <Button variant="ghost" size="sm">Clear</Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header"><p className="section-title">Monitoring Rules</p><Button variant="secondary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add rule</Button></div>
          <div className="card-body space-y-2">
            {[
              { name: 'Structuring detection', desc: 'Multiple payments under $10K threshold in 24h', active: true },
              { name: 'Velocity check', desc: 'Transaction volume > 5x 30-day average', active: true },
              { name: 'Card testing', desc: '5+ failed payment attempts in 1h', active: true },
              { name: 'Round-dollar layering', desc: 'Consecutive round-amount transactions', active: true },
              { name: 'Geo-mismatch', desc: 'IP country != billing address country', active: false },
              { name: 'High-risk jurisdiction', desc: 'Transactions from FATF grey-list countries', active: true },
            ].map((r) => (
              <div key={r.name} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.desc}</p>
                </div>
                <Toggle checked={r.active} onChange={() => {}} />
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><p className="section-title">Transaction Volume (30d)</p></div>
          <div className="card-body">
            <svg viewBox="0 0 280 120" className="w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="aml-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                </linearGradient>
              </defs>
              {(() => {
                const data = [1.2, 1.4, 1.1, 1.8, 1.5, 2.1, 1.9, 2.4, 1.6, 1.8, 2.2, 1.7, 1.9, 2.0, 1.5];
                const max = Math.max(...data);
                const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * 260 + 10, y: 110 - (v / max) * 90 }));
                const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                return (
                  <>
                    <path d={`${linePath} L 270 110 L 10 110 Z`} fill="url(#aml-grad)" />
                    <path d={linePath} fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                    {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="2" fill="#0ea5e9" />)}
                  </>
                );
              })()}
            </svg>
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
              <div><p className="text-xs text-slate-400">Daily avg</p><p className="text-sm font-bold text-slate-800">$1.6M</p></div>
              <div><p className="text-xs text-slate-400">Peak day</p><p className="text-sm font-bold text-slate-800">$2.4M</p></div>
              <div><p className="text-xs text-slate-400">Flagged %</p><p className="text-sm font-bold text-amber-600">0.08%</p></div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ===== 5. SUPPLIER RISK SCORING =====
export function RiskSupplierView() {
  const suppliers = [
    { id: 'V-2104', name: 'Coastal Retreats Inc.', fraudSignals: 0, complaints: 2, cancelRate: 4.2, score: 18, trend: 'down' as const },
    { id: 'V-1892', name: 'Urban Events Co.', fraudSignals: 1, complaints: 5, cancelRate: 8.1, score: 42, trend: 'up' as const },
    { id: 'V-1456', name: 'Wilderness Trails LLC', fraudSignals: 0, complaints: 1, cancelRate: 2.1, score: 8, trend: 'down' as const },
    { id: 'V-1204', name: 'City Bites Tour Co.', fraudSignals: 3, complaints: 12, cancelRate: 14.5, score: 78, trend: 'up' as const },
    { id: 'V-0982', name: 'Alpine Adventures GmbH', fraudSignals: 1, complaints: 3, cancelRate: 6.4, score: 35, trend: 'flat' as const },
  ];

  return (
    <SectionShell
      title="Supplier Risk Scoring Engine"
      description="Aggregates fraud signals, complaint history, and cancellation rate into a single supplier risk score"
      actions={<Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export scores</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Low Risk (<30)" value="248" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Medium Risk (30-60)" value="28" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="High Risk (60+)" value="8" icon={<ShieldAlert className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Avg Score" value="22.4" sub="Across 284 vendors" icon={<Gauge className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>

      <div className="card overflow-hidden">
        <div className="card-header">
          <p className="section-title">Supplier Risk Scores</p>
          <select className="select h-8 w-36 text-xs">
            <option>All risk levels</option>
            <option>High risk only</option>
            <option>Medium + High</option>
          </select>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Vendor ID</th><th>Business</th><th>Fraud Signals</th><th>Complaints</th><th>Cancel Rate</th><th>Risk Score</th><th>Trend</th><th></th></tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id} className={s.score >= 60 ? 'bg-red-50/30' : s.score >= 30 ? 'bg-amber-50/20' : ''}>
                <td><span className="font-mono text-xs text-slate-400">{s.id}</span></td>
                <td className="font-medium text-slate-800">{s.name}</td>
                <td>
                  <span className={`font-semibold ${s.fraudSignals > 2 ? 'text-red-600' : s.fraudSignals > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {s.fraudSignals}
                  </span>
                </td>
                <td className="text-slate-600">{s.complaints}</td>
                <td>
                  <span className={s.cancelRate > 10 ? 'text-red-600 font-medium' : s.cancelRate > 5 ? 'text-amber-600' : 'text-slate-600'}>
                    {s.cancelRate}%
                  </span>
                </td>
                <td><RiskGauge score={s.score} /></td>
                <td>
                  <span className={`flex items-center gap-1 text-xs ${s.trend === 'up' ? 'text-red-600' : s.trend === 'down' ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {s.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : s.trend === 'down' ? <TrendingUp className="w-3 h-3 rotate-180" /> : '—'}
                    {s.trend}
                  </span>
                </td>
                <td><Button variant="ghost" size="sm">Investigate</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header"><p className="section-title">Risk Score Composition — City Bites Tour Co.</p></div>
        <div className="card-body space-y-3">
          {[
            { factor: 'Fraud signals', weight: 40, value: 32, max: 40, color: 'bg-red-500' },
            { factor: 'Complaint history (12)', weight: 25, value: 18, max: 25, color: 'bg-amber-500' },
            { factor: 'Cancellation rate (14.5%)', weight: 20, value: 16, max: 20, color: 'bg-amber-500' },
            { factor: 'Account age penalty', weight: 10, value: 8, max: 10, color: 'bg-slate-400' },
            { factor: 'Response rate penalty', weight: 5, value: 4, max: 5, color: 'bg-slate-400' },
          ].map((f) => (
            <div key={f.factor}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-700">{f.factor}</span>
                <span className="text-xs font-semibold text-slate-600">{f.value}/{f.max}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${f.color}`} style={{ width: `${(f.value / f.max) * 100}%` }} />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-sm font-semibold text-slate-800">Total Risk Score</span>
            <span className="text-lg font-bold text-red-600">78 / 100 — High</span>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
