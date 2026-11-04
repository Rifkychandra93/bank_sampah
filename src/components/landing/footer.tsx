import { Leaf} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
                <Leaf size={22} className="stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Eco<span className="text-emerald-400">Trust</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Mewujudkan ekosistem lingkungan lestari melalui digitalisasi bank sampah terintegrasi. Menjadikan setiap pilahan sampah bernilai guna dan berdaya ekonomi.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Navigasi Cepat</h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li>
                <a href="#home" className="hover:text-emerald-400 transition-colors">Beranda</a>
              </li>
              <li>
                <a href="#cara-kerja" className="hover:text-emerald-400 transition-colors">Cara Kerja</a>
              </li>
              <li>
                <a href="#katalog-harga" className="hover:text-emerald-400 transition-colors">Katalog & Kalkulator</a>
              </li>
              <li>
                <a href="#keunggulan" className="hover:text-emerald-400 transition-colors">Keunggulan Layanan</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">Tanya Jawab (FAQ)</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Jenis Sampah</h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li>Botol Plastik PET</li>
              <li>Kardus & Kertas Arsip</li>
              <li>Kaleng Alumunium</li>
              <li>Minyak Jelantah</li>
              <li>Besi Tua & Logam</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Portal Akses</h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium mb-6">
              <li>
                <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
                  Masuk
                </Link>
              </li>
              <li className="text-slate-400">Bantuan: support@ecotrust.id</li>
              <li className="text-slate-400">Senin - Sabtu: 08.00 - 17.00 WIB</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 EcoTrust Digital Indonesia. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
          </p>
        </div>
      </div>
    </footer>
  );
}
