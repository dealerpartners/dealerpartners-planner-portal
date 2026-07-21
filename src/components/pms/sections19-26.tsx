import { useState } from 'react';
import {
  DoorOpen, Plus, Calendar, Image, FileText, CheckSquare,
  ClipboardCheck, KanbanSquare, TrendingUp, Eye, Download,
  BedDouble, Bath, Maximize, DollarSign,
} from 'lucide-react';
import { Badge, Button, StatCard } from '../ui';
import { SectionShell, StatusBadge, InfoRow, ProgressBar, MiniChart, KanbanColumn } from './shared';

// 19. Unit Listing Per Property
export function UnitListView() {
  const units = [
    { id: '101', type: '1BR', sqft: 750, bed: 1, bath: 1, rent: 2200, status: 'occupied' as const, tenant: 'Sophia Martinez' },
    { id: '102', type: '2BR', sqft: 950, bed: 2, bath: 2, rent: 2800, status: 'occupied' as const, tenant: 'Marcus Chen' },
    { id: '103', type: 'Studio', sqft: 550, bed: 0, bath: 1, rent: 1800, status: 'vacant' as const, tenant: null },
    { id: '201', type: '1BR', sqft: 750, bed: 1, bath: 1, rent: 2200, status: 'occupied' as const, tenant: 'Aisha Patel' },
    { id: '202', type: '2BR', sqft: 950, bed: 2, bath: 2, rent: 2800, status: 'maintenance' as const, tenant: null },
    { id: '301', type: 'Penthouse', sqft: 1400, bed: 3, bath: 2, rent: 5400, status: 'occupied' as const, tenant: 'David Kim' },
  ];
  return (
    <SectionShell title="Unit Listing Per Property" description="Nested table/grid under property view"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Unit</Button>}>
      <div className="flex items-center gap-2 mb-3 text-sm text-slate-600"><span className="font-medium">Oceanview Condos</span><span className="text-slate-300">/</span><span>24 units</span></div>
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead><tr><th>Unit #</th><th>Type</th><th>Sq Ft</th><th>Beds</th><th>Baths</th><th>Rent</th><th>Tenant</th><th>Status</th></tr></thead>
          <tbody>
            {units.map((u) => (
              <tr key={u.id}>
                <td className="font-mono font-medium text-slate-800">{u.id}</td>
                <td><span className="pill bg-sky-50 text-sky-700 text-xs">{u.type}</span></td>
                <td>{u.sqft}</td>
                <td>{u.bed}</td>
                <td>{u.bath}</td>
                <td className="font-medium text-emerald-600">${u.rent.toLocaleString()}</td>
                <td className="text-sm text-slate-600">{u.tenant || '—'}</td>
                <td><StatusBadge status={u.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 20. Add/Edit Unit
export function AddUnitView() {
  return (
    <SectionShell title="Add / Edit Unit" description="Form with unit type, sq ft, bed/bath, rent amount">
      <div className="card p-6 max-w-xl">
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Unit Number</label><input className="input" placeholder="101" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Unit Type</label><select className="input"><option>Studio</option><option>1BR</option><option>2BR</option><option>3BR</option><option>Penthouse</option><option>Townhouse</option></select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Square Footage</label><input type="number" className="input" placeholder="750" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Monthly Rent ($)</label><input type="number" className="input" placeholder="2200" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Bedrooms</label><select className="input"><option>0 (Studio)</option><option>1</option><option>2</option><option>3</option><option>4+</option></select></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Bathrooms</label><select className="input"><option>1</option><option>1.5</option><option>2</option><option>3</option></select></div>
          </div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Security Deposit ($)</label><input type="number" className="input" placeholder="2200" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Description</label><textarea className="input min-h-[60px]" placeholder="Corner unit with ocean view..." /></div>
          <div className="flex gap-2"><Button variant="primary" icon={<CheckSquare className="w-4 h-4" />}>Save Unit</Button><Button variant="ghost">Cancel</Button></div>
        </div>
      </div>
    </SectionShell>
  );
}

// 21. Unit Availability Calendar
export function UnitCalendarView() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  return (
    <SectionShell title="Unit Availability Calendar" description="Calendar component showing vacancy periods">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Button variant="ghost" size="sm">‹</Button><p className="text-sm font-semibold text-slate-800">July 2025</p><Button variant="ghost" size="sm">›</Button></div>
          <div className="flex gap-2 text-xs">{[['Occupied', 'bg-sky-200'], ['Vacant', 'bg-emerald-200'], ['Hold', 'bg-amber-200']].map(([l, c]) => <span key={l} className="flex items-center gap-1"><span className={`w-3 h-3 rounded ${c}`} />{l}</span>)}</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <p key={d} className="text-xs font-semibold text-slate-400 uppercase">{d}</p>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const day = d > 0 && d <= 31 ? d : null;
            const status = !day ? 'empty' : [5, 12, 13, 20, 27].includes(d) ? 'vacant' : [14, 15, 16].includes(d) ? 'hold' : day && d > 0 ? 'occupied' : 'empty';
            const bg = status === 'vacant' ? 'bg-emerald-100 border-emerald-300' : status === 'hold' ? 'bg-amber-100 border-amber-300' : status === 'occupied' ? 'bg-sky-100 border-sky-200' : '';
            return <div key={d} className={`aspect-square rounded-lg border p-1.5 ${bg} ${!day ? 'opacity-30' : ''}`}>{day && <p className="text-xs font-medium text-slate-700">{day}</p>}</div>;
          })}
        </div>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-3">Vacancy Periods — Unit 101</p>
        <div className="space-y-2">
          {[
            { period: 'Jul 5 - Jul 7', days: 3, reason: 'Turnover cleaning' },
            { period: 'Jul 12 - Jul 13', days: 2, reason: 'Maintenance — AC repair' },
            { period: 'Jul 20 - Jul 27', days: 8, reason: 'Between tenants' },
          ].map((v) => (
            <div key={v.period} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
              <div><p className="text-sm font-medium text-slate-800">{v.period}</p><p className="text-xs text-slate-400">{v.reason}</p></div>
              <Badge variant="success" size="sm">{v.days} days vacant</Badge>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// 22. Unit Floor Plans
export function FloorPlansView() {
  return (
    <SectionShell title="Unit Floor Plans" description="Image/PDF viewer with zoom">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-4">
          <p className="text-sm font-semibold text-slate-800 mb-3">Available Plans</p>
          <div className="space-y-2">
            {['Unit 101 — 1BR Layout', 'Unit 102 — 2BR Layout', 'Unit 201 — Studio Layout', 'Unit 301 — Penthouse'].map((f, i) => (
              <button key={f} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${i === 0 ? 'bg-sky-50 text-sky-700' : 'hover:bg-slate-50 text-slate-700'}`}>
                <FileText className="w-4 h-4 flex-shrink-0" /><span className="text-sm font-medium">{f}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 card p-4">
          <div className="flex items-center justify-between mb-3"><p className="text-sm font-semibold text-slate-800">Unit 101 — 1BR Layout</p><div className="flex gap-1"><Button variant="ghost" size="sm">−</Button><Button variant="ghost" size="sm">+</Button><Button variant="ghost" size="sm" icon={<Download className="w-3 h-3" />}>Download</Button></div></div>
          <div className="h-80 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
            <div className="text-center"><Image className="w-12 h-12 text-slate-300 mx-auto mb-2" /><p className="text-sm text-slate-400">Floor plan preview</p><p className="text-xs text-slate-400 mt-1">750 sq ft · 1 Bed · 1 Bath</p></div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 23. Unit Amenities Checklist
export function UnitAmenitiesView() {
  const amenities = [
    { cat: 'Kitchen', items: ['Refrigerator', 'Dishwasher', 'Microwave', 'Garbage Disposal', 'Granite Countertops', 'Stainless Steel Appliances'] },
    { cat: 'Climate', items: ['Central AC', 'Heating', 'Ceiling Fans', 'Smart Thermostat'] },
    { cat: 'Laundry', items: ['In-unit Washer/Dryer', 'Washer/Dryer Hookups', 'Shared Laundry Room'] },
    { cat: 'Outdoor', items: ['Balcony', 'Patio', 'Private Garden', 'Storage Shed'] },
    { cat: 'Parking', items: ['Garage', 'Carport', 'Assigned Spot', 'EV Charging'] },
    { cat: 'Other', items: ['Hardwood Floors', 'Walk-in Closet', 'Fireplace', 'Smart Lock', 'Video Doorbell', 'Window Treatments'] },
  ];
  return (
    <SectionShell title="Unit Amenities Checklist" description="Multi-select checkbox group">
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((g) => (
            <div key={g.cat}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{g.cat}</p>
              <div className="space-y-1.5">
                {g.items.map((a) => (
                  <label key={a} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                    <input type="checkbox" defaultChecked={Math.random() > 0.5} className="rounded" />
                    <span className="text-sm text-slate-700">{a}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2"><Button variant="primary">Save Amenities</Button><Button variant="ghost">Reset</Button></div>
      </div>
    </SectionShell>
  );
}

// 24. Unit Inspection Reports
export function InspectionView() {
  return (
    <SectionShell title="Unit Inspection Reports" description="Form builder with photo attachments per room"
      actions={<Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New Inspection</Button>}>
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4"><div><p className="text-sm font-semibold text-slate-800">Inspection — Unit 101</p><p className="text-xs text-slate-500">July 15, 2025 · Inspector: Tom Walsh</p></div><Badge variant="info" dot>In Progress</Badge></div>
        <div className="space-y-4">
          {[
            { room: 'Living Room', condition: 'Good', notes: 'Minor wear on hardwood', photos: 3 },
            { room: 'Kitchen', condition: 'Excellent', notes: 'All appliances working', photos: 5 },
            { room: 'Bedroom', condition: 'Good', notes: 'Closet door hinge loose', photos: 2 },
            { room: 'Bathroom', condition: 'Fair', notes: 'Caulking needs replacement', photos: 4 },
            { room: 'Balcony', condition: 'Good', notes: 'Railings secure', photos: 2 },
          ].map((r) => (
            <div key={r.room} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0"><DoorOpen className="w-5 h-5 text-slate-400" /></div>
              <div className="flex-1">
                <div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-800">{r.room}</p><Badge variant={r.condition === 'Excellent' ? 'success' : r.condition === 'Good' ? 'info' : 'warning'} size="sm">{r.condition}</Badge></div>
                <p className="text-xs text-slate-500 mt-1">{r.notes}</p>
                <div className="flex items-center gap-2 mt-2"><div className="flex gap-1">{Array.from({ length: r.photos }).map((_, i) => <div key={i} className="w-8 h-8 rounded bg-slate-200 border border-slate-300 flex items-center justify-center"><Image className="w-3 h-3 text-slate-400" /></div>)}</div><button className="text-xs text-sky-600 font-medium">+ Add photo</button></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2"><Button variant="primary" icon={<ClipboardCheck className="w-4 h-4" />}>Complete Inspection</Button><Button variant="ghost">Save Draft</Button></div>
      </div>
    </SectionShell>
  );
}

// 25. Unit Turnover Tracking
export function TurnoverView() {
  const kanbanData = {
    vacant: [{ id: 'U-101', name: 'Unit 101', prop: 'Oceanview', days: 2 }, { id: 'U-103', name: 'Unit 103', prop: 'Oceanview', days: 5 }],
    cleaning: [{ id: 'U-202', name: 'Unit 202', prop: 'Oceanview', days: 1 }, { id: 'U-305', name: 'Unit 305', prop: 'Downtown', days: 1 }],
    ready: [{ id: 'U-410', name: 'Unit 410', prop: 'Downtown', days: 0 }],
    occupied: [{ id: 'U-102', name: 'Unit 102', prop: 'Oceanview', days: 0, tenant: 'M. Chen' }, { id: 'U-301', name: 'Unit 301', prop: 'Oceanview', days: 0, tenant: 'D. Kim' }],
  };
  const renderItem = (item: any) => (
    <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
      <p className="text-sm font-semibold text-slate-800">{item.name}</p>
      <p className="text-xs text-slate-400 mt-0.5">{item.prop}</p>
      {item.tenant ? <p className="text-xs text-sky-600 mt-1">Tenant: {item.tenant}</p> : <p className="text-xs text-amber-600 mt-1">{item.days}d in stage</p>}
    </div>
  );
  return (
    <SectionShell title="Unit Turnover Tracking" description="Kanban board (vacant → cleaning → ready → occupied)">
      <div className="card p-6">
        <div className="flex gap-4 overflow-x-auto">
          <KanbanColumn title="Vacant" items={kanbanData.vacant} color="bg-emerald-500" renderItem={renderItem} />
          <KanbanColumn title="Cleaning" items={kanbanData.cleaning} color="bg-amber-500" renderItem={renderItem} />
          <KanbanColumn title="Ready" items={kanbanData.ready} color="bg-sky-500" renderItem={renderItem} />
          <KanbanColumn title="Occupied" items={kanbanData.occupied} color="bg-violet-500" renderItem={renderItem} />
        </div>
      </div>
    </SectionShell>
  );
}

// 26. Unit Pricing History
export function PricingHistoryView() {
  return (
    <SectionShell title="Unit Pricing History" description="Line chart showing rent changes over time">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Current Rent" value="$2,200" sub="Unit 101" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="12-Mo Change" value="+8.2%" change="up" changeType="up" icon={<TrendingUp className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Avg Rent (Area)" value="$2,050" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-slate-100 text-slate-600" />
        <StatCard label="Price/Sq Ft" value="$2.93" icon={<Maximize className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Rent History — Unit 101</p>
        <MiniChart data={[1800, 1850, 1900, 1950, 2000, 2000, 2100, 2100, 2200, 2200, 2200, 2200]} color="#0ea5e9" height={120} />
        <div className="mt-4 pt-4 border-t border-slate-100">
          <table className="data-table">
            <thead><tr><th>Date</th><th>Old Rent</th><th>New Rent</th><th>Change</th><th>Reason</th></tr></thead>
            <tbody>
              {[
                { date: 'Jul 2025', old: '$2,100', new: '$2,200', change: '+$100', reason: 'Annual increase' },
                { date: 'Jan 2025', old: '$2,000', new: '$2,100', change: '+$100', reason: 'Lease renewal' },
                { date: 'Jul 2024', old: '$1,950', new: '$2,000', change: '+$50', reason: 'Market adjustment' },
                { date: 'Jan 2024', old: '$1,800', new: '$1,950', change: '+$150', reason: 'Renovation complete' },
              ].map((h) => (
                <tr key={h.date}><td className="text-xs text-slate-400">{h.date}</td><td>{h.old}</td><td className="font-medium">{h.new}</td><td className="text-emerald-600 font-medium">{h.change}</td><td className="text-xs text-slate-500">{h.reason}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionShell>
  );
}
