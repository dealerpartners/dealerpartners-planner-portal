import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export function Tooltip({ content, children, position = 'top', className = '' }: TooltipProps) {
  const posClass = {
    top: 'tooltip-top',
    right: 'tooltip-right',
    bottom: 'tooltip-bottom',
    left: 'tooltip-left',
  }[position];

  return (
    <div className={`tooltip-wrapper ${className}`}>
      {children}
      <span className={`tooltip-content ${posClass}`}>{content}</span>
    </div>
  );
}

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export function Badge({ children, variant = 'neutral', size = 'md', dot = false, className = '' }: BadgeProps) {
  return (
    <span className={`badge badge-${variant} ${size === 'sm' ? 'badge-sm' : ''} ${className}`}>
      {dot && <span className={`badge-dot`} />}
      {children}
    </span>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  iconRight,
  loading,
  className = '',
  ...props
}: ButtonProps) {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
  }[variant];

  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'px-5 py-2.5' : '';

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${className} ${loading ? 'opacity-70 pointer-events-none' : ''}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
        {icon}
      </div>
      <p className="text-sm font-semibold text-slate-700 mb-1">{title}</p>
      {description && <p className="text-sm text-slate-400 max-w-xs mb-4">{description}</p>}
      {action}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}

export function PageHeader({ title, description, actions, breadcrumb }: PageHeaderProps) {
  return (
    <div className="page-header">
      {breadcrumb && breadcrumb.length > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>/</span>}
              <span className={b.href ? 'hover:text-slate-600 cursor-pointer' : 'text-slate-600'}>{b.label}</span>
            </React.Fragment>
          ))}
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 leading-tight">{title}</h1>
          {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  iconColor?: string;
  sub?: string;
  sparkline?: number[];
}

export function StatCard({ label, value, change, changeType = 'neutral', icon, iconColor = 'bg-sky-50 text-sky-600', sub, sparkline }: StatCardProps) {
  const sparkPath = sparkline
    ? (() => {
        const max = Math.max(...sparkline);
        const min = Math.min(...sparkline);
        const range = max - min || 1;
        const w = 80;
        const h = 24;
        return sparkline
          .map((v, i) => {
            const x = (i / (sparkline.length - 1)) * w;
            const y = h - ((v - min) / range) * h;
            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
          })
          .join(' ');
      })()
    : null;

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        {icon && (
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColor}`}>
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-slate-800 leading-none mb-1">{value}</p>
          {(change || sub) && (
            <div className="flex items-center gap-2 mt-2">
              {change && (
                <span className={`text-xs font-semibold ${changeType === 'up' ? 'text-emerald-600' : changeType === 'down' ? 'text-red-600' : 'text-slate-500'}`}>
                  {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
                </span>
              )}
              {sub && <span className="text-xs text-slate-400">{sub}</span>}
            </div>
          )}
        </div>
        {sparkPath && (
          <svg width="80" height="24" viewBox="0 0 80 24" className="flex-shrink-0">
            <path d={sparkPath} fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d={`${sparkPath} L 80 24 L 0 24 Z`} fill="url(#spark-fill)" opacity="0.1" />
            <defs>
              <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>
    </div>
  );
}

interface TabsProps {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="tab-nav">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={`tab-item ${active === t.id ? 'active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
          {t.count !== undefined && (
            <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${active === t.id ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-500'}`}>
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function SearchBar({ icon, className = '', ...props }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type="text"
        className={`input ${icon ? 'pl-9' : ''}`}
        {...props}
      />
    </div>
  );
}

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`toggle ${checked ? 'toggle-on' : 'toggle-off'}`}
      aria-label={label}
    >
      <span className="toggle-knob" />
    </button>
  );
}

interface SegmentedProps {
  options: { id: string; label: string; icon?: React.ReactNode }[];
  active: string;
  onChange: (id: string) => void;
}

export function SegmentedControl({ options, active, onChange }: SegmentedProps) {
  return (
    <div className="segmented">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`segmented-item flex items-center gap-1.5 ${active === o.id ? 'active' : ''}`}
        >
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}
