import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  Users,
  LogOut,
  Leaf,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export function SuperadminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      label: 'Dashboard & Data Sampah',
      to: '/superadmin',
      icon: LayoutDashboard,
      active: currentPath === '/superadmin' || currentPath === '/superadmin/'
    },
    {
      label: 'Kelola Agen Pos',
      to: '/superadmin/agen',
      icon: Store,
      active: currentPath.startsWith('/superadmin/agen')
    },
    {
      label: 'Kelola Masyarakat',
      to: '/superadmin/masyarakat',
      icon: Users,
      active: currentPath.startsWith('/superadmin/masyarakat')
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2.5 text-eco-green font-bold text-xl">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-500 text-white flex items-center justify-center shadow-sm">
            <Leaf size={18} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-black text-slate-900 tracking-tight">
              Eco<span className="text-eco-green">Admin</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              Pusat Kendali
            </span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
          aria-label="Tutup menu"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 border-b border-gray-50">
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-xl p-3 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center font-black text-xs shrink-0">
            SA
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Superadmin Pusat</p>
            <p className="text-[10px] text-emerald-300 flex items-center gap-1 font-medium">
              <ShieldCheck size={11} /> Akses Penuh Sistem
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-1.5">
        <p className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Menu Utama
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-xl font-medium text-sm transition-colors ${
                item.active
                  ? 'bg-eco-green/10 text-eco-green font-semibold shadow-xs'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={19} className={item.active ? 'text-eco-green' : 'text-gray-400'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-100">
        <Link
          to="/login"
          className="flex items-center gap-3 text-red-500 p-3 rounded-xl hover:bg-red-50 font-medium text-sm transition-colors"
        >
          <LogOut size={19} />
          <span>Keluar</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 font-black text-slate-900">
          <Leaf size={20} className="text-eco-green" />
          <span>
            Eco<span className="text-eco-green">Admin</span>
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700"
          aria-label="Buka menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-in Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white min-h-screen shadow-md flex-col border-r border-gray-100 shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>
    </>
  );
}
