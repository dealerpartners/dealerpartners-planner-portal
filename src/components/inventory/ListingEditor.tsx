import { useState } from 'react';
import {
  ArrowLeft, Save, Eye, Package, MapPin, DollarSign, Calendar,
  Settings, Plus, Upload, X, Star, Check, AlertCircle, Sparkles,
  Image as ImageIcon, Clock, Shield, Layers, Zap,
} from 'lucide-react';
import { Badge, Button, Tooltip, Toggle } from '../../components/ui';

interface ListingEditorProps {
  listingId?: string;
  onBack: () => void;
}

const editorSections = [
  { id: 'basic', label: 'Basic Info', icon: Package },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'media', label: 'Media', icon: ImageIcon },
  { id: 'amenities', label: 'Amenities', icon: Check },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'availability', label: 'Availability', icon: Calendar },
  { id: 'policies', label: 'Policies', icon: Shield },
  { id: 'addons', label: 'Add-ons', icon: Layers },
];

const allAmenities = [
  'Pool', 'Ocean view', 'Pets OK', 'WiFi', 'Air conditioning', 'Heating',
  'Kitchen', 'Parking', 'Hot tub', 'Gym', 'Fireplace', 'Washer/Dryer',
  'TV', 'Workspace', 'BBQ grill', 'Beachfront', 'Ski-in/out', 'Mountain',
  'Local guide', 'Group', 'Snacks', 'AV equipment', 'Catering', 'Chef on call',
];

const addonOptions = [
  { name: 'Breakfast', price: '$25/guest', desc: 'Continental breakfast delivered to room' },
  { name: 'Airport pickup', price: '$80', desc: 'Private car from airport to property' },
  { name: 'Late checkout', price: '$50', desc: 'Extend checkout to 2 PM' },
  { name: 'Spa package', price: '$120/guest', desc: 'In-room massage and spa treatment' },
];

function BasicInfo() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <label className="field-label">Listing Title</label>
        <input type="text" defaultValue="Rooftop Suite — Miami" className="input" />
        <p className="field-hint">Max 60 characters. Make it descriptive and unique.</p>
      </div>
      <div>
        <label className="field-label">Description</label>
        <textarea
          defaultValue="Stunning rooftop suite with panoramic ocean views. Features a private terrace, modern kitchen, and luxury furnishings. Perfect for romantic getaways or business travelers seeking a premium experience in the heart of Miami Beach."
          className="textarea h-32"
        />
        <p className="field-hint">Describe what makes your listing special. Min 100 characters.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="field-label">Listing Type</label>
          <select className="select" defaultValue="Room">
            <option>Room</option>
            <option>Villa</option>
            <option>Experience</option>
            <option>Package</option>
            <option>Space</option>
            <option>Service</option>
            <option>Tour</option>
          </select>
        </div>
        <div>
          <label className="field-label">Category</label>
          <select className="select" defaultValue="Vacation Rental">
            <option>Vacation Rental</option>
            <option>Event Venue</option>
            <option>Outdoor Experience</option>
            <option>Food & Drink</option>
            <option>Corporate</option>
          </select>
        </div>
      </div>
      <div>
        <label className="field-label">Capacity</label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <input type="number" defaultValue="4" className="input" placeholder="Guests" />
            <p className="field-hint">Max guests</p>
          </div>
          <div>
            <input type="number" defaultValue="2" className="input" placeholder="Bedrooms" />
            <p className="field-hint">Bedrooms</p>
          </div>
          <div>
            <input type="number" defaultValue="2" className="input" placeholder="Bathrooms" />
            <p className="field-hint">Bathrooms</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 bg-sky-50 border border-sky-200 rounded-lg">
        <Sparkles className="w-4 h-4 text-sky-600 flex-shrink-0" />
        <p className="text-xs text-sky-700">
          <span className="font-semibold">AI Tip:</span> Listings with 10+ photos and detailed descriptions get 3.2x more bookings.
        </p>
      </div>
    </div>
  );
}

function LocationSection() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <label className="field-label">Street Address</label>
        <input type="text" defaultValue="420 Ocean Drive" className="input" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="field-label">City</label>
          <input type="text" defaultValue="Miami Beach" className="input" />
        </div>
        <div>
          <label className="field-label">State / Province</label>
          <input type="text" defaultValue="FL" className="input" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="field-label">Postal Code</label>
          <input type="text" defaultValue="33139" className="input" />
        </div>
        <div>
          <label className="field-label">Country</label>
          <select className="select" defaultValue="United States">
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
      </div>
      <div>
        <label className="field-label">Service Area Radius</label>
        <div className="flex items-center gap-3">
          <input type="range" min="0" max="100" defaultValue="15" className="flex-1 accent-sky-600" />
          <span className="text-sm font-medium text-slate-700 w-16 text-right">15 miles</span>
        </div>
        <p className="field-hint">For mobile services and experiences — how far you'll travel to customers.</p>
      </div>
      <div>
        <label className="field-label">Map Pin</label>
        <div className="bg-slate-100 border border-slate-200 rounded-lg h-48 flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative flex flex-col items-center">
            <MapPin className="w-8 h-8 text-sky-600 fill-sky-100" />
            <span className="text-xs text-slate-500 mt-1">Drag to adjust precise location</span>
          </div>
        </div>
      </div>
      <div>
        <label className="field-label">Neighborhood</label>
        <input type="text" defaultValue="South Beach" className="input" />
        <p className="field-hint">Helps guests find your listing by area.</p>
      </div>
    </div>
  );
}

function MediaSection() {
  const [photos, setPhotos] = useState([
    { url: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=300', primary: true },
    { url: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=300', primary: false },
    { url: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=300', primary: false },
    { url: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=300', primary: false },
  ]);

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="field-label mb-0">Photo Gallery</label>
          <span className="text-xs text-slate-400">{photos.length}/20 photos</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((p, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
              <img src={p.url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              {p.primary && (
                <span className="absolute top-2 left-2">
                  <Badge variant="info" size="sm">Primary</Badge>
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {!p.primary && (
                  <button onClick={() => setPhotos(photos.map((ph, idx) => ({ ...ph, primary: idx === i })))} className="p-1.5 bg-white/90 rounded text-slate-700 hover:bg-white" title="Set as primary">
                    <Star className="w-3.5 h-3.5" />
                  </button>
                )}
                <button onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))} className="p-1.5 bg-white/90 rounded text-red-600 hover:bg-white" title="Remove">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          <button className="aspect-square border-2 border-dashed border-slate-300 hover:border-sky-400 hover:bg-sky-50 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all">
            <Upload className="w-5 h-5 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">Upload</span>
          </button>
        </div>
        <p className="field-hint mt-2">First photo is the primary image shown in search results. Drag to reorder.</p>
      </div>
      <div>
        <label className="field-label">Virtual Tour URL</label>
        <input type="url" placeholder="https://..." className="input" />
        <p className="field-hint">Add a 360 virtual tour link (Matterport, Google, etc.)</p>
      </div>
      <div>
        <label className="field-label">Video URL</label>
        <input type="url" placeholder="https://youtube.com/..." className="input" />
        <p className="field-hint">YouTube or Vimeo link to a property walkthrough video.</p>
      </div>
      <div>
        <label className="field-label">Documents</label>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-sky-400 hover:bg-sky-50 transition-all cursor-pointer">
          <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Upload brochures, menus, or info sheets</p>
          <p className="text-xs text-slate-400 mt-1">PDF, DOC, PNG up to 10MB</p>
        </div>
      </div>
    </div>
  );
}

function AmenitiesSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['Pool', 'Ocean view', 'Pets OK', 'WiFi', 'Air conditioning', 'Kitchen', 'Parking', 'TV']));

  const toggle = (a: string) => {
    const next = new Set(selected);
    if (next.has(a)) next.delete(a);
    else next.add(a);
    setSelected(next);
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <label className="field-label">Amenities & Features</label>
        <p className="field-hint mb-3">Select all that apply. These appear as filters in search.</p>
        <div className="flex flex-wrap gap-2">
          {allAmenities.map((a) => (
            <button
              key={a}
              onClick={() => toggle(a)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                selected.has(a)
                  ? 'bg-sky-50 text-sky-700 border-sky-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {selected.has(a) && <Check className="w-3 h-3 inline mr-1" />}
              {a}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="field-label">Custom Features</label>
        <p className="field-hint mb-3">Add amenities unique to your listing.</p>
        <div className="flex gap-2">
          <input type="text" placeholder="e.g. Private chef on request" className="input" />
          <Button variant="secondary" icon={<Plus className="w-4 h-4" />}>Add</Button>
        </div>
      </div>
      <div>
        <label className="field-label">Accessibility</label>
        <div className="space-y-2">
          {['Wheelchair accessible', 'Step-free access', 'Elevator available', 'Accessible bathroom'].map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="rounded border-slate-300 accent-sky-600" />
              {a}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingSection() {
  const [rules, setRules] = useState([
    { id: 1, name: 'Weekend premium', type: 'percentage', value: 20, active: true },
    { id: 2, name: 'Summer season', type: 'percentage', value: 35, active: true },
    { id: 3, name: 'Last-minute (48h)', type: 'percentage', value: -15, active: true },
  ]);

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="field-label">Base Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
            <input type="number" defaultValue="890" className="input pl-7" />
          </div>
          <p className="field-hint">Per night base rate</p>
        </div>
        <div>
          <label className="field-label">Currency</label>
          <select className="select" defaultValue="USD">
            <option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="field-label">Cleaning Fee</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
            <input type="number" defaultValue="120" className="input pl-7" />
          </div>
        </div>
        <div>
          <label className="field-label">Min Stay</label>
          <input type="number" defaultValue="2" className="input" />
          <p className="field-hint">Nights</p>
        </div>
        <div>
          <label className="field-label">Max Stay</label>
          <input type="number" defaultValue="14" className="input" />
          <p className="field-hint">Nights</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="field-label mb-0">Dynamic Pricing Rules</label>
          <Button variant="secondary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add rule</Button>
        </div>
        <div className="space-y-2">
          {rules.map((r) => (
            <div key={r.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{r.name}</p>
                <p className={`text-xs font-semibold ${r.value > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {r.value > 0 ? '+' : ''}{r.value}% adjustment
                </p>
              </div>
              <Toggle checked={r.active} onChange={(v) => setRules((rs) => rs.map((x) => x.id === r.id ? { ...x, active: v } : x))} />
              <button className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <p className="field-hint mt-2">Rules stack multiplicatively. Last-minute discounts apply after all other rules.</p>
      </div>

      <div>
        <label className="field-label">Price Preview</label>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
          {[
            { day: 'Weekday (Sun–Thu)', price: '$890' },
            { day: 'Weekend (Fri–Sat) +20%', price: '$1,068' },
            { day: 'Summer season +35%', price: '$1,202' },
            { day: 'Last-minute -15%', price: '$1,022' },
          ].map((p) => (
            <div key={p.day} className="flex justify-between text-sm">
              <span className="text-slate-500">{p.day}</span>
              <span className="font-semibold text-slate-800">{p.price}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
            <span className="text-slate-500">+ Cleaning fee</span>
            <span className="font-semibold text-slate-800">$120</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AvailabilitySection() {
  const [recurring, setRecurring] = useState({
    enabled: true,
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    startTime: '15:00',
    endTime: '11:00',
  });

  const days = [
    { id: 'mon', label: 'M' }, { id: 'tue', label: 'T' }, { id: 'wed', label: 'W' },
    { id: 'thu', label: 'T' }, { id: 'fri', label: 'F' }, { id: 'sat', label: 'S' }, { id: 'sun', label: 'S' },
  ];

  const toggleDay = (id: string) => {
    setRecurring((r) => ({
      ...r,
      days: r.days.includes(id) ? r.days.filter((d) => d !== id) : [...r.days, id],
    }));
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <label className="field-label">Booking Window</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <select className="select" defaultValue="6">
              <option value="3">3 months ahead</option>
              <option value="6">6 months ahead</option>
              <option value="12">12 months ahead</option>
              <option value="0">Unlimited</option>
            </select>
            <p className="field-hint">How far in advance guests can book</p>
          </div>
          <div>
            <select className="select" defaultValue="2">
              <option value="0">Same day</option>
              <option value="1">1 day notice</option>
              <option value="2">2 days notice</option>
              <option value="7">1 week notice</option>
            </select>
            <p className="field-hint">Advance notice required</p>
          </div>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-slate-800">Recurring Availability</p>
            <p className="text-xs text-slate-400">Set your standard weekly schedule</p>
          </div>
          <Toggle checked={recurring.enabled} onChange={(v) => setRecurring({ ...recurring, enabled: v })} />
        </div>
        {recurring.enabled && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-600 mb-2">Available days</p>
              <div className="flex gap-1.5">
                {days.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => toggleDay(d.id)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium border transition-all ${
                      recurring.days.includes(d.id)
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="field-label">Check-in time</label>
                <input type="time" defaultValue="15:00" className="input" />
              </div>
              <div>
                <label className="field-label">Check-out time</label>
                <input type="time" defaultValue="11:00" className="input" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="field-label">Exceptions & Overrides</label>
        <div className="space-y-2">
          {[
            { label: 'Christmas block', dates: 'Dec 24–26, 2025', type: 'blocked' },
            { label: 'New Year premium', dates: 'Dec 30–Jan 2, 2026', type: 'surge' },
            { label: 'Maintenance', dates: 'Sep 15–20, 2025', type: 'blocked' },
          ].map((e) => (
            <div key={e.label} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-slate-800">{e.label}</p>
                <p className="text-xs text-slate-400">{e.dates}</p>
              </div>
              <Badge variant={e.type === 'blocked' ? 'danger' : 'warning'} dot>
                {e.type === 'blocked' ? 'Blocked' : 'Surge +50%'}
              </Badge>
            </div>
          ))}
          <Button variant="secondary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add exception</Button>
        </div>
      </div>

      <div>
        <label className="field-label">Turnaround Time</label>
        <div className="flex items-center gap-3">
          <input type="range" min="0" max="8" defaultValue="3" className="flex-1 accent-sky-600" />
          <span className="text-sm font-medium text-slate-700 w-20 text-right">3 hours</span>
        </div>
        <p className="field-hint">Buffer between check-out and next check-in for cleaning.</p>
      </div>
    </div>
  );
}

function PoliciesSection() {
  const [cancellation, setCancellation] = useState('flexible');
  const [rules, setRules] = useState([
    'No smoking inside the property',
    'No parties or large gatherings',
    'Quiet hours after 10 PM',
  ]);

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <label className="field-label">Cancellation Policy</label>
        <div className="space-y-2">
          {[
            { id: 'flexible', label: 'Flexible', desc: 'Full refund up to 24h before check-in' },
            { id: 'moderate', label: 'Moderate', desc: 'Full refund up to 5 days before check-in' },
            { id: 'strict', label: 'Strict', desc: '50% refund up to 1 week before check-in' },
            { id: 'super_strict', label: 'Super Strict', desc: 'No refund within 30 days of check-in' },
          ].map((p) => (
            <label key={p.id} className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${cancellation === p.id ? 'border-sky-400 bg-sky-50' : 'border-slate-200 hover:border-slate-300'}`}>
              <input
                type="radio"
                name="cancellation"
                checked={cancellation === p.id}
                onChange={() => setCancellation(p.id)}
                className="mt-1 accent-sky-600"
              />
              <div>
                <p className="text-sm font-semibold text-slate-800">{p.label}</p>
                <p className="text-xs text-slate-500">{p.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="field-label">House Rules</label>
        <div className="space-y-2">
          {rules.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                defaultValue={r}
                className="input"
              />
              <button onClick={() => setRules(rules.filter((_, idx) => idx !== i))} className="p-2 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <Button variant="secondary" size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => setRules([...rules, 'New rule'])}>
            Add rule
          </Button>
        </div>
      </div>

      <div>
        <label className="field-label">Required Documents</label>
        <div className="space-y-2">
          {[
            { name: 'Signed liability waiver', required: true },
            { name: 'Government ID verification', required: true },
            { name: 'Damage deposit agreement', required: false },
          ].map((d) => (
            <label key={d.name} className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" defaultChecked={d.required} className="rounded border-slate-300 accent-sky-600" />
              {d.name}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="field-label">Security Deposit</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
            <input type="number" defaultValue="500" className="input pl-7" />
          </div>
          <p className="field-hint">Held on card, released after checkout</p>
        </div>
        <div>
          <label className="field-label">Instant Book</label>
          <div className="flex items-center gap-3 h-[38px]">
            <Toggle checked={true} onChange={() => {}} />
            <span className="text-sm text-slate-600">Allow booking without approval</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddonsSection() {
  const [addons, setAddons] = useState(addonOptions.map(a => ({ ...a, enabled: true })));

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <label className="field-label mb-0">Add-ons & Upgrades</label>
            <p className="field-hint">Offer extras guests can add at checkout</p>
          </div>
          <Button variant="secondary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add add-on</Button>
        </div>
        <div className="space-y-3">
          {addons.map((a, i) => (
            <div key={i} className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-400" />
                    <p className="text-sm font-semibold text-slate-800">{a.name}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{a.desc}</p>
                  <p className="text-sm font-semibold text-sky-600 mt-2">{a.price}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Toggle checked={a.enabled} onChange={(v) => setAddons((ads) => ads.map((x, idx) => idx === i ? { ...x, enabled: v } : x))} />
                  <button className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <p className="text-sm font-semibold text-slate-800">Bundle as Package</p>
        </div>
        <p className="text-xs text-slate-500 mb-3">Combine this listing with add-ons into a package deal for increased AOV.</p>
        <Button variant="secondary" size="sm">Create package from this listing</Button>
      </div>
    </div>
  );
}

export function ListingEditor({ listingId, onBack }: ListingEditorProps) {
  const [activeSection, setActiveSection] = useState('basic');
  const [dirty, setDirty] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'basic': return <BasicInfo />;
      case 'location': return <LocationSection />;
      case 'media': return <MediaSection />;
      case 'amenities': return <AmenitiesSection />;
      case 'pricing': return <PricingSection />;
      case 'availability': return <AvailabilitySection />;
      case 'policies': return <PoliciesSection />;
      case 'addons': return <AddonsSection />;
      default: return <BasicInfo />;
    }
  };

  return (
    <div className="min-h-full flex flex-col">
      {/* Editor header */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </button>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-slate-800 truncate">
            {listingId ? 'Edit: Rooftop Suite — Miami' : 'New Listing'}
          </h1>
        </div>
        {dirty && (
          <Badge variant="warning" dot>Unsaved changes</Badge>
        )}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={<Eye className="w-3.5 h-3.5" />}>Preview</Button>
          <Button variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />} onClick={() => setDirty(false)}>
            Save changes
          </Button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Section sidebar */}
        <div className="w-52 border-r border-slate-200 bg-white py-4 flex-shrink-0">
          <nav className="px-3 space-y-0.5">
            {editorSections.map((s) => {
              const Icon = s.icon;
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {s.label}
                </button>
              );
            })}
          </nav>
          <div className="px-3 mt-6 pt-4 border-t border-slate-100">
            <div className="px-3 py-2 bg-slate-50 rounded-lg">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Completeness</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                </div>
                <span className="text-xs font-bold text-slate-700">85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editor content */}
        <div className="flex-1 overflow-y-auto bg-surface-50">
          <div className="p-8">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
