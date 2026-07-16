import { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Star, Heart, Grid3X3, Map, Filter, ChevronDown } from 'lucide-react';
import { Badge, Button, Tabs, Tooltip } from '../components/ui';

const listings = [
  { id: 1, title: 'Oceanfront Villa — Malibu', category: 'Villa', location: 'Malibu, CA', price: '$890/night', rating: 4.9, reviews: 142, img: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Pool', 'Ocean view', 'Pets OK'], featured: true },
  { id: 2, title: 'Urban Loft — Downtown LA', category: 'Apartment', location: 'Los Angeles, CA', price: '$220/night', rating: 4.7, reviews: 89, img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['City view', 'Gym', 'Rooftop'] },
  { id: 3, title: 'Desert Glamping Experience', category: 'Experience', location: 'Joshua Tree, CA', price: '$340/night', rating: 4.8, reviews: 211, img: 'https://images.pexels.com/photos/2610756/pexels-photo-2610756.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Unique', 'Off-grid', 'Stars'] },
  { id: 4, title: 'Napa Valley Wine Retreat', category: 'Package', location: 'Napa, CA', price: '$1,200/pkg', rating: 5.0, reviews: 67, img: 'https://images.pexels.com/photos/442116/pexels-photo-442116.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Wine', 'Spa', 'Dining'], featured: true },
  { id: 5, title: 'Ski Chalet — Lake Tahoe', category: 'Chalet', location: 'Lake Tahoe, CA', price: '$650/night', rating: 4.6, reviews: 184, img: 'https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Ski-in/out', 'Hot tub', 'Mountain'] },
  { id: 6, title: 'San Francisco Walking Tour', category: 'Tour', location: 'San Francisco, CA', price: '$85/person', rating: 4.9, reviews: 503, img: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Local guide', 'Group', 'History'] },
];

const categories = ['All', 'Experiences', 'Events', 'Rooms', 'Spaces', 'Services', 'Packages'];

export default function Explore() {
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [activeCategory, setActiveCategory] = useState('All');
  const [saved, setSaved] = useState<number[]>([]);

  return (
    <div className="min-h-full bg-surface-50">
      {/* Search hero */}
      <div className="bg-white border-b border-slate-200 px-6 py-5">
        <h1 className="text-xl font-semibold text-slate-800 mb-4">Explore Listings & Experiences</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by location, type, or keyword..."
              className="input pl-9 h-10"
              defaultValue=""
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input type="text" placeholder="Location" className="input pl-9 h-10 w-full sm:w-44" />
          </div>
          <input type="text" placeholder="Check-in" className="input h-10 w-full sm:w-32" />
          <input type="text" placeholder="Check-out" className="input h-10 w-full sm:w-32" />
          <Button variant="primary" icon={<Search className="w-4 h-4" />}>Search</Button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3 overflow-x-auto">
        <div className="flex gap-2 flex-shrink-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeCategory === c
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
          <Button variant="secondary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>
            Filters
          </Button>
          <Button variant="secondary" size="sm" icon={<SlidersHorizontal className="w-3.5 h-3.5" />}>
            Sort
            <ChevronDown className="w-3 h-3 ml-0.5" />
          </Button>
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            <Tooltip content="Grid view" position="bottom">
              <button
                onClick={() => setView('grid')}
                className={`p-1.5 rounded ${view === 'grid' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
            <Tooltip content="Map view" position="bottom">
              <button
                onClick={() => setView('map')}
                className={`p-1.5 rounded ${view === 'map' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}
              >
                <Map className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="p-6">
        {view === 'map' ? (
          <div className="bg-white rounded-xl border border-slate-200 flex items-center justify-center h-96 text-slate-400">
            <div className="text-center">
              <MapPin className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">Interactive Map</p>
              <p className="text-xs mt-1">Map integration available via configuration</p>
            </div>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-500"><span className="font-semibold text-slate-800">128 results</span> found</p>
              <p className="text-xs text-slate-400">Showing top matches for your search</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((l) => (
                <div key={l.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-elevated transition-shadow group cursor-pointer">
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={l.img}
                      alt={l.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {l.featured && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded">
                        FEATURED
                      </span>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); setSaved((s) => s.includes(l.id) ? s.filter((x) => x !== l.id) : [...s, l.id]); }}
                      className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${saved.includes(l.id) ? 'fill-red-500 text-red-500' : 'text-slate-500'}`} />
                    </button>
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="info">{l.category}</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-800 text-sm leading-snug">{l.title}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold text-slate-700">{l.rating}</span>
                        <span className="text-xs text-slate-400">({l.reviews})</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {l.location}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {l.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <span className="font-bold text-slate-800 text-sm">{l.price}</span>
                      <Button variant="primary" size="sm">Book now</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load more */}
            <div className="flex justify-center mt-8">
              <Button variant="secondary">Load more results</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
