import { useState } from 'react';
import { Calculator, ArrowRight} from 'lucide-react';
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

  const filteredItems = activeCategory === 'Semua'
    ? wasteList
    : wasteList.filter((item) => item.category === activeCategory);

  const totalEstimate = weight * selectedItemPrice;

  return (
    <section id="katalog-harga" className="py-24 bg-slate-50 border-y border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Katalog Resmi & Transparan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-5">
            Daftar Estimasi Nilai Tukar Sampah
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Harga diperbarui secara berkala sesuai indeks pasar daur ulang nasional. Kami menjamin transparansi tanpa potongan tersembunyi.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemPrice(item.price)}
                  className={`p-4 sm:p-5 rounded-2xl bg-white border cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 ${
                    selectedItemPrice === item.price
                      ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">{item.name}</span>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 mt-1">Syarat: {item.condition}</span>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-base sm:text-lg font-black text-emerald-600">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>
                    <span className="text-xs text-slate-400 font-medium">per {item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-900/5">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Calculator size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Kalkulator Simulasi Cuan</h3>
                  <p className="text-xs text-slate-500">Hitung potensi saldo yang bisa kamu peroleh</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-2">
                    <span>Estimasi Bobot Sampah</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs">
                      {weight} kg
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                    <span>1 kg</span>
                    <span>50 kg</span>
                    <span>100 kg</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium mb-1">Patokan Nilai per Satuan</p>
                  <p className="text-base font-bold text-slate-800">
                    Rp {selectedItemPrice.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-500">/ satuan pilihan</span>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-2xl p-6 shadow-lg shadow-emerald-600/25">
                  <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider block mb-1">
                    Estimasi Saldo Masuk
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight">
                    Rp {totalEstimate.toLocaleString('id-ID')}
                  </div>
                  <p className="text-xs text-emerald-100/90 mt-2 flex items-center gap-1.5">
                    <span>Langsung dapat ditarik ke saldo digital</span>
                  </p>
                </div>

                <Link
                  to="/login"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-white bg-slate-900 hover:bg-emerald-600 transition-colors shadow-md text-sm"
                >
                  <span>Tukar Sampah Sekarang</span>
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
