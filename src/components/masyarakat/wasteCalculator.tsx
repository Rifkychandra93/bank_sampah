import { useState } from 'react';
import { Calculator, Sparkles, Eye } from 'lucide-react';
import { WasteDetailModal } from './wasteDetailModal';
import type { WasteItemDetail } from './wasteDetailModal';

export function WasteCalculator() {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(4500);
  const [selectedItemName, setSelectedItemName] = useState<string>('Botol Plastik PET Bening');
  const [weight, setWeight] = useState<number>(10);
  const [detailItem, setDetailItem] = useState<WasteItemDetail | null>(null);

  const categories = ['Semua', 'Plastik', 'Kertas', 'Logam', 'Minyak'];

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
      id: 'm1',
      name: 'Minyak Jelantah Rumah Tangga',
      category: 'Minyak',
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
    }
  ];

  const filteredItems = activeCategory === 'Semua'
    ? wasteList
    : wasteList.filter((item) => item.category === activeCategory);

  const totalEstimate = weight * selectedItemPrice;

  const handleSelectForCalc = (item: WasteItemDetail) => {
    setSelectedItemPrice(item.price);
    setSelectedItemName(item.name);
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Katalog Jenis Sampah & Simulasi Cuan</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Klik jenis sampah untuk melihat detail kriteria penyerahan, atau pilih untuk menghitung estimasi saldo.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-3">
          {filteredItems.map((item) => {
            const isSelected = selectedItemName === item.name;
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl bg-white border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-sm'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => handleSelectForCalc(item)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {item.condition}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-700">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>
                    <span className="text-[11px] text-slate-400 font-medium">per {item.unit}</span>
                  </div>

                  <button
                    onClick={() => setDetailItem(item)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition-colors border border-slate-200/60"
                    title="Lihat Detail Sampah"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-lg shadow-slate-900/5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Calculator size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Kalkulator Simulasi</h4>
                <p className="text-xs text-slate-500">{selectedItemName}</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                  <span>Estimasi Bobot / Volume</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {weight} kg / liter
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                  <span>1 kg</span>
                  <span>50 kg</span>
                  <span>100 kg</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Patokan Harga Pilihan:</span>
                <span className="font-bold text-slate-800">
                  Rp {selectedItemPrice.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-2xl p-5 shadow-md shadow-emerald-600/20">
                <span className="text-xs text-emerald-100 font-medium uppercase tracking-wider block">
                  Potensi Saldo Didapat
                </span>
                <div className="text-2xl sm:text-3xl font-black mt-1">
                  Rp {totalEstimate.toLocaleString('id-ID')}
                </div>
                <p className="text-[11px] text-emerald-100/90 mt-2 flex items-center gap-1">
                  <Sparkles size={13} />
                  <span>Langsung terkonversi otomatis ke akun saat ditimbang</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WasteDetailModal
        item={detailItem}
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        onSelectForCalculator={handleSelectForCalc}
      />
    </div>
  );
}
