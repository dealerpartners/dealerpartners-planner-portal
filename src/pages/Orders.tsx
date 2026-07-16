import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, Download, Filter, MoreHorizontal, CreditCard, Gift, Tag, Star, Wallet, Receipt, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Badge, Button, StatCard, Tooltip } from '../components/ui';

const orders = [
  { id: 'ORD-8821', guest: 'Sophia Martinez', items: 'Rooftop Suite × 3 nights', date: 'Jul 10', total: '$1,240', status: 'paid', payment: 'Visa ••4242' },
  { id: 'ORD-8820', guest: 'Marcus Chen', items: 'Desert Retreat Package', date: 'Jul 9', total: '$680', status: 'pending', payment: 'Bank transfer' },
  { id: 'ORD-8819', guest: 'Aisha Patel', items: 'Sunset Sailing Tour × 3', date: 'Jul 9', total: '$320', status: 'paid', payment: 'Mastercard ••8811' },
  { id: 'ORD-8818', guest: 'Liam Torres', items: 'Mountain Cabin × 3 nights + Breakfast', date: 'Jul 8', total: '$2,100', status: 'paid', payment: 'Visa ••7764' },
  { id: 'ORD-8817', guest: 'Priya Nair', items: 'City Food Tour × 2', date: 'Jul 7', total: '$95', status: 'refunded', payment: 'Visa ••3388' },
];

const statusMeta: Record<string, { variant: 'success' | 'warning' | 'danger' | 'neutral' }> = {
  paid: { variant: 'success' },
  pending: { variant: 'warning' },
  refunded: { variant: 'danger' },
  cancelled: { variant: 'neutral' },
};

function OrdersView() {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Gross Revenue" value="$84,320" change="12.4% this month" changeType="up" icon={<ArrowUpRight className="w-4 h-4" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatCard label="Refunds Issued" value="$2,140" change="vs $3,100 last month" changeType="up" icon={<ArrowDownRight className="w-4 h-4" />} iconColor="bg-red-50 text-red-600" />
        <StatCard label="Pending Payments" value="$4,680" sub="8 orders" icon={<CreditCard className="w-4 h-4" />} iconColor="bg-amber-50 text-amber-600" />
        <StatCard label="Net Revenue" value="$82,180" change="after fees & refunds" icon={<ArrowUpRight className="w-4 h-4" />} iconColor="bg-sky-50 text-sky-600" />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input type="text" placeholder="Search orders..." className="input pl-9 h-9" />
        </div>
        <Button variant="secondary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>Filter</Button>
        <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>
      </div>

      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Guest</th>
              <th>Items</th>
              <th>Date</th>
              <th>Payment method</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td><span className="font-mono text-xs text-slate-500">{o.id}</span></td>
                <td className="font-medium text-slate-800">{o.guest}</td>
                <td className="text-xs text-slate-500 max-w-[160px] truncate">{o.items}</td>
                <td className="text-xs text-slate-500">{o.date}</td>
                <td className="text-xs text-slate-600">{o.payment}</td>
                <td className="font-semibold text-slate-800">{o.total}</td>
                <td><Badge variant={statusMeta[o.status].variant} dot>{o.status.charAt(0).toUpperCase() + o.status.slice(1)}</Badge></td>
                <td>
                  <div className="flex gap-1">
                    <Tooltip content="Download invoice" position="top">
                      <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><Receipt className="w-3.5 h-3.5" /></button>
                    </Tooltip>
                    <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PayoutsView() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-header"><p className="section-title">Payout Balance</p></div>
          <div className="card-body">
            <p className="text-3xl font-bold text-slate-800">$12,840</p>
            <p className="text-sm text-slate-500 mt-1">Next payout: Jul 20, 2025</p>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Pending</span>
                <span className="font-semibold text-slate-800">$8,420</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">In transit</span>
                <span className="font-semibold text-slate-800">$4,420</span>
              </div>
            </div>
            <Button variant="primary" className="mt-4 w-full justify-center">Request early payout</Button>
          </div>
        </div>
        <div className="lg:col-span-2 card">
          <div className="card-header"><p className="section-title">Payout History</p></div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Bookings</th>
                <th>Gross</th>
                <th>Fees</th>
                <th>Net</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { period: 'Jul 1–7', bookings: 12, gross: '$8,430', fees: '-$421', net: '$8,009', status: 'completed' },
                { period: 'Jun 24–30', bookings: 9, gross: '$6,210', fees: '-$310', net: '$5,900', status: 'completed' },
                { period: 'Jun 17–23', bookings: 14, gross: '$11,080', fees: '-$554', net: '$10,526', status: 'completed' },
              ].map((p) => (
                <tr key={p.period}>
                  <td className="text-slate-700">{p.period}</td>
                  <td>{p.bookings}</td>
                  <td className="text-slate-800 font-medium">{p.gross}</td>
                  <td className="text-red-600 text-xs">{p.fees}</td>
                  <td className="font-semibold text-slate-800">{p.net}</td>
                  <td><Badge variant="success" dot>Completed</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function WalletView() {
  return (
    <div className="p-6">
      <div className="max-w-2xl space-y-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
          <p className="text-sm text-slate-400 mb-1">Planviry Wallet</p>
          <p className="text-4xl font-bold mb-1">$340.00</p>
          <p className="text-slate-400 text-sm">Available balance</p>
          <div className="flex gap-3 mt-6">
            <Button variant="secondary" size="sm" className="border-white/20 text-white hover:bg-white/10">Add funds</Button>
            <Button variant="secondary" size="sm" className="border-white/20 text-white hover:bg-white/10">Withdraw</Button>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><p className="section-title">Wallet Transactions</p></div>
          <table className="data-table">
            <thead>
              <tr><th>Date</th><th>Description</th><th>Type</th><th>Amount</th><th>Balance</th></tr>
            </thead>
            <tbody>
              {[
                { date: 'Jul 10', desc: 'Refund credit — BK-4415', type: 'credit', amount: '+$95', bal: '$340.00' },
                { date: 'Jul 8', desc: 'Applied to ORD-8818', type: 'debit', amount: '-$100', bal: '$245.00' },
                { date: 'Jun 30', desc: 'Promotional credit added', type: 'credit', amount: '+$50', bal: '$345.00' },
              ].map((t, i) => (
                <tr key={i}>
                  <td className="text-xs text-slate-500">{t.date}</td>
                  <td className="text-slate-700">{t.desc}</td>
                  <td><Badge variant={t.type === 'credit' ? 'success' : 'neutral'} size="sm">{t.type}</Badge></td>
                  <td className={`font-semibold ${t.type === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>{t.amount}</td>
                  <td className="text-slate-600">{t.bal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CouponsView() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">8 active coupons</p>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Create coupon</Button>
      </div>
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr><th>Code</th><th>Discount</th><th>Usage</th><th>Valid until</th><th>Applies to</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {[
              { code: 'SUMMER25', discount: '25% off', used: '42/100', until: 'Aug 31', applies: 'All listings', active: true },
              { code: 'WELCOME50', discount: '$50 off', used: '18/∞', until: 'Dec 31', applies: 'First booking', active: true },
              { code: 'LASTMIN15', discount: '15% off', used: '91/200', until: 'Jul 31', applies: 'Last-minute', active: true },
              { code: 'SPRING10', discount: '10% off', used: '200/200', until: 'Jun 15', applies: 'All listings', active: false },
            ].map((c) => (
              <tr key={c.code}>
                <td><code className="px-2 py-1 bg-slate-100 rounded text-xs font-mono font-bold text-slate-800">{c.code}</code></td>
                <td className="font-medium text-slate-800">{c.discount}</td>
                <td className="text-slate-600 text-xs">{c.used}</td>
                <td className="text-slate-500 text-xs">{c.until}</td>
                <td className="text-slate-500 text-xs">{c.applies}</td>
                <td><Badge variant={c.active ? 'success' : 'neutral'} dot>{c.active ? 'Active' : 'Expired'}</Badge></td>
                <td><button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><MoreHorizontal className="w-3.5 h-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LoyaltyView() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-header"><p className="section-title">Loyalty Program</p><Button variant="secondary" size="sm">Configure</Button></div>
          <div className="card-body space-y-4">
            {[
              { tier: 'Bronze', threshold: '0–499 pts', members: 841, color: 'bg-amber-100 text-amber-800' },
              { tier: 'Silver', threshold: '500–1499 pts', members: 214, color: 'bg-slate-100 text-slate-700' },
              { tier: 'Gold', threshold: '1500–4999 pts', members: 67, color: 'bg-yellow-100 text-yellow-800' },
              { tier: 'Platinum', threshold: '5000+ pts', members: 12, color: 'bg-sky-100 text-sky-800' },
            ].map((t) => (
              <div key={t.tier} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <span className={`pill ${t.color} font-semibold`}>{t.tier}</span>
                  <p className="text-xs text-slate-400 mt-1">{t.threshold}</p>
                </div>
                <span className="text-sm font-semibold text-slate-800">{t.members} members</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 card">
          <div className="card-header"><p className="section-title">Top Loyalty Members</p></div>
          <table className="data-table">
            <thead>
              <tr><th>Member</th><th>Tier</th><th>Points</th><th>Total Spend</th><th>Bookings</th><th>Since</th></tr>
            </thead>
            <tbody>
              {[
                { name: 'David Kim', tier: 'Platinum', points: '8,420', spend: '$22,400', bookings: 34, since: 'Jan 2023' },
                { name: 'Sophia Martinez', tier: 'Gold', points: '3,180', spend: '$9,800', bookings: 18, since: 'Mar 2023' },
                { name: 'Priya Nair', tier: 'Gold', points: '2,640', spend: '$7,200', bookings: 14, since: 'Jun 2023' },
              ].map((m) => (
                <tr key={m.name}>
                  <td className="font-medium text-slate-800">{m.name}</td>
                  <td><Badge variant={m.tier === 'Platinum' ? 'info' : 'warning'} size="sm">{m.tier}</Badge></td>
                  <td className="font-semibold text-slate-800">{m.points}</td>
                  <td className="text-slate-700">{m.spend}</td>
                  <td>{m.bookings}</td>
                  <td className="text-xs text-slate-400">{m.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const subTabs = [
  { id: '/orders/list', label: 'All Orders' },
  { id: '/orders/payments', label: 'Payments' },
  { id: '/orders/invoices', label: 'Invoices' },
  { id: '/orders/refunds', label: 'Refunds' },
  { id: '/orders/payouts', label: 'Payouts' },
  { id: '/orders/wallet', label: 'Wallet' },
  { id: '/orders/giftcards', label: 'Gift Cards' },
  { id: '/orders/coupons', label: 'Coupons' },
  { id: '/orders/loyalty', label: 'Loyalty' },
];

export default function Orders() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = subTabs.find((t) => location.pathname.startsWith(t.id))?.id || '/orders/list';

  return (
    <div className="min-h-full">
      <div className="page-header">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Orders</h1>
            <p className="text-sm text-slate-500 mt-0.5">All financial transactions, payouts, and loyalty</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" icon={<Download className="w-4 h-4" />}>Export</Button>
            <Button variant="primary" icon={<Plus className="w-4 h-4" />}>New order</Button>
          </div>
        </div>
        <div className="tab-nav overflow-x-auto">
          {subTabs.map((t) => (
            <button key={t.id} className={`tab-item flex-shrink-0 ${active === t.id ? 'active' : ''}`} onClick={() => navigate(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<OrdersView />} />
        <Route path="/list" element={<OrdersView />} />
        <Route path="/payouts" element={<PayoutsView />} />
        <Route path="/wallet" element={<WalletView />} />
        <Route path="/coupons" element={<CouponsView />} />
        <Route path="/loyalty" element={<LoyaltyView />} />
        <Route path="/*" element={<OrdersView />} />
      </Routes>
    </div>
  );
}
