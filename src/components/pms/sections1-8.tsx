import { useState } from 'react';
import {
  LogIn, LogOut, ShieldCheck, Building2, UserPlus, KeyRound,
  Smartphone, UserCircle, Clock, CheckCircle, XCircle, AlertTriangle,
  Lock, Mail, QrCode, Upload, Eye, EyeOff, Timer,
} from 'lucide-react';
import { Badge, Button, StatCard, Toggle } from '../ui';
import { SectionShell, StepIndicator, InfoRow, ProgressBar } from './shared';

// 1. Login/Logout
export function AuthView() {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !pwd) { setError('Email and password are required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Invalid email format'); return; }
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <SectionShell title="Login & Logout" description="JWT/session token handling, form validation, and error states">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center"><LogIn className="w-5 h-5" /></div>
            <div><p className="text-sm font-semibold text-slate-800">Sign In</p><p className="text-xs text-slate-500">JWT-based session authentication</p></div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@planviry.com" className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="••••••••" className="input pr-10" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">{showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
            </div>
            {error && <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg"><AlertTriangle className="w-4 h-4" />{error}</div>}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded" /> Remember me</label>
              <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">Forgot password?</button>
            </div>
            <Button variant="primary" className="w-full" loading={loading} icon={<LogIn className="w-4 h-4" />}>Sign In</Button>
          </form>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"><LogOut className="w-5 h-5" /></div>
            <div><p className="text-sm font-semibold text-slate-800">Active Sessions</p><p className="text-xs text-slate-500">Session token management</p></div>
          </div>
          <div className="space-y-3">
            {[
              { device: 'MacBook Pro — Chrome', loc: 'Miami, FL', ip: '73.124.xx.xx', last: 'Active now', current: true },
              { device: 'iPhone 15 — Safari', loc: 'Miami, FL', ip: '73.124.xx.xx', last: '2h ago', current: false },
              { device: 'iPad — Safari', loc: 'Orlando, FL', ip: '68.42.xx.xx', last: '3d ago', current: false },
            ].map((s) => (
              <div key={s.device} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div><p className="text-sm font-medium text-slate-800 flex items-center gap-2">{s.device}{s.current && <Badge variant="success" size="sm">Current</Badge>}</p><p className="text-xs text-slate-400 mt-0.5">{s.loc} · {s.ip} · {s.last}</p></div>
                {!s.current && <Button variant="danger" size="sm">Revoke</Button>}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <InfoRow label="Token type" value="JWT (RS256)" />
            <InfoRow label="Token expiry" value="24 hours" />
            <InfoRow label="Refresh token" value="30 days (sliding)" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 2. RBAC
export function RBACView() {
  const roles = [
    { name: 'Admin', users: 3, permissions: 48, color: 'bg-red-100 text-red-700' },
    { name: 'Manager', users: 8, permissions: 32, color: 'bg-sky-100 text-sky-700' },
    { name: 'Tenant', users: 142, permissions: 8, color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Owner', users: 12, permissions: 24, color: 'bg-violet-100 text-violet-700' },
    { name: 'Maintenance', users: 6, permissions: 12, color: 'bg-amber-100 text-amber-700' },
  ];
  const modules = ['Properties', 'Units', 'Tenants', 'Leases', 'Payments', 'Maintenance', 'Vendors', 'Reports', 'Settings'];
  const perms = ['View', 'Create', 'Edit', 'Delete', 'Approve'];

  return (
    <SectionShell title="Role-Based Access Control" description="Conditional rendering based on user role (admin, manager, tenant, owner, maintenance staff)">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {roles.map((r) => (
          <div key={r.name} className="card p-4 text-center">
            <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center ${r.color}`}><ShieldCheck className="w-5 h-5" /></div>
            <p className="text-sm font-semibold text-slate-800">{r.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{r.users} users · {r.permissions} perms</p>
          </div>
        ))}
      </div>
      <div className="card overflow-hidden">
        <div className="card-header"><p className="section-title">Permission Matrix</p></div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr><th>Module</th>{perms.map((p) => <th key={p} className="text-center">{p}</th>)}</tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m}>
                  <td className="font-medium text-slate-800">{m}</td>
                  {perms.map((p) => {
                    const has = (m === 'Settings' && p === 'Delete') ? false : p === 'Delete' ? Math.random() > 0.6 : p === 'Approve' ? Math.random() > 0.5 : true;
                    return <td key={p} className="text-center">{has ? <CheckCircle className="w-4 h-4 text-emerald-500 inline" /> : <XCircle className="w-4 h-4 text-slate-200 inline" />}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionShell>
  );
}

// 3. Multi-tenant/Organization
export function MultiTenantView() {
  const [active, setActive] = useState('org-1');
  const orgs = [
    { id: 'org-1', name: 'Oceanview Properties LLC', units: 48, tenants: 42, revenue: '$84,200/mo' },
    { id: 'org-2', name: 'Downtown Apartments Co.', units: 120, tenants: 108, revenue: '$192,000/mo' },
    { id: 'org-3', name: 'Suburban Homes Trust', units: 24, tenants: 22, revenue: '$48,600/mo' },
  ];
  const current = orgs.find((o) => o.id === active)!;
  return (
    <SectionShell title="Multi-Tenant / Organization Support" description="Context and state for switching between properties or companies">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {orgs.map((o) => (
          <button key={o.id} onClick={() => setActive(o.id)} className={`card p-5 text-left transition-all ${active === o.id ? 'ring-2 ring-sky-500 border-sky-300' : 'hover:border-slate-300'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center"><Building2 className="w-5 h-5" /></div>
              <div><p className="text-sm font-semibold text-slate-800">{o.name}</p><p className="text-xs text-slate-400">{o.units} units</p></div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
              <div><p className="text-[10px] text-slate-400 uppercase">Units</p><p className="text-sm font-bold text-slate-800">{o.units}</p></div>
              <div><p className="text-[10px] text-slate-400 uppercase">Tenants</p><p className="text-sm font-bold text-slate-800">{o.tenants}</p></div>
              <div><p className="text-[10px] text-slate-400 uppercase">Revenue</p><p className="text-sm font-bold text-emerald-600">{o.revenue}</p></div>
            </div>
          </button>
        ))}
      </div>
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div><p className="text-sm font-semibold text-slate-800">Active Organization</p><p className="text-xs text-slate-500">{current.name}</p></div>
          <Badge variant="info" dot>Switched</Badge>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Units" value={current.units} icon={<Building2 className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
          <StatCard label="Active Tenants" value={current.tenants} icon={<UserCircle className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
          <StatCard label="Monthly Revenue" value={current.revenue} icon={<CheckCircle className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
          <StatCard label="Occupancy" value="87.5%" icon={<Building2 className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        </div>
      </div>
    </SectionShell>
  );
}

// 4. Registration & Email Verification
export function RegistrationView() {
  const [step, setStep] = useState(2);
  const steps = ['Account', 'Email Verify', 'Profile', 'Complete'];
  return (
    <SectionShell title="User Registration & Email Verification" description="Multi-step form with token verification flow">
      <div className="card p-6">
        <div className="mb-6"><StepIndicator steps={steps} current={step} /></div>
        {step === 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">First Name</label><input className="input" placeholder="John" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Last Name</label><input className="input" placeholder="Doe" /></div>
            </div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Email</label><input className="input" placeholder="john@example.com" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Password</label><input type="password" className="input" placeholder="••••••••" /></div>
            <Button variant="primary" onClick={() => setStep(1)}>Continue</Button>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-lg">
              <Mail className="w-5 h-5 text-sky-600" />
              <div><p className="text-sm font-medium text-slate-800">Verification email sent</p><p className="text-xs text-slate-500">Enter the 6-digit code from your email</p></div>
            </div>
            <div className="flex gap-2 justify-center">
              {[0, 1, 2, 3, 4, 5].map((i) => <input key={i} maxLength={1} className="input w-12 h-12 text-center text-lg font-bold" defaultValue={i < 3 ? '4' : ''} />)}
            </div>
            <div className="flex gap-2">
              <Button variant="primary" onClick={() => setStep(2)}>Verify</Button>
              <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
            </div>
            <p className="text-xs text-slate-400 text-center">Didn't receive the code? <button className="text-sky-600 font-medium">Resend</button></p>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Phone</label><input className="input" placeholder="+1 (555) 000-0000" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Role</label><select className="input"><option>Manager</option><option>Tenant</option><option>Owner</option><option>Maintenance Staff</option></select></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Organization</label><select className="input"><option>Oceanview Properties LLC</option><option>Downtown Apartments Co.</option></select></div>
            <Button variant="primary" onClick={() => setStep(3)}>Complete Registration</Button>
          </div>
        )}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto mb-4 flex items-center justify-center"><CheckCircle className="w-7 h-7" /></div>
            <p className="text-lg font-semibold text-slate-800">Registration Complete!</p>
            <p className="text-sm text-slate-500 mt-1">Your account has been created and verified.</p>
            <Button variant="primary" className="mt-4" onClick={() => setStep(0)}>Register Another</Button>
          </div>
        )}
      </div>
    </SectionShell>
  );
}

// 5. Password Reset
export function PasswordResetView() {
  const [stage, setStage] = useState<'request' | 'reset' | 'done'>('request');
  return (
    <SectionShell title="Password Reset" description="Email trigger form and token-based reset form">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><KeyRound className="w-5 h-5" /></div>
            <div><p className="text-sm font-semibold text-slate-800">Request Reset</p><p className="text-xs text-slate-500">Send reset link to user email</p></div>
          </div>
          {stage === 'request' && (
            <div className="space-y-4">
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Email Address</label><input className="input" placeholder="user@example.com" /></div>
              <Button variant="primary" icon={<Mail className="w-4 h-4" />} onClick={() => setStage('reset')}>Send Reset Link</Button>
            </div>
          )}
          {stage === 'reset' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg text-sm text-emerald-700"><CheckCircle className="w-4 h-4" />Reset link sent. Token: <span className="font-mono font-bold">a8f3...d2e1</span></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">New Password</label><input type="password" className="input" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Confirm Password</label><input type="password" className="input" /></div>
              <div className="space-y-1"><div className="flex items-center gap-2 text-xs text-slate-500"><CheckCircle className="w-3 h-3 text-emerald-500" />8+ characters</div><div className="flex items-center gap-2 text-xs text-slate-500"><CheckCircle className="w-3 h-3 text-emerald-500" />Uppercase & lowercase</div><div className="flex items-center gap-2 text-xs text-slate-500"><XCircle className="w-3 h-3 text-slate-300" />Special character</div></div>
              <Button variant="primary" onClick={() => setStage('done')}>Reset Password</Button>
            </div>
          )}
          {stage === 'done' && (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto mb-3 flex items-center justify-center"><CheckCircle className="w-6 h-6" /></div>
              <p className="text-sm font-semibold text-slate-800">Password Reset Successfully</p>
              <Button variant="ghost" className="mt-3" onClick={() => setStage('request')}>Start Over</Button>
            </div>
          )}
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-800 mb-4">Recent Reset Requests</p>
          <div className="space-y-2">
            {[
              { user: 'james@oceanview.com', requested: '2h ago', status: 'completed' },
              { user: 'maria@downtown.co', requested: '5h ago', status: 'completed' },
              { user: 'tom@suburban.com', requested: '1d ago', status: 'expired' },
              { user: 'lisa@oceanview.com', requested: '2d ago', status: 'completed' },
            ].map((r) => (
              <div key={r.user} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div><p className="text-sm font-medium text-slate-800">{r.user}</p><p className="text-xs text-slate-400">{r.requested}</p></div>
                <Badge variant={r.status === 'completed' ? 'success' : 'warning'} size="sm" dot>{r.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 6. 2FA
export function TwoFactorView() {
  return (
    <SectionShell title="Two-Factor Authentication" description="OTP input component and QR code display for authenticator apps">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center"><QrCode className="w-5 h-5" /></div>
            <div><p className="text-sm font-semibold text-slate-800">Setup Authenticator</p><p className="text-xs text-slate-500">Scan QR with Google Authenticator, Authy, etc.</p></div>
          </div>
          <div className="flex flex-col items-center py-4">
            <div className="w-44 h-44 bg-white border-2 border-slate-200 rounded-xl p-3 flex items-center justify-center">
              <div className="grid grid-cols-12 gap-px w-full h-full">
                {Array.from({ length: 144 }).map((_, i) => <div key={i} className={`rounded-sm ${Math.random() > 0.45 ? 'bg-slate-900' : 'bg-white'}`} />)}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-mono">JBSWY3DPEHPK3PXP</p>
          </div>
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Step-by-step</p>
            {['Install an authenticator app', 'Scan the QR code above', 'Enter the 6-digit code from your app', 'Save backup codes securely'].map((s, i) => (
              <div key={i} className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-bold">{i + 1}</div><span className="text-sm text-slate-700">{s}</span></div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center"><Smartphone className="w-5 h-5" /></div>
            <div><p className="text-sm font-semibold text-slate-800">Enter Verification Code</p><p className="text-xs text-slate-500">6-digit OTP from your authenticator</p></div>
          </div>
          <div className="flex gap-2 justify-center py-6">
            {[0, 1, 2, 3, 4, 5].map((i) => <input key={i} maxLength={1} className="input w-12 h-14 text-center text-xl font-bold" defaultValue={i < 2 ? '8' : ''} />)}
          </div>
          <Button variant="primary" className="w-full" icon={<Lock className="w-4 h-4" />}>Verify & Enable 2FA</Button>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Backup Codes</p>
            <div className="grid grid-cols-2 gap-2">
              {['a8f3k2d1', 'b7e9m4x2', 'c6d1n8p3', 'd5f2o7q4', 'e4g3p6r5', 'f3h4q5s6'].map((c) => <div key={c} className="font-mono text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded">{c}</div>)}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// 7. Profile Management
export function ProfileView() {
  return (
    <SectionShell title="Profile Management" description="Editable form with avatar upload and validation">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">JD</div>
          <p className="text-sm font-semibold text-slate-800">James Doe</p>
          <p className="text-xs text-slate-500">Administrator</p>
          <button className="mt-4 w-full border-2 border-dashed border-slate-200 rounded-lg p-3 text-slate-400 hover:border-sky-300 hover:text-sky-600 transition-colors text-sm flex items-center justify-center gap-2"><Upload className="w-4 h-4" />Upload Avatar</button>
          <p className="text-xs text-slate-400 mt-2">JPG, PNG, max 2MB</p>
        </div>
        <div className="card p-6 lg:col-span-2">
          <p className="text-sm font-semibold text-slate-800 mb-4">Personal Information</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">First Name</label><input className="input" defaultValue="James" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Last Name</label><input className="input" defaultValue="Doe" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Email</label><input className="input" defaultValue="james@oceanview.com" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Phone</label><input className="input" defaultValue="+1 (555) 842-9100" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Role</label><input className="input bg-slate-50" defaultValue="Administrator" disabled /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Timezone</label><select className="input"><option>America/New_York (EST)</option><option>America/Los_Angeles (PST)</option></select></div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-sm font-semibold text-slate-800 mb-3">Security</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"><div className="flex items-center gap-3"><Lock className="w-4 h-4 text-slate-400" /><span className="text-sm text-slate-700">Password</span></div><Button variant="ghost" size="sm">Change</Button></div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"><div className="flex items-center gap-3"><Smartphone className="w-4 h-4 text-slate-400" /><span className="text-sm text-slate-700">Two-factor auth</span></div><Toggle checked={true} onChange={() => {}} /></div>
            </div>
          </div>
          <div className="mt-4 flex gap-2"><Button variant="primary">Save Changes</Button><Button variant="ghost">Cancel</Button></div>
        </div>
      </div>
    </SectionShell>
  );
}

// 8. Session Timeout
export function SessionTimeoutView() {
  const [idle, setIdle] = useState(false);
  const [timeoutMin, setTimeoutMin] = useState(30);
  return (
    <SectionShell title="Session Timeout Handling" description="Idle detection and auto-logout modal">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Idle Timeout" value={`${timeoutMin} min`} icon={<Timer className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Auto-Logout" value="On" icon={<Clock className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Warning Before" value="5 min" icon={<AlertTriangle className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
        <StatCard label="Active Sessions" value="3" icon={<UserCircle className="w-4 h-4" />} iconColor="bg-violet-50 text-violet-600" />
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Idle Detection Settings</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-slate-800">Enable auto-logout on idle</p><p className="text-xs text-slate-400">Automatically log out users after a period of inactivity</p></div><Toggle checked={true} onChange={() => {}} /></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-slate-800">Idle timeout duration</p><p className="text-xs text-slate-400">Minutes of inactivity before warning</p></div><div className="flex items-center gap-2"><input type="range" min="5" max="120" value={timeoutMin} onChange={(e) => setTimeoutMin(Number(e.target.value))} className="w-32" /><span className="text-sm font-semibold text-slate-700 w-16">{timeoutMin} min</span></div></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-slate-800">Warning countdown</p><p className="text-xs text-slate-400">Show modal N minutes before logout</p></div><select className="input w-32"><option>5 minutes</option><option>3 minutes</option><option>1 minute</option></select></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-slate-800">Redirect on logout</p><p className="text-xs text-slate-400">Where to send users after auto-logout</p></div><select className="input w-40"><option>Login page</option><option>Dashboard</option><option>Custom URL</option></select></div>
        </div>
      </div>
      <div className="card p-6">
        <p className="text-sm font-semibold text-slate-800 mb-4">Idle Warning Preview</p>
        <div className="bg-slate-800 rounded-xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-amber-400/20 text-amber-400 mx-auto mb-4 flex items-center justify-center"><Clock className="w-7 h-7" /></div>
          <p className="text-lg font-semibold text-white mb-1">Are you still there?</p>
          <p className="text-sm text-slate-400 mb-4">You will be logged out in <span className="text-amber-400 font-bold">4:59</span></p>
          <div className="flex gap-2 justify-center"><button className="btn btn-primary" onClick={() => setIdle(false)}>Stay Logged In</button><button className="btn btn-ghost text-slate-300">Logout Now</button></div>
        </div>
      </div>
    </SectionShell>
  );
}
