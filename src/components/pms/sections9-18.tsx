import { useState } from 'react';
import {
  Building2, Plus, Search, Filter, MapPin, Image, FileText,
  Upload, CheckCircle, XCircle, Eye, Download, Grid, List,
  Archive, Trash2, ChevronRight, Layers, Camera, FileCheck,
  Calendar, DollarSign, Map, GitCompare, ArrowRight,
} from 'lucide-react';
import { Badge, Button, StatCard, Tooltip } from '../ui';
import { SectionShell, StatusBadge, StepIndicator, InfoRow, ProgressBar } from './shared';

// 9. Property Listing Dashboard
export function PropertyListingsView() {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const properties = [
    { id: 'P-001', name: 'Oceanview Condos', address: '420 Ocean Dr, Miami FL', units: 24, occupied: 21, status: 'occupied' as const, type: 'Condo', rent: '$2,400/mo' },
    { id: 'P-002', name: 'Downtown Lofts', address: '88 Market St, Orlando FL', units: 48, occupied: 42, status: 'occupied' as const, type: 'Loft', rent: '$1,800/mo' },
    { id: 'P-003', name: 'Suburban Family Homes', address: '12 Oak Lane, Tampa FL', units: 12, occupied: 10, status: 'occupied' as const, type: 'House', rent: '$3,200/mo' },
    { id: 'P-004', name: 'Riverside Apartments', address: '5 River Rd, Jacksonville FL', units: 36, occupied: 28, status: 'maintenance' as const, type: 'Apartment', rent: '$1,600/mo' },
    { id: 'P-005', name: 'Garden Townhomes', address: '200 Garden Way, Naples FL', units: 18, occupied: 0, status: 'vacant' as const, type: 'Townhouse', rent: '$2,100/mo' },
    { id: 'P-006', name: 'Penthouse Suites', address: '1 Brickell Ave, Miami FL', units: 8, occupied: 7, status: 'occupied' as const, type: 'Penthouse', rent: '$5,400/mo' },
  ];
  return (
    <SectionShell title="Property Listing Dashboard" description="Paginated and filterable table or card grid of all properties"
      actions={<div className="flex gap-2"><Button variant="secondary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>Filter</Button><Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Property</Button></div>}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Properties" value="6" icon={<Building2 className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Total Units" value="146" icon={<Layers className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
        <StatCard label="Occupied" value="108" sub="74% occupancy" icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Under Renovation" value="1" icon={<Building2 className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
      </div>
      <div className="flex items-center justify-between mb-3">
        <div className="relative w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" /><input className="input pl-9 h-8 text-xs" placeholder="Search properties..." /></div>
        <div className="flex gap-1 border border-slate-200 rounded-lg p-0.5"><button onClick={() => setView('grid')} className={`p-1.5 rounded ${view === 'grid' ? 'bg-sky-100 text-sky-600' : 'text-slate-400'}`}><Grid className="w-4 h-4" /></button><button onClick={() => setView('table')} className={`p-1.5 rounded ${view === 'table' ? 'bg-sky-100 text-sky-600' : 'text-slate-400'}`}><List className="w-4 h-4" /></button></div>
      </div>
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((p) => (
            <div key={p.id} className="card overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="h-32 bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center"><Building2 className="w-10 h-10 text-sky-400" /></div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2"><div><p className="text-sm font-semibold text-slate-800">{p.name}</p><p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{p.address}</p></div><StatusBadge status={p.status} /></div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                  <div><p className="text-[10px] text-slate-400 uppercase">Type</p><p className="text-sm font-medium text-slate-700">{p.type}</p></div>
                  <div><p className="text-[10px] text-slate-400 uppercase">Units</p><p className="text-sm font-medium text-slate-700">{p.occupied}/{p.units}</p></div>
                  <div><p className="text-[10px] text-slate-400 uppercase">Rent</p><p className="text-sm font-medium text-emerald-600">{p.rent}</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Property</th><th>Address</th><th>Type</th><th>Units</th><th>Occupied</th><th>Rent</th><th>Status</th></tr></thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id}>
                  <td><span className="font-mono text-xs text-slate-400">{p.id}</span></td>
                  <td className="font-medium text-slate-800">{p.name}</td>
                  <td className="text-xs text-slate-500">{p.address}</td>
                  <td className="text-xs text-slate-500">{p.type}</td>
                  <td>{p.units}</td>
                  <td>{p.occupied}/{p.units}</td>
                  <td className="font-medium text-emerald-600">{p.rent}</td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionShell>
  );
}

// 10. Add/Edit Property
export function AddPropertyView() {
  const [step, setStep] = useState(1);
  const steps = ['Address', 'Type', 'Units', 'Amenities'];
  return (
    <SectionShell title="Add / Edit Property" description="Multi-step form (address, type, units, amenities)">
      <div className="card p-6">
        <div className="mb-6"><StepIndicator steps={steps} current={step} /></div>
        {step === 0 && (
          <div className="space-y-4 max-w-xl">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Property Name</label><input className="input" placeholder="Oceanview Condos" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Street Address</label><input className="input" placeholder="420 Ocean Drive" /></div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">City</label><input className="input" placeholder="Miami" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">State</label><input className="input" placeholder="FL" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">ZIP</label><input className="input" placeholder="33139" /></div>
            </div>
            <Button variant="primary" onClick={() => setStep(1)}>Next</Button>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4 max-w-xl">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Property Type</label><select className="input"><option>Condo</option><option>Apartment</option><option>House</option><option>Townhouse</option><option>Loft</option><option>Penthouse</option><option>Commercial</option></select></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Year Built</label><input type="number" className="input" placeholder="2018" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Total Square Footage</label><input className="input" placeholder="24,000 sq ft" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Description</label><textarea className="input min-h-[80px]" placeholder="Describe the property..." /></div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep(0)}>Back</Button><Button variant="primary" onClick={() => setStep(2)}>Next</Button></div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4 max-w-xl">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Number of Units</label><input type="number" className="input" defaultValue="24" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Unit Numbering Scheme</label><input className="input" placeholder="101, 102, 103..." /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Avg Unit Size</label><input className="input" placeholder="850 sq ft" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Base Rent</label><input className="input" placeholder="$2,400/mo" /></div>
            </div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep(1)}>Back</Button><Button variant="primary" onClick={() => setStep(3)}>Next</Button></div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4 max-w-xl">
            <p className="text-sm font-medium text-slate-700">Select Amenities</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['Pool', 'Gym', 'Parking', 'Laundry', 'Pet Friendly', 'AC', 'Elevator', 'Storage', 'Bike Storage', 'Roof Deck', 'Concierge', 'Security'].map((a) => (
                <label key={a} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"><input type="checkbox" defaultChecked={Math.random() > 0.5} className="rounded" /><span className="text-sm text-slate-700">{a}</span></label>
              ))}
            </div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep(2)}>Back</Button><Button variant="primary" icon={<CheckCircle className="w-4 h-4" />}>Create Property</Button></div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}

// 11. Property Details
export function PropertyDetailsView() {
  const [tab, setTab] = useState('overview');
  const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'units', label: 'Units' }, { id: 'financials', label: 'Financials' }, { id: 'documents', label: 'Documents' }];
  return (
    <SectionShell title="Property Details Page" description="Tabbed layout (overview, units, financials, documents)">
      <div className="card">
        <div className="tab-nav">{tabs.map((t) => <button key={t.id} className={`tab-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>)}</div>
        <div className="p-6">
          {tab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 h-48 bg-gradient-to-br from-sky-100 to-sky-200 rounded-xl flex items-center justify-center"><Building2 className="w-12 h-12 text-sky-300" /></div>
                <div className="space-y-2"><InfoRow label="Property ID" value="P-001" /><InfoRow label="Type" value="Condo" /><InfoRow label="Year Built" value="2018" /><InfoRow label="Total Units" value="24" /><InfoRow label="Occupied" value="21/24 (87.5%)" /><InfoRow label="Monthly Revenue" value="$50,400" /></div>
              </div>
              <div><p className="text-xs font-semibold text-slate-400 uppercase mb-2">Amenities</p><div className="flex flex-wrap gap-2">{['Pool', 'Gym', 'Parking', 'Laundry', 'Pet Friendly', 'AC', 'Elevator', 'Concierge'].map((a) => <span key={a} className="pill bg-sky-50 text-sky-700 text-xs">{a}</span>)}</div></div>
            </div>
          )}
          {tab === 'units' && (
            <table className="data-table">
              <thead><tr><th>Unit #</th><th>Type</th><th>Sq Ft</th><th>Beds</th><th>Baths</th><th>Rent</th><th>Status</th></tr></thead>
              <tbody>
                {[{ u: '101', t: '1BR', s: 750, b: 1, ba: 1, r: '$2,200' }, { u: '102', t: '2BR', s: 950, b: 2, ba: 2, r: '$2,800' }, { u: '201', t: 'Studio', s: 550, b: 0, ba: 1, r: '$1,800' }, { u: '202', t: '2BR', s: 950, b: 2, ba: 2, r: '$2,800' }].map((u) => (
                  <tr key={u.u}><td className="font-mono text-xs">{u.u}</td><td>{u.t}</td><td>{u.s}</td><td>{u.b}</td><td>{u.ba}</td><td className="font-medium text-emerald-600">{u.r}</td><td><StatusBadge status={Math.random() > 0.3 ? 'occupied' : 'vacant'} /></td></tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === 'financials' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <StatCard label="Monthly Revenue" value="$50,400" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
                <StatCard label="Operating Costs" value="$18,200" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
                <StatCard label="Net Operating Income" value="$32,200" icon={<DollarSign className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
              </div>
              <div className="card p-4"><p className="text-xs font-semibold text-slate-400 uppercase mb-3">Revenue Trend (12 months)</p>
                <svg viewBox="0 0 280 100" className="w-full" preserveAspectRatio="none"><path d="M10 80 L35 70 L60 60 L85 55 L110 45 L135 50 L160 40 L185 35 L210 30 L235 25 L260 20" fill="none" stroke="#0ea5e9" strokeWidth="2" /></svg>
              </div>
            </div>
          )}
          {tab === 'documents' && (
            <div className="space-y-2">
              {['Property deed.pdf', 'Insurance certificate.pdf', 'Building permit.pdf', 'HOA agreement.pdf', 'Inspection report 2024.pdf'].map((d) => (
                <div key={d} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"><div className="flex items-center gap-3"><FileText className="w-4 h-4 text-slate-400" /><span className="text-sm text-slate-700">{d}</span></div><div className="flex gap-1"><button className="p-1 text-slate-400 hover:text-slate-700"><Eye className="w-3.5 h-3.5" /></button><button className="p-1 text-slate-400 hover:text-slate-700"><Download className="w-3.5 h-3.5" /></button></div></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}

// 12. Property Image Gallery
export function PropertyGalleryView() {
  return (
    <SectionShell title="Property Image Gallery" description="Upload, carousel/lightbox viewer, drag-to-reorder"
      actions={<Button variant="primary" size="sm" icon={<Upload className="w-3.5 h-3.5" />}>Upload Images</Button>}>
      <div className="card p-6">
        <div className="h-64 bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 rounded-xl flex items-center justify-center mb-4 relative">
          <Camera className="w-12 h-12 text-sky-400" />
          <div className="absolute bottom-3 left-3 flex gap-1"><button className="px-3 py-1 bg-white/80 rounded-lg text-xs font-medium text-slate-700">Previous</button><button className="px-3 py-1 bg-white/80 rounded-lg text-xs font-medium text-slate-700">Next</button></div>
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 rounded-lg text-xs text-white">1 / 8</div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className={`aspect-square rounded-lg cursor-pointer flex items-center justify-center ${i === 0 ? 'ring-2 ring-sky-500' : ''} bg-gradient-to-br from-slate-100 to-slate-200`}>
              <Image className="w-5 h-5 text-slate-400" />
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3 text-center">Drag thumbnails to reorder · Click to set as cover</p>
      </div>
      <div className="card p-6">
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-sky-300 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Drag and drop images here, or click to browse</p>
          <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP · Max 10MB per image</p>
        </div>
      </div>
    </SectionShell>
  );
}

// 13. Property Document Storage
export function PropertyDocsView() {
  const docs = [
    { name: 'Property Deed.pdf', cat: 'Legal', size: '2.4 MB', uploaded: 'Jul 10', by: 'James Doe' },
    { name: 'Insurance Certificate.pdf', cat: 'Insurance', size: '1.1 MB', uploaded: 'Jul 8', by: 'Lisa Torres' },
    { name: 'Building Permit.pdf', cat: 'Permits', size: '840 KB', uploaded: 'Jul 5', by: 'James Doe' },
    { name: 'HOA Agreement.pdf', cat: 'Legal', size: '3.2 MB', uploaded: 'Jul 2', by: 'Maria Lopez' },
    { name: 'Inspection Report.pdf', cat: 'Inspections', size: '1.8 MB', uploaded: 'Jun 28', by: 'Tom Walsh' },
    { name: 'Tax Assessment.pdf', cat: 'Tax', size: '620 KB', uploaded: 'Jun 20', by: 'James Doe' },
  ];
  return (
    <SectionShell title="Property Document Storage" description="File upload with drag-drop, preview, and categorization"
      actions={<Button variant="primary" size="sm" icon={<Upload className="w-3.5 h-3.5" />}>Upload Document</Button>}>
      <div className="card p-6 mb-4">
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-sky-300 transition-colors cursor-pointer">
          <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Drag and drop files here, or click to browse</p>
          <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX, JPG, PNG · Max 25MB</p>
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Stored Documents</p><select className="select h-8 w-32 text-xs"><option>All categories</option><option>Legal</option><option>Insurance</option><option>Permits</option><option>Inspections</option><option>Tax</option></select></div>
        <table className="data-table">
          <thead><tr><th>Document</th><th>Category</th><th>Size</th><th>Uploaded</th><th>By</th><th></th></tr></thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.name}>
                <td className="flex items-center gap-2 font-medium text-slate-800"><FileText className="w-4 h-4 text-slate-400" />{d.name}</td>
                <td><span className="pill bg-sky-50 text-sky-700 text-xs">{d.cat}</span></td>
                <td className="text-xs text-slate-500">{d.size}</td>
                <td className="text-xs text-slate-400">{d.uploaded}</td>
                <td className="text-sm text-slate-600">{d.by}</td>
                <td><div className="flex gap-1"><button className="p-1 text-slate-400 hover:text-slate-700"><Eye className="w-3.5 h-3.5" /></button><button className="p-1 text-slate-400 hover:text-slate-700"><Download className="w-3.5 h-3.5" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 14. Property Status Tracking
export function PropertyStatusView() {
  const properties = [
    { name: 'Oceanview Condos', status: 'occupied' as const, units: 24, vacant: 3, renovation: 0 },
    { name: 'Downtown Lofts', status: 'occupied' as const, units: 48, vacant: 6, renovation: 0 },
    { name: 'Riverside Apartments', status: 'maintenance' as const, units: 36, vacant: 8, renovation: 36 },
    { name: 'Garden Townhomes', status: 'vacant' as const, units: 18, vacant: 18, renovation: 0 },
  ];
  return (
    <SectionShell title="Property Status Tracking" description="Status badges (vacant, occupied, under renovation)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {properties.map((p) => (
          <div key={p.name} className="card p-5">
            <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center"><Building2 className="w-5 h-5" /></div><p className="text-sm font-semibold text-slate-800">{p.name}</p></div><StatusBadge status={p.status} /></div>
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
              <div><p className="text-[10px] text-slate-400 uppercase">Total</p><p className="text-sm font-bold text-slate-800">{p.units}</p></div>
              <div><p className="text-[10px] text-slate-400 uppercase">Vacant</p><p className="text-sm font-bold text-emerald-600">{p.vacant}</p></div>
              <div><p className="text-[10px] text-slate-400 uppercase">Renovation</p><p className="text-sm font-bold text-amber-600">{p.renovation}</p></div>
            </div>
            <div className="mt-3"><ProgressBar value={p.units - p.vacant - p.renovation} max={p.units} color="bg-sky-500" /><p className="text-xs text-slate-400 mt-1">{Math.round(((p.units - p.vacant - p.renovation) / p.units) * 100)}% occupied</p></div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

// 15. Bulk Property Import
export function BulkImportView() {
  const [stage, setStage] = useState<'upload' | 'map' | 'preview' | 'done'>('map');
  return (
    <SectionShell title="Bulk Property Import" description="CSV upload with column mapping and validation preview">
      <div className="card p-6">
        <div className="mb-6"><StepIndicator steps={['Upload CSV', 'Map Columns', 'Preview', 'Import']} current={stage === 'upload' ? 0 : stage === 'map' ? 1 : stage === 'preview' ? 2 : 3} /></div>
        {stage === 'upload' && (<div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center"><Upload className="w-10 h-10 text-slate-300 mx-auto mb-3" /><p className="text-sm text-slate-500">Drop CSV file here or click to browse</p><Button variant="primary" className="mt-4" onClick={() => setStage('map')}>Choose File</Button></div>)}
        {stage === 'map' && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-800">Map CSV columns to property fields</p>
            {[['property_name', 'Property Name'], ['address', 'Street Address'], ['city', 'City'], ['state', 'State'], ['zip_code', 'ZIP Code'], ['unit_count', 'Total Units'], ['monthly_rent', 'Base Rent']].map(([csv, field]) => (
              <div key={csv} className="flex items-center gap-4"><div className="w-40 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-2 rounded">{csv}</div><ArrowRight className="w-4 h-4 text-slate-300" /><select className="input flex-1" defaultValue={field}><option>Property Name</option><option>Street Address</option><option>City</option><option>State</option><option>ZIP Code</option><option>Total Units</option><option>Base Rent</option></select></div>
            ))}
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStage('upload')}>Back</Button><Button variant="primary" onClick={() => setStage('preview')}>Preview Data</Button></div>
          </div>
        )}
        {stage === 'preview' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg text-sm text-emerald-700"><CheckCircle className="w-4 h-4" />24 rows validated · 2 warnings · 0 errors</div>
            <div className="card overflow-hidden">
              <table className="data-table">
                <thead><tr><th>Property Name</th><th>Address</th><th>City</th><th>Units</th><th>Rent</th><th>Validation</th></tr></thead>
                <tbody>
                  {[['Sunset Villas', '100 Sunset Blvd', 'Miami', '12', '$2,400', 'ok'], ['Bay View Apts', '200 Bay Dr', 'Tampa', '24', '$1,800', 'ok'], ['Hill Crest', '300 Hill Rd', 'Naples', '8', '', 'warning']].map((r, i) => (
                    <tr key={i} className={r[5] === 'warning' ? 'bg-amber-50/40' : ''}><td className="font-medium">{r[0]}</td><td className="text-xs">{r[1]}</td><td className="text-xs">{r[2]}</td><td>{r[3]}</td><td>{r[4] || <span className="text-amber-600">Missing</span>}</td><td>{r[5] === 'ok' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <span className="text-amber-600 text-xs">Missing rent</span>}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStage('map')}>Back</Button><Button variant="primary" icon={<CheckCircle className="w-4 h-4" />} onClick={() => setStage('done')}>Import 24 Properties</Button></div>
          </div>
        )}
        {stage === 'done' && (<div className="text-center py-8"><div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto mb-4 flex items-center justify-center"><CheckCircle className="w-7 h-7" /></div><p className="text-lg font-semibold text-slate-800">Import Complete!</p><p className="text-sm text-slate-500 mt-1">24 properties imported successfully.</p><Button variant="ghost" className="mt-4" onClick={() => setStage('upload')}>Import More</Button></div>)}
      </div>
    </SectionShell>
  );
}

// 16. Property Archiving/Deletion
export function PropertyArchiveView() {
  const [confirm, setConfirm] = useState<string | null>(null);
  const archived = [
    { name: 'Old Warehouse Units', archived: 'Jun 2024', units: 12, reason: 'Sold to third party' },
    { name: 'Beachfront Cabins', archived: 'Mar 2024', units: 6, reason: 'Demolished for redevelopment' },
  ];
  return (
    <SectionShell title="Property Archiving & Deletion" description="Confirmation modals and soft-delete state">
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Properties Eligible for Archiving</p></div>
        <table className="data-table">
          <thead><tr><th>Property</th><th>Units</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {[{ name: 'Garden Townhomes', units: 18, status: 'vacant' }].map((p) => (
              <tr key={p.name}><td className="font-medium text-slate-800">{p.name}</td><td>{p.units}</td><td><StatusBadge status="vacant" /></td><td>{confirm === p.name ? <div className="flex gap-2"><Button variant="danger" size="sm" icon={<Archive className="w-3 h-3" />}>Confirm Archive</Button><Button variant="ghost" size="sm" onClick={() => setConfirm(null)}>Cancel</Button></div> : <Button variant="secondary" size="sm" icon={<Archive className="w-3 h-3" />} onClick={() => setConfirm(p.name)}>Archive</Button>}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Archived Properties (Soft-Deleted)</p></div>
        <table className="data-table">
          <thead><tr><th>Property</th><th>Units</th><th>Archived</th><th>Reason</th><th></th></tr></thead>
          <tbody>
            {archived.map((p) => (
              <tr key={p.name} className="opacity-60"><td className="font-medium text-slate-800">{p.name}</td><td>{p.units}</td><td className="text-xs text-slate-400">{p.archived}</td><td className="text-xs text-slate-500">{p.reason}</td><td><Button variant="ghost" size="sm">Restore</Button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

// 17. Property Map View
export function PropertyMapView() {
  return (
    <SectionShell title="Property Map View" description="Map integration with pin clustering">
      <div className="card overflow-hidden">
        <div className="h-96 bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          {[
            { top: '20%', left: '30%', count: 3, label: 'Oceanview Condos' },
            { top: '45%', left: '55%', count: 5, label: 'Downtown Lofts' },
            { top: '65%', left: '25%', count: 2, label: 'Riverside Apts' },
            { top: '35%', left: '70%', count: 1, label: 'Penthouse Suites' },
          ].map((pin, i) => (
            <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ top: pin.top, left: pin.left }}>
              <div className={`w-${pin.count > 3 ? '10' : '8'} h-${pin.count > 3 ? '10' : '8'} rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform`}>{pin.count}</div>
              <div className="absolute left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-white rounded-lg shadow-md text-xs text-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">{pin.label}</div>
            </div>
          ))}
          <div className="absolute top-3 right-3 bg-white rounded-lg shadow-md p-2 space-y-1">
            <p className="text-xs font-semibold text-slate-700 px-1">Filters</p>
            {[['Occupied', 'bg-sky-500'], ['Vacant', 'bg-emerald-500'], ['Renovation', 'bg-amber-500']].map(([l, c]) => (
              <div key={l} className="flex items-center gap-2 px-1"><span className={`w-3 h-3 rounded-full ${c}`} /><span className="text-xs text-slate-600">{l}</span></div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 18. Property Comparison
export function PropertyCompareView() {
  const props = [
    { name: 'Oceanview Condos', units: 24, occ: '87.5%', rent: '$2,400', sqft: '24,000', year: 2018, amenities: 8 },
    { name: 'Downtown Lofts', units: 48, occ: '87.5%', rent: '$1,800', sqft: '48,000', year: 2020, amenities: 6 },
    { name: 'Penthouse Suites', units: 8, occ: '87.5%', rent: '$5,400', sqft: '12,000', year: 2022, amenities: 12 },
  ];
  return (
    <SectionShell title="Property Comparison Tool" description="Side-by-side comparison table with selectable properties">
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead><tr><th>Metric</th>{props.map((p) => <th key={p.name} className="text-center">{p.name}</th>)}</tr></thead>
          <tbody>
            {[['Units', 'units'], ['Occupancy', 'occ'], ['Avg Rent', 'rent'], ['Total Sq Ft', 'sqft'], ['Year Built', 'year'], ['Amenities', 'amenities']].map(([label, key]) => (
              <tr key={key}><td className="font-medium text-slate-700">{label}</td>{props.map((p) => <td key={p.name} className="text-center text-slate-800">{(p as any)[key]}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-3">Revenue Comparison</p>
        <div className="space-y-3">
          {props.map((p) => {
            const rev = parseInt(p.rent.replace(/[$,]/g, '')) * p.units;
            const maxRev = 5400 * 48;
            return <div key={p.name}><div className="flex items-center justify-between mb-1"><span className="text-sm text-slate-700">{p.name}</span><span className="text-sm font-bold text-slate-800">${rev.toLocaleString()}/mo</span></div><ProgressBar value={rev} max={maxRev} color="bg-emerald-500" /></div>;
          })}
        </div>
      </div>
    </SectionShell>
  );
}
