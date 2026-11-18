import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { ThemeToggle } from '../../context/ThemeContext';
import {
  Users,
  Building2,
  Scale,
  Banknote,
  Search,
  LogOut,
  Tag
} from 'lucide-react';

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState<'overview' | 'agen' | 'tarif'>('overview');
  const [searchAgent, setSearchAgent] = useState('');

  const stats = [
    {
      title: 'Total Nasabah Terdaftar',
      value: '2.480',
      change: '+14% bulan ini',
      icon: Users
    },
    {
      title: 'Pos Agen Aktif',
      value: '28 Pos',
      change: '100% beroperasi',
      icon: Building2
    },
    {
      title: 'Sampah Dikelola (Bulan Ini)',
      value: '14.8 Ton',
      change: '+2.1 Ton dari target',
      icon: Scale
    },
    {
      title: 'Perputaran Saldo Nasabah',
      value: 'Rp 68.450.000',
      change: 'Bebas biaya admin',
      icon: Banknote
    }
  ];

  const agentList = [
    {
      id: 'AG-082',
      name: 'Pos Kelurahan Sukamaju',
      officer: 'Bambang Sutrisno',
      address: 'Jl. Pemuda No. 45, Coblong',
      totalWeight: '1.420 kg',
      status: 'Aktif & Buka',
      grade: 'Grade A'
    },
    {
      id: 'AG-105',
      name: 'Pos Melati RW 05',
      officer: 'Siti Aminah',
      address: 'Balai Warga RW 05, Sukajadi',
      totalWeight: '980 kg',
      status: 'Aktif & Buka',
      grade: 'Grade A'
    },
    {
      id: 'AG-044',
      name: 'Pos Cempaka RW 02',
      officer: 'Asep Sunandar',
      address: 'Jl. Cempaka Putih No. 12',
      totalWeight: '1.150 kg',
      status: 'Aktif & Buka',
      grade: 'Grade B'
    },
    {
      id: 'AG-091',
      name: 'Pos Teratai RW 08',
      officer: 'Sri Wahyuni',
      address: 'Jl. Teratai Blok C No. 5',
      totalWeight: '640 kg',
      status: 'Aktif & Buka',
      grade: 'Grade B'
    }
  ];

  const filteredAgents = agentList.filter(
    (a) =>
      a.name.toLowerCase().includes(searchAgent.toLowerCase()) ||
      a.officer.toLowerCase().includes(searchAgent.toLowerCase()) ||
      a.id.toLowerCase().includes(searchAgent.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex items-center group">
              <Logo imgClassName="h-7 sm:h-8 w-auto" subtitle="Admin Pusat" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                AD
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">
                Administrator
              </span>
              <Link
                to="/login"
                className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Keluar</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Dashboard Kontrol Pusat Admin
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Monitoring jaringan pos agen, verifikasi timbangan sampah, dan perputaran dana nasabah.
            </p>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    {item.title}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {item.value}
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {item.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Monitoring Pos Agen ({agentList.length})
          </button>
          <button
            onClick={() => setActiveTab('tarif')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tarif'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Pengaturan Tarif Sampah
          </button>
        </div>

        {/* Tab: Overview (Pos Agen Monitoring) */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchAgent}
                  onChange={(e) => setSearchAgent(e.target.value)}
                  placeholder="Cari nama pos agen, petugas, atau ID..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium self-center">
                Menampilkan {filteredAgents.length} dari {agentList.length} pos
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Kode Pos</th>
                      <th className="py-3.5 px-4">Nama Pos Agen</th>
                      <th className="py-3.5 px-4">Petugas / PIC</th>
                      <th className="py-3.5 px-4">Alamat Wilayah</th>
                      <th className="py-3.5 px-4 text-right">Akumulasi Timbang</th>
                      <th className="py-3.5 px-3 text-center">Grade</th>
                      <th className="py-3.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredAgents.map((ag) => (
                      <tr key={ag.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                          {ag.id}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                          {ag.name}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                          {ag.officer}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                          {ag.address}
                        </td>
                        <td className="py-3.5 px-4 text-right font-black text-emerald-600 dark:text-emerald-400">
                          {ag.totalWeight}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {ag.grade}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
                            {ag.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Tarif Sampah */}
        {activeTab === 'tarif' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Struktur Tarif Dasar Pengolahan Sampah
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tarif acuan berlaku untuk seluruh pos agen mitra EcoTrust. Penyesuaian tarif otomatis disinkronkan ke aplikasi nasabah dan agen.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs space-y-2">
              <div className="flex justify-between">
                <span>Botol Plastik PET Bening:</span>
                <strong>Rp 4.500 / kg (Nasabah) • Rp 3.000 / kg (Agen Pos)</strong>
              </div>
              <div className="flex justify-between">
                <span>Kardus Cokelat / Karton Tebal:</span>
                <strong>Rp 2.800 / kg (Nasabah) • Rp 2.000 / kg (Agen Pos)</strong>
              </div>
              <div className="flex justify-between">
                <span>Kaleng Minuman Alumunium:</span>
                <strong>Rp 14.000 / kg (Nasabah) • Rp 10.000 / kg (Agen Pos)</strong>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
