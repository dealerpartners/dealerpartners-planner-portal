import React from 'react';

export interface PMSSection {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  number: number;
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
    <div className="p-8 max-w-5xl space-y-6">
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

export function StatusBadge({ status }: { status: 'occupied' | 'vacant' | 'maintenance' | 'leased' | 'expired' | 'active' | 'pending' | 'approved' | 'denied' | 'completed' | 'in_progress' | 'overdue' | 'paid' | 'late' | 'current' | 'archived' }) {
  const meta: Record<string, { variant: string; label: string }> = {
    occupied: { variant: 'bg-sky-100 text-sky-700', label: 'Occupied' },
    vacant: { variant: 'bg-emerald-100 text-emerald-700', label: 'Vacant' },
    maintenance: { variant: 'bg-amber-100 text-amber-700', label: 'Under Renovation' },
    leased: { variant: 'bg-violet-100 text-violet-700', label: 'Leased' },
    expired: { variant: 'bg-red-100 text-red-700', label: 'Expired' },
    active: { variant: 'bg-emerald-100 text-emerald-700', label: 'Active' },
    pending: { variant: 'bg-amber-100 text-amber-700', label: 'Pending' },
    approved: { variant: 'bg-emerald-100 text-emerald-700', label: 'Approved' },
    denied: { variant: 'bg-red-100 text-red-700', label: 'Denied' },
    completed: { variant: 'bg-emerald-100 text-emerald-700', label: 'Completed' },
    in_progress: { variant: 'bg-sky-100 text-sky-700', label: 'In Progress' },
    overdue: { variant: 'bg-red-100 text-red-700', label: 'Overdue' },
    paid: { variant: 'bg-emerald-100 text-emerald-700', label: 'Paid' },
    late: { variant: 'bg-amber-100 text-amber-700', label: 'Late' },
    current: { variant: 'bg-emerald-100 text-emerald-700', label: 'Current' },
    archived: { variant: 'bg-slate-100 text-slate-500', label: 'Archived' },
  };
  const m = meta[status] || meta.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${m.variant}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      {m.label}
    </span>
  );
}

export function ProgressBar({ value, max = 100, color }: { value: number; max?: number; color?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color || 'bg-sky-500'}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function MiniChart({ data, color = '#0ea5e9', height = 80 }: { data: number[]; color?: string; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 280;
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * (w - 20) + 10, y: height - 10 - ((v - min) / range) * (height - 20) }));
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const gradId = `pms-grad-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${linePath} L ${w - 10} ${height - 10} L 10 ${height - 10} Z`} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="2" fill={color} />)}
    </svg>
  );
}

export function KanbanColumn({ title, items, color, renderItem }: { title: string; items: any[]; color: string; renderItem: (item: any) => React.ReactNode }) {
  return (
    <div className="flex-1 min-w-[220px]">
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <span className="text-xs text-slate-400">({items.length})</span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => renderItem(item))}
      </div>
    </div>
  );
}

export function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < current ? 'bg-emerald-500 text-white' : i === current ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`text-xs font-medium ${i <= current ? 'text-slate-700' : 'text-slate-400'}`}>{step}</span>
          </div>
          {i < steps.length - 1 && <div className={`flex-1 h-px mx-2 ${i < current ? 'bg-emerald-300' : 'bg-slate-200'}`} style={{ minWidth: 20 }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

export function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}
