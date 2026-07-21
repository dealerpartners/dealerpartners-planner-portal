import { useState } from 'react';
import {
  DollarSign, Plus, Download, Filter, CreditCard, Calendar,
  CheckCircle, XCircle, Clock, AlertTriangle, Eye, Bell,
  Percent, SplitSquareHorizontal, RefreshCw, FileText, Wallet,
  TrendingUp, Receipt, ArrowRight,
} from 'lucide-react';
import { Badge, Button, StatCard, Toggle } from '../ui';
import { SectionShell, StatusBadge, InfoRow, ProgressBar, MiniChart } from './shared';

// 47. Rent Collection Dashboard
export function RentDashboardView() {
  return (
    <SectionShell title="Rent Collection Dashboard" description="Summary cards (collected, overdue, pending)">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Collected (MTD)" value="$48,200" change="94%" changeType="up" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Pending" value="$2,800" sub="4 tenants" icon={<Clock className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Overdue" value="$3,900" sub="3 tenants" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Collection Rate" value="92.4%" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Monthly Collection Trend</p>
        <MiniChart data={[38, 42, 40, 44, 46, 48, 48, 50, 47, 48]} color="#10b981" height={120} />
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Rent Status by Tenant</p><Button variant="secondary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>Filter</Button></div>
        <table className="data-table">
          <thead><tr><th>Tenant</th><th>Unit</th><th>Rent</th><th>Due Date</th><th>Status</th><th>Days Late</th></tr></thead>
          <tbody>
            {[
              { t: 'Sophia Martinez', u: '101', r: '$2,200', d: 'Jul 1', s: 'paid', late: 0 },
              { t: 'Marcus Chen', u: '102', r: '$2,800', d: 'Jul 1', s: 'paid', late: 0 },
              { t: 'Aisha Patel', u: '201', r: '$2,200', d: 'Jul 1', s: 'late', late: 14 },
              { t: 'David Kim', u: '301', r: '$5,400', d: 'Jul 1', s: 'paid', late: 0 },
              { t: 'Emma Wilson', u: '205', r: '$2,800', d: 'Jul 1', s: 'overdue', late: 21 },
            ].map((r) => (
              <tr key={r.t} className={r.s === 'overdue' ? 'bg-red-50/30' : r.s === 'late' ? 'bg-amber-50/20' : ''}>
                <td className="font-medium text-slate-800">{r.t}</td><td>{r.u}</td><td className="font-medium">{r.r}</td><td className="text-xs">{r.d}</td>
                <td><StatusBadge status={r.s as any} /></td>
                <td>{r.late > 0 ? <span className="text-red-600 font-medium">{r.late}d</span> : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 48. Online Payment Processing
export function PaymentProcessView() {
  const [method, setMethod] = useState<'card' | 'ach'>('card');
  return (
    <SectionShell title="Online Payment Processing" description="Payment form (Stripe/Plaid integration), card/ACH toggle">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><CreditCard className="w-5 h-5" /></div><div><p className="text-sm font-semibold text-slate-800">Pay Rent</p><p className="text-xs text-slate-500">$2,200 due on Aug 1, 2025</p></div></div>
          <div className="flex gap-2 mb-4">
            <button onClick={() => setMethod('card')} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${method === 'card' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-200 text-slate-600'}`}><CreditCard className="w-4 h-4 inline mr-2" />Card</button>
            <button onClick={() => setMethod('ach')} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${method === 'ach' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-200 text-slate-600'}`}><Wallet className="w-4 h-4 inline mr-2" />ACH</button>
          </div>
          {method === 'card' ? (
            <div className="space-y-3">
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Card Number</label><input className="input" placeholder="4242 4242 4242 4242" /></div>
              <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Expiry</label><input className="input" placeholder="MM/YY" /></div><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">CVC</label><input className="input" placeholder="123" /></div></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Name on Card</label><input className="input" placeholder="Sophia Martinez" /></div>
            </div>
          ) : (
            <div className="space-y-3">
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Bank Name</label><input className="input" placeholder="Chase Bank" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Routing Number</label><input className="input" placeholder="021000021" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Account Number</label><input className="input" placeholder="••••••1234" /></div>
              <Button variant="secondary" size="sm" icon={<Wallet className="w-3.5 h-3.5" />}>Connect via Plaid</Button>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between"><span className="text-sm text-slate-500">Processing fee: <span className="font-medium text-slate-700">{method === 'card' ? '$66.00 (3%)' : '$0.00'}</span></span><Button variant="primary" icon={<DollarSign className="w-4 h-4" />}>Pay $2,200</Button></div>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-4">Payment Gateway Status</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold">S</div><div><p className="text-sm font-medium text-slate-800">Stripe</p><p className="text-xs text-slate-400">Card payments</p></div></div><Badge variant="success" dot>Connected</Badge></div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-bold">P</div><div><p className="text-sm font-medium text-slate-800">Plaid</p><p className="text-xs text-slate-400">Bank verification (ACH)</p></div></div><Badge variant="success" dot>Connected</Badge></div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100"><InfoRow label="Gateway" value="Stripe + Plaid" /><InfoRow label="Card fee" value="2.9% + $0.30" /><InfoRow label="ACH fee" value="$0 (covered)" /><InfoRow label="Payout schedule" value="Daily (T+2)" /></div>
        </div>
      </div>
    </SectionShell>
  );
}

// 49. Payment History Table
export function PaymentHistoryView() {
  return (
    <SectionShell title="Payment History Table" description="Filterable, exportable transaction log"
      actions={<div className="flex gap-2"><Button variant="secondary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>Filter</Button><Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export CSV</Button></div>}>
      <div className="card overflow-hidden">
        <div className="card-header">
          <div className="flex gap-2"><select className="select h-8 w-32 text-xs"><option>All tenants</option><option>Sophia Martinez</option><option>Marcus Chen</option></select><select className="select h-8 w-32 text-xs"><option>All methods</option><option>Card</option><option>ACH</option></select><select className="select h-8 w-32 text-xs"><option>All statuses</option><option>Paid</option><option>Pending</option><option>Failed</option></select></div>
        </div>
        <table className="data-table">
          <thead><tr><th>TXN ID</th><th>Tenant</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {[
              { id: 'TXN-8842', t: 'Sophia Martinez', a: '$2,200', m: 'ACH', d: 'Jul 1, 2025', s: 'paid' },
              { id: 'TXN-8841', t: 'Marcus Chen', a: '$2,800', m: 'Card', d: 'Jul 1, 2025', s: 'paid' },
              { id: 'TXN-8840', t: 'David Kim', a: '$5,400', m: 'ACH', d: 'Jul 1, 2025', s: 'paid' },
              { id: 'TXN-8839', t: 'Aisha Patel', a: '$2,200', m: 'Card', d: 'Jul 1, 2025', s: 'pending' },
              { id: 'TXN-8838', t: 'Emma Wilson', a: '$2,800', m: 'Card', d: 'Jul 1, 2025', s: 'overdue' },
              { id: 'TXN-8837', t: 'James Doe', a: '$1,800', m: 'ACH', d: 'Jun 1, 2025', s: 'paid' },
            ].map((r) => (
              <tr key={r.id}>
                <td><span className="font-mono text-xs text-slate-400">{r.id}</span></td>
                <td className="font-medium text-slate-800">{r.t}</td>
                <td className="font-semibold">{r.a}</td>
                <td><span className="pill bg-slate-100 text-slate-600 text-xs">{r.m}</span></td>
                <td className="text-xs text-slate-400">{r.d}</td>
                <td><StatusBadge status={r.s as any} /></td>
                <td><button className="p-1 text-slate-400 hover:text-slate-700"><Eye className="w-3.5 h-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 50. Automatic Rent Reminders
export function RentRemindersView() {
  return (
    <SectionShell title="Automatic Rent Reminders" description="Notification scheduling UI">
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Reminder Schedule</p>
        <div className="space-y-3">
          {[
            { timing: '5 days before due', channel: 'Email', template: 'Upcoming rent reminder', active: true },
            { timing: '1 day before due', channel: 'Email + SMS', template: 'Rent due tomorrow', active: true },
            { timing: 'On due date', channel: 'Email + SMS + Push', template: 'Rent due today', active: true },
            { timing: '1 day late', channel: 'Email + SMS', template: 'Rent overdue + late fee info', active: true },
            { timing: '5 days late', channel: 'Email + SMS', template: 'Urgent overdue notice', active: true },
            { timing: '10 days late', channel: 'Email + SMS + Call', template: 'Pre-eviction warning', active: false },
          ].map((r) => (
            <div key={r.timing} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3"><Bell className="w-5 h-5 text-sky-500" /><div><p className="text-sm font-medium text-slate-800">{r.timing}</p><p className="text-xs text-slate-400">{r.channel} · {r.template}</p></div></div>
              <div className="flex items-center gap-2"><Button variant="ghost" size="sm">Edit</Button><Toggle checked={r.active} onChange={() => {}} /></div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// 51. Late Fee Calculation
export function LateFeeView() {
  return (
    <SectionShell title="Late Fee Calculation" description="Dynamic display based on days overdue (calculated via API, rendered client-side)">
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Late Fee Calculator</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Monthly Rent</label><input type="number" className="input" defaultValue="2200" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Days Overdue</label><input type="number" className="input" defaultValue="14" /></div>
            <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Base Late Fee ($)</label><input type="number" className="input" defaultValue="50" /></div><div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Daily Rate ($/day)</label><input type="number" className="input" defaultValue="5" /></div></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Grace Period (days)</label><input type="number" className="input" defaultValue="5" /></div>
          </div>
          <div className="bg-slate-50 rounded-xl p-6">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Calculation Breakdown</p>
            <div className="space-y-2"><InfoRow label="Base late fee" value="$50.00" /><InfoRow label="Daily charge (9 days × $5)" value="$45.00" /><InfoRow label="Subtotal" value="$95.00" /></div>
            <div className="mt-4 pt-4 border-t border-slate-200"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-800">Total Late Fee</span><span className="text-2xl font-bold text-red-600">$95.00</span></div></div>
            <div className="mt-4 p-3 bg-amber-50 rounded-lg flex items-center gap-2 text-xs text-amber-700"><Percent className="w-3.5 h-3.5" />4.3% of monthly rent</div>
          </div>
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Currently Overdue Tenants</p></div>
        <table className="data-table">
          <thead><tr><th>Tenant</th><th>Rent</th><th>Days Late</th><th>Late Fee</th><th>Total Due</th></tr></thead>
          <tbody>
            {[
              { t: 'Aisha Patel', r: '$2,200', d: 14, fee: '$95', total: '$2,295' },
              { t: 'Emma Wilson', r: '$2,800', d: 21, fee: '$130', total: '$2,930' },
              { t: 'Tom Reed', r: '$1,800', d: 7, fee: '$60', total: '$1,860' },
            ].map((r) => (
              <tr key={r.t} className="bg-red-50/20"><td className="font-medium">{r.t}</td><td>{r.r}</td><td className="text-red-600 font-bold">{r.d}d</td><td className="text-amber-600 font-medium">{r.fee}</td><td className="font-bold text-red-600">{r.total}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 52. Partial Payment Handling
export function PartialPaymentView() {
  return (
    <SectionShell title="Partial Payment Handling" description="Split payment input with balance tracking">
      <div className="card p-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><SplitSquareHorizontal className="w-5 h-5" /></div><div><p className="text-sm font-semibold text-slate-800">Record Partial Payment</p><p className="text-xs text-slate-500">Aisha Patel — Unit 201</p></div></div>
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4"><InfoRow label="Total Due" value="$2,295.00" /><InfoRow label="Previously Paid" value="$1,100.00" /><div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-2"><span className="text-sm font-semibold text-slate-800">Remaining Balance</span><span className="text-lg font-bold text-red-600">$1,195.00</span></div></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Payment Amount</label><input type="number" className="input" defaultValue="595" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Payment Method</label><select className="input"><option>Credit Card</option><option>ACH</option><option>Cash</option><option>Check</option></select></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Note</label><input className="input" placeholder="Tenant paying half now, rest on payday" /></div>
          <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg text-sm text-amber-700"><AlertTriangle className="w-4 h-4" />Partial payment does not waive late fees. Balance: $600.00 after this payment.</div>
          <div className="flex gap-2"><Button variant="primary" icon={<CheckCircle className="w-4 h-4" />}>Record Payment</Button><Button variant="ghost">Cancel</Button></div>
        </div>
      </div>
    </SectionShell>
  );
}

// 53. Recurring Payment Setup (Autopay)
export function AutopayView() {
  return (
    <SectionShell title="Recurring Payment Setup (Autopay)" description="Toggle and payment method selector">
      <div className="card p-6 max-w-2xl">
        <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><RefreshCw className="w-5 h-5" /></div><div><p className="text-sm font-semibold text-slate-800">Autopay Enabled</p><p className="text-xs text-slate-500">Automatically charge rent on the 1st of each month</p></div></div><Toggle checked={true} onChange={() => {}} /></div>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Payment Method</label><div className="space-y-2">
            {[
              { name: 'Visa ending 4242', type: 'Card', default: true },
              { name: 'Chase checking ••1234', type: 'ACH', default: false },
            ].map((m) => (
              <div key={m.name} className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer ${m.default ? 'border-sky-500 bg-sky-50' : 'border-slate-200'}`}>
                <div className="flex items-center gap-3"><CreditCard className="w-5 h-5 text-slate-400" /><div><p className="text-sm font-medium text-slate-800">{m.name}</p><p className="text-xs text-slate-400">{m.type}</p></div></div>
                {m.default && <Badge variant="info" size="sm">Default</Badge>}
              </div>
            ))}
          </div></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Charge Date</label><select className="input"><option>1st of each month</option><option>5th of each month</option><option>15th of each month</option></select></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Notification</label><div className="flex items-center gap-2"><Toggle checked={true} onChange={() => {}} /><span className="text-sm text-slate-600">Send email 3 days before charge</span></div></div>
        </div>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-3">Tenants with Autopay</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[{ t: 'Sophia Martinez', m: 'ACH' }, { t: 'Marcus Chen', m: 'Card' }, { t: 'David Kim', m: 'ACH' }, { t: 'Emma Wilson', m: 'Card' }].map((t) => (
            <div key={t.t} className="p-3 bg-emerald-50 rounded-lg"><p className="text-sm font-medium text-slate-800">{t.t}</p><p className="text-xs text-emerald-600 mt-0.5">Autopay · {t.m}</p></div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// 54. Security Deposit Tracking
export function DepositTrackingView() {
  return (
    <SectionShell title="Security Deposit Tracking" description="Ledger view with deductions itemization">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4"><div><p className="text-sm font-semibold text-slate-800">Deposit Ledger — Sophia Martinez (Unit 101)</p><p className="text-xs text-slate-500">Held since Jan 15, 2024</p></div><Badge variant="success" dot>Held in Escrow</Badge></div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg"><div className="flex items-center gap-3"><Plus className="w-4 h-4 text-emerald-600" /><div><p className="text-sm font-medium text-slate-800">Initial Deposit</p><p className="text-xs text-slate-400">Jan 15, 2024</p></div></div><span className="text-sm font-bold text-emerald-600">+$2,200.00</span></div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg"><div className="flex items-center gap-3"><XCircle className="w-4 h-4 text-red-600" /><div><p className="text-sm font-medium text-slate-800">Carpet cleaning</p><p className="text-xs text-slate-400">Jun 20, 2024 · Deduction</p></div></div><span className="text-sm font-bold text-red-600">-$150.00</span></div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg"><div className="flex items-center gap-3"><XCircle className="w-4 h-4 text-red-600" /><div><p className="text-sm font-medium text-slate-800">Blind replacement</p><p className="text-xs text-slate-400">Mar 10, 2024 · Deduction</p></div></div><span className="text-sm font-bold text-red-600">-$80.00</span></div>
          <div className="flex items-center justify-between pt-3 border-t border-slate-200"><span className="text-sm font-semibold text-slate-800">Current Balance</span><span className="text-xl font-bold text-slate-800">$1,970.00</span></div>
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">All Deposits Summary</p></div>
        <table className="data-table">
          <thead><tr><th>Tenant</th><th>Unit</th><th>Deposit</th><th>Deductions</th><th>Balance</th><th>Status</th></tr></thead>
          <tbody>
            {[
              { t: 'Sophia Martinez', u: '101', d: '$2,200', ded: '$230', bal: '$1,970', s: 'active' },
              { t: 'Marcus Chen', u: '102', d: '$2,800', ded: '$0', bal: '$2,800', s: 'active' },
              { t: 'David Kim', u: '301', d: '$5,400', ded: '$0', bal: '$5,400', s: 'active' },
              { t: 'Lisa Park', u: '302', d: '$1,800', ded: '$1,800', bal: '$0', s: 'archived' },
            ].map((r) => (
              <tr key={r.t}><td className="font-medium">{r.t}</td><td>{r.u}</td><td>{r.d}</td><td className="text-red-600">{r.ded}</td><td className="font-bold">{r.bal}</td><td><StatusBadge status={r.s as any} /></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 55. Receipt Generation
export function ReceiptView() {
  return (
    <SectionShell title="Receipt Generation" description="Auto-generated PDF/print view"
      actions={<div className="flex gap-2"><Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Download PDF</Button><Button variant="ghost" size="sm" icon={<FileText className="w-3.5 h-3.5" />}>Print</Button></div>}>
      <div className="card p-8 max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center"><Receipt className="w-5 h-5" /></div><div><p className="text-sm font-bold text-slate-800">Oceanview Properties LLC</p><p className="text-xs text-slate-400">420 Ocean Dr, Miami FL 33139</p></div></div>
          <div className="text-right"><p className="text-xs font-semibold text-slate-400 uppercase">Receipt #</p><p className="text-sm font-mono text-slate-800">R-2025-8842</p></div>
        </div>
        <div className="space-y-3 mb-6"><InfoRow label="Received From" value="Sophia Martinez" /><InfoRow label="Unit" value="101, Oceanview Condos" /><InfoRow label="Payment Date" value="July 1, 2025" /><InfoRow label="Payment Method" value="ACH Transfer" /><InfoRow label="Transaction ID" value="TXN-8842" /></div>
        <table className="data-table mb-6">
          <thead><tr><th>Description</th><th>Amount</th></tr></thead>
          <tbody><tr><td>Monthly Rent — July 2025</td><td className="font-bold">$2,200.00</td></tr><tr><td>Late Fee</td><td>$0.00</td></tr><tr className="font-bold"><td>Total</td><td>$2,200.00</td></tr></tbody>
        </table>
        <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-200"><p>Thank you for your payment!</p><p>This receipt was automatically generated on Jul 1, 2025 at 10:32 AM EST</p></div>
      </div>
    </SectionShell>
  );
}

// 56. Multiple Payment Methods
export function PaymentMethodsView() {
  return (
    <SectionShell title="Multiple Payment Methods" description="Saved payment methods list (add/remove/set default)"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Method</Button>}>
      <div className="card p-6">
        <div className="space-y-3">
          {[
            { name: 'Visa ending 4242', exp: '12/27', type: 'Credit Card', default: true },
            { name: 'Mastercard ending 5555', exp: '08/26', type: 'Credit Card', default: false },
            { name: 'Chase checking ••1234', exp: '—', type: 'Bank Account (ACH)', default: false },
          ].map((m) => (
            <div key={m.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center"><CreditCard className="w-5 h-5 text-slate-400" /></div><div><p className="text-sm font-medium text-slate-800">{m.name}</p><p className="text-xs text-slate-400">{m.type} · Exp: {m.exp}</p></div></div>
              <div className="flex items-center gap-2">{m.default ? <Badge variant="info" size="sm">Default</Badge> : <Button variant="ghost" size="sm">Set Default</Button>}<Button variant="ghost" size="sm">Edit</Button><Button variant="danger" size="sm">Remove</Button></div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// 57. Refund Processing
export function RefundView() {
  return (
    <SectionShell title="Refund Processing" description="Refund request form with approval workflow UI">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"><RefreshCw className="w-5 h-5" /></div><p className="text-sm font-semibold text-slate-800">Issue Refund</p></div>
          <div className="space-y-4">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Tenant</label><select className="input"><option>Sophia Martinez</option><option>Marcus Chen</option></select></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Original Payment</label><select className="input"><option>TXN-8842 — $2,200 (Jul 1)</option></select></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Refund Amount</label><input type="number" className="input" defaultValue="200" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Reason</label><select className="input"><option>Overpayment</option><option>Duplicate charge</option><option>Lease cancellation</option><option>Prorated refund</option><option>Other</option></select></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Notes</label><textarea className="input min-h-[60px]" placeholder="Refund reason details..." /></div>
            <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>Submit for Approval</Button>
          </div>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-4">Approval Queue</p>
          <div className="space-y-3">
            {[
              { id: 'RFN-012', tenant: 'Marcus Chen', amount: '$500', reason: 'Overpayment', stage: 0 },
              { id: 'RFN-011', tenant: 'Aisha Patel', amount: '$1,100', reason: 'Lease cancellation', stage: 1 },
              { id: 'RFN-010', tenant: 'Tom Reed', amount: '$300', reason: 'Prorated', stage: 2 },
            ].map((r) => {
              const stages = ['Submitted', 'Manager Review', 'Approved', 'Processed'];
              return (
                <div key={r.id} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2"><div><p className="text-sm font-medium text-slate-800">{r.tenant}</p><p className="text-xs text-slate-400 font-mono">{r.id} · {r.reason}</p></div><span className="text-sm font-bold text-slate-800">{r.amount}</span></div>
                  <div className="flex items-center gap-1">{stages.map((s, i) => <div key={s} className="flex items-center flex-1"><div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i <= r.stage ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-400'}`}>{i <= r.stage ? '✓' : i + 1}</div>{i < stages.length - 1 && <div className={`h-px flex-1 mx-1 ${i < r.stage ? 'bg-sky-300' : 'bg-slate-200'}`} />}</div>)}</div>
                  {r.stage === 0 && <div className="mt-2 flex gap-1"><Button variant="primary" size="sm">Approve</Button><Button variant="danger" size="sm">Deny</Button></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 58. Rent Roll Report
export function RentRollView() {
  return (
    <SectionShell title="Rent Roll Report" description="Sortable table summarizing all units' rent status"
      actions={<Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Monthly Rent" value="$50,400" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Collected" value="$46,500" sub="92.3%" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Outstanding" value="$3,900" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Vacancy Loss" value="$2,200" icon={<XCircle className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
      </div>
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead><tr><th>Unit</th><th>Tenant</th><th>Lease Start</th><th>Lease End</th><th>Monthly Rent</th><th>Deposit</th><th>Balance</th><th>Status</th></tr></thead>
          <tbody>
            {[
              { u: '101', t: 'Sophia Martinez', s: 'Jan 2024', e: 'Dec 2025', r: '$2,200', d: '$2,200', b: '$0', st: 'paid' },
              { u: '102', t: 'Marcus Chen', s: 'Mar 2024', e: 'Feb 2026', r: '$2,800', d: '$2,800', b: '$0', st: 'paid' },
              { u: '201', t: 'Aisha Patel', s: 'Jan 2024', e: 'Dec 2025', r: '$2,200', d: '$2,200', b: '$1,100', st: 'late' },
              { u: '301', t: 'David Kim', s: 'Jun 2024', e: 'May 2026', r: '$5,400', d: '$5,400', b: '$0', st: 'paid' },
              { u: '205', t: 'Emma Wilson', s: 'Apr 2024', e: 'Mar 2025', r: '$2,800', d: '$2,800', b: '$2,800', st: 'overdue' },
              { u: '103', t: '—', s: '—', e: '—', r: '$1,800', d: '—', b: '—', st: 'vacant' },
            ].map((r) => (
              <tr key={r.u} className={r.st === 'overdue' ? 'bg-red-50/20' : r.st === 'vacant' ? 'opacity-50' : ''}>
                <td className="font-mono font-medium">{r.u}</td><td className="font-medium text-slate-800">{r.t}</td><td className="text-xs">{r.s}</td><td className="text-xs">{r.e}</td><td className="font-medium">{r.r}</td><td>{r.d}</td><td className={r.b !== '$0' && r.b !== '—' ? 'text-red-600 font-bold' : ''}>{r.b}</td><td><StatusBadge status={r.st as any} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}
