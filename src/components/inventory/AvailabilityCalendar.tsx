import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Calendar, RefreshCw } from 'lucide-react';
import { Badge, Button, Tooltip, Toggle } from '../../components/ui';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type DayStatus = 'available' | 'booked' | 'blocked' | 'surge' | 'past';

interface DayData {
  day: number;
  status: DayStatus;
  price?: string;
  note?: string;
}

function generateMonthData(year: number, month: number): (DayData | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  const cells: (DayData | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);

  for (let d = 1; d <= daysInMonth; d++) {
    let status: DayStatus = 'available';
    let price = '$890';
    let note: string | undefined;

    if (isCurrentMonth && d < todayDate) {
      status = 'past';
    } else if (d >= 15 && d <= 18) {
      status = 'booked';
      price = '$1,068';
      note = 'Sophia Martinez';
    } else if (d >= 22 && d <= 25) {
      status = 'booked';
      price = '$1,068';
      note = 'Liam Torres';
    } else if ((d === 24 || d === 25 || d === 26) && month === 11) {
      status = 'blocked';
      note = 'Christmas block';
    } else if (d >= 5 && d <= 7 && month === 6) {
      status = 'surge';
      price = '$1,202';
      note = 'Summer surge +35%';
    } else if (d >= 20 && d <= 22) {
      status = 'blocked';
      note = 'Maintenance';
    } else if (d === 4 || d === 11 || d === 18 || d === 25) {
      status = 'surge';
      price = '$1,068';
    }

    cells.push({ day: d, status, price, note });
  }
  return cells;
}

const statusColors: Record<DayStatus, string> = {
  available: 'bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50/50',
  booked: 'bg-sky-50 border-sky-300',
  blocked: 'bg-red-50 border-red-200',
  surge: 'bg-amber-50 border-amber-200',
  past: 'bg-slate-50 border-slate-100 opacity-50',
};

const statusDots: Record<DayStatus, string> = {
  available: 'bg-emerald-400',
  booked: 'bg-sky-500',
  blocked: 'bg-red-400',
  surge: 'bg-amber-400',
  past: 'bg-slate-300',
};

export function AvailabilityCalendar() {
  const [viewDate, setViewDate] = useState(new Date(2025, 6, 1));
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [recurringEnabled, setRecurringEnabled] = useState(true);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = generateMonthData(year, month);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToday = () => setViewDate(new Date());

  return (
    <div className="p-6 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={<ChevronLeft className="w-4 h-4" />} onClick={prevMonth} />
          <span className="text-sm font-semibold text-slate-800 min-w-[140px] text-center">
            {monthNames[month]} {year}
          </span>
          <Button variant="secondary" size="sm" icon={<ChevronRight className="w-4 h-4" />} onClick={nextMonth} />
        </div>
        <Button variant="ghost" size="sm" onClick={goToday}>Today</Button>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>Sync OTAs</Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Block dates</Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-slate-500">
        {[
          { label: 'Available', color: 'bg-emerald-400' },
          { label: 'Booked', color: 'bg-sky-500' },
          { label: 'Blocked', color: 'bg-red-400' },
          { label: 'Surge pricing', color: 'bg-amber-400' },
          { label: 'Past', color: 'bg-slate-300' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
            {l.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 card">
          <div className="card-header">
            <p className="section-title">Master Calendar — Rooftop Suite</p>
            <select className="select h-8 w-44 text-xs">
              <option>Rooftop Suite — Miami</option>
              <option>Mountain Cabin Escape</option>
              <option>Desert Retreat Package</option>
              <option>All listings</option>
            </select>
          </div>
          <div className="card-body">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1.5 mb-2">
              {dayLabels.map((d) => (
                <div key={d} className="text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider py-1">
                  {d}
                </div>
              ))}
            </div>
            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {cells.map((cell, i) => {
                if (!cell) return <div key={i} className="aspect-square" />;
                return (
                  <button
                    key={i}
                    onClick={() => cell.status !== 'past' && setSelectedDay(cell)}
                    className={`aspect-square border rounded-lg p-1.5 text-left transition-all relative ${statusColors[cell.status]} ${selectedDay?.day === cell.day ? 'ring-2 ring-sky-400' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-semibold text-slate-700">{cell.day}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDots[cell.status]}`} />
                    </div>
                    {cell.price && cell.status !== 'past' && (
                      <p className="text-[10px] font-medium text-slate-500 mt-1">{cell.price}</p>
                    )}
                    {cell.note && cell.status !== 'past' && (
                      <p className="text-[9px] text-slate-400 truncate mt-0.5">{cell.note}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Day detail */}
          {selectedDay ? (
            <div className="card">
              <div className="card-header">
                <p className="section-title">Jul {selectedDay.day}, 2025</p>
                <button onClick={() => setSelectedDay(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="card-body space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${statusDots[selectedDay.status]}`} />
                  <span className="text-sm font-medium text-slate-700 capitalize">{selectedDay.status}</span>
                </div>
                {selectedDay.price && (
                  <div>
                    <p className="text-xs text-slate-400">Price</p>
                    <p className="text-lg font-bold text-slate-800">{selectedDay.price}</p>
                  </div>
                )}
                {selectedDay.note && (
                  <div>
                    <p className="text-xs text-slate-400">Note</p>
                    <p className="text-sm text-slate-700">{selectedDay.note}</p>
                  </div>
                )}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <Button variant="secondary" size="sm" className="w-full justify-center">Edit price</Button>
                  {selectedDay.status === 'available' && (
                    <Button variant="secondary" size="sm" className="w-full justify-center">Block this date</Button>
                  )}
                  {selectedDay.status === 'blocked' && (
                    <Button variant="secondary" size="sm" className="w-full justify-center">Unblock</Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body text-center py-8">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Select a date to view or edit details</p>
              </div>
            </div>
          )}

          {/* Recurring schedule */}
          <div className="card">
            <div className="card-header">
              <p className="section-title">Recurring Schedule</p>
              <Toggle checked={recurringEnabled} onChange={setRecurringEnabled} />
            </div>
            <div className="card-body space-y-3">
              {recurringEnabled ? (
                <>
                  <div className="flex gap-1.5">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${i < 5 ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-slate-400">Check-in</p>
                      <p className="font-medium text-slate-700">3:00 PM</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Check-out</p>
                      <p className="font-medium text-slate-700">11:00 AM</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="w-full justify-center">Edit schedule</Button>
                </>
              ) : (
                <p className="text-sm text-slate-400">Recurring schedule is disabled. Set availability manually per date.</p>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="card">
            <div className="card-header"><p className="section-title">This Month</p></div>
            <div className="card-body grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-slate-400">Booked nights</p>
                <p className="text-lg font-bold text-sky-600">7</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Available</p>
                <p className="text-lg font-bold text-emerald-600">18</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Blocked</p>
                <p className="text-lg font-bold text-red-600">3</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Occupancy</p>
                <p className="text-lg font-bold text-slate-800">29%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
