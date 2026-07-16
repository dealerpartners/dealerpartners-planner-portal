import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, X, Menu } from 'lucide-react';
import { navigation, type NavItem } from './navConfig';
import { Tooltip } from '../ui';
import { Logo } from '../Logo';

interface SidebarItemProps {
  item: NavItem;
  collapsed: boolean;
}

function SidebarItem({ item, collapsed }: SidebarItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const Icon = item.icon;

  const isActive =
    item.path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.path);

  const hasChildren = item.children && item.children.length > 0;
  const [open, setOpen] = useState(isActive);

  const handleClick = () => {
    if (hasChildren) {
      setOpen((o) => !o);
      if (!open) navigate(item.path);
    } else {
      navigate(item.path);
    }
  };

  const activeChild = item.children?.find((c) => location.pathname === c.path || location.pathname.startsWith(c.path));

  if (collapsed) {
    return (
      <Tooltip content={item.label} position="right">
        <button
          onClick={handleClick}
          className={`sidebar-item w-full justify-center px-2 ${isActive ? 'active' : ''}`}
        >
          <Icon className="sidebar-item-icon w-5 h-5" />
          {item.badge && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-sky-400" />
          )}
        </button>
      </Tooltip>
    );
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`sidebar-item w-full ${isActive ? 'active' : ''}`}
      >
        <Icon className="sidebar-item-icon" />
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-500 text-white leading-none">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <span className="text-slate-600">
            {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </span>
        )}
      </button>

      {hasChildren && open && !collapsed && (
        <div className="mt-0.5 ml-4 pl-3 border-l border-white/10 space-y-0.5">
          {item.children!.map((child) => (
            <button
              key={child.id}
              onClick={() => navigate(child.path)}
              className={`w-full text-left px-2 py-1.5 rounded-md text-xs transition-all duration-100 
                ${location.pathname === child.path || location.pathname.startsWith(child.path)
                  ? 'text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30
          bg-[#0d1526] border-r border-white/5
          flex flex-col overflow-hidden
          transition-all duration-200 ease-in-out
          ${collapsed ? 'w-14' : 'w-60'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center h-14 border-b border-white/5 flex-shrink-0 ${collapsed ? 'justify-center px-0' : 'px-4 gap-2.5'}`}>
          <Logo size={28} />
          {!collapsed && (
            <div className="flex items-baseline gap-0.5 overflow-hidden">
              <span className="text-white font-bold text-lg leading-none tracking-tight">Planviry</span>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={onMobileClose}
              className="ml-auto text-slate-500 hover:text-slate-300 lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
          {navigation.map((group, gi) => (
            <div key={gi} className={gi > 0 ? 'mt-4' : ''}>
              {group.heading && !collapsed && (
                <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                  {group.heading}
                </p>
              )}
              {group.heading && collapsed && <div className="h-px bg-white/5 mx-1 mb-2" />}
              {group.items.map((item) => (
                <SidebarItem key={item.id} item={item} collapsed={collapsed} />
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={`border-t border-white/5 p-2 flex-shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
          {collapsed ? (
            <Tooltip content="Expand sidebar" position="right">
              <button
                onClick={onToggle}
                className="sidebar-item px-2 w-full justify-center"
              >
                <Menu className="w-4 h-4" />
              </button>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2.5 px-3 py-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">James Doe</p>
                <p className="text-slate-500 text-[10px] truncate">Owner</p>
              </div>
              <button onClick={onToggle} className="text-slate-500 hover:text-slate-300 flex-shrink-0">
                <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
