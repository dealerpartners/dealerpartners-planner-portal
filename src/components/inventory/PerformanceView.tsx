import { TrendingUp, TrendingDown, Star, Eye, Calendar, DollarSign, Users, BarChart3, Sparkles, Download } from 'lucide-react';
import { Badge, Button, StatCard } from '../../components/ui';

const monthlyData = [
  { month: 'Jan', views: 1240, bookings: 12, revenue: 8400, conv: 9.7 },
  { month: 'Feb', views: 1180, bookings: 10, revenue: 7200, conv: 8.5 },
  { month: 'Mar', views: 1620, bookings: 18, revenue: 14200, conv: 11.1 },
  { month: 'Apr', views: 1890, bookings: 22, revenue: 16800, conv: 11.6 },
  { month: 'May', views: 2100, bookings: 24, revenue: 18400, conv: 11.4 },
  { month: 'Jun', views: 1980, bookings: 21, revenue: 16200, conv: 10.6 },
  { month: 'Jul', views: 2420, bookings: 28, revenue: 21800, conv: 11.6 },
];

const maxViews = Math.max(...monthlyData.map((d) => d.views));
const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

const reviewBreakdown = [
  { stars: 5, count: 98, pct: 69 },
  { stars: 4, count: 32, pct: 23 },
  { stars: 3, count: 8, pct: 6 },
  { stars: 2, count: 3, pct: 2 },
  { stars: 1, count: 1, pct: 1 },
];

const trafficSources = [
  { source: 'Direct search', visits: 8420, pct: 35, color: 'bg-sky-500' },
  { source: 'Airbnb sync', visits: 6210, pct: 26, color: 'bg-emerald-500' },
  { source: 'Google Ads', visits: 4180, pct: 17, color: 'bg-violet-500' },
  { source: 'Social media', visits: 2840, pct: 12, color: 'bg-amber-500' },
  { source: 'Referral', visits: 1240, pct: 5, color: 'bg-rose-500' },
  { source: 'Email campaign', visits: 1180, pct: 5, color: 'bg-slate-400' },
];

export function PerformanceView() {
  return (
    <div className="p-6 space-y-6">
      {/* Listing selector */}
      <div className="flex items-center gap-3">
        <select className="select h-9 w-56 text-sm">
          <option>Rooftop Suite — Miami</option>
          <option>Mountain Cabin Escape</option>
          <option>Desert Retreat Package</option>
          <option>Sunset Sailing Tour</option>
          <option>All listings (aggregate)</option>
        </select>
        <select className="select h-9 w-32 text-sm">
          <option>Last 7 months</option>
          <option>Last 30 days</option>
          <option>YTD</option>
          <option>All time</option>
        </select>
        <div className="ml-auto">
          <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Views" value="12,430" change="18.2% vs last period" changeType="up" icon={<Eye className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" sparkline={[1240,1180,1620,1890,2100,1980,2420]} />
        <StatCard label="Conversion Rate" value="11.6%" change="1.2pp vs last period" changeType="up" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" sparkline={[9.7,8.5,11.1,11.6,11.4,10.6,11.6]} />
        <StatCard label="Total Revenue" value="$103,400" change="22.4% vs last period" changeType="up" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" sparkline={[8400,7200,14200,16800,18400,16200,21800]} />
        <StatCard label="Avg Rating" value="4.87" change="0.02 vs last period" changeType="up" icon={<Star className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views + Bookings chart */}
        <div className="card">
          <div className="card-header">
            <p className="section-title">Views & Bookings</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-sky-500 rounded-sm" /><span className="text-xs text-slate-500">Views</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" /><span className="text-xs text-slate-500">Bookings</span></div>
            </div>
          </div>
          <div className="card-body">
            <div className="flex items-end gap-3 h-40">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center gap-0.5">
                    <div
                      className="w-full bg-sky-500 rounded-t transition-all hover:bg-sky-600"
                      style={{ height: `${(d.views / maxViews) * 128}px` }}
                      title={`${d.views} views`}
                    />
                    <div
                      className="w-full bg-emerald-500 rounded-b"
                      style={{ height: `${(d.bookings / 30) * 24}px` }}
                      title={`${d.bookings} bookings`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{d.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue trend */}
        <div className="card">
          <div className="card-header">
            <p className="section-title">Revenue Trend</p>
            <Badge variant="success" dot>+22.4%</Badge>
          </div>
          <div className="card-body">
            <svg viewBox="0 0 280 160" className="w-full h-40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                </linearGradient>
              </defs>
              {(() => {
                const max = maxRevenue;
                const pts = monthlyData.map((d, i) => {
                  const x = (i / (monthlyData.length - 1)) * 260 + 10;
                  const y = 150 - (d.revenue / max) * 130;
                  return { x, y, d };
                });
                const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                const areaPath = `${linePath} L 270 150 L 10 150 Z`;
                return (
                  <>
                    <path d={areaPath} fill="url(#rev-grad)" />
                    <path d={linePath} fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {pts.map((p, i) => (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} r="3" fill="#0ea5e9" />
                        <text x={p.x} y="158" textAnchor="middle" className="fill-slate-400" style={{ fontSize: '8px' }}>{p.d.month}</text>
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>
        </div>
      </div>

      {/* Reviews + Traffic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Review breakdown */}
        <div className="card">
          <div className="card-header">
            <p className="section-title">Review Breakdown</p>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-lg font-bold text-slate-800">4.87</span>
              <span className="text-xs text-slate-400">· 142 reviews</span>
            </div>
          </div>
          <div className="card-body space-y-2">
            {reviewBreakdown.map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-xs font-medium text-slate-600">{r.stars}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-xs text-slate-500 w-12 text-right">{r.count} ({r.pct}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic sources */}
        <div className="card">
          <div className="card-header">
            <p className="section-title">Traffic Sources</p>
            <span className="text-xs text-slate-400">24,070 total visits</span>
          </div>
          <div className="card-body space-y-3">
            {trafficSources.map((t) => (
              <div key={t.source}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-sm ${t.color}`} />
                    <span className="text-sm text-slate-700">{t.source}</span>
                  </div>
                  <span className="text-xs text-slate-500">{t.visits.toLocaleString()} ({t.pct}%)</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden ml-4.5">
                  <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI insights */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <p className="section-title">AI Performance Insights</p>
          </div>
        </div>
        <div className="card-body grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { type: 'Opportunity', title: 'Views trending up 18%', desc: 'Your listing visibility is growing. Consider raising base price by 5-8% to capture additional revenue without impacting conversion.', color: 'text-emerald-600 bg-emerald-50' },
            { type: 'Alert', title: 'Conversion dip in June', desc: 'Conversion dropped to 10.6% in June. Likely caused by price increase during peak season. Consider a mid-season promotion.', color: 'text-amber-600 bg-amber-50' },
            { type: 'Strength', title: 'Excellent reviews', desc: '69% of reviews are 5-star. Your response rate of 98% correlates with higher repeat bookings. Maintain this standard.', color: 'text-sky-600 bg-sky-50' },
          ].map((ins) => (
            <div key={ins.title} className="border border-slate-200 rounded-lg p-4">
              <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${ins.color}`}>
                {ins.type}
              </div>
              <p className="text-sm font-semibold text-slate-800 mt-2">{ins.title}</p>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{ins.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
