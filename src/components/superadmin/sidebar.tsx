import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  Users,
  LogOut,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../../context/ThemeContext';

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
      <div className="p-5 pb-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <Link to="/superadmin" onClick={() => setMobileOpen(false)} className="inline-flex items-center group">
          <Logo imgClassName="h-7 w-auto" subtitle="Superadmin" />
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Tutup menu"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-3 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center font-black text-xs shrink-0">
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
        <p className="px-3 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Menu Utama
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.to} className="relative">
              {item.active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-emerald-600 dark:bg-emerald-500 rounded-r-md" />
              )}
              <Link
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                  item.active
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50/40 dark:hover:bg-slate-800/60 hover:text-emerald-700 dark:hover:text-emerald-300'
                }`}
              >
                <Icon
                  size={19}
                  className={
                    item.active
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }
                />
                <span>{item.label}</span>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between px-3 py-1.5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tema Tampilan</span>
          <ThemeToggle />
        </div>
        <Link
          to="/login"
          className="flex items-center gap-3 text-rose-600 dark:text-rose-400 p-3 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold text-sm transition-colors"
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
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 h-14 flex items-center justify-between shadow-xs">
        <Link to="/superadmin" className="inline-flex items-center">
          <Logo imgClassName="h-7 w-auto" subtitle="Superadmin" />
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            aria-label="Buka menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-in Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-64 bg-white dark:bg-slate-900 shadow-xl transform transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-slate-900 min-h-screen shadow-none flex-col border-r border-slate-200/80 dark:border-slate-800 shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>
    </>
  );
}
