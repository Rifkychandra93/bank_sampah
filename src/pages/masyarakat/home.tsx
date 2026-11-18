import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../components/masyarakat/sidebar';
import { UserQrModal } from '../../components/masyarakat/userQrModal';
import { WasteCalculator } from '../../components/masyarakat/wasteCalculator';
import {
  Leaf,
  ShoppingBag,
  Receipt,
  Calendar,
  MapPin,
  Clock,
  QrCode,
  ArrowDown,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  User,
  LogOut,
  Wallet,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import posSukamajuImg from '../../assets/pos-sukamaju.jpg';

export default function HomeMasyarakat() {
  const userId = 'USER-123456';
  const [userName, setUserName] = useState<string>('Rifky Chandra');
  const [balance, setBalance] = useState<number>(125000);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'harga' | 'riwayat' | 'lokasi'>('dashboard');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);
  const [isAllLocationsOpen, setIsAllLocationsOpen] = useState<boolean>(false);
  const [isAllActivitiesOpen, setIsAllActivitiesOpen] = useState<boolean>(false);
  const [isWalletDetailOpen, setIsWalletDetailOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedName = localStorage.getItem('ecoBank_userName');
    if (savedName) {
      setUserName(savedName);
    }
    const savedBalance = localStorage.getItem('ecoBank_userBalance');
    if (savedBalance) {
      setBalance(Number(savedBalance));
    } else {
      localStorage.setItem('ecoBank_userBalance', '125000');
      setBalance(125000);
    }
  }, []);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  // Extract first name for greeting e.g. "Rifky"
  const firstName = userName.split(' ')[0] || 'Rifky';

  // Extract initials for avatar e.g. "RC"
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleTabChange = (tab: 'dashboard' | 'harga' | 'riwayat' | 'lokasi') => {
    setActiveTab(tab);
    if (tab === 'harga') {
      const el = document.getElementById('katalog-harga');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tab === 'lokasi') {
      setIsAllLocationsOpen(true);
    } else if (tab === 'riwayat') {
      setIsAllActivitiesOpen(true);
    } else if (tab === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nearbyLocations = [
    {
      name: 'Pos Kelurahan Sukamaju',
      hours: '08.00 - 17.00 WIB',
      distance: '350 m',
      status: 'Buka',
      address: 'Jl. Pemuda No. 45, Sukamaju'
    },
    {
      name: 'Pos Melati RW 05',
      hours: '08.00 - 17.00 WIB',
      distance: '350 m',
      status: 'Buka',
      address: 'Balai Warga RW 05, Kel. Sukajadi'
    },
    {
      name: 'Pos Cempaka RW 02',
      hours: '09.00 - 16.30 WIB',
      distance: '850 m',
      status: 'Tutup 16.30',
      address: 'Jl. Cempaka Putih No. 12'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Penjemputan sampah',
      date: '12 Nov 2026 • 10.24 WIB',
      status: 'Diproses',
      badgeClass: 'bg-[#EAF7EE] text-[#16a34a]'
    },
    {
      id: 2,
      title: 'Setoran di Pos',
      date: '8 Nov 2026 • 15.30 WIB',
      status: 'Selesai',
      badgeClass: 'bg-[#EAF7EE] text-[#16a34a]'
    },
    {
      id: 3,
      title: 'Setoran Plastik & Kardus',
      date: '3 Nov 2026 • 09.15 WIB',
      status: 'Selesai',
      badgeClass: 'bg-[#EAF7EE] text-[#16a34a]'
    },
    {
      id: 4,
      title: 'Tarik Saldo ke DANA',
      date: '28 Okt 2026 • 14.20 WIB',
      status: 'Selesai',
      badgeClass: 'bg-slate-100 text-slate-700'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6FAF7] text-slate-900 font-sans selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* Soft Ambient Radial Mint Glow at Top-Right (as seen in reference) */}
      <div className="fixed top-0 right-0 w-[500px] h-[400px] bg-gradient-to-bl from-emerald-100/50 via-emerald-50/25 to-transparent blur-3xl pointer-events-none -z-0" />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Layout with Left Offset for Fixed Sidebar */}
      <div className="lg:pl-60 flex flex-col min-h-screen">
        {/* Mobile Header Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Buka Menu"
            >
              <Menu size={22} />
            </button>
            <span className="font-black text-slate-900 tracking-tight text-lg">EcoTrust</span>
          </div>

          <Link
            to="/masyarakat/profile"
            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-[#D7F3E1] text-[#16a34a] font-black text-xs flex items-center justify-center">
              {initials}
            </div>
            <span className="text-xs font-bold text-slate-800">{firstName}</span>
          </Link>
        </header>

        {/* Desktop Top Header Bar (User Pill at Top Right) */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-6 pb-2 hidden lg:flex justify-end relative z-20">
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2.5 bg-white/80 hover:bg-white backdrop-blur-sm py-1.5 px-3 rounded-full border border-slate-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.04)] transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-[#D7F3E1] text-[#16a34a] font-black text-xs flex items-center justify-center">
                {initials}
              </div>
              <span className="text-sm font-bold text-slate-800">{userName}</span>
              <ChevronDown
                size={15}
                className={`text-slate-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900 truncate">{userName}</p>
                  <p className="text-[11px] text-emerald-600 font-medium">Nasabah Aktif</p>
                </div>
                <Link
                  to="/masyarakat/profile"
                  onClick={() => setIsUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  <User size={15} />
                  <span>Pengaturan Profil</span>
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut size={15} />
                  <span>Keluar</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Main Content Body */}
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-4 sm:py-6 space-y-6 flex-1 relative z-10">
          {/* Greeting Header */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Selamat datang, {firstName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Yuk mulai langkah kecil untuk lingkungan yang lebih bersih.
            </p>
          </div>

          {/* Large Saldo Card (Saldo Tersedia) */}
          <div className="bg-white rounded-[26px] p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#EAF7EE] flex items-center justify-center shrink-0">
                <Leaf size={28} className="fill-[#16a34a] text-[#16a34a]" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-medium text-slate-400 block mb-0.5">
                  Saldo Tersedia
                </span>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {formatRupiah(balance)}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWalletDetailOpen(true)}
              className="w-10 h-10 rounded-full bg-[#EAF7EE] text-[#16a34a] hover:bg-emerald-100 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Lihat Rincian Saldo"
              title="Lihat Rincian Saldo"
            >
              <ChevronRight size={20} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Three Summary Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1: Total Sampah Terjual */}
            <div className="bg-white rounded-[26px] p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF7EE] flex items-center justify-center shrink-0">
                  <ShoppingBag size={22} className="fill-[#16a34a] text-[#16a34a]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-400 block">
                    Total Sampah Terjual
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                    18,5 kg
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleTabChange('harga')}
                className="w-8 h-8 rounded-full bg-[#EAF7EE] text-[#16a34a] hover:bg-emerald-100 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                title="Kalkulator Sampah"
              >
                <ChevronRight size={17} className="stroke-[2.5]" />
              </button>
            </div>

            {/* Card 2: Total Transaksi */}
            <div className="bg-white rounded-[26px] p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF7EE] flex items-center justify-center shrink-0">
                  <Receipt size={22} className="text-[#16a34a] stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-400 block">
                    Total Transaksi
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                    6 kali
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAllActivitiesOpen(true)}
                className="w-8 h-8 rounded-full bg-[#EAF7EE] text-[#16a34a] hover:bg-emerald-100 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                title="Riwayat Transaksi"
              >
                <ChevronRight size={17} className="stroke-[2.5]" />
              </button>
            </div>

            {/* Card 3: Transaksi Terakhir */}
            <div className="bg-white rounded-[26px] p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF7EE] flex items-center justify-center shrink-0">
                  <Calendar size={22} className="text-[#16a34a] stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-400 block">
                    Transaksi Terakhir
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                    12 Nov 2026
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAllActivitiesOpen(true)}
                className="w-8 h-8 rounded-full bg-[#EAF7EE] text-[#16a34a] hover:bg-emerald-100 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                title="Detail Transaksi Terakhir"
              >
                <ChevronRight size={17} className="stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Bottom Two Cards: Pos Setor Terdekat & Aktivitas Terbaru */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {/* Card Left: Pos Setor Terdekat */}
            <div
              id="pos-setor"
              className="bg-white rounded-[26px] p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="fill-[#16a34a] text-[#16a34a]" />
                    <h2 className="text-base font-bold text-slate-900">Pos Setor Terdekat</h2>
                  </div>
                  <button
                    onClick={() => setIsAllLocationsOpen(true)}
                    className="text-xs sm:text-sm font-semibold text-[#16a34a] hover:text-emerald-700 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Lihat Semua</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                {/* Pos Detail Row */}
                <div className="flex items-center gap-4">
                  <img
                    src={posSukamajuImg}
                    alt="Pos Kelurahan Sukamaju"
                    className="w-28 sm:w-32 h-20 sm:h-22 rounded-2xl object-cover shrink-0 shadow-xs border border-slate-100"
                  />
                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      Pos Kelurahan Sukamaju
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={14} className="text-slate-400" />
                      <span>08.00 - 17.00 WIB</span>
                    </div>
                    <div className="pt-0.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF7EE] text-[#16a34a] font-bold text-xs">
                        <MapPin size={11} className="fill-[#16a34a] text-[#16a34a]" />
                        <span>350 m</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button: Tunjukkan QR ke Petugas */}
              <div className="pt-6">
                <button
                  onClick={() => setIsQrModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#EAF7EE] hover:bg-emerald-100 text-[#16a34a] border border-emerald-200/60 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-xs active:scale-[0.99] cursor-pointer"
                >
                  <QrCode size={18} className="text-[#16a34a]" />
                  <span>Tunjukkan QR ke Petugas</span>
                  <ArrowDown size={16} className="text-[#16a34a]" />
                </button>
              </div>
            </div>

            {/* Card Right: Aktivitas Terbaru */}
            <div
              id="aktivitas"
              className="bg-white rounded-[26px] p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-[#16a34a] stroke-[2.2]" />
                    <h2 className="text-base font-bold text-slate-900">Aktivitas Terbaru</h2>
                  </div>
                  <button
                    onClick={() => setIsAllActivitiesOpen(true)}
                    className="text-xs sm:text-sm font-semibold text-[#16a34a] hover:text-emerald-700 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Lihat Semua</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                {/* Timeline List */}
                <div className="relative pl-5 space-y-6">
                  {/* Vertical Timeline Connecting Line */}
                  <div className="absolute left-[5px] top-2 bottom-5 w-0.5 bg-[#16a34a]/30" />

                  {/* Activity Item 1 */}
                  <div className="relative flex items-center justify-between">
                    {/* Dot */}
                    <div className="absolute -left-[20px] top-1.5 w-3 h-3 rounded-full bg-[#16a34a] ring-4 ring-white" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Penjemputan sampah</h4>
                      <p className="text-xs text-slate-400 mt-0.5">12 Nov 2026 • 10.24 WIB</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#EAF7EE] text-[#16a34a] font-bold text-xs">
                      Diproses
                    </span>
                  </div>

                  {/* Activity Item 2 */}
                  <div className="relative flex items-center justify-between">
                    {/* Dot */}
                    <div className="absolute -left-[20px] top-1.5 w-3 h-3 rounded-full bg-[#16a34a] ring-4 ring-white" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Setoran di Pos</h4>
                      <p className="text-xs text-slate-400 mt-0.5">8 Nov 2026 • 15.30 WIB</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#EAF7EE] text-[#16a34a] font-bold text-xs">
                      Selesai
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Info Note */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Diperbarui otomatis secara real-time</span>
                <span className="text-[#16a34a] font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} /> Sinkron
                </span>
              </div>
            </div>
          </div>

          {/* Preserved Waste Calculator & Price Section */}
          <section
            id="katalog-harga"
            className="bg-white rounded-[26px] p-6 sm:p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]"
          >
            <WasteCalculator />
          </section>
        </main>
      </div>

      {/* User QR Code Modal */}
      <UserQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        userId={userId}
        userName={userName}
      />

      {/* Modal: All Nearby Drop Points */}
      {isAllLocationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAllLocationsOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7EE] text-[#16a34a] flex items-center justify-center">
                <MapPin size={22} className="fill-[#16a34a]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Daftar Pos Setor Terdekat</h3>
                <p className="text-xs text-slate-500">Kunjungi pos mitra bank sampah di sekitar Anda</p>
              </div>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {nearbyLocations.map((loc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{loc.name}</h4>
                    <p className="text-xs text-slate-500">{loc.address}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> {loc.hours}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#16a34a] block">{loc.distance}</span>
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EAF7EE] text-[#16a34a]">
                      {loc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsAllLocationsOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: All Activities History */}
      {isAllActivitiesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAllActivitiesOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7EE] text-[#16a34a] flex items-center justify-center">
                <Clock size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Riwayat Seluruh Aktivitas</h3>
                <p className="text-xs text-slate-500">Catatan transaksi setoran dan pencairan saldo</p>
              </div>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{act.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{act.date}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${act.badgeClass}`}>
                    {act.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsAllActivitiesOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Quick Wallet Detail */}
      {isWalletDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsWalletDetailOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-[#EAF7EE] text-[#16a34a] flex items-center justify-center mx-auto mb-3">
              <Wallet size={28} />
            </div>

            <h3 className="text-lg font-bold text-slate-900">Rincian Saldo Nasabah</h3>
            <p className="text-xs text-slate-400 mt-0.5">Saldo terdaftar di akun {userName}</p>

            <div className="mt-4 p-4 rounded-2xl bg-[#F6FAF7] border border-emerald-100/60">
              <span className="text-xs text-slate-500 font-medium block">Total Tersedia</span>
              <span className="text-2xl font-black text-slate-900 tracking-tight mt-1 block">
                {formatRupiah(balance)}
              </span>
            </div>

            <div className="mt-5 flex gap-2.5">
              <button
                onClick={() => setIsWalletDetailOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
              >
                Tutup
              </button>
              <Link
                to="/masyarakat/profile"
                className="flex-1 py-2.5 rounded-xl bg-[#16a34a] text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <span>Tarik Dana</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
