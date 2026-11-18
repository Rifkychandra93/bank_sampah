import { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WasteItem {
  id: string;
  name: string;
  category: 'Plastik' | 'Kertas' | 'Logam' | 'Minyak';
  price: number;
  unit: string;
  condition: string;
  badge?: string;
}

export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(4500);
  const [weight, setWeight] = useState<number>(10);

  const categories = ['Semua', 'Plastik', 'Kertas', 'Logam', 'Minyak'];

  const wasteList: WasteItem[] = [
    {
      id: 'p1',
      name: 'Botol Plastik PET Bening',
      category: 'Plastik',
      price: 4500,
      unit: 'kg',
      condition: 'Bersih, tanpa tutup, pipih',
      badge: 'Paling Dicari'
    },
    {
      id: 'p2',
      name: 'Plastik Campur / Kresek Bersih',
      category: 'Plastik',
      price: 2000,
      unit: 'kg',
      condition: 'Kering dan tidak berminyak'
    },
    {
      id: 'k1',
      name: 'Kardus Cokelat / Box Karton',
      category: 'Kertas',
      price: 2800,
      unit: 'kg',
      condition: 'Kering, dilipat dan diikat',
      badge: 'Favorit'
    },
    {
      id: 'k2',
      name: 'Kertas Arsip / HVS / Buku',
      category: 'Kertas',
      price: 3200,
      unit: 'kg',
      condition: 'Bersih tanpa staples kawat'
    },
    {
      id: 'l1',
      name: 'Kaleng Minuman Alumunium',
      category: 'Logam',
      price: 14000,
      unit: 'kg',
      condition: 'Kering, dipipihkan',
      badge: 'Harga Tinggi'
    },
    {
      id: 'l2',
      name: 'Besi Tua / Logam Padat',
      category: 'Logam',
      price: 5500,
      unit: 'kg',
      condition: 'Bebas karat tebal'
    },
    {
      id: 'm1',
      name: 'Minyak Jelantah Rumah Tangga',
      category: 'Minyak',
      price: 7500,
      unit: 'liter',
      condition: 'Telah disaring ampasnya',
      badge: 'Biofuel'
    }
  ];

  const filteredItems =
    activeCategory === 'Semua'
      ? wasteList
      : wasteList.filter((item) => item.category === activeCategory);

  const totalEstimate = weight * selectedItemPrice;

  return (
    <section id="katalog-harga" className="py-24 bg-slate-50 dark:bg-slate-950 border-y border-slate-200/60 dark:border-slate-800 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200 dark:border-emerald-800">
            <span>Katalog Resmi & Transparan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-5">
            Daftar Estimasi Nilai Tukar Sampah
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Harga dapat sedikit berubah menyesuaikan indeks daur ulang nasional. Semua transaksi timbang akan langsung dikonversi otomatis sesuai harga resmi hari ini.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalog & Calculator Split */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* List of Waste items */}
          <div className="lg:col-span-7 space-y-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItemPrice(item.price)}
                className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                  selectedItemPrice === item.price
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{item.condition}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">per {item.unit}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Calculator Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/5 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Calculator size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Kalkulator Simulasi</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Hitung estimasi cuan dari sampahmu</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Perkiraan Berat: <span className="text-emerald-600 dark:text-emerald-400 font-black">{weight} kg</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    <span>1 kg</span>
                    <span>50 kg</span>
                    <span>100 kg</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 text-center">
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold mb-1">
                    Estimasi Saldo yang Didapatkan:
                  </p>
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    Rp {totalEstimate.toLocaleString('id-ID')}
                  </p>
                </div>

                <Link
                  to="/login"
                  className="w-full py-3 px-4 rounded-2xl bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Mulai Tukar Sekarang</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
