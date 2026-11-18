import { useState, useEffect, useMemo } from 'react';
import { Sidebar } from '../../components/masyarakat/sidebar';
import { Header } from '../../components/masyarakat/header';
import { UserQrModal } from '../../components/masyarakat/userQrModal';
import {
  Search,
  Receipt,
  Scale,
  Sparkles,
  Printer,
  Copy,
  Check,
  X
} from 'lucide-react';

export interface SetoranTransaction {
  id: string;
  userId: string;
  userName: string;
  date: string;
  type: string;
  wasteNameDetail: string;
  weight: number;
  pricePerKg: number;
  reward: number;
  agentName: string;
  agentAddress: string;
  officerName: string;
  officerId: string;
  status: 'Selesai' | 'Diproses';
  notes?: string;
}

const defaultUserHistory: SetoranTransaction[] = [
  {
    id: 'TRX-849102',
    userId: 'USER-123456',
    userName: 'Rifky Chandra',
    date: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    type: 'Plastik',
    wasteNameDetail: 'Botol Plastik PET Bening',
    weight: 3.5,
    pricePerKg: 3000,
    reward: 10500,
    agentName: 'Pos Kelurahan Sukamaju',
    agentAddress: 'Jl. Pemuda No. 45, Kel. Sukamaju',
    officerName: 'Bambang Sutrisno',
    officerId: 'AG-082',
    status: 'Selesai',
    notes: 'Kondisi botol bersih, tanpa tutup botol, dan telah dipipihkan rata.'
  },
  {
    id: 'TRX-849085',
    userId: 'USER-123456',
    userName: 'Rifky Chandra',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    type: 'Plastik',
    wasteNameDetail: 'Plastik Campur & Kresek Kering',
    weight: 5.0,
    pricePerKg: 3000,
    reward: 15000,
    agentName: 'Pos Kelurahan Sukamaju',
    agentAddress: 'Jl. Pemuda No. 45, Kel. Sukamaju',
    officerName: 'Bambang Sutrisno',
    officerId: 'AG-082',
    status: 'Selesai',
    notes: 'Plastik kering dan tidak tercampur sisa makanan atau minyak.'
  },
  {
    id: 'TRX-848970',
    userId: 'USER-123456',
    userName: 'Rifky Chandra',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    type: 'Kertas',
    wasteNameDetail: 'Kardus Cokelat Tebal / Box Karton',
    weight: 6.0,
    pricePerKg: 2800,
    reward: 16800,
    agentName: 'Pos Melati RW 05',
    agentAddress: 'Balai Warga RW 05, Jl. Melati Raya No. 12',
    officerName: 'Siti Aminah',
    officerId: 'AG-105',
    status: 'Selesai',
    notes: 'Kardus telah dilipat pipih dan diikat dengan tali rapi.'
  },
  {
    id: 'TRX-848820',
    userId: 'USER-123456',
    userName: 'Rifky Chandra',
    date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    type: 'Logam',
    wasteNameDetail: 'Kaleng Minuman Alumunium',
    weight: 2.0,
    pricePerKg: 14000,
    reward: 28000,
    agentName: 'Pos Cempaka RW 02',
    agentAddress: 'Jl. Cempaka Putih No. 12',
    officerName: 'Asep Sunandar',
    officerId: 'AG-044',
    status: 'Selesai',
    notes: 'Kaleng dibilas bersih dan dipipihkan dengan baik.'
  },
  {
    id: 'TRX-848650',
    userId: 'USER-123456',
    userName: 'Rifky Chandra',
    date: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
    type: 'Lainnya',
    wasteNameDetail: 'Minyak Jelantah Rumah Tangga',
    weight: 2.0,
    pricePerKg: 7500,
    reward: 15000,
    agentName: 'Pos Kelurahan Sukamaju',
    agentAddress: 'Jl. Pemuda No. 45, Kel. Sukamaju',
    officerName: 'Bambang Sutrisno',
    officerId: 'AG-082',
    status: 'Selesai',
    notes: 'Minyak telah disaring dalam botol jerigen anti bocor.'
  }
];

export default function RiwayatSetoranMasyarakat() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<SetoranTransaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');
  const [dateFilter, setDateFilter] = useState<string>('Semua');
  const [selectedTx, setSelectedTx] = useState<SetoranTransaction | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load transactions from localStorage or default
  useEffect(() => {
    const raw = localStorage.getItem('ecoBank_history');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized: SetoranTransaction[] = parsed.map((item: any, idx: number) => {
            const wasteType = (item.type || 'Plastik').charAt(0).toUpperCase() + (item.type || 'Plastik').slice(1);
            const price = item.pricePerKg || (wasteType.toLowerCase() === 'plastik' ? 3000 : wasteType.toLowerCase() === 'kertas' ? 2000 : 5000);
            const weight = Number(item.weight) || 1;
            const reward = item.reward ?? price * weight;

            return {
              id: item.id ? String(item.id) : `TRX-849${idx}`,
              userId: item.userId || 'USER-123456',
              userName: item.userName || 'Rifky Chandra',
              date: item.date || new Date().toISOString(),
              type: wasteType,
              wasteNameDetail: item.notes?.split('&')[0]?.trim() || `Sampah ${wasteType} Terpilah`,
              weight: weight,
              pricePerKg: price,
              reward: reward,
              agentName: item.agentName || 'Pos Kelurahan Sukamaju',
              agentAddress: item.agentAddress || 'Jl. Pemuda No. 45, Kel. Sukamaju',
              officerName: item.officerName || 'Bambang Sutrisno',
              officerId: item.officerId || 'AG-082',
              status: (item.status === 'Diproses' ? 'Diproses' : 'Selesai') as 'Selesai' | 'Diproses',
              notes: item.notes || `Setoran ${wasteType} terverifikasi petugas pos agen.`
            };
          });

          // Filter for user
          const userOnly = normalized.filter((t) => !t.userId || t.userId === 'USER-123456' || t.userName.includes('Rifky'));
          setTransactions(userOnly.length > 0 ? userOnly : normalized);
          return;
        }
      } catch (err) {
        console.error('Failed to parse history:', err);
      }
    }

    setTransactions(defaultUserHistory);
    localStorage.setItem('ecoBank_history', JSON.stringify(defaultUserHistory));
  }, []);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB';
    } catch {
      return dateStr;
    }
  };

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchSearch =
          tx.id.toLowerCase().includes(q) ||
          tx.type.toLowerCase().includes(q) ||
          tx.wasteNameDetail.toLowerCase().includes(q) ||
          tx.agentName.toLowerCase().includes(q) ||
          tx.officerName.toLowerCase().includes(q);
        if (!matchSearch) return false;
      }

      if (statusFilter !== 'Semua' && tx.status !== statusFilter) {
        return false;
      }

      if (categoryFilter !== 'Semua' && tx.type.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }

      if (dateFilter !== 'Semua') {
        const txTime = new Date(tx.date).getTime();
        const now = Date.now();
        if (dateFilter === '7 Hari Terakhir' && now - txTime > 7 * 24 * 60 * 60 * 1000) {
          return false;
        }
        if (dateFilter === '30 Hari Terakhir' && now - txTime > 30 * 24 * 60 * 60 * 1000) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, searchQuery, statusFilter, categoryFilter, dateFilter]);

  const totalWeight = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + curr.weight, 0).toFixed(1);
  }, [transactions]);

  const totalEarnings = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + curr.reward, 0);
  }, [transactions]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-x-hidden transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab="riwayat"
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Layout */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onOpenQr={() => setIsQrModalOpen(true)}
          title="Riwayat Setoran"
          subtitle="Catatan lengkap setoran sampah langsung dan perolehan saldo Anda."
        />

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 flex-1">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Receipt size={22} className="stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium block">Total Setoran</span>
                <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
                  {transactions.length} Transaksi
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Scale size={22} className="stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium block">Total Sampah Disetor</span>
                <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
                  {totalWeight} kg
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Sparkles size={22} className="stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium block">Total Saldo Diterima</span>
                <p className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight mt-0.5">
                  {formatRupiah(totalEarnings)}
                </p>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari ID transaksi, jenis sampah, agen, atau petugas..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Filters Group */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Diproses">Diproses</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Plastik">Plastik</option>
                  <option value="Kertas">Kertas</option>
                  <option value="Logam">Logam</option>
                  <option value="Lainnya">Lainnya</option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option value="Semua">Semua Tanggal</option>
                  <option value="7 Hari Terakhir">7 Hari Terakhir</option>
                  <option value="30 Hari Terakhir">30 Hari Terakhir</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table of Transactions (Desktop) & Cards (Mobile) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Tanggal & Waktu</th>
                    <th className="py-3.5 px-4">ID Transaksi</th>
                    <th className="py-3.5 px-4">Jenis Sampah</th>
                    <th className="py-3.5 px-4 text-right">Berat</th>
                    <th className="py-3.5 px-4 text-right">Harga/kg</th>
                    <th className="py-3.5 px-4 text-right">Total Saldo</th>
                    <th className="py-3.5 px-4">Pos Agen</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedTx(tx)}
                    >
                      <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(tx.date)}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800 dark:text-slate-200">
                          <span>{tx.id}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(tx.id);
                            }}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            title="Salin ID"
                          >
                            {copiedId === tx.id ? (
                              <Check size={12} className="text-emerald-600" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block truncate max-w-[180px]">
                            {tx.wasteNameDetail}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-emerald-200/50 dark:border-emerald-800">
                            {tx.type}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                        {tx.weight} kg
                      </td>

                      <td className="py-3.5 px-4 text-right text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        Rp {tx.pricePerKg.toLocaleString('id-ID')}
                      </td>

                      <td className="py-3.5 px-4 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm whitespace-nowrap">
                        {formatRupiah(tx.reward)}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-900 dark:text-white">{tx.agentName}</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">Petugas: {tx.officerName}</p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                          {tx.status}
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
              {filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="p-3.5 space-y-2 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{tx.id}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
                      {tx.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{tx.wasteNameDetail}</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{formatDate(tx.date)}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {tx.weight} kg @ Rp {tx.pricePerKg.toLocaleString('id-ID')}
                    </span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {formatRupiah(tx.reward)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                Tidak ada riwayat transaksi yang cocok dengan filter.
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Transaction Detail & Digital Receipt Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 space-y-4">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
                Struk Resmi
              </span>
              <span className="font-mono text-xs text-slate-400">{selectedTx.id}</span>
            </div>

            <div className="text-center py-2 space-y-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {formatRupiah(selectedTx.reward)}
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <span>+ Saldo Akun Masuk</span>
              </p>
            </div>

            {/* Receipt Details Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Waktu Transaksi</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formatDate(selectedTx.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Nasabah</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedTx.userName} ({selectedTx.userId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Jenis Sampah</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedTx.wasteNameDetail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Berat Timbangan</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedTx.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Tarif Satuan</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Rp {selectedTx.pricePerKg.toLocaleString('id-ID')} / kg</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Pos Agen</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedTx.agentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Petugas Penimbang</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedTx.officerName} ({selectedTx.officerId})</span>
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
                <span>Cetak Struk</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User QR Code Modal */}
      <UserQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        userId="USER-123456"
        userName="Rifky Chandra"
      />
    </div>
  );
}
