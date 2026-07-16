import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Plus, MapPin, Users, Calendar, DollarSign, Brain, Share2, FileText, Wallet, CheckSquare } from 'lucide-react';
import { PageHeader, Badge, Button, Tabs, EmptyState } from '../components/ui';

const trips = [
  { id: 1, name: 'Tuscany Summer 2025', dates: 'Aug 3–12, 2025', guests: 4, status: 'planning', budget: '$6,400', spent: '$2,100', destinations: ['Florence', 'Siena', 'Cinque Terre'] },
  { id: 2, name: 'Japan Cherry Blossom', dates: 'Mar 25 – Apr 5, 2026', guests: 2, status: 'booked', budget: '$9,200', spent: '$8,800', destinations: ['Tokyo', 'Kyoto', 'Osaka'] },
  { id: 3, name: 'Bali Wellness Retreat', dates: 'Nov 1–8, 2025', guests: 6, status: 'planning', budget: '$4,800', spent: '$800', destinations: ['Ubud', 'Seminyak'] },
];

const itineraryDays = [
  { day: 1, date: 'Aug 3', location: 'Florence', items: [
    { time: '2:00 PM', title: 'Arrive at Florence Airport', type: 'transport' },
    { time: '4:00 PM', title: 'Check-in: Villa Il Poggiale', type: 'stay' },
    { time: '7:30 PM', title: 'Welcome dinner at Buca Mario', type: 'dining' },
  ]},
  { day: 2, date: 'Aug 4', location: 'Florence', items: [
    { time: '9:00 AM', title: 'Uffizi Gallery private tour', type: 'experience' },
    { time: '1:00 PM', title: 'Lunch in Oltrarno district', type: 'dining' },
    { time: '3:30 PM', title: 'Cooking class: Fresh pasta & Chianti', type: 'experience' },
  ]},
];

function TripCard({ trip }: { trip: typeof trips[0] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-elevated transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-800">{trip.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Calendar className="w-3 h-3" />{trip.dates}</p>
        </div>
        <Badge variant={trip.status === 'booked' ? 'success' : 'info'} dot>
          {trip.status === 'booked' ? 'Booked' : 'Planning'}
        </Badge>
      </div>
      <div className="flex gap-3 mb-4">
        {trip.destinations.map((d) => (
          <span key={d} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5" />{d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
        <div><p className="text-[10px] text-slate-400 uppercase tracking-wider">Guests</p><p className="text-sm font-semibold text-slate-800 mt-0.5">{trip.guests}</p></div>
        <div><p className="text-[10px] text-slate-400 uppercase tracking-wider">Budget</p><p className="text-sm font-semibold text-slate-800 mt-0.5">{trip.budget}</p></div>
        <div><p className="text-[10px] text-slate-400 uppercase tracking-wider">Spent</p><p className="text-sm font-semibold text-emerald-600 mt-0.5">{trip.spent}</p></div>
      </div>
    </div>
  );
}

function Itineraries() {
  const [selectedTrip] = useState(trips[0]);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <Button variant="primary" icon={<Plus className="w-4 h-4" />} className="w-full justify-center">New Trip</Button>
          {trips.map((t) => <TripCard key={t.id} trip={t} />)}
        </div>
        <div className="lg:col-span-2 card">
          <div className="card-header">
            <div>
              <p className="section-title">{selectedTrip.name}</p>
              <p className="section-sub">{selectedTrip.dates} · {selectedTrip.guests} guests</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" icon={<Share2 className="w-3.5 h-3.5" />}>Share</Button>
              <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add item</Button>
            </div>
          </div>
          <div className="p-5 space-y-6">
            {itineraryDays.map((day) => (
              <div key={day.day}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center justify-center">D{day.day}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{day.date}</p>
                    <p className="text-xs text-slate-500">{day.location}</p>
                  </div>
                </div>
                <div className="ml-4 pl-6 border-l-2 border-slate-100 space-y-3">
                  {day.items.map((item, i) => (
                    <div key={i} className="relative flex items-start gap-3">
                      <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-slate-300 bg-white" />
                      <div className="w-16 flex-shrink-0 text-xs text-slate-400 pt-0.5">{item.time}</div>
                      <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-200">
                        <p className="text-sm text-slate-800">{item.title}</p>
                        <Badge variant={item.type === 'stay' ? 'info' : item.type === 'dining' ? 'warning' : item.type === 'experience' ? 'success' : 'neutral'} size="sm">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GroupPlanner() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="card-header">
            <p className="section-title">Group Planner — Tuscany Summer 2025</p>
            <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Invite member</Button>
          </div>
          <div className="card-body space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Members (4)</p>
              {['James Doe (Organizer)', 'Sarah Chen', 'Mike Torres', 'Priya Nair'].map((m) => (
                <div key={m} className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                    {m.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                  </div>
                  <span className="text-sm text-slate-700">{m}</span>
                  {m.includes('Organizer') && <Badge variant="info" size="sm">Organizer</Badge>}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Polls & Decisions</p>
              {['Preferred hotel tier?', 'Which day for Siena?', 'Dinner preference: Traditional vs Modern?'].map((poll) => (
                <div key={poll} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-700">{poll}</span>
                  <Button variant="secondary" size="sm">Vote</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="card">
            <div className="card-header"><p className="section-title">Split Payments</p></div>
            <div className="card-body space-y-2">
              {[
                { item: 'Villa Il Poggiale', total: '$3,200', each: '$800', status: 'paid' },
                { item: 'Uffizi private tour', total: '$640', each: '$160', status: 'pending' },
              ].map((p) => (
                <div key={p.item} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-xs font-medium text-slate-700">{p.item}</p>
                    <p className="text-xs text-slate-400">{p.each}/person</p>
                  </div>
                  <Badge variant={p.status === 'paid' ? 'success' : 'warning'} dot>{p.status}</Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><p className="section-title">Document Wallet</p></div>
            <div className="card-body space-y-2">
              {['Flight tickets', 'Hotel confirmation', 'Travel insurance', 'Visa documents'].map((d) => (
                <div key={d} className="flex items-center gap-2 py-1.5">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-700">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIPlanner() {
  const [prompt, setPrompt] = useState('');
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-sky-50 to-slate-50 border border-sky-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-slate-800">AI Trip Planner</p>
            <p className="text-xs text-slate-500">Powered by Planviry AI</p>
          </div>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your ideal trip... e.g. 'Plan a 7-day romantic trip to Italy for 2 people in August with a $5,000 budget. We love food, wine, and history.'"
          className="input resize-none h-24 mb-3"
        />
        <Button variant="primary" icon={<Brain className="w-4 h-4" />}>Generate itinerary</Button>
      </div>
      <div className="card">
        <div className="card-header"><p className="section-title">AI Suggestions</p></div>
        <div className="card-body space-y-3">
          {[
            'Complete 10-day Tuscany itinerary with daily schedule',
            'Budget breakdown: flights, accommodation, food, activities',
            'Best restaurants near your booked properties',
            'Packing list for Mediterranean summer travel',
          ].map((s) => (
            <button key={s} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg text-sm text-slate-700 transition-all text-left">
              <Brain className="w-4 h-4 text-sky-500 flex-shrink-0" />
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Trips() {
  const navigate = useNavigate();
  const location = useLocation();

  const subTabs = [
    { id: '/trips/itineraries', label: 'Itineraries' },
    { id: '/trips/shared', label: 'Shared Plans' },
    { id: '/trips/group', label: 'Group Planner' },
    { id: '/trips/budget', label: 'Budget' },
    { id: '/trips/wallet', label: 'Doc Wallet' },
    { id: '/trips/ai', label: 'AI Planner' },
  ];

  const active = subTabs.find((t) => location.pathname.startsWith(t.id))?.id || '/trips/itineraries';

  return (
    <div className="min-h-full">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Trips</h1>
            <p className="text-sm text-slate-500 mt-0.5">Plan, collaborate, and manage your travel experiences</p>
          </div>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>New Trip</Button>
        </div>
        <div className="tab-nav mt-4">
          {subTabs.map((t) => (
            <button key={t.id} className={`tab-item ${active === t.id ? 'active' : ''}`} onClick={() => navigate(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Itineraries />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/group" element={<GroupPlanner />} />
        <Route path="/ai" element={<AIPlanner />} />
        <Route path="/*" element={<Itineraries />} />
      </Routes>
    </div>
  );
}
