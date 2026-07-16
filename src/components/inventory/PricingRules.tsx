import { useState } from 'react';
import { Plus, X, TrendingUp, TrendingDown, DollarSign, Calendar, Sparkles, Edit, Trash2 } from 'lucide-react';
import { Badge, Button, Tooltip, Toggle } from '../../components/ui';

interface PricingRule {
  id: number;
  name: string;
  trigger: string;
  type: 'percentage' | 'fixed';
  value: number;
  active: boolean;
  scope: string;
}

const initialRules: PricingRule[] = [
  { id: 1, name: 'Weekend premium', trigger: 'Friday & Saturday nights', type: 'percentage', value: 20, active: true, scope: 'All listings' },
  { id: 2, name: 'Summer season', trigger: 'Jun 1 – Aug 31', type: 'percentage', value: 35, active: true, scope: 'All listings' },
  { id: 3, name: 'Last-minute discount', trigger: 'Within 48h of check-in', type: 'percentage', value: -15, active: true, scope: 'All listings' },
  { id: 4, name: 'Early bird', trigger: 'Booked 30+ days ahead', type: 'percentage', value: -10, active: false, scope: 'All listings' },
  { id: 5, name: '7-night stay discount', trigger: 'Booking length >= 7 nights', type: 'percentage', value: -12, active: true, scope: 'Rooftop Suite only' },
  { id: 6, name: 'Holiday surge', trigger: 'Dec 20 – Jan 5', type: 'percentage', value: 50, active: true, scope: 'All listings' },
];

const seasonalPricing = [
  { season: 'Low season', months: 'Jan – Mar', base: '$690', adjustment: '-22%', color: 'text-red-600' },
  { season: 'Shoulder', months: 'Apr – May', base: '$790', adjustment: '-11%', color: 'text-amber-600' },
  { season: 'Peak summer', months: 'Jun – Aug', base: '$1,202', adjustment: '+35%', color: 'text-emerald-600' },
  { season: 'Shoulder', months: 'Sep – Oct', base: '$790', adjustment: '-11%', color: 'text-amber-600' },
  { season: 'Holiday', months: 'Nov – Dec', base: '$1,335', adjustment: '+50%', color: 'text-emerald-600' },
];

export function PricingRules() {
  const [rules, setRules] = useState(initialRules);
  const [showAdd, setShowAdd] = useState(false);

  const toggle = (id: number) => setRules((rs) => rs.map((r) => r.id === id ? { ...r, active: !r.active } : r));
  const remove = (id: number) => setRules((rs) => rs.filter((r) => r.id !== id));

  return (
    <div className="p-6 space-y-6">
      {/* Base price summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card">
          <div className="card-body">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Base Price</p>
            <p className="text-3xl font-bold text-slate-800">$890<span className="text-sm font-normal text-slate-400">/night</span></p>
            <p className="text-xs text-slate-500 mt-2">Before any rules applied</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Effective Range</p>
            <p className="text-3xl font-bold text-slate-800">$756 – $1,335</p>
            <p className="text-xs text-slate-500 mt-2">Min after discounts · Max with surges</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Avg Realized</p>
            <p className="text-3xl font-bold text-slate-800">$1,024</p>
            <p className="text-xs text-emerald-600 mt-2 font-medium">↑ 15.1% above base</p>
          </div>
        </div>
      </div>

      {/* Dynamic pricing rules */}
      <div className="card">
        <div className="card-header">
          <div>
            <p className="section-title">Dynamic Pricing Rules</p>
            <p className="section-sub text-xs">Rules apply in order. Percentage adjustments stack multiplicatively.</p>
          </div>
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => setShowAdd(!showAdd)}>Add rule</Button>
        </div>

        {showAdd && (
          <div className="px-5 py-4 bg-sky-50/50 border-b border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input type="text" placeholder="Rule name" className="input h-9" />
              <input type="text" placeholder="Trigger (e.g. Friday nights)" className="input h-9" />
              <select className="select h-9 text-sm">
                <option>Percentage adjustment</option>
                <option>Fixed price</option>
              </select>
              <div className="flex gap-2">
                <input type="number" placeholder="+/- %" className="input h-9" />
                <Button variant="primary" size="sm" onClick={() => setShowAdd(false)}>Add</Button>
              </div>
            </div>
          </div>
        )}

        <div className="divide-y divide-slate-100">
          {rules.map((r) => (
            <div key={r.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/70 transition-colors">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${r.value > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {r.value > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  <span className="text-slate-400">When:</span> {r.trigger} · <span className="text-slate-400">Scope:</span> {r.scope}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-sm font-bold ${r.value > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {r.value > 0 ? '+' : ''}{r.value}{r.type === 'percentage' ? '%' : '$'}
                </span>
                <Toggle checked={r.active} onChange={() => toggle(r.id)} />
                <Tooltip content="Edit rule" position="top">
                  <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Edit className="w-3.5 h-3.5" /></button>
                </Tooltip>
                <button onClick={() => remove(r.id)} className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal pricing table */}
      <div className="card">
        <div className="card-header">
          <p className="section-title">Seasonal Pricing Overview</p>
          <Button variant="secondary" size="sm" icon={<Calendar className="w-3.5 h-3.5" />}>Edit seasons</Button>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Season</th><th>Months</th><th>Base Price</th><th>Adjustment</th><th>vs Base</th></tr>
          </thead>
          <tbody>
            {seasonalPricing.map((s, i) => (
              <tr key={i}>
                <td className="font-medium text-slate-800">{s.season}</td>
                <td className="text-slate-500 text-xs">{s.months}</td>
                <td className="font-semibold text-slate-800">{s.base}</td>
                <td><span className={`font-semibold ${s.color}`}>{s.adjustment}</span></td>
                <td className="text-slate-500 text-xs">{s.base}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Price preview */}
      <div className="card">
        <div className="card-header">
          <div>
            <p className="section-title">Price Preview Calculator</p>
            <p className="section-sub text-xs">See how rules combine for specific scenarios</p>
          </div>
          <Sparkles className="w-4 h-4 text-sky-500" />
        </div>
        <div className="card-body space-y-2">
          {[
            { scenario: 'Weeknight in low season, booked 35 days ahead', base: '$890', rules: ['-22% low season', '-10% early bird'], final: '$624' },
            { scenario: 'Saturday in July, booked 2 days ahead', base: '$890', rules: ['+20% weekend', '+35% summer', '-15% last-min'], final: '$1,044' },
            { scenario: '7-night stay in September', base: '$890', rules: ['-12% long stay'], final: '$783' },
            { scenario: 'Christmas week (Dec 23–30)', base: '$890', rules: ['+50% holiday surge', '+20% weekend'], final: '$1,602' },
          ].map((s) => (
            <div key={s.scenario} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="text-sm font-medium text-slate-700 mb-2">{s.scenario}</p>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="font-mono text-slate-500">{s.base}</span>
                {s.rules.map((r, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="text-slate-300">→</span>
                    <span className={`pill ${r.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{r}</span>
                  </span>
                ))}
                <span className="text-slate-300">=</span>
                <span className="font-bold text-slate-800 text-sm">{s.final}<span className="text-slate-400 font-normal">/night</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
