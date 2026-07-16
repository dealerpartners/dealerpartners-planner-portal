import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Download, Filter, TrendingUp, TrendingDown, BarChart3, Brain, FileText, RefreshCw } from 'lucide-react';
import { Badge, Button, StatCard } from '../components/ui';

function RevenueReport() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [42000, 38000, 51000, 62000, 71000, 68000, 84320, 0, 0, 0, 0, 0];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <select className="select w-40 h-9 text-sm">
          <option>2025</option>
          <option>2024</option>
        </select>
        <select className="select w-40 h-9 text-sm">
          <option>All listings</option>
          <option>Rooftop Suite</option>
          <option>Mountain Cabin</option>
        </select>
        <div className="ml-auto">
          <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="YTD Revenue" value="$416,320" change="18.4% vs 2024" changeType="up" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="YTD Bookings" value="1,084" change="12.1% vs 2024" changeType="up" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Avg Booking Value" value="$384" change="5.3% vs 2024" changeType="up" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
        <StatCard label="Refund Rate" value="2.8%" change="1.2% vs 2024" changeType="up" icon={<TrendingDown className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
      </div>

      <div className="card">
        <div className="card-header">
          <p className="section-title">Monthly Revenue — 2025</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-sky-500 rounded-sm" /><span className="text-xs text-slate-500">Revenue</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-200 rounded-sm" /><span className="text-xs text-slate-500">2024</span></div>
          </div>
        </div>
        <div className="card-body">
          <div className="flex items-end gap-3 h-48">
            {data.map((v, i) => (
              <div key={months[i]} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-slate-500 font-medium">{v > 0 ? `$${(v / 1000).toFixed(0)}k` : ''}</span>
                <div className="w-full flex flex-col gap-0.5">
                  <div
                    className={`w-full rounded-t transition-all ${v > 0 ? 'bg-sky-500' : 'bg-slate-100'}`}
                    style={{ height: `${v > 0 ? (v / 84320) * 160 : 12}px` }}
                  />
                </div>
                <span className="text-[9px] text-slate-400">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <p className="section-title">Revenue by Listing</p>
          <Button variant="secondary" size="sm">View all</Button>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Listing</th><th>Bookings</th><th>Gross Revenue</th><th>Avg Nightly</th><th>Occupancy</th><th>vs Last Period</th></tr>
          </thead>
          <tbody>
            {[
              { name: 'Rooftop Suite — Miami', bookings: 42, revenue: '$18,420', avg: '$890', occ: '91%', change: '+14%', up: true },
              { name: 'Mountain Cabin Escape', bookings: 28, revenue: '$14,200', avg: '$650', occ: '78%', change: '+8%', up: true },
              { name: 'Desert Retreat Package', bookings: 15, revenue: '$11,800', avg: '$1,200', occ: '66%', change: '-3%', up: false },
              { name: 'Sunset Sailing Tour', bookings: 61, revenue: '$8,940', avg: '$320', occ: '84%', change: '+22%', up: true },
            ].map((r) => (
              <tr key={r.name}>
                <td className="font-medium text-slate-800">{r.name}</td>
                <td>{r.bookings}</td>
                <td className="font-semibold text-slate-800">{r.revenue}</td>
                <td>{r.avg}</td>
                <td>{r.occ}</td>
                <td className={`font-medium ${r.up ? 'text-emerald-600' : 'text-red-600'}`}>{r.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AIInsights() {
  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold">Planviry AI Insights</p>
            <p className="text-slate-400 text-xs">Last updated: Today, 6:00 AM</p>
          </div>
          <button className="ml-auto text-slate-400 hover:text-white">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <p className="text-slate-200 text-sm leading-relaxed">
          Your overall portfolio is performing <span className="text-emerald-400 font-semibold">18.4% above YTD target</span>.
          Rooftop Suite is your highest-revenue asset at <span className="text-sky-400 font-semibold">91% occupancy</span>.
          The Desert Retreat shows a <span className="text-amber-400 font-semibold">3% revenue decline</span> — consider a 10–15% price reduction or a last-minute promotion to recover July occupancy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          {
            type: 'Revenue Opportunity',
            title: 'Price optimization for Desert Retreat',
            desc: 'Based on market data, reducing price by 12% during weekdays could increase bookings by 24% and net +$1,800 this month.',
            action: 'Apply pricing rule',
            color: 'text-emerald-600 bg-emerald-50',
          },
          {
            type: 'Risk Alert',
            title: 'High cancellation risk next weekend',
            desc: 'Weather forecasts show rain Jul 19–20. 3 bookings have historically been cancelled under similar conditions. Consider reaching out proactively.',
            action: 'Send message',
            color: 'text-amber-600 bg-amber-50',
          },
          {
            type: 'Demand Forecast',
            title: 'Peak demand: Aug 1–15',
            desc: 'Search data shows 43% higher demand for your area Aug 1–15. Recommend enabling seasonal pricing +25% for that period.',
            action: 'Update pricing',
            color: 'text-sky-600 bg-sky-50',
          },
          {
            type: 'Guest Retention',
            title: '12 guests eligible for return discount',
            desc: '12 guests who stayed 6–12 months ago haven\'t rebooked. A 10% loyalty coupon could win back 4–6 of them based on historical data.',
            action: 'Create campaign',
            color: 'text-violet-600 bg-violet-50',
          },
        ].map((ins) => (
          <div key={ins.title} className="card p-5">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${ins.color}`}>
                <Brain className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{ins.type}</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">{ins.title}</p>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{ins.desc}</p>
                <button className="mt-3 text-xs font-semibold text-sky-600 hover:underline">{ins.action} →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OccupancyReport() {
  const units = ['Rooftop Suite', 'Mountain Cabin', 'Desert Retreat', 'Sailing Tour'];
  const occ = [91, 78, 66, 84];

  return (
    <div className="p-6 space-y-6">
      <div className="card">
        <div className="card-header"><p className="section-title">Occupancy by Listing — July 2025</p></div>
        <div className="card-body space-y-5">
          {units.map((u, i) => (
            <div key={u}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-slate-700">{u}</span>
                <span className={`text-sm font-bold ${occ[i] >= 80 ? 'text-emerald-600' : occ[i] >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{occ[i]}%</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${occ[i] >= 80 ? 'bg-emerald-500' : occ[i] >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${occ[i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const subTabs = [
  { id: '/reports/revenue', label: 'Revenue' },
  { id: '/reports/sales', label: 'Sales' },
  { id: '/reports/occupancy', label: 'Occupancy' },
  { id: '/reports/conversion', label: 'Conversion' },
  { id: '/reports/tax', label: 'Tax Reports' },
  { id: '/reports/settlement', label: 'Settlement' },
  { id: '/reports/ai', label: 'AI Insights' },
];

export default function Reports() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = subTabs.find((t) => location.pathname.startsWith(t.id))?.id || '/reports/revenue';

  return (
    <div className="min-h-full">
      <div className="page-header">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Reports & Analytics</h1>
            <p className="text-sm text-slate-500 mt-0.5">Revenue, occupancy, conversion, tax, and AI-powered insights</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" icon={<Filter className="w-4 h-4" />}>Filter</Button>
            <Button variant="secondary" icon={<Download className="w-4 h-4" />}>Export</Button>
          </div>
        </div>
        <div className="tab-nav">
          {subTabs.map((t) => (
            <button key={t.id} className={`tab-item ${active === t.id ? 'active' : ''}`} onClick={() => navigate(t.id)}>
              {t.label}
              {t.id === '/reports/ai' && <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-100 text-sky-700">AI</span>}
            </button>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<RevenueReport />} />
        <Route path="/revenue" element={<RevenueReport />} />
        <Route path="/occupancy" element={<OccupancyReport />} />
        <Route path="/ai" element={<AIInsights />} />
        <Route path="/*" element={<RevenueReport />} />
      </Routes>
    </div>
  );
}
