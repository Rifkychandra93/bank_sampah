import { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface TransactionFormProps {
  scannedCode: string;
  onCancel: () => void;
}

export function TransactionForm({ scannedCode, onCancel }: TransactionFormProps) {
  const [wasteType, setWasteType] = useState('plastik');
  const [weight, setWeight] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [earnedReward, setEarnedReward] = useState(0);

  const prices: Record<string, number> = {
    plastik: 3000,
    kertas: 2000,
    kaleng: 5000
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numWeight = parseFloat(weight);
    
    if (isNaN(numWeight) || numWeight <= 0) {
      alert('Masukkan berat yang valid');
      return;
    }

    const reward = prices[wasteType] * numWeight;
    setEarnedReward(reward);

    const currentBalance = Number(localStorage.getItem('ecoBank_userBalance') || 0);
    localStorage.setItem('ecoBank_userBalance', (currentBalance + reward).toString());

    const history = JSON.parse(localStorage.getItem('ecoBank_history') || '[]');
    history.push({
      id: Date.now(),
      type: wasteType,
      weight: numWeight,
      reward: reward,
      date: new Date().toISOString()
    });
    localStorage.setItem('ecoBank_history', JSON.stringify(history));

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Transaksi Berhasil!</h2>
        <p className="text-gray-500 mb-8">Saldo masyarakat telah ditambahkan.</p>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Reward Diberikan</p>
          <p className="text-3xl font-bold text-eco-green">
            Rp {earnedReward.toLocaleString('id-ID')}
          </p>
        </div>

        <button 
          onClick={onCancel} 
          className="w-full bg-eco-dark text-white py-3 rounded-xl font-semibold hover:bg-eco-green transition flex items-center justify-center gap-2"
        >
          Scan Pengguna Lain <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-xl mb-8 border border-green-200">
        <CheckCircle2 size={24} className="text-green-500" />
        <div>
          <p className="font-bold">QR Code Berhasil Discan!</p>
          <p className="text-sm">ID Pengguna: <span className="font-mono">{scannedCode}</span></p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">Input Sampah Diterima</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Sampah</label>
          <select 
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green outline-none"
          >
            <option value="plastik">Plastik (Rp 3.000/kg)</option>
            <option value="kertas">Kertas (Rp 2.000/kg)</option>
            <option value="kaleng">Kaleng (Rp 5.000/kg)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Berat (Kg)</label>
          <input 
            type="number" 
            step="0.1" 
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green outline-none" 
            placeholder="Contoh: 1.5" 
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="button" 
            onClick={onCancel} 
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Batal / Scan Lagi
          </button>
          <button 
            type="submit" 
            className="w-full bg-eco-green text-white py-3 rounded-xl font-semibold hover:bg-eco-dark transition shadow-lg shadow-eco-green/30"
          >
            Simpan Transaksi
          </button>
        </div>
      </form>
    </div>
  );
}