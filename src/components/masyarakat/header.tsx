import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, User, LogOut, CheckCheck, MapPin, Sparkles, TrendingUp, Menu, QrCode } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../../context/ThemeContext';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  onOpenQr?: () => void;
  title?: string;
  subtitle?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'deposit' | 'price' | 'info';
  unread: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Setoran Berhasil Diverifikasi',
    message: 'Setoran 3.5 kg botol plastik di Pos Kelurahan Sukamaju telah diverifikasi. Saldo +Rp 10.500 telah masuk ke akun Anda.',
    time: '25 menit yang lalu',
    type: 'deposit',
    unread: true
  },
  {
    id: 'n2',
    title: 'Pembaruan Harga Sampah',
    message: 'Harga jenis Kaleng Minuman Alumunium naik menjadi Rp 14.000/kg. Yuk kumpulkan dan setorkan ke pos terdekat!',
    time: '2 jam yang lalu',
    type: 'price',
    unread: true
  },
  {
    id: 'n3',
    title: 'Informasi Pos Mitra Buka',
    message: 'Pos Melati RW 05 hari ini beroperasi normal hingga pukul 17.00 WIB. Timbangan digital siap melayani.',
    time: '1 hari yang lalu',
    type: 'info',
    unread: false
  }
];

export function Header({ onOpenMobileMenu, onOpenQr, title, subtitle }: HeaderProps) {
  const [userName, setUserName] = useState<string>('Rifky Chandra');
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('ecoBank_userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markSingleAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const firstName = userName.split(' ')[0] || 'Nasabah';

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Brand Identity */}
        <div className="flex items-center gap-3">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Buka Menu Navigasi"
            >
              <Menu size={22} />
            </button>
          )}

          {/* Logo & Brand Identity */}
          <Link to="/masyarakat" className="flex items-center group">
            <Logo imgClassName="h-7 sm:h-8 w-auto" />
          </Link>

          {title && (
            <div className="hidden md:flex items-center pl-4 ml-1 border-l border-slate-200 dark:border-slate-700">
              <div>
                <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Area: Strategic Buka QR, Theme Toggle, Notification Bell, Single Profile Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 1. Tombol Buka QR (Cukup Satu di Posisi Paling Strategis) */}
          {onOpenQr && (
            <button
              onClick={onOpenQr}
              className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 font-bold text-xs transition-all shadow-xs cursor-pointer active:scale-95"
              title="Buka QR Code ID Nasabah"
            >
              <QrCode size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span className="hidden xs:inline sm:inline">Buka QR</span>
            </button>
          )}

          {/* 2. Theme Toggle (Light / Dark Mode) */}
          <ThemeToggle />

          {/* 3. Notification Button & Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50/70 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200/80 dark:border-slate-700 shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label="Notifikasi"
              title="Notifikasi"
            >
              <Bell size={17} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 dark:bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                </span>
              )}
            </button>

            {/* Notification Popover Dropdown (Responsive & viewport bounded, z-50) */}
            {isNotifOpen && (
              <div className="fixed inset-x-3 top-16 sm:inset-x-auto sm:absolute sm:right-0 sm:top-full mt-2 w-auto sm:w-96 max-w-[calc(100vw-1.5rem)] bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Notifikasi</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
                        {unreadCount} Baru
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <CheckCheck size={14} />
                      <span>Tandai terbaca</span>
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[60vh] sm:max-h-80 overflow-y-auto mt-2 pr-1 space-y-1">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => markSingleAsRead(item.id)}
                      className={`p-3 rounded-2xl transition-all cursor-pointer ${
                        item.unread
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/50'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            item.type === 'deposit'
                              ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                              : item.type === 'price'
                              ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                              : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                          }`}
                        >
                          {item.type === 'deposit' && <Sparkles size={16} />}
                          {item.type === 'price' && <TrendingUp size={16} />}
                          {item.type === 'info' && <MapPin size={16} />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4
                              className={`text-xs truncate ${
                                item.unread
                                  ? 'font-bold text-slate-900 dark:text-white'
                                  : 'font-medium text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {item.title}
                            </h4>
                            {item.unread && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                            {item.message}
                          </p>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    Notifikasi akun Bank Sampah EcoTrust
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 4. Single Unified Profil & Keluar Dropdown Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2 py-1 px-1.5 sm:py-1.5 sm:px-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/70 border border-slate-200/80 dark:border-slate-700 shadow-xs transition-all cursor-pointer active:scale-95"
              aria-label="Menu Pengguna"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-black text-xs flex items-center justify-center shrink-0">
                {initials}
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline max-w-[120px] truncate">
                {firstName}
              </span>
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{userName}</p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Nasabah Terverifikasi
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    to="/masyarakat/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    <User size={15} className="text-slate-400 dark:text-slate-500" />
                    <span>Profil Saya</span>
                  </Link>

                  <Link
                    to="/login"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  >
                    <LogOut size={15} className="text-rose-400" />
                    <span>Keluar</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
