import { useState } from 'react';
import {
  DollarSign, CalendarCheck, Users, TrendingUp, ArrowUpRight,
  Package, AlertCircle, CheckCircle2, Clock, Star, MoreHorizontal,
  Sparkles, ChevronRight,
} from 'lucide-react';
import { StatCard, Badge, Tooltip, Button } from '../components/ui';

const recentBookings = [
  { id: 'BK-4421', guest: 'Sophia Martinez', listing: 'Rooftop Suite — Miami', date: 'Jul 15–18', amount: '$1,240', status: 'confirmed' },
  { id: 'BK-4420', guest: 'Marcus Chen', listing: 'Desert Retreat Package', date: 'Jul 20–22', amount: '$680', status: 'pending' },
  { id: 'BK-4419', guest: 'Aisha Patel', listing: 'Sunset Sailing Tour', date: 'Jul 14', amount: '$320', status: 'confirmed' },
  { id: 'BK-4418', guest: 'Liam Torres', listing: 'Mountain Cabin Escape', date: 'Jul 22–25', amount: '$2,100', status: 'confirmed' },
  { id: 'BK-4417', guest: 'Priya Nair', listing: 'City Food Tour', date: 'Jul 13', amount: '$95', status: 'completed' },
];

const tasks = [
  { id: 1, title: 'Clean & inspect Rooftop Suite before Sophia arrival', priority: 'high', due: 'Today, 2pm', assignee: 'Housekeeping' },
  { id: 2, title: 'Send pre-arrival instructions to Marcus Chen', priority: 'medium', due: 'Today, 5pm', assignee: 'Auto' },
  { id: 3, title: 'Confirm catering order for Jul 20 event', priority: 'high', due: 'Tomorrow', assignee: 'Jessica R.' },
  { id: 4, title: 'Review and approve 3 new vendor applications', priority: 'medium', due: 'Jul 16', assignee: 'Admin' },
];

const alerts = [
  { type: 'warning', message: 'Rooftop Suite HVAC maintenance overdue by 2 days', action: 'View work order' },
  { type: 'info', message: '5 guests on waitlist for Desert Retreat Jul 20–22', action: 'Manage waitlist' },
  { type: 'success', message: 'Last night\'s settlement processed — $8,430 deposited', action: 'View payout' },
];

const statusMap: Record<string, { variant: 'success' | 'warning' | 'info' | 'neutral'; label: string }> = {
  confirmed: { variant: 'success', label: 'Confirmed' },
  pending: { variant: 'warning', label: 'Pending' },
  completed: { variant: 'neutral', label: 'Completed' },
  cancelled: { variant: 'danger', label: 'Cancelled' },
};

export default function Dashboard() {
  const [period, setPeriod] = useState<'today' | '7d' | '30d' | 'ytd'>('30d');

  return (
    <div className="min-h-full">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Good morning, James</h1>
          <p className="text-sm text-slate-500 mt-0.5">Here's what's happening across your portfolio today.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            {(['today', '7d', '30d', 'ytd'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  period === p ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {p === 'ytd' ? 'YTD' : p === 'today' ? 'Today' : p === '7d' ? '7 days' : '30 days'}
              </button>
            ))}
          </div>
          <Button variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
            AI Insights
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm ${
                  alert.type === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : alert.type === 'info'
                    ? 'bg-sky-50 border-sky-200 text-sky-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                {alert.type === 'warning' ? (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                ) : alert.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span className="flex-1">{alert.message}</span>
                <button className="text-xs font-semibold underline underline-offset-2 hover:no-underline flex-shrink-0">
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Tooltip content="Total revenue for selected period" position="bottom">
            <StatCard
              label="Total Revenue"
              value="$84,320"
              change="12.4% vs last period"
              changeType="up"
              icon={<DollarSign className="w-4 h-4" />}
              iconColor="bg-emerald-50 text-emerald-600"
            />
          </Tooltip>
          <Tooltip content="Confirmed bookings for selected period" position="bottom">
            <StatCard
              label="Bookings"
              value="214"
              change="8.1% vs last period"
              changeType="up"
              icon={<CalendarCheck className="w-4 h-4" />}
              iconColor="bg-sky-50 text-sky-600"
            />
          </Tooltip>
          <Tooltip content="Unique active guests" position="bottom">
            <StatCard
              label="Active Guests"
              value="1,042"
              change="3.2% vs last period"
              changeType="up"
              icon={<Users className="w-4 h-4" />}
              iconColor="bg-violet-50 text-violet-600"
            />
          </Tooltip>
          <Tooltip content="Average occupancy across all listings" position="bottom">
            <StatCard
              label="Avg Occupancy"
              value="73.5%"
              change="2.1% vs last period"
              changeType="down"
              icon={<TrendingUp className="w-4 h-4" />}
              iconColor="bg-amber-50 text-amber-600"
            />
          </Tooltip>
        </div>

        {/* Secondary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {[
            { label: 'Avg Booking Value', value: '$394', change: '+4.8%', up: true },
            { label: 'Cancellation Rate', value: '4.2%', change: '-0.6%', up: true },
            { label: 'Response Rate', value: '98.1%', change: '+0.3%', up: true },
            { label: 'Avg Review Score', value: '4.87', change: '+0.02', up: true },
            { label: 'Pending Payouts', value: '$12,840', change: '', up: true },
            { label: 'Open Tasks', value: '18', change: '4 overdue', up: false },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500 mb-1.5">{s.label}</p>
              <p className="text-lg font-bold text-slate-800">{s.value}</p>
              {s.change && (
                <p className={`text-xs mt-1 ${s.up ? 'text-emerald-600' : 'text-amber-600'}`}>{s.change}</p>
              )}
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent bookings */}
          <div className="lg:col-span-2 card">
            <div className="card-header">
              <div>
                <p className="section-title">Recent Bookings</p>
                <p className="section-sub text-xs">Latest reservation activity</p>
              </div>
              <Button variant="ghost" size="sm" iconRight={<ChevronRight className="w-3.5 h-3.5" />}>
                View all
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Booking</th>
                    <th>Guest</th>
                    <th>Listing</th>
                    <th>Dates</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => {
                    const s = statusMap[b.status] || { variant: 'neutral', label: b.status };
                    return (
                      <tr key={b.id} className="cursor-pointer">
                        <td>
                          <span className="font-mono text-xs text-slate-500">{b.id}</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600">
                              {b.guest.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <span className="font-medium text-slate-800">{b.guest}</span>
                          </div>
                        </td>
                        <td className="text-slate-600 max-w-[160px] truncate">{b.listing}</td>
                        <td className="text-slate-500 text-xs">{b.date}</td>
                        <td className="font-semibold text-slate-800">{b.amount}</td>
                        <td>
                          <Badge variant={s.variant} dot>{s.label}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tasks */}
          <div className="card">
            <div className="card-header">
              <div>
                <p className="section-title">Open Tasks</p>
                <p className="section-sub text-xs">18 open · 4 overdue</p>
              </div>
              <Button variant="ghost" size="sm">View all</Button>
            </div>
            <div className="divide-y divide-slate-100">
              {tasks.map((t) => (
                <div key={t.id} className="px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-0.5 rounded border-slate-300 accent-sky-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 leading-snug">{t.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-xs font-medium ${t.priority === 'high' ? 'text-red-600' : 'text-amber-600'}`}>
                          {t.priority === 'high' ? '● High' : '● Med'}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {t.due}
                        </span>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 flex-shrink-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top listings */}
          <div className="card">
            <div className="card-header">
              <p className="section-title">Top Listings</p>
              <Button variant="ghost" size="sm">View all</Button>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { name: 'Rooftop Suite — Miami', rev: '$18,420', occ: '91%', rating: 4.9 },
                { name: 'Mountain Cabin Escape', rev: '$14,200', occ: '78%', rating: 4.8 },
                { name: 'Desert Retreat Package', rev: '$11,800', occ: '66%', rating: 4.7 },
                { name: 'Sunset Sailing Tour', rev: '$8,940', occ: '84%', rating: 5.0 },
              ].map((l, i) => (
                <div key={i} className="px-5 py-3 hover:bg-slate-50 transition-colors flex items-center gap-3">
                  <div className="w-6 text-center text-xs font-bold text-slate-400">#{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{l.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500">{l.rev}</span>
                      <span className="text-xs text-slate-300">·</span>
                      <span className="text-xs text-slate-500">{l.occ} occ.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold flex-shrink-0">
                    <Star className="w-3 h-3 fill-amber-500" />
                    {l.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue chart placeholder */}
          <div className="card lg:col-span-2">
            <div className="card-header">
              <p className="section-title">Revenue Trend</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" />
                  <span className="text-xs text-slate-500">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-200" />
                  <span className="text-xs text-slate-500">Last period</span>
                </div>
              </div>
            </div>
            <div className="card-body">
              {/* Simple SVG bar chart */}
              <svg viewBox="0 0 640 160" className="w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                {[62, 78, 55, 90, 72, 88, 95, 68, 84, 76, 92, 100].map((h, i) => (
                  <g key={i}>
                    <rect
                      x={i * 53 + 4}
                      y={160 - h * 1.45}
                      width="20"
                      height={h * 1.45}
                      fill="#e2e8f0"
                      rx="3"
                    />
                    <rect
                      x={i * 53 + 26}
                      y={160 - (h * 1.1) * 1.45}
                      width="20"
                      height={(h * 1.1) * 1.45}
                      fill="url(#barGrad)"
                      rx="3"
                    />
                  </g>
                ))}
              </svg>
              <div className="flex justify-between mt-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                  <span key={m} className="text-[10px] text-slate-400">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Add new listing', icon: <Package className="w-4 h-4" />, color: 'text-sky-600 bg-sky-50' },
            { label: 'Create booking', icon: <CalendarCheck className="w-4 h-4" />, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'View full reports', icon: <TrendingUp className="w-4 h-4" />, color: 'text-violet-600 bg-violet-50' },
            { label: 'Invite team member', icon: <Users className="w-4 h-4" />, color: 'text-amber-600 bg-amber-50' },
          ].map((a) => (
            <button
              key={a.label}
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3.5 hover:border-slate-300 hover:shadow-sm transition-all group"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.color}`}>
                {a.icon}
              </div>
              <span className="text-sm font-medium text-slate-700">{a.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
