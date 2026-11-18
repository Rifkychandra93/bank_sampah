import { Link, useLocation } from 'react-router-dom';
import { ScanLine, History, Tag, User, LogOut, UserCheck, X } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../../context/ThemeContext';

interface AgentSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ isOpenMobile = false, onCloseMobile }: AgentSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isScanActive = currentPath === '/agen' || currentPath === '/agen/';
  const isHistoryActive = currentPath.startsWith('/agen/riwayat');
  const isHargaActive = currentPath.startsWith('/agen/harga');
  const isProfileActive = currentPath.startsWith('/agen/profile');

  const handleLinkClick = () => {
    if (onCloseMobile) onCloseMobile();
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

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 shadow-xl lg:shadow-none flex flex-col justify-between border-r border-slate-200/80 dark:border-slate-800 shrink-0 transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Brand Header */}
          <div className="p-5 pb-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Link to="/agen" onClick={handleLinkClick} className="inline-flex items-center group">
              <Logo imgClassName="h-7 w-auto" subtitle="Portal Agen" />
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

          {/* Pos & Agent Quick Identity Badge */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
                AG
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  Pos Kelurahan Sukamaju
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <UserCheck size={12} /> Agen Terverifikasi
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links: 4 Menu Items (Scan, Riwayat, Harga, Profil) */}
          <div className="p-4 space-y-1.5">
            {/* 1. Scan Barcode */}
            <div className="relative">
              {isScanActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-emerald-600 dark:bg-emerald-500 rounded-r-md" />
              )}
              <Link
                to="/agen"
                onClick={handleLinkClick}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  isScanActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/40 dark:hover:bg-slate-800/60'
                }`}
              >
                <ScanLine size={19} className={isScanActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'} />
                <span>Scan Barcode</span>
              </Link>
            </div>

            {/* 2. Riwayat Transaksi */}
            <div className="relative">
              {isHistoryActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-emerald-600 dark:bg-emerald-500 rounded-r-md" />
              )}
              <Link
                to="/agen/riwayat"
                onClick={handleLinkClick}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  isHistoryActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/40 dark:hover:bg-slate-800/60'
                }`}
              >
                <History size={19} className={isHistoryActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'} />
                <span>Riwayat Transaksi</span>
              </Link>
            </div>

            {/* 3. Harga Sampah */}
            <div className="relative">
              {isHargaActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-emerald-600 dark:bg-emerald-500 rounded-r-md" />
              )}
              <Link
                to="/agen/harga"
                onClick={handleLinkClick}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  isHargaActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/40 dark:hover:bg-slate-800/60'
                }`}
              >
                <Tag size={19} className={isHargaActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'} />
                <span>Harga Sampah</span>
              </Link>
            </div>

            {/* 4. Profil Agent */}
            <div className="relative">
              {isProfileActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-emerald-600 dark:bg-emerald-500 rounded-r-md" />
              )}
              <Link
                to="/agen/profile"
                onClick={handleLinkClick}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  isProfileActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/40 dark:hover:bg-slate-800/60'
                }`}
              >
                <User size={19} className={isProfileActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'} />
                <span>Profil Agen</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Area: Theme Toggle & Logout */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tema Tampilan</span>
            <ThemeToggle />
          </div>

          <Link
            to="/login"
            onClick={handleLinkClick}
            className="flex items-center gap-3 text-rose-600 dark:text-rose-400 px-4 py-2.5 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold text-sm transition-colors"
          >
            <LogOut size={18} />
            <span>Keluar</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
