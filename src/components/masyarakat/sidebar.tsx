import { Link, useLocation } from 'react-router-dom';
import { Home, Tag, History, MapPin, User, LogOut, X } from 'lucide-react';
import { Logo } from '../common/Logo';

interface SidebarProps {
  activeTab?: 'dashboard' | 'harga' | 'riwayat' | 'lokasi';
  onTabChange?: (tab: 'dashboard' | 'harga' | 'riwayat' | 'lokasi') => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({
  activeTab = 'dashboard',
  onTabChange,
  isOpenMobile = false,
  onCloseMobile
}: SidebarProps) {
  const location = useLocation();

  const handleNavClick = (tab: 'dashboard' | 'harga' | 'riwayat' | 'lokasi') => {
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
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 bg-white border-r border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] lg:shadow-none flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Area */}
          <div className="p-6 pb-8 flex items-center justify-between">
            <Link to="/masyarakat" className="inline-flex items-center">
              <Logo className="h-8 w-auto object-contain" />
            </Link>
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Tutup Menu"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Nav Items */}
          <nav className="px-3.5 space-y-1.5">
            {/* Dashboard */}
            <div className="relative">
              {activeTab === 'dashboard' && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-[#16a34a] rounded-r-md" />
              )}
              <button
                type="button"
                onClick={() => handleNavClick('dashboard')}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-[#EAF7EE] text-[#16a34a]'
                    : 'text-slate-600 hover:text-[#16a34a] hover:bg-emerald-50/50'
                }`}
              >
                <Home size={19} className={activeTab === 'dashboard' ? 'text-[#16a34a]' : 'text-slate-500'} />
                <span>Dashboard</span>
              </button>
            </div>

            {/* Harga */}
            <div className="relative">
              {activeTab === 'harga' && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-[#16a34a] rounded-r-md" />
              )}
              <button
                type="button"
                onClick={() => handleNavClick('harga')}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'harga'
                    ? 'bg-[#EAF7EE] text-[#16a34a]'
                    : 'text-slate-600 hover:text-[#16a34a] hover:bg-emerald-50/50'
                }`}
              >
                <Tag size={19} className={activeTab === 'harga' ? 'text-[#16a34a]' : 'text-slate-500'} />
                <span>Harga</span>
              </button>
            </div>

            {/* Riwayat */}
            <div className="relative">
              {activeTab === 'riwayat' && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-[#16a34a] rounded-r-md" />
              )}
              <button
                type="button"
                onClick={() => handleNavClick('riwayat')}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'riwayat'
                    ? 'bg-[#EAF7EE] text-[#16a34a]'
                    : 'text-slate-600 hover:text-[#16a34a] hover:bg-emerald-50/50'
                }`}
              >
                <History size={19} className={activeTab === 'riwayat' ? 'text-[#16a34a]' : 'text-slate-500'} />
                <span>Riwayat</span>
              </button>
            </div>

            {/* Lokasi Setor */}
            <div className="relative">
              {activeTab === 'lokasi' && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-[#16a34a] rounded-r-md" />
              )}
              <button
                type="button"
                onClick={() => handleNavClick('lokasi')}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'lokasi'
                    ? 'bg-[#EAF7EE] text-[#16a34a]'
                    : 'text-slate-600 hover:text-[#16a34a] hover:bg-emerald-50/50'
                }`}
              >
                <MapPin size={19} className={activeTab === 'lokasi' ? 'text-[#16a34a]' : 'text-slate-500'} />
                <span>Lokasi Setor</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Bottom Profile & Logout */}
        <div className="p-4 border-t border-slate-100/80 space-y-1">
          <Link
            to="/masyarakat/profile"
            className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-colors ${
              location.pathname.startsWith('/masyarakat/profile')
                ? 'bg-[#EAF7EE] text-[#16a34a]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <User size={19} className="text-slate-500" />
            <span>Profil</span>
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut size={19} className="text-slate-500" />
            <span>Keluar</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
