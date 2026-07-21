import { useState } from 'react';
import {
  Wrench, Plus, Search, Filter, Calendar, Clock, CheckCircle,
  XCircle, AlertTriangle, Eye, Download, Image, User,
  Star, History, MapPin, DollarSign, ChevronRight, Tag,
} from 'lucide-react';
import { Badge, Button, StatCard, Toggle } from '../ui';
import { SectionShell, StatusBadge, InfoRow, ProgressBar, KanbanColumn, MiniChart } from './shared';

// 59. Maintenance Request Submission (Tenant)
export function MaintenanceRequestView() {
  return (
    <SectionShell title="Maintenance Request Submission (Tenant)" description="Form with category, description, photo upload">
      <div className="card p-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Wrench className="w-5 h-5" /></div><div><p className="text-sm font-semibold text-slate-800">Submit Maintenance Request</p><p className="text-xs text-slate-500">Unit 101 · Oceanview Condos</p></div></div>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Category</label><select className="input"><option>Plumbing</option><option>Electrical</option><option>HVAC/Air Conditioning</option><option>Appliance</option><option>Structural</option><option>Pest Control</option><option>Other</option></select></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Priority</label><div className="flex gap-2">{['Low', 'Medium', 'High', 'Emergency'].map((p, i) => <button key={p} className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border-2 ${i === 1 ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-600'}`}>{p}</button>)}</div></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Title</label><input className="input" placeholder="AC not cooling properly" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Description</label><textarea className="input min-h-[100px]" placeholder="Describe the issue in detail..." /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Best Time for Visit</label><select className="input"><option>Anytime</option><option>Morning (9-12)</option><option>Afternoon (12-5)</option><option>Evening (5-8)</option></select></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Photos</label><div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-sky-300 cursor-pointer"><Image className="w-6 h-6 text-slate-300 mx-auto mb-2" /><p className="text-sm text-slate-500">Drag photos or click to upload</p><p className="text-xs text-slate-400">Max 5 photos · JPG/PNG</p></div></div>
          <Button variant="primary" icon={<CheckCircle className="w-4 h-4" />}>Submit Request</Button>
        </div>
      </div>
    </SectionShell>
  );
}

// 60. Work Order Dashboard (Staff)
export function WorkOrderDashboardView() {
  const kanbanData = {
    new: [{ id: 'WO-052', title: 'AC not cooling', unit: '101', priority: 'high' }, { id: 'WO-051', title: 'Leaky faucet', unit: '302', priority: 'low' }],
    assigned: [{ id: 'WO-050', title: 'Broken dishwasher', unit: '205', priority: 'medium' }],
    in_progress: [{ id: 'WO-049', title: 'AC repair', unit: '101', priority: 'high' }, { id: 'WO-048', title: 'Ceiling light', unit: '102', priority: 'medium' }],
    completed: [{ id: 'WO-047', title: 'Door lock fix', unit: '301', priority: 'low' }, { id: 'WO-046', title: 'Window seal', unit: '201', priority: 'medium' }],
  };
  const priorityColor: Record<string, string> = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-emerald-500' };
  const renderItem = (item: any) => (
    <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
      <div className="flex items-center justify-between mb-1"><span className="font-mono text-xs text-slate-400">{item.id}</span><span className={`w-2 h-2 rounded-full ${priorityColor[item.priority]}`} /></div>
      <p className="text-sm font-semibold text-slate-800">{item.title}</p>
      <p className="text-xs text-slate-400 mt-0.5">Unit {item.unit}</p>
    </div>
  );
  return (
    <SectionShell title="Work Order Dashboard (Staff)" description="Kanban or table (new → assigned → in progress → completed)"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New Work Order</Button>}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="New" value="2" icon={<Clock className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Assigned" value="1" icon={<User className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
        <StatCard label="In Progress" value="2" icon={<Wrench className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Completed (30d)" value="18" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
      </div>
      <div className="card p-6">
        <div className="flex gap-4 overflow-x-auto">
          <KanbanColumn title="New" items={kanbanData.new} color="bg-sky-500" renderItem={renderItem} />
          <KanbanColumn title="Assigned" items={kanbanData.assigned} color="bg-violet-500" renderItem={renderItem} />
          <KanbanColumn title="In Progress" items={kanbanData.in_progress} color="bg-amber-500" renderItem={renderItem} />
          <KanbanColumn title="Completed" items={kanbanData.completed} color="bg-emerald-500" renderItem={renderItem} />
        </div>
      </div>
    </SectionShell>
  );
}

// 61. Vendor Assignment
export function VendorAssignView() {
  return (
    <SectionShell title="Vendor Assignment" description="Dropdown/autocomplete to assign vendor to request">
      <div className="card p-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center"><User className="w-5 h-5" /></div><div><p className="text-sm font-semibold text-slate-800">Assign Vendor — WO-049</p><p className="text-xs text-slate-500">AC repair · Unit 101 · High priority</p></div></div>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Search Vendor</label><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" /><input className="input pl-9" placeholder="Search by name or service..." /></div></div>
          <div className="space-y-2">
            {[
              { name: 'CoolAir HVAC Services', service: 'HVAC', rating: 4.8, jobs: 42, available: true },
              { name: 'ProFix Maintenance', service: 'General', rating: 4.6, jobs: 128, available: true },
              { name: 'AC Express', service: 'HVAC', rating: 4.2, jobs: 18, available: false },
            ].map((v) => (
              <div key={v.name} className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer ${v.available ? 'border-slate-200 hover:border-sky-300' : 'border-slate-100 opacity-50'}`}>
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">{v.name[0]}</div><div><p className="text-sm font-medium text-slate-800">{v.name}</p><p className="text-xs text-slate-400">{v.service} · {v.jobs} jobs · ⭐ {v.rating}</p></div></div>
                {v.available ? <Button variant="primary" size="sm">Assign</Button> : <Badge variant="neutral" size="sm">Busy</Badge>}
              </div>
            ))}
          </div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Notes for Vendor</label><textarea className="input min-h-[60px]" placeholder="Access via front desk, tenant home after 9 AM..." /></div>
          <Button variant="primary" icon={<CheckCircle className="w-4 h-4" />}>Confirm Assignment</Button>
        </div>
      </div>
    </SectionShell>
  );
}

// 62. Priority/Urgency Tagging
export function PriorityTaggingView() {
  return (
    <SectionShell title="Priority / Urgency Tagging" description="Color-coded badges (low/medium/high/emergency)">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { level: 'Emergency', color: 'bg-red-500', count: 1, desc: 'Immediate response needed' },
          { level: 'High', color: 'bg-amber-500', count: 3, desc: 'Same-day response' },
          { level: 'Medium', color: 'bg-sky-500', count: 8, desc: 'Within 48 hours' },
          { level: 'Low', color: 'bg-emerald-500', count: 12, desc: 'Within 1 week' },
        ].map((p) => (
          <div key={p.level} className="card p-5">
            <div className="flex items-center gap-3 mb-3"><span className={`w-3 h-3 rounded-full ${p.color}`} /><p className="text-sm font-semibold text-slate-800">{p.level}</p></div>
            <p className="text-3xl font-bold text-slate-800 mb-1">{p.count}</p>
            <p className="text-xs text-slate-400">{p.desc}</p>
          </div>
        ))}
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Work Orders by Priority</p></div>
        <table className="data-table">
          <thead><tr><th>WO #</th><th>Title</th><th>Unit</th><th>Priority</th><th>Assigned</th><th>Status</th></tr></thead>
          <tbody>
            {[
              { id: 'WO-053', title: 'Gas leak reported', unit: '302', p: 'emergency', a: 'Fire Dept + Gas Co', s: 'in_progress' },
              { id: 'WO-052', title: 'AC not cooling', unit: '101', p: 'high', a: 'CoolAir HVAC', s: 'in_progress' },
              { id: 'WO-050', title: 'Broken dishwasher', unit: '205', p: 'medium', a: 'ProFix', s: 'in_progress' },
              { id: 'WO-051', title: 'Leaky faucet', unit: '302', p: 'low', a: '—', s: 'pending' },
            ].map((w) => (
              <tr key={w.id} className={w.p === 'emergency' ? 'bg-red-50/40' : ''}>
                <td><span className="font-mono text-xs text-slate-400">{w.id}</span></td>
                <td className="font-medium text-slate-800">{w.title}</td><td>{w.unit}</td>
                <td><Badge variant={w.p === 'emergency' ? 'danger' : w.p === 'high' ? 'warning' : w.p === 'medium' ? 'info' : 'success'} size="sm" dot>{w.p}</Badge></td>
                <td className="text-sm text-slate-600">{w.a}</td><td><StatusBadge status={w.s as any} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 63. Maintenance Scheduling Calendar
export function MaintenanceCalendarView() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  return (
    <SectionShell title="Maintenance Scheduling Calendar" description="Drag-and-drop calendar for technician scheduling">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Button variant="ghost" size="sm">‹</Button><p className="text-sm font-semibold text-slate-800">July 2025</p><Button variant="ghost" size="sm">›</Button></div>
          <div className="flex gap-2 text-xs">{[['Tom Walsh', 'bg-sky-200'], ['Lisa Torres', 'bg-violet-200'], ['Unassigned', 'bg-amber-200']].map(([l, c]) => <span key={l} className="flex items-center gap-1"><span className={`w-3 h-3 rounded ${c}`} />{l}</span>)}</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-1">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <p key={d} className="text-xs font-semibold text-slate-400 uppercase">{d}</p>)}</div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const day = d > 0 && d <= 31 ? d : null;
            const jobs = day === 15 ? [{ t: 'AC Repair', c: 'bg-sky-200 text-sky-700', tech: 'Tom' }] : day === 16 ? [{ t: 'Dishwasher', c: 'bg-violet-200 text-violet-700', tech: 'Lisa' }, { t: 'Faucet', c: 'bg-sky-200 text-sky-700', tech: 'Tom' }] : day === 18 ? [{ t: 'Light fix', c: 'bg-amber-200 text-amber-700', tech: '—' }] : [];
            return <div key={d} className={`min-h-[70px] rounded-lg border p-1.5 ${day ? 'border-slate-200' : 'border-slate-100 opacity-30'}`}>{day && <><p className="text-xs font-medium text-slate-700 mb-1">{day}</p>{jobs.map((j, i) => <div key={i} className={`text-[10px] px-1 py-0.5 rounded mb-0.5 ${j.c} cursor-pointer hover:opacity-80`}>{j.t}</div>)}</>}</div>;
          })}
        </div>
      </div>
    </SectionShell>
  );
}

// 64. Before/After Photo Documentation
export function BeforeAfterView() {
  return (
    <SectionShell title="Before / After Photo Documentation" description="Dual image upload with comparison slider">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4"><div><p className="text-sm font-semibold text-slate-800">WO-049 — AC Repair · Unit 101</p><p className="text-xs text-slate-500">Technician: Tom Walsh · Jul 15, 2025</p></div><Badge variant="success" dot>Completed</Badge></div>
        <div className="grid grid-cols-2 gap-4">
          {['Before', 'After'].map((label) => (
            <div key={label}>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">{label}</p>
              <div className="aspect-video bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-sky-300">
                <div className="text-center"><Image className="w-8 h-8 text-slate-300 mx-auto mb-2" /><p className="text-sm text-slate-400">{label === 'Before' ? 'Upload or capture' : 'Upload or capture'}</p></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4"><p className="text-xs font-semibold text-slate-400 uppercase mb-2">Comparison Slider</p><div className="relative h-48 bg-gradient-to-r from-red-100 via-slate-100 to-emerald-100 rounded-xl overflow-hidden"><div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-1 h-full bg-white shadow-lg cursor-ew-resize" /><div className="absolute left-4 top-4 text-xs font-semibold text-red-600">Before</div><div className="absolute right-4 top-4 text-xs font-semibold text-emerald-600">After</div></div></div>
        <div className="mt-4"><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Work Summary</label><textarea className="input min-h-[60px]" defaultValue="Replaced AC capacitor and cleaned condenser coils. Unit now cooling to 72°F." /></div>
      </div>
    </SectionShell>
  );
}

// 65. Work Order Cost Tracking
export function CostTrackingView() {
  return (
    <SectionShell title="Work Order Cost Tracking" description="Line-item cost entry form">
      <div className="card p-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><DollarSign className="w-5 h-5" /></div><div><p className="text-sm font-semibold text-slate-800">Cost Tracking — WO-049</p><p className="text-xs text-slate-500">AC Repair · Unit 101</p></div></div>
        <div className="space-y-3">
          {[
            { item: 'AC Capacitor (OEM)', qty: 1, unit: '$85.00', total: '$85.00' },
            { item: 'Refrigerant R-410A (2 lbs)', qty: 2, unit: '$45.00', total: '$90.00' },
            { item: 'Labor (1.5 hrs)', qty: 1.5, unit: '$65.00', total: '$97.50' },
            { item: 'Service call fee', qty: 1, unit: '$50.00', total: '$50.00' },
          ].map((c, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <input className="input col-span-6 text-sm" defaultValue={c.item} />
              <input className="input col-span-2 text-sm text-center" defaultValue={c.qty} />
              <input className="input col-span-2 text-sm text-center" defaultValue={c.unit} />
              <span className="col-span-2 text-sm font-bold text-slate-800 text-right">{c.total}</span>
            </div>
          ))}
          <Button variant="secondary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Line Item</Button>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between"><span className="text-sm font-semibold text-slate-800">Total Cost</span><span className="text-2xl font-bold text-slate-800">$322.50</span></div>
        <div className="mt-4 flex gap-2"><Button variant="primary">Save & Invoice</Button><Button variant="ghost">Save Draft</Button></div>
      </div>
    </SectionShell>
  );
}

// 66. Recurring/Preventive Maintenance Scheduler
export function PreventiveMaintView() {
  return (
    <SectionShell title="Recurring / Preventive Maintenance Scheduler" description="Rule-based recurrence picker (like calendar recurrence UI)" actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New Schedule</Button>}>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Preventive Maintenance Schedules</p>
        <div className="space-y-3">
          {[
            { task: 'HVAC filter replacement', freq: 'Every 3 months', next: 'Oct 1, 2025', units: 'All units', active: true },
            { task: 'Gutter cleaning', freq: 'Bi-annually (Apr & Oct)', next: 'Oct 15, 2025', units: 'Buildings A & B', active: true },
            { task: 'Smoke detector test', freq: 'Monthly', next: 'Aug 1, 2025', units: 'All units', active: true },
            { task: 'Pest control treatment', freq: 'Quarterly', next: 'Sep 1, 2025', units: 'Common areas', active: true },
            { task: 'Boiler inspection', freq: 'Annually (Nov)', next: 'Nov 1, 2025', units: 'Building A', active: false },
          ].map((s) => (
            <div key={s.task} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-sky-500" /><div><p className="text-sm font-medium text-slate-800">{s.task}</p><p className="text-xs text-slate-400">{s.freq} · {s.units} · Next: {s.next}</p></div></div>
              <Toggle checked={s.active} onChange={() => {}} />
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Create Recurring Schedule</p>
        <div className="grid grid-cols-2 gap-4 max-w-xl">
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Task</label><input className="input" placeholder="HVAC filter replacement" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Frequency</label><select className="input"><option>Weekly</option><option>Monthly</option><option>Quarterly</option><option>Semi-annually</option><option>Annually</option><option>Custom</option></select></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Start Date</label><input type="date" className="input" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Assign To</label><select className="input"><option>Tom Walsh</option><option>External vendor</option></select></div>
        </div>
        <Button variant="primary" className="mt-4">Create Schedule</Button>
      </div>
    </SectionShell>
  );
}

// 67. Tenant Satisfaction Rating
export function SatisfactionRatingView() {
  return (
    <SectionShell title="Tenant Satisfaction Rating Post-Repair" description="Star rating widget and comment box">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Star className="w-5 h-5" /></div><div><p className="text-sm font-semibold text-slate-800">Rate Your Repair Experience</p><p className="text-xs text-slate-500">WO-049 — AC Repair · Jul 15</p></div></div>
          <div className="flex justify-center gap-2 py-4">{[1, 2, 3, 4, 5].map((s) => <button key={s} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${s <= 4 ? 'bg-amber-100 text-amber-500' : 'bg-slate-100 text-slate-300'} hover:scale-110`}><Star className={`w-6 h-6 ${s <= 4 ? 'fill-current' : ''}`} /></button>)}</div>
          <p className="text-center text-sm text-slate-600 mt-2">4 out of 5 stars</p>
          <div className="mt-4"><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Comments</label><textarea className="input min-h-[80px]" placeholder="Tell us about your experience..." /></div>
          <Button variant="primary" className="mt-3 w-full">Submit Rating</Button>
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-4">Recent Ratings</p>
          <div className="space-y-3">
            {[
              { t: 'Sophia Martinez', w: 'WO-049', r: 4, c: 'Quick response, AC working great' },
              { t: 'Marcus Chen', w: 'WO-048', r: 5, c: 'Excellent service, very professional' },
              { t: 'Aisha Patel', w: 'WO-045', r: 3, c: 'Took longer than expected' },
              { t: 'David Kim', w: 'WO-047', r: 5, c: 'No issues, very satisfied' },
            ].map((r) => (
              <div key={r.w} className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-1"><p className="text-sm font-medium text-slate-800">{r.t}</p><div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className={`w-3.5 h-3.5 ${s <= r.r ? 'text-amber-400 fill-current' : 'text-slate-200'}`} />)}</div></div>
                <p className="text-xs text-slate-400">{r.w} · "{r.c}"</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100"><div className="flex items-center justify-between"><span className="text-sm text-slate-600">Average Rating (30d)</span><div className="flex items-center gap-2"><span className="text-2xl font-bold text-slate-800">4.3</span><Star className="w-5 h-5 text-amber-400 fill-current" /></div></div></div>
        </div>
      </div>
    </SectionShell>
  );
}

// 68. Maintenance History Per Unit
export function MaintenanceHistoryView() {
  return (
    <SectionShell title="Maintenance History Per Unit" description="Timeline view">
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold">101</div><div><p className="text-sm font-semibold text-slate-800">Unit 101 — Sophia Martinez</p><p className="text-xs text-slate-400">8 work orders · 2 preventive · 6 reactive</p></div></div>
        <div className="relative pl-6 space-y-4">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-200" />
          {[
            { date: 'Jul 15, 2025', title: 'AC Repair', type: 'Reactive', status: 'completed', cost: '$322', tech: 'Tom Walsh' },
            { date: 'Apr 1, 2025', title: 'HVAC Filter Replacement', type: 'Preventive', status: 'completed', cost: '$45', tech: 'Tom Walsh' },
            { date: 'Mar 10, 2025', title: 'Blind Replacement', type: 'Reactive', status: 'completed', cost: '$80', tech: 'Lisa Torres' },
            { date: 'Jan 15, 2025', title: 'Smoke Detector Test', type: 'Preventive', status: 'completed', cost: '$0', tech: 'Tom Walsh' },
            { date: 'Jun 20, 2024', title: 'Carpet Cleaning', type: 'Reactive', status: 'completed', cost: '$150', tech: 'External' },
          ].map((h, i) => (
            <div key={i} className="relative">
              <div className={`absolute -left-[18px] w-3 h-3 rounded-full border-2 border-white ${h.type === 'Preventive' ? 'bg-sky-500' : 'bg-amber-500'}`} />
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div><p className="text-sm font-medium text-slate-800">{h.title}</p><p className="text-xs text-slate-400">{h.date} · {h.tech} · {h.type}</p></div>
                <div className="flex items-center gap-3"><span className="text-xs text-slate-500">{h.cost}</span><StatusBadge status={h.status as any} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}


