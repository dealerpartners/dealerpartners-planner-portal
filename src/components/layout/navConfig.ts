import {
  LayoutDashboard,
  Compass,
  MapPin,
  Package,
  CalendarCheck,
  ShoppingBag,
  Building2,
  Wrench,
  MessageSquare,
  BarChart3,
  Store,
  HeadphonesIcon,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

export interface NavChild {
  id: string;
  label: string;
  path: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavChild[];
}

export interface NavGroup {
  heading?: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard },
      { id: 'explore', label: 'Explore', path: '/explore', icon: Compass },
    ],
  },
  {
    heading: 'Planning',
    items: [
      {
        id: 'trips',
        label: 'Trips',
        path: '/trips',
        icon: MapPin,
        children: [
          { id: 'trips-itineraries', label: 'Itineraries', path: '/trips/itineraries' },
          { id: 'trips-shared', label: 'Shared Plans', path: '/trips/shared' },
          { id: 'trips-group', label: 'Group Planner', path: '/trips/group' },
          { id: 'trips-budget', label: 'Budget', path: '/trips/budget' },
          { id: 'trips-wallet', label: 'Document Wallet', path: '/trips/wallet' },
          { id: 'trips-ai', label: 'AI Planner', path: '/trips/ai' },
        ],
      },
    ],
  },
  {
    heading: 'Vendor',
    items: [
      {
        id: 'inventory',
        label: 'Inventory',
        path: '/inventory',
        icon: Package,
        children: [
          { id: 'inventory-listings', label: 'Listings', path: '/inventory/listings' },
          { id: 'inventory-availability', label: 'Availability', path: '/inventory/availability' },
          { id: 'inventory-pricing', label: 'Pricing', path: '/inventory/pricing' },
          { id: 'inventory-resources', label: 'Resources', path: '/inventory/resources' },
          { id: 'inventory-media', label: 'Media Library', path: '/inventory/media' },
          { id: 'inventory-performance', label: 'Performance', path: '/inventory/performance' },
        ],
      },
      {
        id: 'bookings',
        label: 'Bookings',
        path: '/bookings',
        icon: CalendarCheck,
        badge: '12',
        children: [
          { id: 'bookings-upcoming', label: 'Upcoming', path: '/bookings/upcoming' },
          { id: 'bookings-past', label: 'Past', path: '/bookings/past' },
          { id: 'bookings-cancelled', label: 'Cancelled', path: '/bookings/cancelled' },
          { id: 'bookings-waitlist', label: 'Waitlist', path: '/bookings/waitlist' },
          { id: 'bookings-checkin', label: 'Check-in / Out', path: '/bookings/checkin' },
        ],
      },
      {
        id: 'orders',
        label: 'Orders',
        path: '/orders',
        icon: ShoppingBag,
        children: [
          { id: 'orders-list', label: 'All Orders', path: '/orders/list' },
          { id: 'orders-payments', label: 'Payments', path: '/orders/payments' },
          { id: 'orders-invoices', label: 'Invoices', path: '/orders/invoices' },
          { id: 'orders-refunds', label: 'Refunds', path: '/orders/refunds' },
          { id: 'orders-payouts', label: 'Payouts', path: '/orders/payouts' },
          { id: 'orders-wallet', label: 'Wallet', path: '/orders/wallet' },
          { id: 'orders-giftcards', label: 'Gift Cards', path: '/orders/giftcards' },
          { id: 'orders-coupons', label: 'Coupons', path: '/orders/coupons' },
          { id: 'orders-loyalty', label: 'Loyalty', path: '/orders/loyalty' },
        ],
      },
    ],
  },
  {
    heading: 'Business',
    items: [
      {
        id: 'organization',
        label: 'Organization',
        path: '/organization',
        icon: Building2,
        children: [
          { id: 'org-profile', label: 'Business Profile', path: '/organization/profile' },
          { id: 'org-locations', label: 'Locations', path: '/organization/locations' },
          { id: 'org-people', label: 'People', path: '/organization/people' },
          { id: 'org-teams', label: 'Teams', path: '/organization/teams' },
          { id: 'org-guests', label: 'Guest Profiles', path: '/organization/guests' },
          { id: 'org-invites', label: 'Invites', path: '/organization/invites' },
        ],
      },
      {
        id: 'operations',
        label: 'Operations',
        path: '/operations',
        icon: Wrench,
        children: [
          { id: 'ops-calendar', label: 'Master Calendar', path: '/operations/calendar' },
          { id: 'ops-tasks', label: 'Tasks', path: '/operations/tasks' },
          { id: 'ops-checklists', label: 'Checklists', path: '/operations/checklists' },
          { id: 'ops-housekeeping', label: 'Housekeeping', path: '/operations/housekeeping' },
          { id: 'ops-maintenance', label: 'Maintenance', path: '/operations/maintenance' },
          { id: 'ops-staff', label: 'Staff Assignments', path: '/operations/staff' },
          { id: 'ops-forms', label: 'Custom Forms', path: '/operations/forms' },
        ],
      },
    ],
  },
  {
    heading: 'Communications',
    items: [
      {
        id: 'inbox',
        label: 'Inbox',
        path: '/inbox',
        icon: MessageSquare,
        badge: '5',
        children: [
          { id: 'inbox-chats', label: 'Chats', path: '/inbox/chats' },
          { id: 'inbox-email', label: 'Email', path: '/inbox/email' },
          { id: 'inbox-sms', label: 'SMS', path: '/inbox/sms' },
          { id: 'inbox-broadcast', label: 'Broadcast', path: '/inbox/broadcast' },
          { id: 'inbox-automation', label: 'Automation', path: '/inbox/automation' },
          { id: 'inbox-notifications', label: 'Notifications', path: '/inbox/notifications' },
        ],
      },
    ],
  },
  {
    heading: 'Intelligence',
    items: [
      {
        id: 'reports',
        label: 'Reports',
        path: '/reports',
        icon: BarChart3,
        children: [
          { id: 'reports-revenue', label: 'Revenue', path: '/reports/revenue' },
          { id: 'reports-sales', label: 'Sales', path: '/reports/sales' },
          { id: 'reports-occupancy', label: 'Occupancy', path: '/reports/occupancy' },
          { id: 'reports-conversion', label: 'Conversion', path: '/reports/conversion' },
          { id: 'reports-tax', label: 'Tax Reports', path: '/reports/tax' },
          { id: 'reports-settlement', label: 'Settlement', path: '/reports/settlement' },
          { id: 'reports-ai', label: 'AI Insights', path: '/reports/ai' },
        ],
      },
    ],
  },
  {
    heading: 'Platform',
    items: [
      {
        id: 'marketplace',
        label: 'Marketplace',
        path: '/marketplace',
        icon: Store,
        children: [
          { id: 'mkt-applications', label: 'Vendor Applications', path: '/marketplace/applications' },
          { id: 'mkt-directory', label: 'Vendor Directory', path: '/marketplace/directory' },
          { id: 'mkt-claims', label: 'Claims', path: '/marketplace/claims' },
          { id: 'mkt-commissions', label: 'Commissions', path: '/marketplace/commissions' },
          { id: 'mkt-moderation', label: 'Moderation', path: '/marketplace/moderation' },
          { id: 'mkt-advertising', label: 'Advertising', path: '/marketplace/advertising' },
          { id: 'mkt-health', label: 'Platform Health', path: '/marketplace/health' },
        ],
      },
      {
        id: 'support',
        label: 'Support',
        path: '/support',
        icon: HeadphonesIcon,
        badge: '3',
        children: [
          { id: 'support-tickets', label: 'Tickets', path: '/support/tickets' },
          { id: 'support-kb', label: 'Knowledge Base', path: '/support/kb' },
          { id: 'support-disputes', label: 'Disputes', path: '/support/disputes' },
          { id: 'support-escalation', label: 'Escalation', path: '/support/escalation' },
        ],
      },
    ],
  },
  {
    items: [
      {
        id: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: Settings,
        children: [
          { id: 'settings-profile', label: 'Business Profile', path: '/settings/profile' },
          { id: 'settings-users', label: 'Users', path: '/settings/users' },
          { id: 'settings-roles', label: 'Roles & Permissions', path: '/settings/roles' },
          { id: 'settings-payments', label: 'Payments', path: '/settings/payments' },
          { id: 'settings-taxes', label: 'Taxes', path: '/settings/taxes' },
          { id: 'settings-notifications', label: 'Notifications', path: '/settings/notifications' },
          { id: 'settings-integrations', label: 'Integrations', path: '/settings/integrations' },
          { id: 'settings-security', label: 'Security', path: '/settings/security' },
          { id: 'settings-api', label: 'API Keys', path: '/settings/api' },
          { id: 'settings-subscription', label: 'Subscription', path: '/settings/subscription' },
          { id: 'settings-legal', label: 'Legal & Privacy', path: '/settings/legal' },
        ],
      },
    ],
  },
];

export { ChevronDown, ChevronRight };
