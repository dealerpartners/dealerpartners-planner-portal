import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, Filter, MoreHorizontal, Eye, MessageSquare, Clock, User, ArrowRightLeft, XCircle, CheckCircle } from 'lucide-react';
import { Badge, Button, Tooltip } from '../components/ui';

const bookings = [
  { id: 'BK-4421', guest: 'Sophia Martinez', listing: 'Rooftop Suite — Miami', start: 'Jul 15', end: 'Jul 18', nights: 3, guests: 2, amount: '$1,240', status: 'confirmed', paid: true },
  { id: 'BK-4420', guest: 'Marcus Chen', listing: 'Desert Retreat Package', start: 'Jul 20', end: 'Jul 22', nights: 2, guests: 4, amount: '$680', status: 'pending', paid: false },
  { id: 'BK-4419', guest: 'Aisha Patel', listing: 'Sunset Sailing Tour', start: 'Jul 14', end: 'Jul 14', nights: 1, guests: 3, amount: '$320', status: 'confirmed', paid: true },
  { id: 'BK-4418', guest: 'Liam Torres', listing: 'Mountain Cabin Escape', start: 'Jul 22', end: 'Jul 25', nights: 3, guests: 5, amount: '$2,100', status: 'confirmed', paid: true },
  { id: 'BK-4417', guest: 'Priya Nair', listing: 'City Food Tour', start: 'Jul 13', end: 'Jul 13', nights: 1, guests: 2, amount: '$95', status: 'completed', paid: true },
  { id: 'BK-4416', guest: 'David Kim', listing: 'Rooftop Suite — Miami', start: 'Jul 28', end: 'Aug 1', nights: 4, guests: 2, amount: '$1,890', status: 'confirmed', paid: false },
  { id: 'BK-4415', guest: 'Eleni Vasquez', listing: 'Desert Retreat Package', start: 'Jul 8', end: 'Jul 10', nights: 2, guests: 3, amount: '$680', status: 'cancelled', paid: false },
];

const statusMeta: Record<string, { variant: 'success' | 'warning' | 'info' | 'neutral' | 'danger'; label: string }> = {
  confirmed: { variant: 'success', label: 'Confirmed' },
  pending: { variant: 'warning', label: 'Pending' },
  completed: { variant: 'neutral', label: 'Completed' },
  cancelled: { variant: 'danger', label: 'Cancelled' },
  active: { variant: 'info', label: 'Active' },
};

const waitlist = [
  { id: 'WL-021', guest: 'Ryan Jackson', listing: 'Desert Retreat Jul 20–22', position: 1, joined: 'Jul 10', notified: false },
  { id: 'WL-020', guest: 'Mia Fontaine', listing: 'Desert Retreat Jul 20–22', position: 2, joined: 'Jul 11', notified: false },
  { id: 'WL-019', guest: 'Carlos Reyes', listing: 'Rooftop Suite Jul 15–18', position: 1, joined: 'Jul 8', notified: true },
];

function BookingTable({ filter }: { filter?: string }) {
  const filtered = filter ? bookings.filter((b) => b.status === filter) : bookings;
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input type="text" placeholder="Search bookings..." className="input pl-9 h-9" />
        </div>
        <Button variant="secondary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>Filter</Button>
        <div className="ml-auto">
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New booking</Button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Guest</th>
              <th>Listing</th>
              <th>Dates</th>
              <th>Guests</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => {
              const s = statusMeta[b.status];
              return (
                <tr key={b.id} className="cursor-pointer">
                  <td><span className="font-mono text-xs text-slate-500">{b.id}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        {b.guest.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="font-medium text-slate-800">{b.guest}</span>
                    </div>
                  </td>
                  <td className="text-slate-600 text-xs max-w-[150px] truncate">{b.listing}</td>
                  <td className="text-xs text-slate-500 whitespace-nowrap">{b.start}–{b.end}</td>
                  <td className="text-center">
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <User className="w-3 h-3" />{b.guests}
                    </div>
                  </td>
                  <td className="font-semibold text-slate-800">{b.amount}</td>
                  <td>
                    <Badge variant={b.paid ? 'success' : 'warning'} dot>
                      {b.paid ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </td>
                  <td><Badge variant={s.variant} dot>{s.label}</Badge></td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Tooltip content="View details" position="top">
                        <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button>
                      </Tooltip>
                      <Tooltip content="Message guest" position="top">
                        <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><MessageSquare className="w-3.5 h-3.5" /></button>
                      </Tooltip>
                      <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WaitlistView() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">3 guests waiting across 2 listings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">Auto-fill settings</Button>
          <Button variant="primary" size="sm">Notify all</Button>
        </div>
      </div>
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Guest</th>
              <th>Listing</th>
              <th>Position</th>
              <th>Joined</th>
              <th>Notified</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {waitlist.map((w) => (
              <tr key={w.id}>
                <td><span className="font-mono text-xs text-slate-400">{w.id}</span></td>
                <td className="font-medium text-slate-800">{w.guest}</td>
                <td className="text-xs text-slate-500">{w.listing}</td>
                <td>
                  <span className={`font-bold text-sm ${w.position === 1 ? 'text-sky-600' : 'text-slate-600'}`}>#{w.position}</span>
                </td>
                <td className="text-xs text-slate-500">{w.joined}</td>
                <td><Badge variant={w.notified ? 'success' : 'neutral'} dot>{w.notified ? 'Sent' : 'Pending'}</Badge></td>
                <td>
                  <div className="flex gap-1">
                    <Button variant="secondary" size="sm">Offer spot</Button>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CheckInView() {
  const today = [
    { guest: 'Sophia Martinez', listing: 'Rooftop Suite — Miami', time: '3:00 PM', type: 'Check-in', status: 'upcoming' },
    { guest: 'Aisha Patel', listing: 'Sunset Sailing Tour', time: '10:00 AM', type: 'Check-out', status: 'completed' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <p className="section-title">Today's Check-ins / Check-outs</p>
            <Badge variant="info" dot>Jul 14</Badge>
          </div>
          <div className="divide-y divide-slate-100">
            {today.map((t, i) => (
              <div key={i} className="px-5 py-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${t.type === 'Check-in' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {t.type === 'Check-in' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{t.guest}</p>
                  <p className="text-xs text-slate-500 truncate">{t.listing}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold text-slate-700">{t.time}</p>
                  <Badge variant={t.status === 'completed' ? 'success' : 'info'} size="sm" dot>{t.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <p className="section-title">Digital Keys & Access</p>
            <Button variant="primary" size="sm">Generate key</Button>
          </div>
          <div className="card-body space-y-3">
            {[
              { guest: 'Sophia Martinez', unit: 'Rooftop Suite — Floor 22', code: '4821', expires: 'Jul 18, 11:00 AM', active: true },
              { guest: 'Liam Torres', unit: 'Mountain Cabin', code: '7364', expires: 'Jul 25, 11:00 AM', active: false },
            ].map((k) => (
              <div key={k.guest} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{k.guest}</p>
                    <p className="text-xs text-slate-500">{k.unit}</p>
                  </div>
                  <Badge variant={k.active ? 'success' : 'neutral'} dot>{k.active ? 'Active' : 'Inactive'}</Badge>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div className="bg-white border border-slate-200 rounded px-3 py-1.5">
                    <span className="font-mono text-lg font-bold text-slate-800 tracking-widest">{k.code}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Expires {k.expires}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const subTabs = [
  { id: '/bookings/upcoming', label: 'Upcoming' },
  { id: '/bookings/past', label: 'Past' },
  { id: '/bookings/cancelled', label: 'Cancelled' },
  { id: '/bookings/waitlist', label: 'Waitlist', count: 3 },
  { id: '/bookings/checkin', label: 'Check-in / Out' },
];

export default function Bookings() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = subTabs.find((t) => location.pathname.startsWith(t.id))?.id || '/bookings/upcoming';

  return (
    <div className="min-h-full">
      <div className="page-header">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Bookings</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage reservations, check-ins, and waitlists</p>
          </div>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>New booking</Button>
        </div>
        <div className="tab-nav">
          {subTabs.map((t) => (
            <button key={t.id} className={`tab-item ${active === t.id ? 'active' : ''}`} onClick={() => navigate(t.id)}>
              {t.label}
              {t.count && <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-700">{t.count}</span>}
            </button>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<BookingTable />} />
        <Route path="/upcoming" element={<BookingTable />} />
        <Route path="/past" element={<BookingTable filter="completed" />} />
        <Route path="/cancelled" element={<BookingTable filter="cancelled" />} />
        <Route path="/waitlist" element={<WaitlistView />} />
        <Route path="/checkin" element={<CheckInView />} />
        <Route path="/*" element={<BookingTable />} />
      </Routes>
    </div>
  );
}
