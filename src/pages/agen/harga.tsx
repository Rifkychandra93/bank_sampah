import { useState, useMemo } from 'react';
import { Sidebar } from '../../components/agen/sidebar';
import { ThemeToggle } from '../../context/ThemeContext';
import {
  Tag,
  Search,
  Filter,
  TrendingUp,
  Info,
  Menu,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface AgentWastePriceItem {
  id: string;
  name: string;
  category: 'Plastik' | 'Kertas' | 'Logam' | 'Lainnya';
  unit: string;
  buyPrice: number; // Harga beli dari nasabah
  sellPrice: number; // Harga jual ke pusat / industri daur ulang
  margin: number; // Margin operasional pos agen
  qualityCriteria: string;
  status: 'Aktif' | 'Harga Naik' | 'Stabil';
}

const defaultAgentPrices: AgentWastePriceItem[] = [
  {
    id: 'hp-1',
    name: 'Botol Plastik PET Bening',
    category: 'Plastik',
    unit: 'kg',
    buyPrice: 3000,
    sellPrice: 4200,
    margin: 1200,
    qualityCriteria: 'Bersih, tanpa tutup botol, dipipihkan rata',
    status: 'Stabil'
  },
  {
    id: 'hp-2',
    name: 'Plastik Campur / Kresek Kering',
    category: 'Plastik',
    unit: 'kg',
    buyPrice: 1500,
    sellPrice: 2200,
    margin: 700,
    qualityCriteria: 'Kering, bebas minyak dan sisa makanan',
    status: 'Stabil'
  },
  {
    id: 'hp-3',
    name: 'Tutup Botol & Emberan HDPE',
    category: 'Plastik',
    unit: 'kg',
    buyPrice: 2500,
    sellPrice: 3500,
    margin: 1000,
    qualityCriteria: 'Plastik tebal keras, bersih dari residu sabun',
    status: 'Harga Naik'
  },
  {
    id: 'hp-4',
    name: 'Kardus Cokelat / Karton Tebal',
    category: 'Kertas',
    unit: 'kg',
    buyPrice: 2000,
    sellPrice: 2800,
    margin: 800,
    qualityCriteria: 'Kering, dilipat dan diikat dengan tali rapi',
    status: 'Stabil'
  },
  {
    id: 'hp-5',
    name: 'Kertas Arsip / HVS / Buku Bekas',
    category: 'Kertas',
    unit: 'kg',
    buyPrice: 2200,
    sellPrice: 3200,
    margin: 1000,
    qualityCriteria: 'Lembaran putih atau buku tanpa staples kawat',
    status: 'Stabil'
  },
  {
    id: 'hp-6',
    name: 'Kaleng Minuman Alumunium',
    category: 'Logam',
    unit: 'kg',
    buyPrice: 10000,
    sellPrice: 14000,
    margin: 4000,
    qualityCriteria: 'Kering tanpa sisa cairan manis, dipipihkan',
    status: 'Harga Naik'
  },
  {
    id: 'hp-7',
    name: 'Besi Tua / Logam Padat',
    category: 'Logam',
    unit: 'kg',
    buyPrice: 4000,
    sellPrice: 5500,
    margin: 1500,
    qualityCriteria: 'Bebas semen dan tanah tebal, tanpa oli',
    status: 'Stabil'
  },
  {
    id: 'hp-8',
    name: 'Tembaga Merah Bersih Super',
    category: 'Logam',
    unit: 'kg',
    buyPrice: 60000,
    sellPrice: 75000,
    margin: 15000,
    qualityCriteria: 'Kabel tembaga murni tanpa kulit pelindung',
    status: 'Harga Naik'
  },
  {
    id: 'hp-9',
    name: 'Minyak Jelantah Rumah Tangga',
    category: 'Lainnya',
    unit: 'liter',
    buyPrice: 5500,
    sellPrice: 7500,
    margin: 2000,
    qualityCriteria: 'Telah disaring dari remah gorengan, wadah anti bocor',
    status: 'Stabil'
  },
  {
    id: 'hp-10',
    name: 'Botol Kaca Bening / Sirup Utuh',
    category: 'Lainnya',
    unit: 'kg',
    buyPrice: 1000,
    sellPrice: 1500,
    margin: 500,
    qualityCriteria: 'Utuh tidak retak, dibilas bersih tanpa tutup',
    status: 'Stabil'
  }
];

export default function HargaSampahAgen() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');
  const [selectedItemDetail, setSelectedItemDetail] = useState<AgentWastePriceItem | null>(null);

  // Pagination: 5 items per page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const categories = ['Semua', 'Plastik', 'Kertas', 'Logam', 'Lainnya'];

  const filteredItems = useMemo(() => {
    return defaultAgentPrices.filter((item) => {
      const matchCat = categoryFilter === 'Semua' || item.category === categoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        item.name.toLowerCase().includes(q) ||
        item.qualityCriteria.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [searchQuery, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, safeCurrentPage, itemsPerPage]);

  const handleCategoryChange = (cat: string) => {
    setCategoryFilter(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const startRecord = filteredItems.length === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(safeCurrentPage * itemsPerPage, filteredItems.length);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors">
      <Sidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        {/* Header Bar */}
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
                  Daftar Harga Sampah Resmi
                </h1>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-tight">
                  Panduan tarif timbang nasabah dan margin pos agen mitra
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span>Pembaruan Terkini: 18 Nov 2026</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 flex-1">
          {/* Header Info Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Tag size={16} />
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Katalog Acuan Timbangan Agen
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Gunakan acuan ini saat menginput data timbangan nasabah di form transaksi. Selisih harga beli dan harga jual merupakan margin pendapatan pos agen.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200/60 dark:border-emerald-800">
                {defaultAgentPrices.length} Jenis Terdaftar
              </span>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Cari jenis sampah atau kriteria kualitas..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Table (Desktop) & Cards (Mobile) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Jenis Sampah</th>
                    <th className="py-3.5 px-3">Kategori</th>
                    <th className="py-3.5 px-3 text-center">Satuan</th>
                    <th className="py-3.5 px-4 text-right">Harga Beli Nasabah</th>
                    <th className="py-3.5 px-4 text-right">Harga Jual Industri</th>
                    <th className="py-3.5 px-4 text-right">Margin Pos Agen</th>
                    <th className="py-3.5 px-4">Kriteria Penimbangan</th>
                    <th className="py-3.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {paginatedItems.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItemDetail(item)}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-semibold text-slate-600 dark:text-slate-400">
                        /{item.unit}
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm whitespace-nowrap">
                        {formatRupiah(item.buyPrice)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {formatRupiah(item.sellPrice)}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <span className="text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800">
                          +{formatRupiah(item.margin)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 max-w-xs truncate">
                        {item.qualityCriteria}
                      </td>
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === 'Harga Naik'
                              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800 p-2">
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemDetail(item)}
                  className="p-3.5 space-y-2 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1">{item.qualityCriteria}</p>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Beli dari Nasabah:</span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                        {formatRupiah(item.buyPrice)} / {item.unit}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Margin Pos:</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">
                        +{formatRupiah(item.margin)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                Tidak ada data harga sampah yang cocok dengan pencarian.
              </div>
            )}

            {/* Pagination Controls */}
            {filteredItems.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Menampilkan <strong className="text-slate-800 dark:text-slate-200">{startRecord}-{endRecord}</strong> dari{' '}
                  <strong className="text-slate-800 dark:text-slate-200">{filteredItems.length}</strong> jenis sampah
                  <span className="ml-1 text-slate-400 dark:text-slate-500">(Hal {safeCurrentPage} dari {totalPages})</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={safeCurrentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ChevronLeft size={14} />
                    <span>Sebelumnya</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCurrentPage(num)}
                        className={`w-7 h-7 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                          safeCurrentPage === num
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={safeCurrentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Item Detail Modal */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 animate-in zoom-in-95 duration-200 space-y-4">
            <button
              onClick={() => setSelectedItemDetail(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
                {selectedItemDetail.category}
              </span>
              <span className="text-xs text-slate-400">ID: {selectedItemDetail.id}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {selectedItemDetail.name}
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Harga Beli dari Nasabah:</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatRupiah(selectedItemDetail.buyPrice)} / {selectedItemDetail.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Harga Jual ke Pabrik/Induk:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {formatRupiah(selectedItemDetail.sellPrice)} / {selectedItemDetail.unit}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Margin Keuntungan Pos:</span>
                <span className="font-black text-emerald-700 dark:text-emerald-300">
                  +{formatRupiah(selectedItemDetail.margin)} / {selectedItemDetail.unit}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span>Kriteria Wajib Penimbangan</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                {selectedItemDetail.qualityCriteria}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedItemDetail(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
