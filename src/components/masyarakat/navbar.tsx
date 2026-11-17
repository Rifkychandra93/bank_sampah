import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, LogOut, Bell, ShieldCheck, User, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  userName?: string;
  userEmail?: string;
}

export function Navbar({ userName: initialUserName = 'Rifky Chandra' }: NavbarProps) {
  const location = useLocation();
  const [userName, setUserName] = useState(initialUserName);

  useEffect(() => {
    const savedName = localStorage.getItem('ecoBank_userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, [initialUserName]);

  const isHome = location.pathname === '/masyarakat' || location.pathname === '/masyarakat/';
  const isProfile = location.pathname.startsWith('/masyarakat/profile');

  // Initials for avatar
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Leaf size={18} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-slate-900 leading-none">
                Eco<span className="text-emerald-600">Trust</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Portal Nasabah
              </span>
            </div>
          </Link>

          {/* Nav Links for Desktop */}
          <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-slate-200">
            <Link
              to="/masyarakat"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                isHome
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard size={14} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/masyarakat/profile"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                isProfile
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <User size={14} />
              <span>Profil Saya</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <button
            className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center transition-colors relative cursor-pointer"
            aria-label="Notifikasi"
          >
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Clickable Profile Card */}
          <Link
            to="/masyarakat/profile"
            className={`flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-xl transition-all ${
              isProfile
                ? 'bg-emerald-50 ring-1 ring-emerald-300'
                : 'hover:bg-slate-50'
            }`}
            title="Buka Pengaturan Profil"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shadow-xs">
              {initials || 'RC'}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">{userName}</span>
              <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck size={11} /> Nasabah Aktif
              </span>
            </div>
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Keluar</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
