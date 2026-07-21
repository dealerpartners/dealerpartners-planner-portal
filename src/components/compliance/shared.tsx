import React from 'react';

export interface ComplianceSection {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function SectionShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

export function RiskGauge({ score, max = 100 }: { score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color = pct < 30 ? 'bg-emerald-500' : pct < 60 ? 'bg-amber-500' : 'bg-red-500';
  const label = pct < 30 ? 'Low' : pct < 60 ? 'Medium' : 'High';
  const textColor = pct < 30 ? 'text-emerald-600' : pct < 60 ? 'text-amber-600' : 'text-red-600';
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-sm font-bold ${textColor}`}>{score}</span>
      <span className={`text-xs font-medium ${textColor}`}>{label}</span>
    </div>
  );
}

export function VerificationBadge({ status }: { status: 'verified' | 'pending' | 'failed' | 'expired' | 'not_started' }) {
  const meta = {
    verified: { variant: 'success' as const, label: 'Verified' },
    pending: { variant: 'warning' as const, label: 'Pending' },
    failed: { variant: 'danger' as const, label: 'Failed' },
    expired: { variant: 'warning' as const, label: 'Expired' },
    not_started: { variant: 'neutral' as const, label: 'Not started' },
  };
  const m = meta[status];
  return (
    <span className={`badge badge-${m.variant} badge-sm`}>
      <span className={`badge-dot`} />
      {m.label}
    </span>
  );
}

export function ChecklistItem({ label, status, detail }: { label: string; status: 'done' | 'pending' | 'failed'; detail?: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
        status === 'done' ? 'bg-emerald-100 text-emerald-600' : status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
      }`}>
        {status === 'done' ? '✓' : status === 'pending' ? '⏱' : '✕'}
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-700">{label}</p>
        {detail && <p className="text-xs text-slate-400 mt-0.5">{detail}</p>}
      </div>
    </div>
  );
}
