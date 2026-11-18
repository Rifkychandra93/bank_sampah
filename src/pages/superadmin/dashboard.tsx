import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SuperadminSidebar } from '../../components/superadmin/sidebar';
import {
  getAgents,
  getMembers,
  WASTE_CATEGORIES,
  formatRupiah
} from '../../data/superadminStore';
import type { AgenRecord, MasyarakatRecord } from '../../data/superadminStore';
import {
  Scale,
  Banknote,
  Store,
  Users,
  Recycle,
  TrendingUp,
  TreePine,
  Cloud,
  Download,
  ArrowRight,
  Clock,
  Award,
  CheckCircle2
} from 'lucide-react';

interface RecentTx {
  id: string;
  userName: string;
  type: string;
  weight: number;
  reward: number;
  date: string;
}

const MONTHLY_TREND = [
  { month: 'Jun', kg: 148 },
  { month: 'Jul', kg: 182 },
  { month: 'Agu', kg: 205 },
  { month: 'Sep', kg: 194 },
  { month: 'Okt', kg: 246 },
  { month: 'Nov', kg: 273.5 }
];

const FALLBACK_RECENT_TX: RecentTx[] = [
  {
    id: 'TRX-849102',
    userName: 'Rifky Chandra',
    type: 'plastik',
    weight: 3.5,
    reward: 10500,
    date: new Date(Date.now() - 1000 * 60 * 35).toISOString()
  },
  {
    id: 'TRX-849101',
    userName: 'Siti Aminah',
    type: 'kertas',
    weight: 7.2,
    reward: 14400,
    date: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: 'TRX-849098',
    userName: 'Budi Santoso',
    type: 'kaleng',
    weight: 2.1,
    reward: 10500,
    date: new Date(Date.now() - 1000 * 60 * 270).toISOString()
  },
  {
    id: 'TRX-849085',
    userName: 'Dewi Lestari',
    type: 'plastik',
    weight: 5.0,
    reward: 15000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString()
  }
];

export default function DashboardSuperadmin() {
  const [agents, setAgents] = useState<AgenRecord[]>([]);
  const [members, setMembers] = useState<MasyarakatRecord[]>([]);
  const [recentTx, setRecentTx] = useState<RecentTx[]>(FALLBACK_RECENT_TX);

  useEffect(() => {
    setAgents(getAgents());
    setMembers(getMembers());

    try {
      const rawHistory = localStorage.getItem('ecoBank_history');
      if (rawHistory) {
        const parsed = JSON.parse(rawHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized: RecentTx[] = parsed.slice(0, 5).map((item: any, idx: number) => ({
            id: item.id ? String(item.id) : `TRX-90${idx}`,
            userName: item.userName || 'Nasabah EcoBank',
            type: item.type || 'plastik',
            weight: Number(item.weight) || 0,
            reward: Number(item.reward) || 0,
            date: item.date || new Date().toISOString()
          }));
          setRecentTx(normalized);
        }
      }
    } catch {
      // keep fallback
    }
  }, []);

  // Aggregate waste category stats (base data + recent transactions)
  const categoryBreakdown = useMemo(() => {
    const extraByType: Record<string, number> = { plastik: 0, kertas: 0, kaleng: 0, minyak: 0 };
    try {
      const raw = localStorage.getItem('ecoBank_history');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach((item: any) => {
            const k = String(item.type || '').toLowerCase();
            if (k in extraByType) {
              extraByType[k] += Number(item.weight) || 0;
            }
          });
        }
      }
    } catch {
      // ignore
    }

    const items = WASTE_CATEGORIES.map((cat) => {
      const totalKg = Number((cat.baseKg + (extraByType[cat.key] || 0)).toFixed(1));
      const totalValue = Math.round(totalKg * cat.pricePerKg);
      const co2Saved = Number((totalKg * cat.co2Factor).toFixed(1));
      return {
        ...cat,
        totalKg,
        totalValue,
        co2Saved
      };
    });

    const grandTotalKg = items.reduce((sum, i) => sum + i.totalKg, 0);
    return items.map((i) => ({
      ...i,
      percentage: grandTotalKg > 0 ? Number(((i.totalKg / grandTotalKg) * 100).toFixed(1)) : 0
    }));
  }, []);

  const summary = useMemo(() => {
    const totalWasteKg = categoryBreakdown.reduce((sum, c) => sum + c.totalKg, 0);
    const totalValueRp = categoryBreakdown.reduce((sum, c) => sum + c.totalValue, 0);
    const totalCo2Kg = categoryBreakdown.reduce((sum, c) => sum + c.co2Saved, 0);
    const treesSaved = Math.round(totalCo2Kg / 11);
    const activeAgents = agents.filter((a) => a.status === 'Aktif').length;
    const activeMembers = members.filter((m) => m.status === 'Aktif').length;
    const totalMemberBalance = members.reduce((sum, m) => sum + m.balance, 0);

    return {
      totalWasteKg,
      totalValueRp,
      totalCo2Kg,
      treesSaved,
      activeAgents,
      totalAgents: agents.length,
      activeMembers,
      totalMembers: members.length,
      totalMemberBalance
    };
  }, [categoryBreakdown, agents, members]);

  const topAgents = useMemo(() => {
    return [...agents]
      .sort((a, b) => b.totalCollectedKg - a.totalCollectedKg)
      .slice(0, 4);
  }, [agents]);

  const maxMonthlyKg = Math.max(...MONTHLY_TREND.map((m) => m.kg));

  const handleExportReport = () => {
    const headers = ['Kategori Sampah', 'Total Terkumpul (kg)', 'Persentase (%)', 'Tarif (Rp/kg)', 'Total Nilai Ekonomi (Rp)', 'Reduksi CO2 (kg)'];
    const rows = categoryBreakdown.map((c) => [
      `"${c.name}"`,
      c.totalKg,
      c.percentage,
      c.pricePerKg,
      c.totalValue,
      c.co2Saved
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `ecobank-laporan-sampah-pusat-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      <SuperadminSidebar />

      <main className="flex-1 p-5 sm:p-6 md:p-8 pt-20 lg:pt-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Pusat Kendali Superadmin</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Dashboard Data Sampah & Ekosistem
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Ringkasan total sampah terkumpul, sirkulasi dana reward, serta manajemen seluruh agen pos dan masyarakat.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleExportReport}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
              >
                <Download size={16} />
                <span>Ekspor Laporan</span>
              </button>

              <Link
                to="/superadmin/agen"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-eco-green hover:bg-eco-dark transition shadow-md shadow-eco-green/20 active:scale-95"
              >
                <Store size={16} />
                <span>Kelola Agen</span>
              </Link>
            </div>
          </div>

          {/* 4 KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Total Sampah Terkumpul
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-eco-green flex items-center justify-center">
                  <Scale size={18} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {summary.totalWasteKg.toLocaleString('id-ID', { maximumFractionDigits: 1 })}{' '}
                <span className="text-sm font-semibold text-slate-400">kg</span>
              </p>
              <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp size={13} />
                {(summary.totalWasteKg / 1000).toFixed(2)} ton • +14.2% bulan ini
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Nilai Ekonomi Sampah
                </span>
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Banknote size={18} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-eco-green tracking-tight">
                {formatRupiah(summary.totalValueRp)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Saldo beredar: <strong className="text-slate-700">{formatRupiah(summary.totalMemberBalance)}</strong>
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Pos Agen Terdaftar
                </span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Store size={18} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {summary.activeAgents}{' '}
                <span className="text-sm font-semibold text-slate-400">/ {summary.totalAgents} pos</span>
              </p>
              <Link
                to="/superadmin/agen"
                className="text-xs text-emerald-700 hover:underline font-semibold mt-1 inline-flex items-center gap-1"
              >
                Kelola data agen <ArrowRight size={12} />
              </Link>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Total Masyarakat
                </span>
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Users size={18} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {summary.totalMembers}{' '}
                <span className="text-sm font-semibold text-slate-400">nasabah</span>
              </p>
              <Link
                to="/superadmin/masyarakat"
                className="text-xs text-emerald-700 hover:underline font-semibold mt-1 inline-flex items-center gap-1"
              >
                {summary.activeMembers} aktif • Kelola nasabah <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Middle Section: Category Breakdown + Monthly Trend & Eco Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Waste Data Breakdown by Category */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-eco-green flex items-center justify-center">
                    <Recycle size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900">
                      Data Sampah per Kategori
                    </h2>
                    <p className="text-xs text-slate-500">
                      Rincian bobot terkumpul, porsi persentase, dan estimasi nilai tukar.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  4 Kategori Utama
                </span>
              </div>

              <div className="space-y-4">
                {categoryBreakdown.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${cat.badgeClass}`}>
                          {cat.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          Rp {cat.pricePerKg.toLocaleString('id-ID')}/kg
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-slate-900">
                          {cat.totalKg.toLocaleString('id-ID')} kg
                        </span>
                        <span className="text-xs font-bold text-slate-400 ml-1.5">
                          ({cat.percentage}%)
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${cat.colorClass} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(cat.percentage * 2, 100)}%` }}
                      />
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                      <span>
                        Nilai Ekonomi: <strong className="text-eco-green">{formatRupiah(cat.totalValue)}</strong>
                      </span>
                      <span>
                        Reduksi Emisi: <strong className="text-slate-700">~{cat.co2Saved} kg CO₂e</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Monthly Trend Chart + Aggregate Eco Impact */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Bar Chart Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-base font-black text-slate-900">
                      Tren Pengumpulan Bulanan
                    </h2>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      6 Bulan Terakhir
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6">
                    Akumulasi berat sampah masuk seluruh pos agen (kg).
                  </p>
                </div>

                <div className="grid grid-cols-6 gap-2.5 items-end h-44 pt-4 border-b border-slate-100 pb-2">
                  {MONTHLY_TREND.map((item, idx) => {
                    const heightPct = Math.round((item.kg / maxMonthlyKg) * 100);
                    const isLatest = idx === MONTHLY_TREND.length - 1;
                    return (
                      <div key={item.month} className="flex flex-col items-center h-full justify-end group">
                        <span className="text-[10px] font-bold text-slate-500 mb-1.5 group-hover:text-eco-green transition">
                          {item.kg}
                        </span>
                        <div className="w-full max-w-[34px] bg-slate-100 rounded-t-xl h-full flex items-end overflow-hidden">
                          <div
                            className={`w-full rounded-t-xl transition-all duration-500 ${
                              isLatest
                                ? 'bg-gradient-to-t from-eco-dark to-emerald-500'
                                : 'bg-emerald-200 group-hover:bg-emerald-400'
                            }`}
                            style={{ height: `${heightPct}%` }}
                          />
                        </div>
                        <span className={`text-[11px] mt-2 font-bold ${isLatest ? 'text-eco-green' : 'text-slate-500'}`}>
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Aggregate Environmental Impact Dark Card */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                    Dampak Ekologis Kumulatif
                  </span>
                  <h3 className="text-lg font-black mt-1">
                    Kontribusi Hijau Bank Sampah
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold mb-1">
                        <Cloud size={15} /> Emisi Dicegah
                      </div>
                      <p className="text-xl font-black">
                        {summary.totalCo2Kg.toLocaleString('id-ID', { maximumFractionDigits: 0 })}{' '}
                        <span className="text-xs font-medium text-slate-300">kg CO₂</span>
                      </p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold mb-1">
                        <TreePine size={15} /> Pohon Selamat
                      </div>
                      <p className="text-xl font-black">
                        ~{summary.treesSaved}{' '}
                        <span className="text-xs font-medium text-slate-300">Pohon</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Top Agents & Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top Performing Agents */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Award size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-slate-900">Performa Pos Agen Teratas</h2>
                    <p className="text-[11px] text-slate-500">Berdasarkan total timbangan masuk</p>
                  </div>
                </div>
                <Link
                  to="/superadmin/agen"
                  className="text-xs font-bold text-eco-green hover:underline flex items-center gap-1"
                >
                  Semua <ArrowRight size={13} />
                </Link>
              </div>

              <div className="space-y-3">
                {topAgents.map((ag, index) => (
                  <div
                    key={ag.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                          index === 0
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700'
                        }`}
                      >
                        #{index + 1}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-900 truncate">{ag.posName}</p>
                        <p className="text-[11px] text-slate-500 truncate">
                          PIC: {ag.picName} • {ag.area}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-black text-eco-green">
                        {ag.totalCollectedKg.toLocaleString('id-ID')} kg
                      </p>
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ag.status === 'Aktif'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-600'
                        }`}
                      >
                        {ag.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Deposit Activity */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-eco-green flex items-center justify-center">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-slate-900">Log Setoran Sampah Terbaru</h2>
                    <p className="text-[11px] text-slate-500">Transaksi terbaru lintas pos agen</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <CheckCircle2 size={12} /> Live Sync
                </span>
              </div>

              <div className="space-y-3">
                {recentTx.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">{tx.userName}</span>
                        <span className="text-[10px] font-mono text-slate-400">{tx.id}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 capitalize">
                        Sampah {tx.type} • {formatTime(tx.date)}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs font-black text-slate-900">{tx.weight} kg</p>
                      <p className="text-xs font-bold text-eco-green">{formatRupiah(tx.reward)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
