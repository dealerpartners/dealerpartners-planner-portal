import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Trips from './pages/Trips';
import Inventory from './pages/Inventory';
import Bookings from './pages/Bookings';
import Orders from './pages/Orders';
import Organization from './pages/Organization';
import Operations from './pages/Operations';
import Inbox from './pages/Inbox';
import Reports from './pages/Reports';
import Marketplace from './pages/Marketplace';
import Compliance from './pages/Compliance';
import Support from './pages/Support';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/trips/*" element={<Trips />} />
          <Route path="/inventory/*" element={<Inventory />} />
          <Route path="/bookings/*" element={<Bookings />} />
          <Route path="/orders/*" element={<Orders />} />
          <Route path="/organization/*" element={<Organization />} />
          <Route path="/operations/*" element={<Operations />} />
          <Route path="/inbox/*" element={<Inbox />} />
          <Route path="/reports/*" element={<Reports />} />
          <Route path="/marketplace/*" element={<Marketplace />} />
          <Route path="/compliance/*" element={<Compliance />} />
          <Route path="/support/*" element={<Support />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
