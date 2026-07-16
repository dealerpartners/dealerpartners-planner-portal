import { useState, useMemo } from 'react';
import {
  Plus, Search, MoreHorizontal, Star, Edit, Eye, Trash2, Filter,
  ToggleLeft, ToggleRight, Package, MapPin, Calendar, DollarSign,
  TrendingUp, AlertCircle, CheckSquare, Square, Copy, Archive, Tag, ChevronDown,
} from 'lucide-react';
import { Badge, Button, Tooltip, SegmentedControl } from '../../components/ui';

export interface Listing {
  id: string;
  title: string;
  type: 'Room' | 'Villa' | 'Experience' | 'Package' | 'Space' | 'Service' | 'Tour';
  status: 'active' | 'paused' | 'draft' | 'archived';
  price: string;
  priceNum: number;
  bookings: number;
  rating: number | null;
  reviews: number;
  occupancy: string;
  occupancyNum: number;
  revenue: string;
  revenueNum: number;
  img: string;
  location: string;
  amenities: string[];
  lastUpdated: string;
}

const mockListings: Listing[] = [
  { id: 'LST-001', title: 'Rooftop Suite — Miami', type: 'Room', status: 'active', price: '$890/night', priceNum: 890, bookings: 42, rating: 4.9, reviews: 142, occupancy: '91%', occupancyNum: 91, revenue: '$18,420', revenueNum: 18420, img: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=400', location: 'Miami, FL', amenities: ['Pool', 'Ocean view', 'Pets OK'], lastUpdated: 'Jul 12' },
  { id: 'LST-002', title: 'Mountain Cabin Escape', type: 'Villa', status: 'active', price: '$650/night', priceNum: 650, bookings: 28, rating: 4.8, reviews: 84, occupancy: '78%', occupancyNum: 78, revenue: '$14,200', revenueNum: 14200, img: 'https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg?auto=compress&cs=tinysrgb&w=400', location: 'Lake Tahoe, CA', amenities: ['Ski-in/out', 'Hot tub', 'Mountain'], lastUpdated: 'Jul 10' },
  { id: 'LST-003', title: 'Desert Retreat Package', type: 'Package', status: 'active', price: '$1,200/pkg', priceNum: 1200, bookings: 15, rating: 4.7, reviews: 31, occupancy: '66%', occupancyNum: 66, revenue: '$11,800', revenueNum: 11800, img: 'https://images.pexels.com/photos/2610756/pexels-photo-2610756.jpeg?auto=compress&cs=tinysrgb&w=400', location: 'Joshua Tree, CA', amenities: ['Unique', 'Off-grid', 'Stars'], lastUpdated: 'Jul 8' },
  { id: 'LST-004', title: 'Sunset Sailing Tour', type: 'Tour', status: 'active', price: '$320/person', priceNum: 320, bookings: 61, rating: 5.0, reviews: 203, occupancy: '84%', occupancyNum: 84, revenue: '$8,940', revenueNum: 8940, img: 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=400', location: 'San Diego, CA', amenities: ['Local guide', 'Group', 'Snacks'], lastUpdated: 'Jul 11' },
  { id: 'LST-005', title: 'City Food Tour', type: 'Experience', status: 'paused', price: '$95/person', priceNum: 95, bookings: 94, rating: 4.6, reviews: 312, occupancy: '-', occupancyNum: 0, revenue: '$6,200', revenueNum: 6200, img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', location: 'San Francisco, CA', amenities: ['Food', 'Walking', 'Local guide'], lastUpdated: 'Jul 5' },
  { id: 'LST-006', title: 'Beachfront Cabana', type: 'Space', status: 'draft', price: '$280/day', priceNum: 280, bookings: 0, rating: null, reviews: 0, occupancy: '-', occupancyNum: 0, revenue: '$0', revenueNum: 0, img: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400', location: 'Malibu, CA', amenities: ['Beachfront', 'Shade', 'Loungers'], lastUpdated: 'Jul 13' },
  { id: 'LST-007', title: 'Wine Country Estate', type: 'Villa', status: 'active', price: '$1,400/night', priceNum: 1400, bookings: 22, rating: 4.9, reviews: 58, occupancy: '82%', occupancyNum: 82, revenue: '$22,600', revenueNum: 22600, img: 'https://images.pexels.com/photos/442116/pexels-photo-442116.jpeg?auto=compress&cs=tinysrgb&w=400', location: 'Napa, CA', amenities: ['Vineyard', 'Pool', 'Chef on call'], lastUpdated: 'Jul 9' },
  { id: 'LST-008', title: 'Corporate Event Space — Downtown', type: 'Space', status: 'active', price: '$2,800/day', priceNum: 2800, bookings: 8, rating: 4.7, reviews: 19, occupancy: '54%', occupancyNum: 54, revenue: '$16,400', revenueNum: 16400, img: 'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=400', location: 'Los Angeles, CA', amenities: ['AV equipment', 'Catering', 'Parking'], lastUpdated: 'Jul 7' },
];

const statusMeta: Record<string, { variant: 'success' | 'warning' | 'neutral'; label: string }> = {
  active: { variant: 'success', label: 'Active' },
  paused: { variant: 'warning', label: 'Paused' },
  draft: { variant: 'neutral', label: 'Draft' },
  archived: { variant: 'neutral', label: 'Archived' },
};

const typeFilters = ['All', 'Room', 'Villa', 'Experience', 'Package', 'Space', 'Service', 'Tour'];
const statusFilters = ['All', 'Active', 'Paused', 'Draft', 'Archived'];

interface ListingsViewProps {
  onEditListing?: (id: string) => void;
  onNewListing?: () => void;
}

export function ListingsView({ onEditListing, onNewListing }: ListingsViewProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeMap, setActiveMap] = useState<Record<string, boolean>>(
    Object.fromEntries(mockListings.filter((l) => l.status === 'active').map((l) => [l.id, true]))
  );
  const [sortField, setSortField] = useState<'revenue' | 'bookings' | 'price' | 'occupancy' | 'rating'>('revenue');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = mockListings.filter((l) => {
      if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !l.location.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter !== 'All' && l.type !== typeFilter) return false;
      if (statusFilter !== 'All' && l.status !== statusFilter.toLowerCase()) return false;
      return true;
    });
    const sortKey = sortField === 'price' ? 'priceNum' : sortField === 'occupancy' ? 'occupancyNum' : sortField === 'rating' ? 'rating' : sortField === 'bookings' ? 'bookings' : 'revenueNum';
    result = [...result].sort((a, b) => {
      const av = (a as any)[sortKey] ?? 0;
      const bv = (b as any)[sortKey] ?? 0;
      return sortDir === 'asc' ? av - bv : bv - av;
    });
    return result;
  }, [search, typeFilter, statusFilter, sortField, sortDir]);

  const allSelected = selected.size === filtered.length && filtered.length > 0;
  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map((l) => l.id)));
  };
  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  const SortHeader = ({ field, children }: { field: typeof sortField; children: React.ReactNode }) => (
    <th>
      <button onClick={() => handleSort(field)} className="flex items-center gap-1 hover:text-slate-700 transition-colors">
        {children}
        <ChevronDown className={`w-3 h-3 transition-transform ${sortField === field ? (sortDir === 'asc' ? 'rotate-180' : '') : 'opacity-30'}`} />
      </button>
    </th>
  );

  return (
    <div className="p-6 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings or locations..."
            className="input pl-9 h-9"
          />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="select h-9 w-36 text-sm">
          {typeFilters.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select h-9 w-36 text-sm">
          {statusFilters.map((s) => <option key={s}>{s}</option>)}
        </select>
        <SegmentedControl
          options={[
            { id: 'table', label: 'Table' },
            { id: 'grid', label: 'Grid' },
          ]}
          active={view}
          onChange={(v) => setView(v as 'table' | 'grid')}
        />
        <div className="ml-auto">
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={onNewListing}>
            New listing
          </Button>
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-lg px-4 py-2.5">
          <span className="text-sm font-medium text-sky-800">{selected.size} selected</span>
          <div className="h-4 w-px bg-sky-200" />
          <Button variant="ghost" size="sm" icon={<ToggleRight className="w-3.5 h-3.5" />}>Activate</Button>
          <Button variant="ghost" size="sm" icon={<ToggleLeft className="w-3.5 h-3.5" />}>Pause</Button>
          <Button variant="ghost" size="sm" icon={<Tag className="w-3.5 h-3.5" />}>Edit pricing</Button>
          <Button variant="ghost" size="sm" icon={<Copy className="w-3.5 h-3.5" />}>Duplicate</Button>
          <Button variant="ghost" size="sm" icon={<Archive className="w-3.5 h-3.5" />}>Archive</Button>
          <button onClick={() => setSelected(new Set())} className="ml-auto text-xs text-sky-600 hover:underline font-medium">
            Clear selection
          </button>
        </div>
      )}

      {/* Table view */}
      {view === 'table' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-10">
                    <button onClick={toggleAll} className="text-slate-400 hover:text-slate-700">
                      {allSelected ? <CheckSquare className="w-4 h-4 text-sky-600" /> : <Square className="w-4 h-4" />}
                    </button>
                  </th>
                  <th>Listing</th>
                  <th>Type</th>
                  <th>Status</th>
                  <SortHeader field="price">Price</SortHeader>
                  <SortHeader field="bookings">Bookings</SortHeader>
                  <SortHeader field="occupancy">Occupancy</SortHeader>
                  <SortHeader field="revenue">Revenue</SortHeader>
                  <SortHeader field="rating">Rating</SortHeader>
                  <th>Live</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => {
                  const s = statusMeta[l.status];
                  return (
                    <tr key={l.id} className={selected.has(l.id) ? 'bg-sky-50/50' : ''}>
                      <td>
                        <button onClick={() => toggleOne(l.id)} className="text-slate-400 hover:text-slate-700">
                          {selected.has(l.id) ? <CheckSquare className="w-4 h-4 text-sky-600" /> : <Square className="w-4 h-4" />}
                        </button>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <img src={l.img} alt={l.title} className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-slate-800 truncate">{l.title}</p>
                            <p className="text-xs text-slate-400 flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" />{l.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td><span className="text-slate-500 text-xs">{l.type}</span></td>
                      <td><Badge variant={s.variant} dot>{s.label}</Badge></td>
                      <td className="font-medium text-slate-700">{l.price}</td>
                      <td className="text-slate-700">{l.bookings}</td>
                      <td>
                        {l.occupancyNum > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${l.occupancyNum >= 80 ? 'bg-emerald-500' : l.occupancyNum >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                style={{ width: `${l.occupancyNum}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-500">{l.occupancy}</span>
                          </div>
                        ) : <span className="text-slate-400 text-xs">—</span>}
                      </td>
                      <td className="font-semibold text-slate-800">{l.revenue}</td>
                      <td>
                        {l.rating ? (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium">{l.rating}</span>
                            <span className="text-xs text-slate-400">({l.reviews})</span>
                          </div>
                        ) : <span className="text-slate-400 text-xs">—</span>}
                      </td>
                      <td>
                        <Tooltip content={activeMap[l.id] ? 'Deactivate listing' : 'Activate listing'} position="left">
                          <button
                            onClick={() => setActiveMap((a) => ({ ...a, [l.id]: !a[l.id] }))}
                            className={`transition-colors ${activeMap[l.id] ? 'text-sky-600' : 'text-slate-300'}`}
                          >
                            {activeMap[l.id] ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                          </button>
                        </Tooltip>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Tooltip content="View" position="top">
                            <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /></button>
                          </Tooltip>
                          <Tooltip content="Edit" position="top">
                            <button onClick={() => onEditListing?.(l.id)} className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Edit className="w-3.5 h-3.5" /></button>
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
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Package className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm text-slate-400">No listings match your filters</p>
            </div>
          )}
        </div>
      )}

      {/* Grid view */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((l) => {
            const s = statusMeta[l.status];
            return (
              <div key={l.id} className="card overflow-hidden hover:shadow-elevated transition-shadow group cursor-pointer" onClick={() => onEditListing?.(l.id)}>
                <div className="relative h-36 overflow-hidden bg-slate-100">
                  <img src={l.img} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 right-2">
                    <Badge variant={s.variant} dot>{s.label}</Badge>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="pill bg-white/90 backdrop-blur-sm text-slate-700 text-xs">{l.type}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800 text-sm leading-snug truncate">{l.title}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><MapPin className="w-2.5 h-2.5" />{l.location}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <span className="font-bold text-slate-800 text-sm">{l.price}</span>
                    {l.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium text-slate-700">{l.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary footer */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing {filtered.length} of {mockListings.length} listings</span>
        <span>Total revenue: <span className="font-semibold text-slate-600">${mockListings.reduce((s, l) => s + l.revenueNum, 0).toLocaleString()}</span></span>
      </div>
    </div>
  );
}
