import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  LogIn, ShieldCheck, Building2, Users, FileSignature,
  DollarSign, Wrench, Truck, BarChart3, ChevronRight, Home,
} from 'lucide-react';
import { Badge } from '../components/ui';

import { AuthView, RBACView, MultiTenantView, RegistrationView, PasswordResetView, TwoFactorView, ProfileView, SessionTimeoutView } from '../components/pms/sections1-8';
import { PropertyListingsView, AddPropertyView, PropertyDetailsView, PropertyGalleryView, PropertyDocsView, PropertyStatusView, BulkImportView, PropertyArchiveView, PropertyMapView, PropertyCompareView } from '../components/pms/sections9-18';
import { UnitListView, AddUnitView, UnitCalendarView, FloorPlansView, UnitAmenitiesView, InspectionView, TurnoverView, PricingHistoryView } from '../components/pms/sections19-26';
import { TenantDirectoryView, TenantProfileView, TenantAppView, ScreeningView, CommLogView, DocVaultView, TenantPortalView, EmergencyContactsView, MoveChecklistView, TenantNotesView } from '../components/pms/sections27-36';
import { LeaseWizardView, LeaseTemplatesView, ESignatureView, RenewalView, TerminationView, LeaseDocViewerView, ExpirationAlertsView, CosignerView, AmendmentsView, RenewalRemindersView } from '../components/pms/sections37-46';
import { RentDashboardView, PaymentProcessView, PaymentHistoryView, RentRemindersView, LateFeeView, PartialPaymentView, AutopayView, DepositTrackingView, ReceiptView, PaymentMethodsView, RefundView, RentRollView } from '../components/pms/sections47-58';
import { MaintenanceRequestView, WorkOrderDashboardView, VendorAssignView, PriorityTaggingView, MaintenanceCalendarView, BeforeAfterView, CostTrackingView, PreventiveMaintView, SatisfactionRatingView, MaintenanceHistoryView } from '../components/pms/sections59-68';
import { VendorDirectoryView, VendorProfileView, VendorInvoiceView, VendorPerformanceView, VendorContractView, VendorPaymentView } from '../components/pms/sections69-74';
import { IncomeExpenseView, OwnerStatementsView, PLReportView, BudgetVsActualView, TaxDocsView, GeneralLedgerView, ReconciliationView, CustomReportView, ExportView, FinancialRollupView } from '../components/pms/sections75-84';

interface PMSCategory {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  number: number;
  features: { id: string; label: string }[];
}

const categories: PMSCategory[] = [
  {
    id: 'auth', label: 'Auth & Users', description: 'Authentication & user management', icon: LogIn, number: 1,
    features: [
      { id: 'login', label: 'Login / Logout' },
      { id: 'rbac', label: 'Role-Based Access' },
      { id: 'multi-tenant', label: 'Multi-Tenant Support' },
      { id: 'registration', label: 'Registration & Verify' },
      { id: 'password-reset', label: 'Password Reset' },
      { id: '2fa', label: 'Two-Factor Auth' },
      { id: 'profile', label: 'Profile Management' },
      { id: 'session', label: 'Session Timeout' },
    ],
  },
  {
    id: 'properties', label: 'Properties', description: 'Property management', icon: Building2, number: 2,
    features: [
      { id: 'property-list', label: 'Listing Dashboard' },
      { id: 'property-add', label: 'Add / Edit Property' },
      { id: 'property-details', label: 'Property Details' },
      { id: 'property-gallery', label: 'Image Gallery' },
      { id: 'property-docs', label: 'Document Storage' },
      { id: 'property-status', label: 'Status Tracking' },
      { id: 'property-import', label: 'Bulk Import' },
      { id: 'property-archive', label: 'Archive / Delete' },
      { id: 'property-map', label: 'Map View' },
      { id: 'property-compare', label: 'Comparison Tool' },
    ],
  },
  {
    id: 'units', label: 'Units', description: 'Unit management', icon: Home, number: 3,
    features: [
      { id: 'unit-list', label: 'Unit Listing' },
      { id: 'unit-add', label: 'Add / Edit Unit' },
      { id: 'unit-calendar', label: 'Availability Calendar' },
      { id: 'unit-floorplans', label: 'Floor Plans' },
      { id: 'unit-amenities', label: 'Amenities Checklist' },
      { id: 'unit-inspection', label: 'Inspection Reports' },
      { id: 'unit-turnover', label: 'Turnover Tracking' },
      { id: 'unit-pricing', label: 'Pricing History' },
    ],
  },
  {
    id: 'tenants', label: 'Tenants', description: 'Tenant management', icon: Users, number: 4,
    features: [
      { id: 'tenant-directory', label: 'Tenant Directory' },
      { id: 'tenant-profile', label: 'Tenant Profile' },
      { id: 'tenant-app', label: 'Application Form' },
      { id: 'tenant-screening', label: 'Screening Status' },
      { id: 'tenant-comm', label: 'Communication Log' },
      { id: 'tenant-vault', label: 'Document Vault' },
      { id: 'tenant-portal', label: 'Tenant Portal' },
      { id: 'tenant-contacts', label: 'Emergency Contacts' },
      { id: 'tenant-move', label: 'Move In/Out Checklist' },
      { id: 'tenant-notes', label: 'Notes & Flags' },
    ],
  },
  {
    id: 'leases', label: 'Leases', description: 'Lease management', icon: FileSignature, number: 5,
    features: [
      { id: 'lease-wizard', label: 'Lease Wizard' },
      { id: 'lease-templates', label: 'Lease Templates' },
      { id: 'lease-esign', label: 'E-Signature' },
      { id: 'lease-renewal', label: 'Renewal Workflow' },
      { id: 'lease-termination', label: 'Termination / Eviction' },
      { id: 'lease-viewer', label: 'Document Viewer' },
      { id: 'lease-expiration', label: 'Expiration Alerts' },
      { id: 'lease-cosigner', label: 'Co-signer Mgmt' },
      { id: 'lease-amendments', label: 'Amendments' },
      { id: 'lease-reminders', label: 'Renewal Reminders' },
    ],
  },
  {
    id: 'payments', label: 'Rent & Payments', description: 'Rent collection and payments', icon: DollarSign, number: 6,
    features: [
      { id: 'rent-dashboard', label: 'Collection Dashboard' },
      { id: 'rent-pay', label: 'Online Payment' },
      { id: 'rent-history', label: 'Payment History' },
      { id: 'rent-reminders', label: 'Auto Reminders' },
      { id: 'rent-late-fee', label: 'Late Fee Calc' },
      { id: 'rent-partial', label: 'Partial Payments' },
      { id: 'rent-autopay', label: 'Autopay Setup' },
      { id: 'rent-deposit', label: 'Deposit Tracking' },
      { id: 'rent-receipt', label: 'Receipt Generation' },
      { id: 'rent-methods', label: 'Payment Methods' },
      { id: 'rent-refund', label: 'Refund Processing' },
      { id: 'rent-roll', label: 'Rent Roll Report' },
    ],
  },
  {
    id: 'maintenance', label: 'Maintenance', description: 'Maintenance & work orders', icon: Wrench, number: 7,
    features: [
      { id: 'maint-request', label: 'Request Submission' },
      { id: 'maint-dashboard', label: 'Work Order Dashboard' },
      { id: 'maint-vendor-assign', label: 'Vendor Assignment' },
      { id: 'maint-priority', label: 'Priority Tagging' },
      { id: 'maint-calendar', label: 'Scheduling Calendar' },
      { id: 'maint-photos', label: 'Before/After Photos' },
      { id: 'maint-cost', label: 'Cost Tracking' },
      { id: 'maint-preventive', label: 'Preventive Scheduler' },
      { id: 'maint-rating', label: 'Satisfaction Rating' },
      { id: 'maint-history', label: 'Maintenance History' },
    ],
  },
  {
    id: 'vendors', label: 'Vendors', description: 'Vendor management', icon: Truck, number: 8,
    features: [
      { id: 'vendor-directory', label: 'Vendor Directory' },
      { id: 'vendor-profile', label: 'Vendor Profile' },
      { id: 'vendor-invoice', label: 'Invoice Submission' },
      { id: 'vendor-performance', label: 'Performance Tracking' },
      { id: 'vendor-contracts', label: 'Contract Management' },
      { id: 'vendor-payment', label: 'Payment Processing' },
    ],
  },
  {
    id: 'financial', label: 'Financial', description: 'Financial management & reporting', icon: BarChart3, number: 9,
    features: [
      { id: 'fin-income', label: 'Income / Expense' },
      { id: 'fin-statements', label: 'Owner Statements' },
      { id: 'fin-pl', label: 'P&L Reports' },
      { id: 'fin-budget', label: 'Budget vs. Actual' },
      { id: 'fin-tax', label: 'Tax Documents' },
      { id: 'fin-ledger', label: 'General Ledger' },
      { id: 'fin-recon', label: 'Bank Reconciliation' },
      { id: 'fin-custom', label: 'Custom Report Builder' },
      { id: 'fin-export', label: 'Export CSV/Excel/PDF' },
      { id: 'fin-rollup', label: 'Multi-Property Rollup' },
    ],
  },
];

const allFeatures = categories.flatMap((c) => c.features.map((f) => ({ ...f, categoryId: c.id, categoryLabel: c.label, categoryNumber: c.number })));

function renderFeature(featureId: string) {
  switch (featureId) {
    case 'login': return <AuthView />;
    case 'rbac': return <RBACView />;
    case 'multi-tenant': return <MultiTenantView />;
    case 'registration': return <RegistrationView />;
    case 'password-reset': return <PasswordResetView />;
    case '2fa': return <TwoFactorView />;
    case 'profile': return <ProfileView />;
    case 'session': return <SessionTimeoutView />;
    case 'property-list': return <PropertyListingsView />;
    case 'property-add': return <AddPropertyView />;
    case 'property-details': return <PropertyDetailsView />;
    case 'property-gallery': return <PropertyGalleryView />;
    case 'property-docs': return <PropertyDocsView />;
    case 'property-status': return <PropertyStatusView />;
    case 'property-import': return <BulkImportView />;
    case 'property-archive': return <PropertyArchiveView />;
    case 'property-map': return <PropertyMapView />;
    case 'property-compare': return <PropertyCompareView />;
    case 'unit-list': return <UnitListView />;
    case 'unit-add': return <AddUnitView />;
    case 'unit-calendar': return <UnitCalendarView />;
    case 'unit-floorplans': return <FloorPlansView />;
    case 'unit-amenities': return <UnitAmenitiesView />;
    case 'unit-inspection': return <InspectionView />;
    case 'unit-turnover': return <TurnoverView />;
    case 'unit-pricing': return <PricingHistoryView />;
    case 'tenant-directory': return <TenantDirectoryView />;
    case 'tenant-profile': return <TenantProfileView />;
    case 'tenant-app': return <TenantAppView />;
    case 'tenant-screening': return <ScreeningView />;
    case 'tenant-comm': return <CommLogView />;
    case 'tenant-vault': return <DocVaultView />;
    case 'tenant-portal': return <TenantPortalView />;
    case 'tenant-contacts': return <EmergencyContactsView />;
    case 'tenant-move': return <MoveChecklistView />;
    case 'tenant-notes': return <TenantNotesView />;
    case 'lease-wizard': return <LeaseWizardView />;
    case 'lease-templates': return <LeaseTemplatesView />;
    case 'lease-esign': return <ESignatureView />;
    case 'lease-renewal': return <RenewalView />;
    case 'lease-termination': return <TerminationView />;
    case 'lease-viewer': return <LeaseDocViewerView />;
    case 'lease-expiration': return <ExpirationAlertsView />;
    case 'lease-cosigner': return <CosignerView />;
    case 'lease-amendments': return <AmendmentsView />;
    case 'lease-reminders': return <RenewalRemindersView />;
    case 'rent-dashboard': return <RentDashboardView />;
    case 'rent-pay': return <PaymentProcessView />;
    case 'rent-history': return <PaymentHistoryView />;
    case 'rent-reminders': return <RentRemindersView />;
    case 'rent-late-fee': return <LateFeeView />;
    case 'rent-partial': return <PartialPaymentView />;
    case 'rent-autopay': return <AutopayView />;
    case 'rent-deposit': return <DepositTrackingView />;
    case 'rent-receipt': return <ReceiptView />;
    case 'rent-methods': return <PaymentMethodsView />;
    case 'rent-refund': return <RefundView />;
    case 'rent-roll': return <RentRollView />;
    case 'maint-request': return <MaintenanceRequestView />;
    case 'maint-dashboard': return <WorkOrderDashboardView />;
    case 'maint-vendor-assign': return <VendorAssignView />;
    case 'maint-priority': return <PriorityTaggingView />;
    case 'maint-calendar': return <MaintenanceCalendarView />;
    case 'maint-photos': return <BeforeAfterView />;
    case 'maint-cost': return <CostTrackingView />;
    case 'maint-preventive': return <PreventiveMaintView />;
    case 'maint-rating': return <SatisfactionRatingView />;
    case 'maint-history': return <MaintenanceHistoryView />;
    case 'vendor-directory': return <VendorDirectoryView />;
    case 'vendor-profile': return <VendorProfileView />;
    case 'vendor-invoice': return <VendorInvoiceView />;
    case 'vendor-performance': return <VendorPerformanceView />;
    case 'vendor-contracts': return <VendorContractView />;
    case 'vendor-payment': return <VendorPaymentView />;
    case 'fin-income': return <IncomeExpenseView />;
    case 'fin-statements': return <OwnerStatementsView />;
    case 'fin-pl': return <PLReportView />;
    case 'fin-budget': return <BudgetVsActualView />;
    case 'fin-tax': return <TaxDocsView />;
    case 'fin-ledger': return <GeneralLedgerView />;
    case 'fin-recon': return <ReconciliationView />;
    case 'fin-custom': return <CustomReportView />;
    case 'fin-export': return <ExportView />;
    case 'fin-rollup': return <FinancialRollupView />;
    default: return <AuthView />;
  }
}

function PMSNav({ active }: { active: string }) {
  const navigate = useNavigate();
  const activeFeature = allFeatures.find((f) => f.id === active);
  const activeCategory = categories.find((c) => c.id === activeFeature?.categoryId);

  return (
    <div className="w-64 border-r border-slate-200 bg-white flex-shrink-0 h-full overflow-y-auto">
      <div className="px-4 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-sky-600" />
          <div>
            <p className="text-sm font-bold text-slate-800">Property Management</p>
            <p className="text-[10px] text-slate-400">84 features · 9 categories</p>
          </div>
        </div>
      </div>
      <div className="px-2 py-2 space-y-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isCatActive = activeCategory?.id === cat.id;
          return (
            <div key={cat.id}>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${isCatActive ? 'bg-sky-50' : ''}`}>
                <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${isCatActive ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {cat.number}
                </div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${isCatActive ? 'text-sky-700' : 'text-slate-500'}`}>{cat.label}</p>
              </div>
              <div className="mt-0.5 ml-4 pl-3 border-l border-slate-100 space-y-0.5">
                {cat.features.map((f) => {
                  const isActive = active === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => navigate(`/pms/${f.id}`)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-all ${
                        isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                      }`}
                    >
                      <span className={`text-xs font-medium ${isActive ? 'text-sky-700' : ''}`}>{f.label}</span>
                      {isActive && <ChevronRight className="w-3 h-3 ml-auto text-sky-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PMS() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const featureId = pathParts[2] || 'login';
  const currentFeature = allFeatures.find((f) => f.id === featureId);

  return (
    <div className="min-h-full flex flex-col">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Property Management System</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {currentFeature ? `${currentFeature.categoryNumber}. ${currentFeature.categoryLabel} — ${currentFeature.label}` : '84-feature PMS administration console'}
            </p>
          </div>
          <Badge variant="info" dot>PMS Module</Badge>
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <PMSNav active={featureId} />
        <div className="flex-1 overflow-y-auto bg-surface-50">
          <Routes>
            <Route path="/" element={renderFeature('login')} />
            <Route path="/*" element={renderFeature(featureId)} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
