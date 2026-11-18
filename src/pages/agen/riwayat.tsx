import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../components/agen/sidebar';
import { ThemeToggle } from '../../context/ThemeContext';
import {
  Search,
  Download,
  Plus,
  Printer,
  X,
  Scale,
  Banknote,
  ReceiptText,
  Clock,
  Menu
} from 'lucide-react';

export interface TransactionRecord {
  id: string | number;
  userId: string;
  userName: string;
  type: string;
  weight: number;
  reward: number;
  pricePerKg?: number;
  date: string;
  status?: string;
  notes?: string;
}

const defaultInitialHistory: TransactionRecord[] = [
  {
    id: 'TRX-849102',
    userId: 'USER-123456',
    userName: 'Rifky Chandra',
    type: 'plastik',
    pricePerKg: 3000,
    weight: 3.5,
    reward: 10500,
    date: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    status: 'Selesai',
    notes: 'Botol plastik PET bersih tanpa tutup'
  },
  {
    id: 'TRX-849101',
    userId: 'USER-204891',
    userName: 'Siti Aminah',
    type: 'kertas',
    pricePerKg: 2000,
    weight: 7.2,
    reward: 14400,
    date: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'Selesai',
    notes: 'Kardus cokelat tebal & kertas majalah'
  },
  {
    id: 'TRX-849098',
    userId: 'USER-398124',
    userName: 'Budi Santoso',
    type: 'kaleng',
    pricePerKg: 10000,
    weight: 2.1,
    reward: 21000,
    date: new Date(Date.now() - 1000 * 60 * 270).toISOString(),
    status: 'Selesai',
    notes: 'Kaleng minuman aluminium dipipihkan'
  },
  {
    id: 'TRX-849085',
    userId: 'USER-123456',
    userName: 'Rifky Chandra',
    type: 'plastik',
    pricePerKg: 3000,
    weight: 5.0,
    reward: 15000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: 'Selesai',
    notes: 'Plastik campur kering & botol'
  },
  {
    id: 'TRX-849072',
    userId: 'USER-410982',
    userName: 'Dewi Lestari',
    type: 'kertas',
    pricePerKg: 2000,
    weight: 12.0,
    reward: 24000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    status: 'Selesai',
    notes: 'Koran lama & arsip kertas bekas'
  },
  {
    id: 'TRX-849060',
    userId: 'USER-551203',
    userName: 'Ahmad Fauzi',
    type: 'kaleng',
    pricePerKg: 10000,
    weight: 4.8,
    reward: 48000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    status: 'Selesai',
    notes: 'Kaleng biskuit & susu kental manis'
  }
];

export default function RiwayatAgen() {
  const [historyList, setHistoryList] = useState<TransactionRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedTx, setSelectedTx] = useState<TransactionRecord | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Load from localStorage or initialize with realistic defaults
  useEffect(() => {
    const raw = localStorage.getItem('ecoBank_history');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized: TransactionRecord[] = parsed.map((item: any, idx: number) => {
            const wastePrices: Record<string, number> = { plastik: 3000, kertas: 2000, kaleng: 10000, minyak: 5500 };
            const typeStr = item.type || 'plastik';
            const price = item.pricePerKg || wastePrices[typeStr] || 3000;
            const reward = item.reward ?? (price * (item.weight || 0));

            return {
              id: item.id ? (String(item.id).startsWith('TRX') ? item.id : `TRX-${String(item.id).slice(-6)}`) : `TRX-900${idx}`,
              userId: item.userId || 'USER-123456',
              userName: item.userName || (item.userId === 'USER-123456' ? 'Rifky Chandra' : 'Nasabah EcoTrust'),
              type: typeStr,
              weight: Number(item.weight) || 0,
              pricePerKg: price,
              reward: reward,
              date: item.date || new Date().toISOString(),
              status: item.status || 'Selesai',
              notes: item.notes || `Setoran ${typeStr} terverifikasi pos agen`
            };
          });
          setHistoryList(normalized);
          return;
        }
      } catch (err) {
        console.error('Failed to parse history:', err);
      }
    }

    setHistoryList(defaultInitialHistory);
    localStorage.setItem('ecoBank_history', JSON.stringify(defaultInitialHistory));
  }, []);

  // Filtered List
  const filteredList = useMemo(() => {
    return historyList.filter(item => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        String(item.id).toLowerCase().includes(q) ||
        item.userName.toLowerCase().includes(q) ||
        item.userId.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q);

      const matchesType = typeFilter === 'all' || item.type.toLowerCase() === typeFilter.toLowerCase();

      let matchesDate = true;
      if (dateFilter !== 'all') {
        const itemDate = new Date(item.date).getTime();
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        if (dateFilter === 'today') {
          matchesDate = now - itemDate < oneDay;
        } else if (dateFilter === 'week') {
          matchesDate = now - itemDate < 7 * oneDay;
        } else if (dateFilter === 'month') {
          matchesDate = now - itemDate < 30 * oneDay;
        }
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [historyList, searchTerm, typeFilter, dateFilter]);

  // Summary Metrics
  const stats = useMemo(() => {
    const totalTransactions = filteredList.length;
    const totalWeight = filteredList.reduce((acc, curr) => acc + (curr.weight || 0), 0);
    const totalReward = filteredList.reduce((acc, curr) => acc + (curr.reward || 0), 0);
    const avgWeight = totalTransactions > 0 ? (totalWeight / totalTransactions).toFixed(1) : '0';

    return {
      totalTransactions,
      totalWeight: totalWeight.toFixed(1),
      totalReward,
      avgWeight
    };
  }, [filteredList]);

  // Export CSV handler
  const handleExportCSV = () => {
    if (filteredList.length === 0) {
      alert('Tidak ada data untuk diekspor.');
      return;
    }

    const headers = ['ID Transaksi', 'ID Nasabah', 'Nama Nasabah', 'Jenis Sampah', 'Berat (kg)', 'Harga Satuan (Rp/kg)', 'Total Reward (Rp)', 'Tanggal & Waktu', 'Status'];
    const rows = filteredList.map(item => [
      item.id,
      item.userId,
      `"${item.userName}"`,
      item.type.toUpperCase(),
      item.weight,
      item.pricePerKg || 3000,
      item.reward,
      `"${new Date(item.date).toLocaleString('id-ID')}"`,
      item.status || 'Selesai'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecotrust-riwayat-transaksi-agen-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB';
    } catch {
      return isoString;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors">
      <Sidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Buka Menu"
              >
                <Menu size={22} />
              </button>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Riwayat Transaksi Agen
                </h1>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-tight">
                  Pos Kelurahan Sukamaju • Rekap Penimbangan Masuk
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={handleExportCSV}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>Ekspor CSV</span>
              </button>
              <Link
                to="/agen"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
              >
                <Plus size={15} />
                <span>Timbang Baru</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 flex-1">
          {/* Summary Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <ReceiptText size={20} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block">Total Transaksi</span>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {stats.totalTransactions} Selesai
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Scale size={20} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block">Total Sampah Diterima</span>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {stats.totalWeight} kg
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Banknote size={20} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block">Total Saldo Disalurkan</span>
                  <p className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {formatRupiah(stats.totalReward)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block">Rata-rata Timbang</span>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {stats.avgWeight} kg / setor
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari ID transaksi, nama nasabah, atau kode..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option value="all">Semua Jenis Sampah</option>
                  <option value="plastik">Plastik</option>
                  <option value="kertas">Kertas</option>
                  <option value="kaleng">Kaleng</option>
                  <option value="minyak">Minyak</option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option value="all">Semua Waktu</option>
                  <option value="today">Hari Ini</option>
                  <option value="week">7 Hari Terakhir</option>
                  <option value="month">30 Hari Terakhir</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table: Full Transactions View */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Tanggal & Waktu</th>
                    <th className="py-3.5 px-4">ID Transaksi</th>
                    <th className="py-3.5 px-4">Nasabah</th>
                    <th className="py-3.5 px-3">Jenis Sampah</th>
                    <th className="py-3.5 px-4 text-right">Berat</th>
                    <th className="py-3.5 px-4 text-right">Harga/kg</th>
                    <th className="py-3.5 px-4 text-right">Total Reward</th>
                    <th className="py-3.5 px-3 text-center">Status</th>
                    <th className="py-3.5 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredList.map((tx) => (
                    <tr
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(tx.date)}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                        {tx.id}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{tx.userName}</div>
                        <div className="font-mono text-[10px] text-slate-400">{tx.userId}</div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800 capitalize">
                          {tx.type}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                        {tx.weight} kg
                      </td>

                      <td className="py-3.5 px-4 text-right text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        Rp {(tx.pricePerKg || 3000).toLocaleString('id-ID')}
                      </td>

                      <td className="py-3.5 px-4 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm whitespace-nowrap">
                        {formatRupiah(tx.reward)}
                      </td>

                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
                          {tx.status || 'Selesai'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTx(tx);
                          }}
                          className="px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800 p-2">
              {filteredList.map((tx) => (
                <div
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="p-3.5 space-y-2 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{tx.id}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
                      {tx.status || 'Selesai'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{tx.userName}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 capitalize">{tx.type} • {tx.weight} kg</p>
                    </div>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {formatRupiah(tx.reward)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredList.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                Tidak ada data transaksi yang cocok dengan filter pencarian.
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 animate-in zoom-in-95 duration-200 space-y-4">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
                Verifikasi Pos
              </span>
              <span className="font-mono text-xs text-slate-400">{selectedTx.id}</span>
            </div>

            <div className="text-center py-2 space-y-1">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {formatRupiah(selectedTx.reward)}
              </h3>
              <p className="text-xs text-slate-400">Saldo ditransfer ke nasabah</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Waktu Penimbangan:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formatDate(selectedTx.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Nasabah:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedTx.userName} ({selectedTx.userId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Jenis Sampah:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">{selectedTx.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Berat Timbangan:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedTx.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Tarif Satuan:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Rp {(selectedTx.pricePerKg || 3000).toLocaleString('id-ID')} / kg</span>
              </div>
              {selectedTx.notes && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 dark:text-slate-500 block mb-0.5">Catatan:</span>
                  <p className="text-slate-700 dark:text-slate-300 italic">{selectedTx.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setSelectedTx(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Printer size={14} />
                <span>Cetak Bukti</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
