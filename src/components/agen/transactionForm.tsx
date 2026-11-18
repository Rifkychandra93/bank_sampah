import { useState } from 'react';
import { CheckCircle2, ArrowRight, Scale, RotateCcw } from 'lucide-react';

interface TransactionFormProps {
  scannedCode: string;
  onCancel: () => void;
}

export function TransactionForm({ scannedCode, onCancel }: TransactionFormProps) {
  const [wasteType, setWasteType] = useState('plastik');
  const [weight, setWeight] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [earnedReward, setEarnedReward] = useState(0);

  const prices: Record<string, { label: string; price: number; unit: string }> = {
    plastik: { label: 'Botol Plastik PET (Rp 3.000/kg)', price: 3000, unit: 'kg' },
    plastik_campur: { label: 'Plastik Campur / Kresek (Rp 1.500/kg)', price: 1500, unit: 'kg' },
    hdpe: { label: 'Tutup Botol / Emberan HDPE (Rp 2.500/kg)', price: 2500, unit: 'kg' },
    kertas: { label: 'Kardus Cokelat / Karton (Rp 2.000/kg)', price: 2000, unit: 'kg' },
    hvs: { label: 'Kertas Arsip / HVS / Buku (Rp 2.200/kg)', price: 2200, unit: 'kg' },
    kaleng: { label: 'Kaleng Minuman Alumunium (Rp 10.000/kg)', price: 10000, unit: 'kg' },
    besi: { label: 'Besi Tua / Logam Padat (Rp 4.000/kg)', price: 4000, unit: 'kg' },
    tembaga: { label: 'Tembaga Merah Bersih (Rp 60.000/kg)', price: 60000, unit: 'kg' },
    minyak: { label: 'Minyak Jelantah (Rp 5.500/liter)', price: 5500, unit: 'liter' }
  };

  const selectedPriceObj = prices[wasteType] || { label: 'Plastik', price: 3000, unit: 'kg' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numWeight = parseFloat(weight);

    if (isNaN(numWeight) || numWeight <= 0) {
      alert('Masukkan berat yang valid');
      return;
    }

    const currentPrice = selectedPriceObj.price;
    const reward = currentPrice * numWeight;
    setEarnedReward(reward);

    const currentBalance = Number(localStorage.getItem('ecoBank_userBalance') || 0);
    localStorage.setItem('ecoBank_userBalance', (currentBalance + reward).toString());

    const history = JSON.parse(localStorage.getItem('ecoBank_history') || '[]');
    const transactionId = `TRX-${Date.now().toString().slice(-6)}`;
    const detectedUserName = scannedCode.includes('123456') ? 'Rifky Chandra' : 'Nasabah EcoTrust';

    history.unshift({
      id: transactionId,
      userId: scannedCode || 'USER-123456',
      userName: detectedUserName,
      type: wasteType.split('_')[0],
      notes: selectedPriceObj.label.split('(')[0].trim(),
      pricePerKg: currentPrice,
      weight: numWeight,
      reward: reward,
      date: new Date().toISOString(),
      status: 'Selesai'
    });
    localStorage.setItem('ecoBank_history', JSON.stringify(history));

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white dark:bg-slate-900 p-7 sm:p-8 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-800 text-center animate-in fade-in zoom-in-95 duration-200 space-y-5">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={36} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Setoran Berhasil Diverifikasi!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Saldo nasabah telah ditambahkan ke sistem secara instan.
          </p>
        </div>

        <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/60 max-w-sm mx-auto">
          <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">Reward Saldo Masuk</p>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight mt-1">
            Rp {earnedReward.toLocaleString('id-ID')}
          </p>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-1">
            ID: {scannedCode}
          </span>
        </div>

        <button
          onClick={onCancel}
          className="w-full max-w-sm mx-auto bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <span>Scan Nasabah Lain</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-800 space-y-5">
      <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 p-3.5 rounded-2xl border border-emerald-200/70 dark:border-emerald-800">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">QR Code Nasabah Terdeteksi</p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">ID: {scannedCode}</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw size={12} />
          <span>Ganti Scan</span>
        </button>
      </div>

      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
        <Scale size={18} className="text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Form Input Timbangan Sampah</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
            Jenis Sampah
          </label>
          <select
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value)}
            className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium"
          >
            {Object.entries(prices).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
            Berat Aktual Timbangan ({selectedPriceObj.unit})
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Contoh: 3.5"
            className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium"
          />
        </div>

        {weight && !isNaN(parseFloat(weight)) && parseFloat(weight) > 0 && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
            <span className="text-emerald-800 dark:text-emerald-300 font-medium">Estimasi Saldo Nasabah:</span>
            <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
              Rp {(selectedPriceObj.price * parseFloat(weight)).toLocaleString('id-ID')}
            </span>
          </div>
        )}

        <div className="flex gap-2.5 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Batalkan
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition cursor-pointer active:scale-95"
          >
            Konfirmasi & Tambah Saldo
          </button>
        </div>
      </form>
    </div>
  );
}
