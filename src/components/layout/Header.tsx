import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, Menu, HelpCircle, ChevronDown } from 'lucide-react';
import { Tooltip } from '../ui';
import { navigation } from './navConfig';

interface HeaderProps {
  onMobileMenuOpen: () => void;
}

function getBreadcrumb(pathname: string) {
  const crumbs: { label: string; path: string }[] = [];

  for (const group of navigation) {
    for (const item of group.items) {
      if (pathname === item.path || pathname.startsWith(item.path + '/')) {
        crumbs.push({ label: item.label, path: item.path });
        if (item.children) {
          const child = item.children.find(
            (c) => pathname === c.path || pathname.startsWith(c.path)
          );
          if (child) crumbs.push({ label: child.label, path: child.path });
        }
        break;
      }
    }
  }

  return crumbs;
}

export function Header({ onMobileMenuOpen }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const crumbs = getBreadcrumb(location.pathname);

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3 flex-shrink-0">
      <button
        className="lg:hidden text-slate-500 hover:text-slate-800 p-1"
        onClick={onMobileMenuOpen}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm min-w-0">
        {crumbs.length > 0 ? (
          crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              {i > 0 && <ChevronDown className="w-3 h-3 text-slate-300 -rotate-90 flex-shrink-0" />}
              <button
                onClick={() => navigate(c.path)}
                className={`truncate transition-colors ${
                  i === crumbs.length - 1
                    ? 'text-slate-800 font-semibold'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {c.label}
              </button>
            </span>
          ))
        ) : (
          <span className="text-slate-800 font-semibold">Dashboard</span>
        )}
      </div>

      <div className="ml-auto flex items-center gap-1">
        {/* Global search */}
        <Tooltip content="Global search (⌘K)" position="bottom">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-400 text-sm transition-colors">
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs">Search...</span>
            <kbd className="hidden sm:inline text-[10px] px-1 py-0.5 bg-white border border-slate-200 rounded text-slate-400">⌘K</kbd>
          </button>
        </Tooltip>

        <Tooltip content="Help & documentation" position="bottom">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            <HelpCircle className="w-4 h-4" />
          </button>
        </Tooltip>

        <Tooltip content="Notifications" position="bottom">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-sky-500 rounded-full" />
          </button>
        </Tooltip>

        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-bold ml-1 cursor-pointer">
          JD
        </div>
      </div>
    </header>
  );
}
