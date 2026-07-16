import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Plus, CheckSquare, AlertTriangle, Wrench, Users, ClipboardList, RefreshCw, FileText, Clock, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge, Button, Tooltip } from '../components/ui';

const tasks = [
  { id: 1, title: 'Pre-arrival clean: Rooftop Suite', assignee: 'Ana Lima', due: 'Today 2pm', priority: 'high', status: 'in_progress', booking: 'BK-4421' },
  { id: 2, title: 'Restock minibar: Mountain Cabin', assignee: 'Tom Walsh', due: 'Today 4pm', priority: 'medium', status: 'pending', booking: 'BK-4418' },
  { id: 3, title: 'Inspect pool area after last guest', assignee: 'Jessica Reyes', due: 'Jul 15 10am', priority: 'low', status: 'pending', booking: null },
  { id: 4, title: 'Send post-stay review request: Priya Nair', assignee: 'Auto', due: 'Jul 15 9am', priority: 'medium', status: 'completed', booking: 'BK-4417' },
  { id: 5, title: 'Update emergency contact list', assignee: 'James Doe', due: 'Jul 16', priority: 'low', status: 'pending', booking: null },
];

const maintenanceIssues = [
  { id: 'WO-041', title: 'HVAC unit not cooling — Suite 22', unit: 'Rooftop Suite', priority: 'urgent', assignee: 'External HVAC Co.', status: 'in_progress', reported: 'Jul 12', cost: '$380' },
  { id: 'WO-040', title: 'Pool pump making noise', unit: 'Mountain Cabin', priority: 'medium', assignee: 'Tom Walsh', status: 'reported', reported: 'Jul 11', cost: '-' },
  { id: 'WO-039', title: 'Smart lock battery replacement', unit: 'Desert Retreat', priority: 'low', assignee: 'Ana Lima', status: 'completed', reported: 'Jul 8', cost: '$24' },
];

const housekeepingStatus = [
  { unit: 'Rooftop Suite — R22', status: 'dirty', nextCheckin: 'Today 3pm', assignee: 'Ana Lima' },
  { unit: 'Mountain Cabin', status: 'clean', nextCheckin: 'Jul 22', assignee: 'Tom Walsh' },
  { unit: 'Desert Retreat', status: 'inspected', nextCheckin: 'Jul 20', assignee: 'Jessica Reyes' },
  { unit: 'Beachfront Cabana', status: 'out_of_service', nextCheckin: '-', assignee: '-' },
];

const hsColors: Record<string, string> = {
  dirty: 'bg-red-50 text-red-700 border-red-200',
  clean: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  inspected: 'bg-sky-50 text-sky-700 border-sky-200',
  out_of_service: 'bg-slate-100 text-slate-600 border-slate-200',
};

function MasterCalendar() {
  const hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];
  const days = ['Mon Jul 14', 'Tue Jul 15', 'Wed Jul 16', 'Thu Jul 17', 'Fri Jul 18'];
  const events = [
    { day: 1, start: 2, duration: 3, title: 'Check-in: Sophia Martinez', color: 'bg-sky-100 border-sky-300 text-sky-800' },
    { day: 0, start: 0, duration: 2, title: 'Check-out: Priya Nair', color: 'bg-emerald-100 border-emerald-300 text-emerald-800' },
    { day: 3, start: 5, duration: 2, title: 'Staff: Liam check-in assist', color: 'bg-violet-100 border-violet-300 text-violet-800' },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" icon={<ChevronLeft className="w-4 h-4" />} />
        <span className="text-sm font-semibold text-slate-800">Week of July 14–18, 2025</span>
        <Button variant="secondary" size="sm" icon={<ChevronRight className="w-4 h-4" />} />
        <Button variant="secondary" size="sm">Today</Button>
        <div className="ml-auto flex gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-3 h-3 rounded-sm bg-sky-200 border border-sky-300 inline-block" /> Check-in</div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-3 h-3 rounded-sm bg-emerald-200 border border-emerald-300 inline-block" /> Check-out</div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-3 h-3 rounded-sm bg-violet-200 border border-violet-300 inline-block" /> Staff</div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid border-b border-slate-200 bg-slate-50" style={{ gridTemplateColumns: '64px repeat(5, 1fr)' }}>
              <div className="py-3 px-2 border-r border-slate-200" />
              {days.map((d) => (
                <div key={d} className="py-3 px-3 border-r border-slate-200 last:border-r-0">
                  <p className="text-xs font-semibold text-slate-700">{d.split(' ')[0]}</p>
                  <p className="text-xs text-slate-400">{d.split(' ')[1]}</p>
                </div>
              ))}
            </div>
            {hours.map((h, hi) => (
              <div key={h} className="grid border-b border-slate-100 last:border-0" style={{ gridTemplateColumns: '64px repeat(5, 1fr)' }}>
                <div className="py-3 px-2 border-r border-slate-200 text-[10px] text-slate-400 text-right pr-3">{h}</div>
                {days.map((d, di) => {
                  const evt = events.find((e) => e.day === di && e.start === hi);
                  return (
                    <div key={d} className="border-r border-slate-100 last:border-r-0 min-h-[44px] p-1 relative">
                      {evt && (
                        <div className={`absolute inset-1 rounded border ${evt.color} px-2 py-1 text-[10px] font-medium z-10`} style={{ height: `${evt.duration * 44 - 8}px` }}>
                          {evt.title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TasksView() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          {['All', 'Today', 'Overdue', 'Completed'].map((f) => (
            <button key={f} className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">{f}</button>
          ))}
        </div>
        <div className="ml-auto">
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add task</Button>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((t) => (
          <div key={t.id} className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 flex items-start gap-4 hover:shadow-sm transition-shadow">
            <input
              type="checkbox"
              defaultChecked={t.status === 'completed'}
              className="mt-0.5 rounded border-slate-300 accent-sky-600 flex-shrink-0 w-4 h-4"
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${t.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>{t.title}</p>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className={`text-xs font-medium ${t.priority === 'high' ? 'text-red-600' : t.priority === 'medium' ? 'text-amber-600' : 'text-slate-400'}`}>
                  {t.priority.charAt(0).toUpperCase() + t.priority.slice(1)} priority
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{t.due}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1"><Users className="w-3 h-3" />{t.assignee}</span>
                {t.booking && <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{t.booking}</span>}
              </div>
            </div>
            <Badge variant={t.status === 'completed' ? 'success' : t.status === 'in_progress' ? 'info' : 'neutral'} dot>
              {t.status.replace('_', ' ')}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function HousekeepingView() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {[['dirty', 'bg-red-50 border-red-200', '1 Dirty'], ['clean', 'bg-emerald-50 border-emerald-200', '1 Clean'], ['inspected', 'bg-sky-50 border-sky-200', '1 Inspected'], ['out_of_service', 'bg-slate-100 border-slate-200', '1 OOS']].map(([k, cls, label]) => (
            <div key={k} className={`px-3 py-2 rounded-lg border text-xs font-medium ${cls}`}>{label}</div>
          ))}
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Schedule turnover</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {housekeepingStatus.map((hs) => (
          <div key={hs.unit} className={`card border-2 ${hsColors[hs.status].includes('border') ? '' : ''}`}>
            <div className="card-body">
              <div className="flex items-start justify-between mb-3">
                <p className="font-semibold text-slate-800 text-sm">{hs.unit}</p>
                <span className={`pill border ${hsColors[hs.status]} capitalize text-xs`}>
                  {hs.status.replace('_', ' ')}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Next check-in</span>
                  <span className="text-slate-700 font-medium">{hs.nextCheckin}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Assigned to</span>
                  <span className="text-slate-700 font-medium">{hs.assignee}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="secondary" size="sm" className="flex-1 justify-center">Mark clean</Button>
                <Button variant="secondary" size="sm" className="flex-1 justify-center">Inspect</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MaintenanceView() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">3 open work orders</p>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New work order</Button>
      </div>
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Issue</th><th>Unit</th><th>Priority</th><th>Assigned to</th><th>Status</th><th>Reported</th><th>Cost</th><th></th></tr>
          </thead>
          <tbody>
            {maintenanceIssues.map((m) => (
              <tr key={m.id}>
                <td><span className="font-mono text-xs text-slate-400">{m.id}</span></td>
                <td className="font-medium text-slate-800">{m.title}</td>
                <td className="text-xs text-slate-500">{m.unit}</td>
                <td>
                  <Badge
                    variant={m.priority === 'urgent' ? 'danger' : m.priority === 'medium' ? 'warning' : 'neutral'}
                    dot
                  >
                    {m.priority}
                  </Badge>
                </td>
                <td className="text-slate-600 text-xs">{m.assignee}</td>
                <td>
                  <Badge
                    variant={m.status === 'completed' ? 'success' : m.status === 'in_progress' ? 'info' : 'warning'}
                    dot
                  >
                    {m.status.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="text-xs text-slate-400">{m.reported}</td>
                <td className="font-medium text-slate-700">{m.cost}</td>
                <td><button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><MoreHorizontal className="w-3.5 h-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const subTabs = [
  { id: '/operations/calendar', label: 'Master Calendar' },
  { id: '/operations/tasks', label: 'Tasks' },
  { id: '/operations/checklists', label: 'Checklists' },
  { id: '/operations/housekeeping', label: 'Housekeeping' },
  { id: '/operations/maintenance', label: 'Maintenance' },
  { id: '/operations/staff', label: 'Staff' },
  { id: '/operations/forms', label: 'Custom Forms' },
];

export default function Operations() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = subTabs.find((t) => location.pathname.startsWith(t.id))?.id || '/operations/calendar';

  return (
    <div className="min-h-full">
      <div className="page-header">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Operations</h1>
            <p className="text-sm text-slate-500 mt-0.5">Calendar, tasks, housekeeping, maintenance, and staff</p>
          </div>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>New task</Button>
        </div>
        <div className="tab-nav">
          {subTabs.map((t) => (
            <button key={t.id} className={`tab-item ${active === t.id ? 'active' : ''}`} onClick={() => navigate(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<MasterCalendar />} />
        <Route path="/calendar" element={<MasterCalendar />} />
        <Route path="/tasks" element={<TasksView />} />
        <Route path="/housekeeping" element={<HousekeepingView />} />
        <Route path="/maintenance" element={<MaintenanceView />} />
        <Route path="/*" element={<MasterCalendar />} />
      </Routes>
    </div>
  );
}
