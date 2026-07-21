import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2, User, ShieldAlert, Activity, Gauge, Shield,
  FileText, RefreshCw, Gavel, FileBadge, Globe, Lock, Mail,
  History, AlertTriangle, CreditCard, Send, FileCheck, ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '../components/ui';

import { KYBView, KYCView, SanctionsView, AMLView, RiskSupplierView } from '../components/compliance/sections1-5';
import { RiskGuestView, InsuranceView, ClaimsView, SanctionsFeedView, DisputesView } from '../components/compliance/sections6-10';
import { BondingView, ConsumerProtectionView, PrivacyView, DSARView, ToSView } from '../components/compliance/sections11-15';
import { ConsentLedgerView, FraudView, ChargebacksView, SARView, AuditRepositoryView } from '../components/compliance/sections16-20';

interface CompSection {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  number: number;
}

const sections: CompSection[] = [
  { id: 'kyb', label: 'Supplier KYB', description: 'Business verification', icon: Building2, number: 1 },
  { id: 'kyc', label: 'Individual KYC', description: 'ID & liveness checks', icon: User, number: 2 },
  { id: 'sanctions', label: 'Sanctions Screening', description: 'OFAC/PEP screening', icon: ShieldAlert, number: 3 },
  { id: 'aml', label: 'AML Monitoring', description: 'Transaction monitoring', icon: Activity, number: 4 },
  { id: 'risk-supplier', label: 'Supplier Risk Scoring', description: 'Vendor risk scores', icon: Gauge, number: 5 },
  { id: 'risk-guest', label: 'Guest Risk Scoring', description: 'Actor fraud scoring', icon: Shield, number: 6 },
  { id: 'insurance', label: 'Insurance & Underwriting', description: 'Coverage management', icon: Shield, number: 7 },
  { id: 'claims', label: 'Claims Processing', description: 'Intake & payout workflow', icon: FileText, number: 8 },
  { id: 'sanctions-feed', label: 'Sanctions List Feed', description: 'Watchlist auto-update', icon: RefreshCw, number: 9 },
  { id: 'disputes', label: 'Dispute Arbitration', description: 'Cross-module disputes', icon: Gavel, number: 10 },
  { id: 'bonding', label: 'Bonding & Licensing', description: 'Regulatory bonding tracker', icon: FileBadge, number: 11 },
  { id: 'consumer', label: 'Consumer Protection', description: 'Region-specific rules', icon: Globe, number: 12 },
  { id: 'privacy', label: 'Privacy Law Compliance', description: 'GDPR, CCPA, LGPD, PIPL', icon: Lock, number: 13 },
  { id: 'dsar', label: 'DSAR Fulfillment', description: 'Data subject requests', icon: Mail, number: 14 },
  { id: 'tos', label: 'Terms & Policy Versions', description: 'T&C version management', icon: FileText, number: 15 },
  { id: 'consent', label: 'Consent Ledger', description: 'Consent audit trail', icon: History, number: 16 },
  { id: 'fraud', label: 'Fraud Investigation', description: 'Case workspace & ban list', icon: AlertTriangle, number: 17 },
  { id: 'chargebacks', label: 'Chargeback Network', description: 'Processor dispute aggregation', icon: CreditCard, number: 18 },
  { id: 'sar', label: 'SAR Filing', description: 'Suspicious activity reports', icon: Send, number: 19 },
  { id: 'audit', label: 'Audit Evidence Repository', description: 'SOC 2, PCI, ISO evidence', icon: FileCheck, number: 20 },
];

function ComplianceNav({ active }: { active: string }) {
  const navigate = useNavigate();
  return (
    <div className="w-64 border-r border-slate-200 bg-white flex-shrink-0 h-full overflow-y-auto">
      <div className="px-4 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-sky-600" />
          <div>
            <p className="text-sm font-bold text-slate-800">Trust & Compliance</p>
            <p className="text-[10px] text-slate-400">20 modules · Platform Admin</p>
          </div>
        </div>
      </div>
      <div className="px-2 py-2 space-y-0.5">
        {sections.map((s) => {
          const Icon = s.icon;
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => navigate(`/compliance/${s.id}`)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all group ${
                isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                isActive ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
              }`}>
                {s.number}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${isActive ? 'text-sky-700' : 'text-slate-700'}`}>{s.label}</p>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-sky-500' : 'text-slate-300'}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function renderSection(sectionId: string) {
  switch (sectionId) {
    case 'kyb': return <KYBView />;
    case 'kyc': return <KYCView />;
    case 'sanctions': return <SanctionsView />;
    case 'aml': return <AMLView />;
    case 'risk-supplier': return <RiskSupplierView />;
    case 'risk-guest': return <RiskGuestView />;
    case 'insurance': return <InsuranceView />;
    case 'claims': return <ClaimsView />;
    case 'sanctions-feed': return <SanctionsFeedView />;
    case 'disputes': return <DisputesView />;
    case 'bonding': return <BondingView />;
    case 'consumer': return <ConsumerProtectionView />;
    case 'privacy': return <PrivacyView />;
    case 'dsar': return <DSARView />;
    case 'tos': return <ToSView />;
    case 'consent': return <ConsentLedgerView />;
    case 'fraud': return <FraudView />;
    case 'chargebacks': return <ChargebacksView />;
    case 'sar': return <SARView />;
    case 'audit': return <AuditRepositoryView />;
    default: return <KYBView />;
  }
}

export default function Compliance() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const sectionId = pathParts[2] || 'kyb';
  const currentSection = sections.find((s) => s.id === sectionId);

  return (
    <div className="min-h-full flex flex-col">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Trust, Risk & Compliance Console</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {currentSection ? `${currentSection.number}. ${currentSection.label} — ${currentSection.description}` : '20-module compliance administration'}
            </p>
          </div>
          <Badge variant="info" dot>Platform Admin Only</Badge>
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <ComplianceNav active={sectionId} />
        <div className="flex-1 overflow-y-auto bg-surface-50">
          <Routes>
            <Route path="/" element={renderSection('kyb')} />
            <Route path="/kyb" element={<KYBView />} />
            <Route path="/kyc" element={<KYCView />} />
            <Route path="/sanctions" element={<SanctionsView />} />
            <Route path="/aml" element={<AMLView />} />
            <Route path="/risk-supplier" element={<RiskSupplierView />} />
            <Route path="/risk-guest" element={<RiskGuestView />} />
            <Route path="/insurance" element={<InsuranceView />} />
            <Route path="/claims" element={<ClaimsView />} />
            <Route path="/sanctions-feed" element={<SanctionsFeedView />} />
            <Route path="/disputes" element={<DisputesView />} />
            <Route path="/bonding" element={<BondingView />} />
            <Route path="/consumer" element={<ConsumerProtectionView />} />
            <Route path="/privacy" element={<PrivacyView />} />
            <Route path="/dsar" element={<DSARView />} />
            <Route path="/tos" element={<ToSView />} />
            <Route path="/consent" element={<ConsentLedgerView />} />
            <Route path="/fraud" element={<FraudView />} />
            <Route path="/chargebacks" element={<ChargebacksView />} />
            <Route path="/sar" element={<SARView />} />
            <Route path="/audit" element={<AuditRepositoryView />} />
            <Route path="/*" element={renderSection(sectionId)} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
