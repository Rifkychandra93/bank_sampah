import { Link } from 'react-router-dom';
import { QrCode, Wallet, TrendingUp, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-emerald-200/40 via-green-100/30 to-teal-100/20 blur-3xl rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-100/40 blur-2xl rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Inovasi Bank Sampah Digital Indonesia</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
              Pilah Sampahmu,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
                Raih Cuan Nyata
              </span>{' '}
              Untuk Masa Depan
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Ubah tumpukan botol, kardus, dan plastik menjadi saldo digital secara transparan. Cukup bawa sampah terpilah ke mitra agen terdekat, scan QR digital, dan saldo langsung cair ke e-wallet favoritmu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10">
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all duration-200 text-base"
              >
                <span>Mulai Tukar Sekarang</span>
              </Link>
              <a
                href="#katalog-harga"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:border-emerald-300 hover:text-emerald-700 transition-all duration-200 text-base"
              >
                <span>Cek Harga Sampah Hari Ini</span>
              </a>
            </div>

            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-2xl font-black text-slate-900">100%</p>
                <p className="text-xs text-slate-500 font-medium">Digital & Tanpa Buku</p>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <p className="text-2xl font-black text-emerald-600">Instan</p>
                <p className="text-xs text-slate-500 font-medium">Pencairan E-Wallet</p>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <p className="text-2xl font-black text-slate-900">0 Biaya</p>
                <p className="text-xs text-slate-500 font-medium">Bebas Biaya Admin</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-sm relative">
              <div className="relative bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 shadow-2xl shadow-emerald-900/10">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                      AP
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Aditya Pratama</h4>
                      <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Aktif
                  </span>
                </div>

                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-5 mb-5 relative overflow-hidden shadow-lg shadow-slate-900/15">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-slate-300 font-medium">Total Saldo Terkumpul</p>
                      <h3 className="text-3xl font-extrabold tracking-tight mt-1">Rp 348.500</h3>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-400">
                      <Wallet size={20} />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <TrendingUp size={14} />
                      <span>+Rp 42.000</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Setoran Terakhir: Hari ini</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center text-center">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm mb-3">
                    <QrCode size={110} className="text-slate-800" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 tracking-wide font-mono">ECO-9842-8801</p>
                  <p className="text-[11px] text-slate-500 mt-1">Tunjukkan QR ini ke Agen saat penimbangan</p>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Setoran Berhasil!</p>
                  <p className="text-[11px] text-slate-500">+6.4 kg Botol PET terverifikasi</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl py-2 px-3 shadow-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-800">120+ Agen Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
