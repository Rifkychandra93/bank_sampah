import { useState, useMemo } from 'react';
import { Calculator, Sparkles, Eye, Lightbulb, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { WasteDetailModal } from './wasteDetailModal';
import type { WasteItemDetail } from './wasteDetailModal';

export function WasteCalculator() {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(4500);
  const [selectedItemName, setSelectedItemName] = useState<string>('Botol Plastik PET Bening');
  const [selectedItemUnit, setSelectedItemUnit] = useState<string>('kg');
  const [weight, setWeight] = useState<number>(10);
  const [detailItem, setDetailItem] = useState<WasteItemDetail | null>(null);

  const categories = ['Semua', 'Plastik', 'Kertas', 'Logam', 'Lainnya'];

  const wasteList: WasteItemDetail[] = [
    {
      id: 'p1',
      name: 'Botol Plastik PET Bening',
      category: 'Plastik',
      price: 4500,
      unit: 'kg',
      condition: 'Bersih, tanpa tutup, dan dipipihkan',
      badge: 'Paling Dicari',
      criteria: [
        'Botol dalam kondisi kosong dan telah dibilas bersih',
        'Tutup botol dilepas (dikumpulkan terpisah)',
        'Label plastik kemasan dilepas bila memungkinkan',
        'Remas atau pipihkan botol untuk menghemat volume wadah'
      ],
      benefits: 'Didaur ulang menjadi serat poliester untuk bahan kain tekstil dan dakron bantal.',
      carbonReduction: '~1.4 kg CO2 / kg botol'
    },
    {
      id: 'p2',
      name: 'Plastik Campur / Kresek Kering',
      category: 'Plastik',
      price: 2000,
      unit: 'kg',
      condition: 'Kering dan tidak berminyak',
      criteria: [
        'Bebas dari sisa makanan dan minyak',
        'Kering dan diikat padat dalam satu kantong',
        'Tidak bercampur dengan bahan kimia berbahaya'
      ],
      benefits: 'Diolah kembali menjadi ember plastik, pot tanaman, atau paving block ramah lingkungan.',
      carbonReduction: '~0.8 kg CO2 / kg plastik'
    },
    {
      id: 'p3',
      name: 'Tutup Botol & Emberan HDPE',
      category: 'Plastik',
      price: 3500,
      unit: 'kg',
      condition: 'Bahan plastik tebal bersih dan padat',
      badge: 'Kualitas Tinggi',
      criteria: [
        'Tutup botol air mineral, botol sampo, atau jerigen HDPE',
        'Dibilas bersih dari cairan sabun atau detergen',
        'Tidak bercampur dengan plastik elastis tipis'
      ],
      benefits: 'Dilebur menjadi pellet biji plastik murni untuk produk rumah tangga tahan lama.',
      carbonReduction: '~1.6 kg CO2 / kg HDPE'
    },
    {
      id: 'k1',
      name: 'Kardus Cokelat / Box Karton',
      category: 'Kertas',
      price: 2800,
      unit: 'kg',
      condition: 'Kering, dilipat dan diikat rapi',
      badge: 'Favorit',
      criteria: [
        'Kardus kering dan tidak terkena air hujan',
        'Lepaskan selotip bening dan lakban berlebih',
        'Lipat kardus rata dan ikat dengan tali secara rapi'
      ],
      benefits: 'Didaur ulang menjadi bubur pulp untuk bahan kertas karton daur ulang baru.',
      carbonReduction: '~1.1 kg CO2 / kg kardus'
    },
    {
      id: 'k2',
      name: 'Kertas Arsip / HVS / Buku',
      category: 'Kertas',
      price: 3200,
      unit: 'kg',
      condition: 'Bersih tanpa kawat staples',
      criteria: [
        'Kertas lembaran putih atau buku bekas tanpa jilid plastik',
        'Lepaskan klip logam dan kawat staples',
        'Susun dan ikat rapi per bundle'
      ],
      benefits: 'Mengurangi penebangan pohon untuk bubur kertas industri percetakan.',
      carbonReduction: '~1.3 kg CO2 / kg kertas'
    },
    {
      id: 'l1',
      name: 'Kaleng Minuman Alumunium',
      category: 'Logam',
      price: 14000,
      unit: 'kg',
      condition: 'Kering dan dipipihkan',
      badge: 'Harga Tertinggi',
      criteria: [
        'Kaleng minuman soda atau larutan alumunium',
        'Keringkan dari sisa cairan manis',
        'Injak atau pipihkan untuk memudahkan penimbangan'
      ],
      benefits: 'Dilebur kembali 100% tanpa penurunan kualitas logam secara berulang.',
      carbonReduction: '~9.0 kg CO2 / kg alumunium'
    },
    {
      id: 'l2',
      name: 'Besi Tua / Logam Padat',
      category: 'Logam',
      price: 5500,
      unit: 'kg',
      condition: 'Bebas karat tebal dan minyak',
      criteria: [
        'Paku, kawat, pipa, atau perkakas besi tak terpakai',
        'Bebas dari semen padat atau kotoran tanah tebal'
      ],
      benefits: 'Menjadi bahan baku daur ulang baja untuk konstruksi hemat energi.',
      carbonReduction: '~1.8 kg CO2 / kg besi'
    },
    {
      id: 'l3',
      name: 'Tembaga Bersih Super',
      category: 'Logam',
      price: 75000,
      unit: 'kg',
      condition: 'Kabel tembaga murni kupas',
      badge: 'Premium',
      criteria: [
        'Kawat tembaga merah mengkilap tanpa isolasi plastik',
        'Bebas dari oli, gemuk, atau sambungan timah'
      ],
      benefits: 'Komponen vital transmisi listrik dan motor ramah energi.',
      carbonReduction: '~4.2 kg CO2 / kg tembaga'
    },
    {
      id: 'm1',
      name: 'Minyak Jelantah Rumah Tangga',
      category: 'Lainnya',
      price: 7500,
      unit: 'liter',
      condition: 'Telah disaring dari ampas makanan',
      badge: 'Bahan Biodiesel',
      criteria: [
        'Minyak bekas gorengan yang telah disaring dari remah tepung',
        'Kemas dalam jerigen atau botol tertutup rapat dan anti bocor',
        'Tidak tercampur dengan air atau detergen'
      ],
      benefits: 'Dikonversi menjadi energi bersih terbarukan (biofuel/biodiesel).',
      carbonReduction: '~2.8 kg CO2 / liter minyak'
    },
    {
      id: 'm2',
      name: 'Botol Kaca Bening / Sirup',
      category: 'Lainnya',
      price: 1500,
      unit: 'kg',
      condition: 'Utuh, tidak pecah, tanpa tutup botol',
      criteria: [
        'Botol sirup, kecap, atau saus kaca yang telah dicuci',
        'Kumpulkan dalam kotak khusus agar aman saat dibawa',
        'Lepas tutup logam atau plastik'
      ],
      benefits: 'Dapat disterilisasi untuk dipakai ulang atau dilebur kembali tanpa batas.',
      carbonReduction: '~0.6 kg CO2 / kg kaca'
    }
  ];

  // Filter items based on activeCategory and searchQuery
  const filteredItems = useMemo(() => {
    return wasteList.filter((item) => {
      const matchCategory = activeCategory === 'Semua' || item.category === activeCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.condition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Total pages and sliced items
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, safeCurrentPage, itemsPerPage]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const totalEstimate = weight * selectedItemPrice;

  const handleSelectForCalc = (item: WasteItemDetail) => {
    setSelectedItemPrice(item.price);
    setSelectedItemName(item.name);
    setSelectedItemUnit(item.unit);
  };

  const startRecord = filteredItems.length === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(safeCurrentPage * itemsPerPage, filteredItems.length);

  return (
    <div className="w-full space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-500" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Katalog Harga Sampah Resmi
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Pembaruan tarif setor langsung di pos mitra bank sampah EcoTrust.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Filter */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Cari jenis sampah (misal: botol, kardus, kaleng)..."
          className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
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

      {/* Main Grid: Catalog List with Pagination (Left) + Calculator (Right) */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left: Waste Items List */}
        <div className="lg:col-span-7 space-y-3">
          {paginatedItems.map((item) => {
            const isSelected = selectedItemName === item.name;
            return (
              <div
                key={item.id}
                className={`p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/90 border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/15 shadow-xs'
                    : 'border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div
                  className="flex-1 cursor-pointer select-none"
                  onClick={() => handleSelectForCalc(item)}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {item.condition}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">per {item.unit}</span>
                  </div>

                  <button
                    onClick={() => setDetailItem(item)}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-500 dark:text-slate-400 transition-colors border border-slate-200 dark:border-slate-600 cursor-pointer"
                    title="Lihat Detail Sampah"
                    aria-label="Lihat Detail Sampah"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            );
          })}

          {paginatedItems.length === 0 && (
            <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-slate-400 text-xs">
              Tidak ada jenis sampah yang sesuai dengan pencarian.
            </div>
          )}

          {/* Pagination Controls */}
          {filteredItems.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
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

                {/* Page numbers */}
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

        {/* Right: Income Estimator Calculator */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Calculator size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  Kalkulator Estimasi Cuan
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-400 leading-tight mt-0.5 truncate">
                  {selectedItemName}
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Sampah Terpilih
                </label>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate pr-2">
                    {selectedItemName}
                  </span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                    Rp {selectedItemPrice.toLocaleString('id-ID')} / {selectedItemUnit}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Estimasi Berat / Volume ({selectedItemUnit})
                  </label>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {weight} {selectedItemUnit}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="100"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                  <span>0.5 {selectedItemUnit}</span>
                  <span>50 {selectedItemUnit}</span>
                  <span>100 {selectedItemUnit}</span>
                </div>
              </div>

              {/* Estimate Total Result Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block">
                  Potensi Saldo Masuk ke Akun
                </span>
                <p className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 tracking-tight">
                  Rp {totalEstimate.toLocaleString('id-ID')}
                </p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400/80 block">
                  Berdasarkan berat {weight} {selectedItemUnit} x Rp {selectedItemPrice.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Tips: Bersihkan dan keringkan sampah sebelum disetor untuk mendapatkan timbangan akurat tanpa pemotongan kotoran.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <WasteDetailModal
        item={detailItem}
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        onSelectForCalculator={handleSelectForCalc}
      />
    </div>
  );
}
