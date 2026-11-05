import { useState, useEffect } from 'react';
import { Navbar } from '../../components/masyarakat/navbar';
import { UserQrModal } from '../../components/masyarakat/userQrModal';
import { WasteCalculator } from '../../components/masyarakat/wasteCalculator';
import { QrCode, Wallet, TrendingUp, Award, MapPin, Clock } from 'lucide-react';

export default function HomeMasyarakat() {
  const userId = 'USER-123456';
  const userName = 'Rifky Chandra';
  const [balance, setBalance] = useState<number>(0);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedBalance = localStorage.getItem('ecoBank_userBalance');
    if (savedBalance) {
      setBalance(Number(savedBalance));
    } else {
      localStorage.setItem('ecoBank_userBalance', '125000');
      setBalance(125000);
    }
  }, []);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 selection:bg-emerald-500 selection:text-white">
      <Navbar userName={userName} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Portal Nasabah Aktif</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Selamat datang kembali, {userName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pantau tabungan sampah, status level pencapaian, dan lokasi pos agen terdekat Anda.
            </p>
          </div>

          <button
            onClick={() => setIsQrModalOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <QrCode size={18} />
            <span>Tampilkan QR Setoran</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Saldo Tabungan
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Wallet size={20} />
              </div>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 tracking-tight">
                {formatRupiah(balance)}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Setoran & Reward
              </span>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-slate-900 tracking-tight">
                  18.5
                </p>
                <span className="text-sm font-bold text-slate-500">kg terkumpul</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                <span className="text-slate-600 font-medium">Estimasi Reward:</span>
                <span className="font-bold text-slate-900">Rp 4.000 / kg</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => setIsQrModalOpen(true)}
            className="sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                <QrCode size={20} />
              </div>
              <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Klik Buka QR
              </span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              QR Code Nasabah Anda
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              ID: {userId} • Siap ditunjukkan ke petugas agen untuk proses timbang kilat.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Award size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Pencapaian Nasabah</h3>
                    <p className="text-xs text-slate-400">Level 2: Sahabat Hijau</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Bonus +5%
                </span>
              </div>

              <div className="my-4">
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
                  <span>Progres Tingkat Berikutnya</span>
                  <span className="text-slate-900 font-bold">18.5 / 25 kg</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                    style={{ width: '74%' }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Kumpulkan 6.5 kg sampah lagi untuk naik ke <strong>Level 3 (Pejuang Lingkungan)</strong> dan nikmati bonus harga tukar lebih tinggi.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Terkumpul Bulan Ini</span>
                <span className="font-bold text-slate-900 text-sm">18.50 kg</span>
              </div>
              <div className="border-l border-slate-100 pl-4">
                <span className="text-slate-400 block">Total Poin Ekologis</span>
                <span className="font-bold text-emerald-700 text-sm">1.250 Poin</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Pos Agen Terdekat</h3>
                  <p className="text-xs text-slate-400">Titik drop point terverifikasi</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">
                Area Anda
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Pos Melati RW 05</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock size={11} /> 08.00 - 17.00 WIB
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700">350 m</span>
                  <span className="block text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Buka
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Pos Cempaka RW 02</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock size={11} /> 09.00 - 16.30 WIB
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-600">850 m</span>
                  <span className="block text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    Tutup 16.30
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
              <span>Jadwal Setor Fleksibel</span>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <WasteCalculator />
        </section>
      </main>

      <UserQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        userId={userId}
        userName={userName}
      />
    </div>
  );
}
