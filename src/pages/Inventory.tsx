import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Plus, Package } from 'lucide-react';
import { Button } from '../components/ui';
import { ListingsView } from '../components/inventory/ListingsView';
import { ListingEditor } from '../components/inventory/ListingEditor';
import { AvailabilityCalendar } from '../components/inventory/AvailabilityCalendar';
import { PricingRules } from '../components/inventory/PricingRules';
import { ResourcesView } from '../components/inventory/ResourcesView';
import { PerformanceView } from '../components/inventory/PerformanceView';

const subTabs = [
  { id: '/inventory/listings', label: 'Listings' },
  { id: '/inventory/availability', label: 'Availability' },
  { id: '/inventory/pricing', label: 'Pricing' },
  { id: '/inventory/resources', label: 'Resources' },
  { id: '/inventory/media', label: 'Media Library' },
  { id: '/inventory/performance', label: 'Performance' },
];

export default function Inventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const isEditor = location.pathname.match(/^\/inventory\/listings\/(new|\d+|LST-\d+)/);

  const active = subTabs.find((t) => location.pathname.startsWith(t.id))?.id || '/inventory/listings';

  if (isEditor) {
    return (
      <Routes>
        <Route path="/listings/new" element={<ListingEditor onBack={() => navigate('/inventory/listings')} />} />
        <Route path="/listings/:id" element={<ListingEditor listingId={params.id} onBack={() => navigate('/inventory/listings')} />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-full">
      <div className="page-header">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Inventory</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage your listings, pricing, availability, and resources</p>
          </div>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => navigate('/inventory/listings/new')}>
            New listing
          </Button>
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
        <Route path="/" element={<ListingsView onEditListing={(id) => navigate(`/inventory/listings/${id}`)} onNewListing={() => navigate('/inventory/listings/new')} />} />
        <Route path="/listings" element={<ListingsView onEditListing={(id) => navigate(`/inventory/listings/${id}`)} onNewListing={() => navigate('/inventory/listings/new')} />} />
        <Route path="/availability" element={<AvailabilityCalendar />} />
        <Route path="/pricing" element={<PricingRules />} />
        <Route path="/resources" element={<ResourcesView />} />
        <Route path="/performance" element={<PerformanceView />} />
        <Route path="/media" element={
          <div className="p-6">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <Package className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-1">Media Library</p>
              <p className="text-sm text-slate-400 max-w-xs">Central asset management for images, videos, virtual tours, and documents.</p>
            </div>
          </div>
        } />
        <Route path="/*" element={<ListingsView onEditListing={(id) => navigate(`/inventory/listings/${id}`)} onNewListing={() => navigate('/inventory/listings/new')} />} />
      </Routes>
    </div>
  );
}
