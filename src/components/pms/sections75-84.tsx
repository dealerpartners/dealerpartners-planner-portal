import { useState } from 'react';
import {
  DollarSign, Plus, Download, FileText, TrendingUp, TrendingDown,
  BarChart3, Calendar, Filter, CheckCircle, XCircle, Eye,
  Wallet, Building2, PieChart, Table, Upload, ArrowRight,
  FileSpreadsheet, Calculator, Receipt,
} from 'lucide-react';
import { Badge, Button, StatCard } from '../ui';
import { SectionShell, StatusBadge, InfoRow, ProgressBar, MiniChart } from './shared';

// 75. Income/Expense Tracking
export function IncomeExpenseView() {
  return (
    <SectionShell title="Income / Expense Tracking" description="Categorized transaction entry forms"
      actions={<div className="flex gap-2"><Button variant="secondary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Expense</Button><Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Income</Button></div>}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Income (MTD)" value="$50,400" change="+4.2%" changeType="up" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Expenses (MTD)" value="$18,200" change="+2.1%" changeType="up" icon={<TrendingDown className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Net Income" value="$32,200" change="+6.8%" changeType="up" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Margin" value="64%" icon={<PieChart className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Recent Transactions</p><select className="select h-8 w-32 text-xs"><option>All categories</option><option>Rental Income</option><option>Maintenance</option><option>Utilities</option><option>Insurance</option></select></div>
        <table className="data-table">
          <thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Property</th><th>Type</th><th>Amount</th></tr></thead>
          <tbody>
            {[
              { d: 'Jul 15', desc: 'Rent — Unit 101', cat: 'Rental Income', prop: 'Oceanview', type: 'income', amt: '$2,200' },
              { d: 'Jul 15', desc: 'AC repair — WO-049', cat: 'Maintenance', prop: 'Oceanview', type: 'expense', amt: '$322' },
              { d: 'Jul 14', desc: 'Rent — Unit 102', cat: 'Rental Income', prop: 'Oceanview', type: 'income', amt: '$2,800' },
              { d: 'Jul 12', desc: 'Monthly insurance', cat: 'Insurance', prop: 'All', type: 'expense', amt: '$1,200' },
              { d: 'Jul 10', desc: 'Cleaning service', cat: 'Maintenance', prop: 'Downtown', type: 'expense', amt: '$1,200' },
              { d: 'Jul 10', desc: 'Rent — Unit 301', cat: 'Rental Income', prop: 'Oceanview', type: 'income', amt: '$5,400' },
              { d: 'Jul 8', desc: 'Water bill', cat: 'Utilities', prop: 'Oceanview', type: 'expense', amt: '$420' },
            ].map((t, i) => (
              <tr key={i}>
                <td className="text-xs text-slate-400">{t.d}</td>
                <td className="font-medium text-slate-800">{t.desc}</td>
                <td><span className="pill bg-slate-100 text-slate-600 text-xs">{t.cat}</span></td>
                <td className="text-xs text-slate-500">{t.prop}</td>
                <td>{t.type === 'income' ? <Badge variant="success" size="sm">Income</Badge> : <Badge variant="danger" size="sm">Expense</Badge>}</td>
                <td className={t.type === 'income' ? 'font-bold text-emerald-600' : 'font-bold text-red-600'}>{t.type === 'income' ? '+' : '-'}{t.amt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 76. Owner Statements
export function OwnerStatementsView() {
  return (
    <SectionShell title="Owner Statements" description="Auto-generated statement view (PDF export)"
      actions={<Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export PDF</Button>}>
      <div className="card p-8 max-w-3xl mx-auto">
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-200">
          <div><p className="text-lg font-bold text-slate-800">Owner Statement</p><p className="text-sm text-slate-500">Oceanview Properties LLC</p></div>
          <div className="text-right"><p className="text-xs text-slate-400">Period</p><p className="text-sm font-medium text-slate-800">July 1-31, 2025</p></div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Income</p>
            <table className="data-table">
              <thead><tr><th>Description</th><th class="text-right">Amount</th></tr></thead>
              <tbody>
                {[['Rental Income (24 units)', '$50,400'], ['Late Fees', '$325'], ['Other Income', '$120']].map(([d, a]) => <tr><td className="text-sm">{d}</td><td className="text-sm font-bold text-emerald-600 text-right">{a}</td></tr>)}
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Expenses</p>
            <table className="data-table">
              <thead><tr><th>Description</th><th class="text-right">Amount</th></tr></thead>
              <tbody>
                {[['Maintenance & Repairs', '$4,820'], ['Insurance', '$1,200'], ['Utilities', '$2,100'], ['Property Management', '$3,200'], ['Vendor Payments', '$2,172']].map(([d, a]) => <tr><td className="text-sm">{d}</td><td className="text-sm font-bold text-red-600 text-right">{a}</td></tr>)}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div><p className="text-sm font-semibold text-slate-800">Net Operating Income</p><p className="text-xs text-slate-400">July 2025</p></div>
            <span className="text-2xl font-bold text-sky-600">$37,353</span>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 77. Profit & Loss Reports
export function PLReportView() {
  return (
    <SectionShell title="Profit & Loss Reports" description="Charting (bar/line) by property and date range"
      actions={<div className="flex gap-2"><select className="select h-8 w-36 text-xs"><option>All Properties</option><option>Oceanview Condos</option><option>Downtown Lofts</option></select><select className="select h-8 w-32 text-xs"><option>This Year</option><option>Last 12 months</option><option>YTD</option></select><Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button></div>}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue (YTD)" value="$302,400" change="+12%" changeType="up" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Total Expenses (YTD)" value="$109,200" change="+8%" changeType="up" icon={<TrendingDown className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Net Profit (YTD)" value="$193,200" change="+15%" changeType="up" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Profit Margin" value="63.9%" change="+2.1%" changeType="up" icon={<PieChart className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Monthly P&L (12 months)</p>
        <div className="flex items-end justify-between gap-1 h-48">
          {[42, 48, 44, 50, 46, 52, 48, 54, 50, 56, 52, 58].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-emerald-200 rounded-t" style={{ height: `${v * 2}px` }} />
              <div className="w-full bg-red-200 rounded-b" style={{ height: `${v * 0.6}px` }} />
              <span className="text-[10px] text-slate-400">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs">{[['Income', 'bg-emerald-300'], ['Expenses', 'bg-red-300']].map(([l, c]) => <span key={l} className="flex items-center gap-1"><span className={`w-3 h-3 rounded ${c}`} />{l}</span>)}</div>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Revenue Trend</p>
        <MiniChart data={[42, 48, 44, 50, 46, 52, 48, 54, 50, 56, 52, 58]} color="#10b981" height={100} />
      </div>
    </SectionShell>
  );
}

// 78. Budget vs. Actual Comparison
export function BudgetVsActualView() {
  return (
    <SectionShell title="Budget vs. Actual Comparison" description="Dual-bar chart component">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4"><p className="text-sm font-semibold text-slate-800">Budget vs. Actual — July 2025</p><select className="select h-8 w-32 text-xs"><option>July 2025</option><option>June 2025</option></select></div>
        <div className="space-y-4">
          {[
            { cat: 'Rental Income', budget: 50000, actual: 50400, type: 'income' },
            { cat: 'Maintenance', budget: 4000, actual: 4820, type: 'expense' },
            { cat: 'Utilities', budget: 2000, actual: 2100, type: 'expense' },
            { cat: 'Insurance', budget: 1200, actual: 1200, type: 'expense' },
            { cat: 'Management', budget: 3000, actual: 3200, type: 'expense' },
            { cat: 'Marketing', budget: 1000, actual: 680, type: 'expense' },
          ].map((c) => {
            const max = Math.max(c.budget, c.actual);
            return (
              <div key={c.cat}>
                <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium text-slate-700">{c.cat}</span><span className={`text-xs font-bold ${c.type === 'income' ? (c.actual >= c.budget ? 'text-emerald-600' : 'text-red-600') : (c.actual <= c.budget ? 'text-emerald-600' : 'text-amber-600')}`}>${c.actual.toLocaleString()} / ${c.budget.toLocaleString()}</span></div>
                <div className="flex gap-1 h-4">
                  <div className="flex-1 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${c.type === 'income' ? 'bg-emerald-500' : 'bg-sky-500'}`} style={{ width: `${(c.actual / max) * 100}%` }} /></div>
                  <div className="flex-1 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-slate-300" style={{ width: `${(c.budget / max) * 100}%` }} /></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 text-xs"><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-sky-500" />Actual</span><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-slate-300" />Budget</span></div>
      </div>
    </SectionShell>
  );
}

// 79. Tax Document Generation
export function TaxDocsView() {
  return (
    <SectionShell title="Tax Document Generation (1099s, etc.)" description="Form auto-fill and download"
      actions={<Button variant="primary" size="sm" icon={<FileText className="w-3.5 h-3.5" />}>Generate 1099</Button>}>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Tax Documents — 2025</p></div>
        <table className="data-table">
          <thead><tr><th>Document</th><th>Recipient</th><th>Amount</th><th>Status</th><th>Generated</th><th></th></tr></thead>
          <tbody>
            {[
              { doc: '1099-MISC', recip: 'CoolAir HVAC Services', amt: '$8,420', st: 'generated', gen: 'Jan 15, 2025' },
              { doc: '1099-MISC', recip: 'Spotless Cleaning Co.', amt: '$14,400', st: 'generated', gen: 'Jan 15, 2025' },
              { doc: '1099-MISC', recip: 'ProFix Maintenance', amt: '$6,720', st: 'generated', gen: 'Jan 15, 2025' },
              { doc: '1099-MISC', recip: 'ClearFlow Plumbing', amt: '$2,160', st: 'pending', gen: '—' },
              { doc: '1099-MISC', recip: 'BrightSpark Electric', amt: '$1,320', st: 'pending', gen: '—' },
            ].map((t) => (
              <tr key={t.recip}>
                <td className="font-medium text-slate-800">{t.doc}</td>
                <td>{t.recip}</td>
                <td className="font-bold">{t.amt}</td>
                <td><StatusBadge status={t.st as any} /></td>
                <td className="text-xs text-slate-400">{t.gen}</td>
                <td>{t.st === 'generated' ? <div className="flex gap-1"><button className="p-1 text-slate-400 hover:text-slate-700"><Eye className="w-3.5 h-3.5" /></button><button className="p-1 text-slate-400 hover:text-slate-700"><Download className="w-3.5 h-3.5" /></button></div> : <Button variant="secondary" size="sm">Generate</Button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">1099-NEC Form Preview</p>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-xs text-slate-400 uppercase">Payer (Landlord)</p><p className="font-medium text-slate-800">Oceanview Properties LLC</p><p className="text-xs text-slate-500">EIN: 84-1234567</p></div>
            <div><p className="text-xs text-slate-400 uppercase">Recipient (Vendor)</p><p className="font-medium text-slate-800">CoolAir HVAC Services</p><p className="text-xs text-slate-500">TIN: 84-9876543</p></div>
            <div><p className="text-xs text-slate-400 uppercase">Nonemployee Compensation</p><p className="text-lg font-bold text-slate-800">$8,420.00</p></div>
            <div><p className="text-xs text-slate-400 uppercase">Tax Year</p><p className="text-lg font-bold text-slate-800">2025</p></div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 80. General Ledger View
export function GeneralLedgerView() {
  return (
    <SectionShell title="General Ledger View" description="Double-entry table display"
      actions={<Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>}>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">General Ledger — July 2025</p><select className="select h-8 w-32 text-xs"><option>All accounts</option><option>Income</option><option>Expenses</option><option>Assets</option><option>Liabilities</option></select></div>
        <table className="data-table">
          <thead><tr><th>Date</th><th>Account</th><th>Description</th><th>Debit</th><th>Credit</th><th>Balance</th></tr></thead>
          <tbody>
            {[
              { d: 'Jul 1', acct: '1000 · Cash', desc: 'Rent received — Unit 101', dr: '—', cr: '$2,200', bal: '$48,200' },
              { d: 'Jul 1', acct: '4000 · Rental Income', desc: 'Rent received — Unit 101', dr: '—', cr: '$2,200', bal: '$50,400' },
              { d: 'Jul 15', acct: '6000 · Maintenance', desc: 'AC repair — WO-049', dr: '$322', cr: '—', bal: '$4,820' },
              { d: 'Jul 15', acct: '1000 · Cash', desc: 'Vendor payment — CoolAir', dr: '$322', cr: '—', bal: '$47,878' },
              { d: 'Jul 12', acct: '6100 · Insurance', desc: 'Monthly premium', dr: '$1,200', cr: '—', bal: '$1,200' },
              { d: 'Jul 12', acct: '2000 · Accounts Payable', desc: 'Insurance accrual', dr: '—', cr: '$1,200', bal: '$1,200' },
            ].map((e, i) => (
              <tr key={i}>
                <td className="text-xs text-slate-400">{e.d}</td>
                <td className="font-mono text-xs text-slate-600">{e.acct}</td>
                <td className="text-sm text-slate-700">{e.desc}</td>
                <td className={e.dr !== '—' ? 'text-red-600 font-medium' : 'text-slate-300'}>{e.dr}</td>
                <td className={e.cr !== '—' ? 'text-emerald-600 font-medium' : 'text-slate-300'}>{e.cr}</td>
                <td className="font-medium text-slate-800">{e.bal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 81. Bank Account Reconciliation
export function ReconciliationView() {
  return (
    <SectionShell title="Bank Account Reconciliation" description="Side-by-side matching UI (imported vs. recorded transactions)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-3">Bank Statement (Imported)</p>
          <div className="space-y-2">
            {[
              { d: 'Jul 1', desc: 'ACH — Sophia Martinez', amt: '$2,200', matched: true },
              { d: 'Jul 1', desc: 'ACH — Marcus Chen', amt: '$2,800', matched: true },
              { d: 'Jul 5', desc: 'Check #1042 — CoolAir', amt: '-$322', matched: false },
              { d: 'Jul 10', desc: 'ACH — David Kim', amt: '$5,400', matched: true },
              { d: 'Jul 15', desc: 'Bank fee', amt: '-$25', matched: false },
            ].map((t, i) => (
              <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${t.matched ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                <div className="flex items-center gap-2">{t.matched ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-amber-400" />}<div><p className="text-sm text-slate-700">{t.desc}</p><p className="text-xs text-slate-400">{t.d}</p></div></div>
                <span className={`text-sm font-bold ${t.amt.startsWith('-') ? 'text-red-600' : 'text-emerald-600'}`}>{t.amt}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-3">Recorded Transactions</p>
          <div className="space-y-2">
            {[
              { d: 'Jul 1', desc: 'Rent payment — Unit 101', amt: '$2,200', matched: true },
              { d: 'Jul 1', desc: 'Rent payment — Unit 102', amt: '$2,800', matched: true },
              { d: 'Jul 10', desc: 'Rent payment — Unit 301', amt: '$5,400', matched: true },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-emerald-50">
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /><div><p className="text-sm text-slate-700">{t.desc}</p><p className="text-xs text-slate-400">{t.d}</p></div></div>
                <span className="text-sm font-bold text-emerald-600">{t.amt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><p className="text-xs text-slate-400 uppercase">Bank Balance</p><p className="text-xl font-bold text-slate-800">$48,200</p></div>
          <div><p className="text-xs text-slate-400 uppercase">Book Balance</p><p className="text-xl font-bold text-slate-800">$48,155</p></div>
          <div><p className="text-xs text-slate-400 uppercase">Difference</p><p className="text-xl font-bold text-amber-600">$45</p></div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100"><p className="text-xs text-slate-500">2 unmatched transactions remaining (Check #1042: $322, Bank fee: $25). Review and match to complete reconciliation.</p></div>
      </div>
    </SectionShell>
  );
}

// 82. Custom Report Builder
export function CustomReportView() {
  const [selected, setSelected] = useState<string[]>(['Property', 'Unit', 'Monthly Rent', 'Occupancy']);
  const fields = ['Property', 'Unit', 'Tenant', 'Monthly Rent', 'Occupancy', 'Lease Start', 'Lease End', 'Balance', 'Deposit', 'Sq Ft', 'Bedrooms', 'Bathrooms'];
  return (
    <SectionShell title="Custom Report Builder" description="Drag-and-drop field selector with preview">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-3">Available Fields</p>
          <div className="space-y-1">
            {fields.map((f) => (
              <button key={f} onClick={() => !selected.includes(f) && setSelected([...selected, f])} className={`w-full flex items-center justify-between p-2 rounded-lg text-sm ${selected.includes(f) ? 'bg-sky-50 text-sky-600' : 'hover:bg-slate-50 text-slate-700'}`}>
                <span>{f}</span>{!selected.includes(f) && <Plus className="w-3.5 h-3.5 text-slate-400" />}
              </button>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-3">Selected Fields (Drag to reorder)</p>
          <div className="space-y-1">
            {selected.map((f, i) => (
              <div key={f} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                <span className="text-xs text-slate-400 cursor-move">≡</span>
                <span className="text-sm text-slate-700 flex-1">{f}</span>
                <button onClick={() => setSelected(selected.filter((x) => x !== f))} className="text-red-400 hover:text-red-600"><XCircle className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
          <Button variant="primary" size="sm" className="mt-3 w-full" icon={<FileText className="w-3.5 h-3.5" />}>Generate Report</Button>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-3">Preview</p>
          <div className="overflow-x-auto">
            <table className="data-table text-xs">
              <thead><tr>{selected.slice(0, 4).map((f) => <th key={f}>{f}</th>)}</tr></thead>
              <tbody>
                {[['Oceanview', '101', '$2,200', '87%'], ['Oceanview', '102', '$2,800', '87%'], ['Oceanview', '301', '$5,400', '87%']].map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 83. Export to CSV/Excel/PDF
export function ExportView() {
  return (
    <SectionShell title="Export to CSV / Excel / PDF" description="Export button triggering client or server-side generation">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[['CSV', FileText, 'Comma-separated values', 'Fastest · Opens in any spreadsheet app'], ['Excel', FileSpreadsheet, 'XLSX format', 'Formulas + formatting preserved'], ['PDF', FileText, 'Formatted document', 'Best for printing and sharing']].map(([name, Icon, desc, note]) => {
          const I = Icon as any;
          return (
            <div key={name as string} className="card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 mx-auto mb-3 flex items-center justify-center"><I className="w-6 h-6" /></div>
              <p className="text-sm font-semibold text-slate-800">{name as string}</p>
              <p className="text-xs text-slate-400 mt-0.5">{desc as string}</p>
              <p className="text-xs text-slate-400 mt-2">{note as string}</p>
              <Button variant="primary" size="sm" className="mt-3 w-full" icon={<Download className="w-3.5 h-3.5" />}>Export as {name as string}</Button>
            </div>
          );
        })}
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-3">Recent Exports</p>
        <div className="space-y-2">
          {[
            { name: 'Rent Roll — July 2025.csv', size: '24 KB', date: 'Jul 15, 2025', by: 'James Doe' },
            { name: 'P&L Statement YTD.xlsx', size: '182 KB', date: 'Jul 10, 2025', by: 'Lisa Torres' },
            { name: 'Owner Statement Q2.pdf', size: '420 KB', date: 'Jul 1, 2025', by: 'James Doe' },
            { name: 'Tenant Directory.csv', size: '48 KB', date: 'Jun 28, 2025', by: 'Maria Lopez' },
          ].map((e) => (
            <div key={e.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3"><FileText className="w-4 h-4 text-slate-400" /><div><p className="text-sm font-medium text-slate-800">{e.name}</p><p className="text-xs text-slate-400">{e.size} · {e.date} · By {e.by}</p></div></div>
              <Button variant="ghost" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Download</Button>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// 84. Multi-Property Financial Rollup
export function FinancialRollupView() {
  return (
    <SectionShell title="Multi-Property Financial Rollup" description="Aggregated dashboard with drill-down">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue (MTD)" value="$84,200" change="+8.4%" changeType="up" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Total Expenses" value="$28,600" change="+3.2%" changeType="up" icon={<TrendingDown className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Net Operating Income" value="$55,600" change="+12%" changeType="up" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Portfolio Occupancy" value="87.5%" icon={<Building2 className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">By Property</p><Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button></div>
        <table className="data-table">
          <thead><tr><th>Property</th><th>Units</th><th>Revenue</th><th>Expenses</th><th>NOI</th><th>Margin</th><th>Occupancy</th><th></th></tr></thead>
          <tbody>
            {[
              { p: 'Oceanview Condos', u: 24, rev: '$50,400', exp: '$18,200', noi: '$32,200', m: '64%', o: '87.5%' },
              { p: 'Downtown Lofts', u: 48, rev: '$28,800', exp: '$8,400', noi: '$20,400', m: '71%', o: '87.5%' },
              { p: 'Suburban Homes', u: 12, rev: '$5,000', exp: '$2,000', noi: '$3,000', m: '60%', o: '83.3%' },
            ].map((r) => (
              <tr key={r.p} className="cursor-pointer hover:bg-slate-50">
                <td className="font-medium text-slate-800">{r.p}</td><td>{r.u}</td><td className="font-medium text-emerald-600">{r.rev}</td><td className="text-red-600">{r.exp}</td><td className="font-bold text-sky-600">{r.noi}</td><td>{r.m}</td><td>{r.o}</td>
                <td><Button variant="ghost" size="sm" icon={<ArrowRight className="w-3 h-3" />}>Drill down</Button></td>
              </tr>
            ))}
            <tr className="font-bold border-t-2 border-slate-200">
              <td>Total</td><td>84</td><td className="text-emerald-600">$84,200</td><td className="text-red-600">$28,600</td><td className="text-sky-600">$55,600</td><td>66%</td><td>87.5%</td><td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Portfolio Revenue Trend (12 months)</p>
        <MiniChart data={[68, 72, 70, 76, 74, 80, 78, 82, 84, 86, 82, 84]} color="#0ea5e9" height={120} />
      </div>
    </SectionShell>
  );
}
