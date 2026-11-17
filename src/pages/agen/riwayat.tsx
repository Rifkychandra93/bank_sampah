import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../components/agen/sidebar';
import { 
  Search, 
  Calendar, 
  Download, 
  Plus, 
  FileText, 
  CheckCircle2, 
  Printer, 
  X, 
  Scale, 
  Banknote, 
  TrendingUp, 
  ReceiptText,
  Clock,
  Sparkles
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
    notes: 'Botol plastik PET bersih tanpa label'
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
    pricePerKg: 5000,
    weight: 2.1,
    reward: 10500,
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
    pricePerKg: 5000,
    weight: 4.8,
    reward: 24000,
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

  // Load from localStorage or initialize with realistic defaults
  useEffect(() => {
    const raw = localStorage.getItem('ecoBank_history');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized: TransactionRecord[] = parsed.map((item: any, idx: number) => {
            const wastePrices: Record<string, number> = { plastik: 3000, kertas: 2000, kaleng: 5000 };
            const typeStr = item.type || 'plastik';
            const price = item.pricePerKg || wastePrices[typeStr] || 3000;
            const reward = item.reward ?? (price * (item.weight || 0));

            return {
              id: item.id ? (String(item.id).startsWith('TRX') ? item.id : `TRX-${String(item.id).slice(-6)}`) : `TRX-900${idx}`,
              userId: item.userId || 'USER-123456',
              userName: item.userName || (item.userId === 'USER-123456' ? 'Rifky Chandra' : 'Nasabah EcoBank'),
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

    // Default initialization
    setHistoryList(defaultInitialHistory);
    localStorage.setItem('ecoBank_history', JSON.stringify(defaultInitialHistory));
  }, []);

  // Filtered list
  const filteredList = useMemo(() => {
    return historyList.filter((item) => {
      // Search matches
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        String(item.id).toLowerCase().includes(query) ||
        item.userId.toLowerCase().includes(query) ||
        item.userName.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);

      // Waste type filter
      const matchesType = typeFilter === 'all' || item.type.toLowerCase() === typeFilter.toLowerCase();

      // Date filter
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

    const headers = ['ID Transaksi', 'ID Pengguna', 'Nama Nasabah', 'Kategori Sampah', 'Berat (kg)', 'Tarif (Rp/kg)', 'Total Reward (Rp)', 'Tanggal & Waktu', 'Status'];
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
    link.setAttribute('download', `ecobank-riwayat-transaksi-agen-${new Date().toISOString().slice(0, 10)}.csv`);
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

  const getWasteTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'plastik':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Plastik
          </span>
        );
      case 'kertas':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Kertas
          </span>
        );
      case 'kaleng':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            Kaleng
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 capitalize">
            {type}
          </span>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Top Bar Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Pos Operasional Agen</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Riwayat Transaksi Setoran
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Rekap lengkap timbangan sampah, verifikasi nasabah, dan pencatatan kas reward.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                title="Unduh data dalam format CSV"
              >
                <Download size={16} />
                <span>Ekspor CSV</span>
              </button>

              <Link
                to="/agen"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-eco-green hover:bg-eco-dark transition-all shadow-md shadow-eco-green/20 active:scale-95"
              >
                <Plus size={16} />
                <span>Scan Setoran Baru</span>
              </Link>
            </div>
          </div>

          {/* Stat Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Total Transaksi
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-eco-green flex items-center justify-center">
                  <ReceiptText size={18} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {stats.totalTransactions} <span className="text-sm font-semibold text-slate-400">setoran</span>
              </p>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-emerald-700 font-semibold">100%</span> tercatat di sistem
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Total Sampah
                </span>
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Scale size={18} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {stats.totalWeight} <span className="text-sm font-semibold text-slate-400">kg</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Terkumpul dari nasabah binaan
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Reward Disalurkan
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-eco-green flex items-center justify-center">
                  <Banknote size={18} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-eco-green tracking-tight">
                {formatRupiah(stats.totalReward)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Diteruskan ke saldo nasabah
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Rata-rata Setor
                </span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <TrendingUp size={18} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {stats.avgWeight} <span className="text-sm font-semibold text-slate-400">kg/tx</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Rerata timbangan per transaksi
              </p>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Search input */}
              <div className="sm:col-span-6 relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari ID Transaksi (TRX-...), nama, atau ID nasabah..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green focus:ring-2 focus:ring-eco-green/20 outline-none transition"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Waste Type filter */}
              <div className="sm:col-span-3">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full py-2.5 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green focus:ring-2 focus:ring-eco-green/20 outline-none transition font-medium text-slate-700"
                >
                  <option value="all">Semua Jenis Sampah</option>
                  <option value="plastik">Plastik (Rp 3.000/kg)</option>
                  <option value="kertas">Kertas (Rp 2.000/kg)</option>
                  <option value="kaleng">Kaleng (Rp 5.000/kg)</option>
                </select>
              </div>

              {/* Time filter */}
              <div className="sm:col-span-3">
                <div className="relative">
                  <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green focus:ring-2 focus:ring-eco-green/20 outline-none transition font-medium text-slate-700"
                  >
                    <option value="all">Semua Waktu</option>
                    <option value="today">Hari Ini</option>
                    <option value="week">7 Hari Terakhir</option>
                    <option value="month">30 Hari Terakhir</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="font-medium">
                Menampilkan <strong className="text-slate-900">{filteredList.length}</strong> transaksi dari total {historyList.length} catatan
              </span>
              {(searchTerm || typeFilter !== 'all' || dateFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setTypeFilter('all');
                    setDateFilter('all');
                  }}
                  className="text-xs font-bold text-eco-green hover:text-eco-dark hover:underline cursor-pointer"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            {filteredList.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <FileText size={28} />
                </div>
                <h3 className="text-base font-bold text-slate-800">Tidak ada riwayat transaksi ditemukan</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Coba ubah kata kunci pencarian atau sesuaikan filter jenis sampah dan tanggal.
                </p>
                <div className="mt-5">
                  <Link
                    to="/agen"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-eco-green text-white rounded-xl text-xs font-bold hover:bg-eco-dark transition"
                  >
                    <Plus size={14} /> Scan Setoran Baru
                  </Link>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-5">ID & Waktu</th>
                      <th className="py-3.5 px-5">Nasabah</th>
                      <th className="py-3.5 px-5">Jenis Sampah</th>
                      <th className="py-3.5 px-5 text-right">Berat Bersih</th>
                      <th className="py-3.5 px-5 text-right">Total Reward</th>
                      <th className="py-3.5 px-5 text-center">Status</th>
                      <th className="py-3.5 px-5 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredList.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors group">
                        {/* Transaction ID & Time */}
                        <td className="py-4 px-5">
                          <div className="font-mono font-bold text-xs text-slate-800 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {tx.id}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock size={11} /> {formatDate(tx.date)}
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-emerald-100/70 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                              {tx.userName ? tx.userName.slice(0, 2).toUpperCase() : 'NS'}
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-bold text-xs text-slate-900 truncate">{tx.userName}</p>
                              <p className="text-[10px] font-mono text-slate-400 truncate">{tx.userId}</p>
                            </div>
                          </div>
                        </td>

                        {/* Waste Type */}
                        <td className="py-4 px-5">
                          <div className="space-y-1">
                            {getWasteTypeBadge(tx.type)}
                            <p className="text-[10px] text-slate-400">
                              Tarif: Rp {(tx.pricePerKg || (tx.reward / (tx.weight || 1))).toLocaleString('id-ID')}/kg
                            </p>
                          </div>
                        </td>

                        {/* Weight */}
                        <td className="py-4 px-5 text-right font-black text-slate-800">
                          {tx.weight.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}{' '}
                          <span className="text-xs font-semibold text-slate-400">kg</span>
                        </td>

                        {/* Total Reward */}
                        <td className="py-4 px-5 text-right">
                          <span className="font-black text-sm text-eco-green">
                            {formatRupiah(tx.reward)}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-5 text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 size={12} className="text-emerald-600" />
                            {tx.status || 'Selesai'}
                          </span>
                        </td>

                        {/* Action: View Receipt Modal */}
                        <td className="py-4 px-5 text-center">
                          <button
                            onClick={() => setSelectedTx(tx)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-eco-green transition border border-slate-200 cursor-pointer"
                            title="Buka Struk Digital"
                          >
                            <FileText size={13} />
                            <span>Struk</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Digital Receipt Modal (Struk Setoran) */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition"
            >
              <X size={20} />
            </button>

            {/* Receipt Header */}
            <div className="text-center pb-5 border-b border-dashed border-slate-200">
              <div className="w-12 h-12 bg-emerald-100 text-eco-green rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900">STRUK RESMI SETORAN</h3>
              <p className="text-xs font-bold text-eco-green">EcoBank Agen • Pos Melati RW 05</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Bukti timbang resmi transaksi sirkular bank sampah</p>
            </div>

            {/* Receipt Details */}
            <div className="py-4 space-y-3 text-xs border-b border-dashed border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">ID Transaksi</span>
                <span className="font-mono font-bold text-slate-900">{selectedTx.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Waktu Transaksi</span>
                <span className="font-semibold text-slate-800">{formatDate(selectedTx.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ID Nasabah</span>
                <span className="font-mono font-semibold text-slate-800">{selectedTx.userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Nasabah</span>
                <span className="font-bold text-slate-900">{selectedTx.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Petugas / Agen</span>
                <span className="font-semibold text-slate-800">Pos Melati RW 05 (Verifikator)</span>
              </div>
            </div>

            {/* Item Breakdown */}
            <div className="py-4 space-y-2.5 text-xs border-b border-dashed border-slate-200">
              <div className="flex justify-between font-bold text-slate-500 text-[11px] uppercase tracking-wider pb-1">
                <span>Rincian Barang</span>
                <span>Subtotal</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-slate-900 capitalize">
                    Sampah {selectedTx.type}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {selectedTx.weight} kg × Rp {(selectedTx.pricePerKg || (selectedTx.reward / selectedTx.weight)).toLocaleString('id-ID')}
                  </p>
                </div>
                <span className="font-bold text-slate-900">
                  {formatRupiah(selectedTx.reward)}
                </span>
              </div>

              {selectedTx.notes && (
                <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 mt-2">
                  <span className="font-semibold text-slate-700">Catatan: </span>
                  {selectedTx.notes}
                </div>
              )}
            </div>

            {/* Total Section */}
            <div className="py-4 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Total Reward Diberikan</p>
                <p className="text-[11px] text-emerald-700 font-medium">Ditransfer ke Saldo Nasabah</p>
              </div>
              <span className="text-2xl font-black text-eco-green">
                {formatRupiah(selectedTx.reward)}
              </span>
            </div>

            {/* Footer / Buttons */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setSelectedTx(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-100 transition"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shadow-md shadow-slate-900/10 cursor-pointer"
              >
                <Printer size={15} /> Cetak Struk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
