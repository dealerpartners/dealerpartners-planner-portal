import { useState } from 'react';
import { Plus, Search, MoreHorizontal, AlertTriangle, CheckCircle, Wrench, Users, Car, BedDouble, Utensils, Package } from 'lucide-react';
import { Badge, Button, Tooltip } from '../../components/ui';

interface Resource {
  id: string;
  name: string;
  type: 'Room' | 'Vehicle' | 'Equipment' | 'Table' | 'Staff' | 'Booth';
  capacity: number;
  allocated: number;
  status: 'available' | 'allocated' | 'maintenance' | 'conflict';
  assignedTo?: string;
  booking?: string;
}

const resources: Resource[] = [
  { id: 'R-01', name: 'Rooftop Suite R22', type: 'Room', capacity: 4, allocated: 2, status: 'allocated', assignedTo: 'Sophia Martinez', booking: 'BK-4421' },
  { id: 'R-02', name: 'Mountain Cabin A', type: 'Room', capacity: 6, allocated: 5, status: 'allocated', assignedTo: 'Liam Torres', booking: 'BK-4418' },
  { id: 'R-03', name: 'Desert Retreat Tent 1', type: 'Room', capacity: 2, allocated: 0, status: 'available' },
  { id: 'R-04', name: 'Desert Retreat Tent 2', type: 'Room', capacity: 2, allocated: 0, status: 'maintenance', assignedTo: 'Canvas repair' },
  { id: 'R-05', name: 'Mercedes Sprinter Van', type: 'Vehicle', capacity: 8, allocated: 0, status: 'available' },
  { id: 'R-06', name: 'Toyota Prius', type: 'Vehicle', capacity: 4, allocated: 3, status: 'allocated', assignedTo: 'Airport pickup', booking: 'BK-4419' },
  { id: 'R-07', name: 'PA System A', type: 'Equipment', capacity: 1, allocated: 1, status: 'allocated', assignedTo: 'Corporate event', booking: 'BK-4416' },
  { id: 'R-08', name: 'Projector Unit', type: 'Equipment', capacity: 1, allocated: 0, status: 'available' },
  { id: 'R-09', name: 'Banquet Table Set (10)', type: 'Table', capacity: 10, allocated: 8, status: 'allocated', assignedTo: 'Wedding reception', booking: 'BK-4414' },
  { id: 'R-10', name: 'Jessica Reyes', type: 'Staff', capacity: 1, allocated: 1, status: 'allocated', assignedTo: 'Check-in assist', booking: 'BK-4421' },
  { id: 'R-11', name: 'Tom Walsh', type: 'Staff', capacity: 1, allocated: 1, status: 'allocated', assignedTo: 'Mountain Cabin turnover', booking: 'BK-4418' },
  { id: 'R-12', name: 'Booth 12 — Convention', type: 'Booth', capacity: 1, allocated: 0, status: 'conflict', assignedTo: 'Double-booked: BK-4420 & BK-4422' },
];

const statusMeta: Record<string, { variant: 'success' | 'info' | 'warning' | 'danger'; label: string }> = {
  available: { variant: 'success', label: 'Available' },
  allocated: { variant: 'info', label: 'Allocated' },
  maintenance: { variant: 'warning', label: 'Maintenance' },
  conflict: { variant: 'danger', label: 'Conflict' },
};

const typeIcons: Record<string, React.ReactNode> = {
  Room: <BedDouble className="w-4 h-4" />,
  Vehicle: <Car className="w-4 h-4" />,
  Equipment: <Package className="w-4 h-4" />,
  Table: <Utensils className="w-4 h-4" />,
  Staff: <Users className="w-4 h-4" />,
  Booth: <Package className="w-4 h-4" />,
};

const typeColors: Record<string, string> = {
  Room: 'bg-sky-50 text-sky-600',
  Vehicle: 'bg-violet-50 text-violet-600',
  Equipment: 'bg-amber-50 text-amber-600',
  Table: 'bg-emerald-50 text-emerald-600',
  Staff: 'bg-rose-50 text-rose-600',
  Booth: 'bg-slate-100 text-slate-600',
};

export function ResourcesView() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = resources.filter((r) => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'All' && r.type !== typeFilter) return false;
    return true;
  });

  const conflicts = resources.filter((r) => r.status === 'conflict');
  const inMaintenance = resources.filter((r) => r.status === 'maintenance');
  const totalAllocated = resources.filter((r) => r.status === 'allocated').length;
  const totalAvailable = resources.filter((r) => r.status === 'available').length;

  return (
    <div className="p-6 space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <p className="text-xs text-slate-500">Available</p>
          </div>
          <p className="text-xl font-bold text-slate-800">{totalAvailable}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-sky-500" />
            <p className="text-xs text-slate-500">Allocated</p>
          </div>
          <p className="text-xl font-bold text-slate-800">{totalAllocated}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-4 h-4 text-amber-500" />
            <p className="text-xs text-slate-500">Maintenance</p>
          </div>
          <p className="text-xl font-bold text-slate-800">{inMaintenance.length}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <p className="text-xs text-slate-500">Conflicts</p>
          </div>
          <p className="text-xl font-bold text-red-600">{conflicts.length}</p>
        </div>
      </div>

      {/* Conflict alert */}
      {conflicts.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-red-50 border-red-200 text-red-800 text-sm">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1">
            <span className="font-semibold">{conflicts.length} resource conflict{conflicts.length > 1 ? 's' : ''} detected.</span>{' '}
            {conflicts.map((c) => c.name).join(', ')}
          </span>
          <Button variant="danger" size="sm">Resolve</Button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search resources..." className="input pl-9 h-9" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="select h-9 w-36 text-sm">
          <option>All</option>
          <option>Room</option><option>Vehicle</option><option>Equipment</option>
          <option>Table</option><option>Staff</option><option>Booth</option>
        </select>
        <div className="ml-auto">
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add resource</Button>
        </div>
      </div>

      {/* Resource grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => {
          const s = statusMeta[r.status];
          return (
            <div key={r.id} className={`card p-4 ${r.status === 'conflict' ? 'border-red-300' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[r.type]}`}>
                    {typeIcons[r.type]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.type} · Capacity: {r.capacity}</p>
                  </div>
                </div>
                <Badge variant={s.variant} dot>{s.label}</Badge>
              </div>

              {r.assignedTo && (
                <div className="bg-slate-50 rounded-lg p-2.5 mt-2">
                  <p className="text-xs text-slate-400">Assigned to</p>
                  <p className="text-sm font-medium text-slate-700 mt-0.5">{r.assignedTo}</p>
                  {r.booking && (
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">{r.booking}</p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  {r.capacity > 1 && (
                    <>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full" style={{ width: `${(r.allocated / r.capacity) * 100}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{r.allocated}/{r.capacity}</span>
                    </>
                  )}
                </div>
                <div className="flex gap-1">
                  <Tooltip content="Allocate" position="top">
                    <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Users className="w-3.5 h-3.5" /></button>
                  </Tooltip>
                  <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
