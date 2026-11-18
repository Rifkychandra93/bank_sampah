import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, History, X, Sparkles, ShieldCheck } from 'lucide-react';
import { Logo } from '../common/Logo';

interface SidebarProps {
  activeTab?: 'dashboard' | 'riwayat' | 'lokasi';
  onTabChange?: (tab: 'dashboard' | 'riwayat' | 'lokasi') => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({
  activeTab,
  onTabChange,
  isOpenMobile = false,
  onCloseMobile
}: SidebarProps) {
  const location = useLocation();

  const isCurrent = (path: string, tabName: 'dashboard' | 'riwayat' | 'lokasi') => {
    if (activeTab) {
      return activeTab === tabName;
    }
    if (path === '/masyarakat') {
      return location.pathname === '/masyarakat' || location.pathname === '/masyarakat/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (tab: 'dashboard' | 'riwayat' | 'lokasi') => {
    if (onTabChange) {
      onTabChange(tab);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 shadow-xl lg:shadow-none flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Area */}
          <div className="p-5 pb-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <Link to="/masyarakat" className="inline-flex items-center group">
              <Logo imgClassName="h-7 w-auto" />
            </Link>
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Tutup Menu"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {/* 1. Dashboard */}
            <div className="relative">
              {isCurrent('/masyarakat', 'dashboard') && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-emerald-600 dark:bg-emerald-500 rounded-r-md" />
              )}
              <Link
                to="/masyarakat"
                onClick={() => handleNavClick('dashboard')}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  isCurrent('/masyarakat', 'dashboard')
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/40 dark:hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard
                  size={19}
                  className={
                    isCurrent('/masyarakat', 'dashboard')
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }
                />
                <span>Dashboard</span>
              </Link>
            </div>

            {/* 2. Lokasi Setor */}
            <div className="relative">
              {isCurrent('/masyarakat/lokasi', 'lokasi') && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-emerald-600 dark:bg-emerald-500 rounded-r-md" />
              )}
              <Link
                to="/masyarakat/lokasi"
                onClick={() => handleNavClick('lokasi')}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  isCurrent('/masyarakat/lokasi', 'lokasi')
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/40 dark:hover:bg-slate-800/60'
                }`}
              >
                <MapPin
                  size={19}
                  className={
                    isCurrent('/masyarakat/lokasi', 'lokasi')
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }
                />
                <span>Lokasi Setor</span>
              </Link>
            </div>

            {/* 3. Riwayat Setoran */}
            <div className="relative">
              {isCurrent('/masyarakat/riwayat', 'riwayat') && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-emerald-600 dark:bg-emerald-500 rounded-r-md" />
              )}
              <Link
                to="/masyarakat/riwayat"
                onClick={() => handleNavClick('riwayat')}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  isCurrent('/masyarakat/riwayat', 'riwayat')
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/40 dark:hover:bg-slate-800/60'
                }`}
              >
                <History
                  size={19}
                  className={
                    isCurrent('/masyarakat/riwayat', 'riwayat')
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }
                />
                <span>Riwayat Setoran</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Bottom Info Card: Pos Terdaftar & Status (Clean, no duplicate Profile/Logout buttons) */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
              <ShieldCheck size={14} />
              <span>Mitra Aktif RW 05</span>
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Pos Kelurahan Sukamaju
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Sparkles size={11} className="text-amber-500" />
              Layanan timbang setiap hari
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
