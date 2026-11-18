import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../components/masyarakat/sidebar';
import { Header } from '../../components/masyarakat/header';
import { UserQrModal } from '../../components/masyarakat/userQrModal';
import { WasteCalculator } from '../../components/masyarakat/wasteCalculator';
import {
  Wallet,
  ShoppingBag,
  Receipt,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import posSukamajuImg from '../../assets/pos-sukamaju.jpg';

export default function HomeMasyarakat() {
  const userId = 'USER-123456';
  const [userName, setUserName] = useState<string>('Rifky Chandra');
  const [balance, setBalance] = useState<number>(125000);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Dynamic metrics from history
  const [totalWeight, setTotalWeight] = useState<number>(18.5);
  const [totalTransactions, setTotalTransactions] = useState<number>(6);
  const [lastTransactionDate, setLastTransactionDate] = useState<string>('12 Nov 2026');

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

    // Read history to compute dynamic summary cards
    const rawHistory = localStorage.getItem('ecoBank_history');
    if (rawHistory) {
      try {
        const parsed = JSON.parse(rawHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const userRecords = parsed.filter(
            (r: any) => !r.userId || r.userId === 'USER-123456' || r.userName?.includes('Rifky')
          );
          const activeList = userRecords.length > 0 ? userRecords : parsed;

          const sumWeight = activeList.reduce((acc: number, item: any) => acc + (Number(item.weight) || 0), 0);
          setTotalWeight(Number(sumWeight.toFixed(1)));
          setTotalTransactions(activeList.length);

          if (activeList[0]?.date) {
            const dateObj = new Date(activeList[0].date);
            if (!isNaN(dateObj.getTime())) {
              const formattedDate = dateObj.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });
              setLastTransactionDate(formattedDate);
            }
          }
        }
      } catch (err) {
        console.error('Failed to parse history:', err);
      }
    }
  }, []);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  // Recent verified transactions
  const recentActivities = [
    {
      id: 1,
      title: 'Setoran Botol Plastik PET',
      date: '12 Nov 2026 • 10.24 WIB',
      pos: 'Pos Kelurahan Sukamaju',
      status: 'Selesai',
      badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800'
    },
    {
      id: 2,
      title: 'Setoran Kardus & Kertas Arsip',
      date: '8 Nov 2026 • 15.30 WIB',
      pos: 'Pos Melati RW 05',
      status: 'Selesai',
      badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800'
    },
    {
      id: 3,
      title: 'Setoran Kaleng Minuman Alumunium',
      date: '3 Nov 2026 • 09.15 WIB',
      pos: 'Pos Cempaka RW 02',
      status: 'Selesai',
      badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800'
    },
    {
      id: 4,
      title: 'Tarik Saldo ke E-Wallet DANA',
      date: '28 Okt 2026 • 14.20 WIB',
      pos: 'Transfer Saldo DANA',
      status: 'Berhasil',
      badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-x-hidden transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab="dashboard"
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Layout with Left Offset for Fixed Sidebar */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header Bar with Strategic Buka QR Button, Notifications Bell, and User Profile */}
        <Header
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onOpenQr={() => setIsQrModalOpen(true)}
          title="Dashboard"
          subtitle="Pantau saldo, harga sampah, dan riwayat setoran Anda."
        />

        {/* Dashboard Main Content Body */}
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 flex-1">
          {/* Header Title (Clean, no decorative emojis) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Dashboard Nasabah
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Ringkasan saldo, akumulasi sampah terpilah, dan pos agen mitra terdekat.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                Nasabah: <strong className="text-slate-900 dark:text-white">{userName}</strong>
              </span>
            </div>
          </div>

          {/* 4 Summary Cards in One Horizontal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Saldo Tersedia */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                  <Wallet size={22} className="stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500 block truncate">
                    Saldo Tersedia
                  </span>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5 truncate">
                    {formatRupiah(balance)}
                  </p>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
                    Siap ditarik kapan pun
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Total Sampah Terjual */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                  <ShoppingBag size={22} className="stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500 block truncate">
                    Total Sampah Terjual
                  </span>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5 truncate">
                    {totalWeight} kg
                  </p>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
                    Telah didaur ulang
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Total Transaksi */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                  <Receipt size={22} className="stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500 block truncate">
                    Total Transaksi
                  </span>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5 truncate">
                    {totalTransactions} kali
                  </p>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
                    Setoran terverifikasi
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Transaksi Terakhir */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                  <Calendar size={22} className="stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500 block truncate">
                    Transaksi Terakhir
                  </span>
                  <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5 truncate">
                    {lastTransactionDate}
                  </p>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5 truncate">
                    Pos Kelurahan Sukamaju
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pos Setor Terdekat & Aktivitas Terbaru */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Card Left: Pos Setor Terdekat */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <MapPin size={17} className="fill-emerald-600 dark:fill-emerald-400" />
                    </div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">Pos Setor Terdekat</h2>
                  </div>
                  <Link
                    to="/masyarakat/lokasi"
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Lihat Semua</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Pos Detail Row */}
                <div className="flex items-center gap-4">
                  <img
                    src={posSukamajuImg}
                    alt="Pos Kelurahan Sukamaju"
                    className="w-24 sm:w-28 h-20 rounded-xl object-cover shrink-0 shadow-xs border border-slate-200 dark:border-slate-700"
                  />
                  <div className="space-y-1 flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug truncate">
                      Pos Kelurahan Sukamaju
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      Jl. Pemuda No. 45, Kel. Sukamaju
                    </p>
                    <div className="flex items-center gap-2 flex-wrap pt-0.5">
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                        <Clock size={12} />
                        <span>08.00 - 17.00 WIB</span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                        <MapPin size={10} className="fill-emerald-600" />
                        <span>350 m</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button: Rute ke Pos Agen */}
              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to="/masyarakat/lokasi"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Navigation size={14} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Lihat Rute & Jadwal Pos Agen</span>
                </Link>
              </div>
            </div>

            {/* Card Right: Aktivitas Terbaru */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Clock size={17} className="stroke-[2.2]" />
                    </div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">Aktivitas Terbaru</h2>
                  </div>
                  <Link
                    to="/masyarakat/riwayat"
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Lihat Semua</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Timeline List of Activities */}
                <div className="relative pl-5 space-y-3.5">
                  <div className="absolute left-[5px] top-2 bottom-4 w-0.5 bg-emerald-500/30" />

                  {recentActivities.map((act) => (
                    <div key={act.id} className="relative flex items-center justify-between gap-3">
                      <div className="absolute -left-[20px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900" />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                          {act.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                          {act.pos} • {act.date}
                        </p>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${act.badgeClass}`}>
                        {act.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Info Note */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                <span>Diperbarui otomatis saat sampah ditimbang</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} /> Terverifikasi
                </span>
              </div>
            </div>
          </div>

          {/* Katalog Harga Sampah & Kalkulator Estimasi (with Pagination) */}
          <section
            id="katalog-harga"
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs"
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
    </div>
  );
}
