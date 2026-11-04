import { ShieldCheck, Zap, Leaf, MapPin, Award, Users } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: <ShieldCheck size={28} className="text-emerald-600" />,
      title: 'Timbangan Terkalibrasi & Adil',
      desc: 'Setiap pos agen EcoTrust menggunakan timbangan digital resmi. Angka berat langsung terinput ke sistem dan tersinkronisasi ke aplikasi nasabah.'
    },
    {
      icon: <Zap size={28} className="text-emerald-600" />,
      title: 'Pencairan Multi-Platform Instan',
      desc: 'Saldo langsung bisa dicairkan ke GoPay, DANA, OVO, ShopeePay, atau rekening bank nasional tanpa proses berhari-hari.'
    },
    {
      icon: <Leaf size={28} className="text-emerald-600" />,
      title: 'Dampak Lingkungan Nyata',
      desc: 'Lacak kontribusi pengurangan jejak karbonmu. Setiap kilogram sampah yang kamu serahkan dihitung dampaknya terhadap bumi.'
    },
    {
      icon: <MapPin size={28} className="text-emerald-600" />,
      title: 'Jangkauan Pos Agen Terdekat',
      desc: 'Mudah menemukan mitra agen di area perumahan dan kelurahan terdekatmu. Jadwal setor fleksibel mengikuti jam pos ronda/balai warga.'
    },
    {
      icon: <Award size={28} className="text-emerald-600" />,
      title: 'Poin Bonus & Level Nasabah',
      desc: 'Kumpulkan poin keaktifan setiap kali menyetor. Tukarkan poinmu dengan voucher belanja, token listrik, hingga merchandise ramah lingkungan.'
    },
    {
      icon: <Users size={28} className="text-emerald-600" />,
      title: 'Mendukung Ekonomi Sirkular Warga',
      desc: 'Membantu memberdayakan pengelola lingkungan lokal dan UMKM daur ulang agar tercipta ekosistem hijau yang berkelanjutan.'
    }
  ];

  return (
    <section id="keunggulan" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-100">
            Nilai Unggul EcoTrust
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-5">
            Didesain Modern Demi Kenyamanan Seluruh Warga
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Kami menggabungkan kemudahan teknologi digital modern dengan kepedulian lingkungan untuk menciptakan sistem bank sampah yang terpercaya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-emerald-50 border border-slate-200/80 group-hover:border-emerald-200 flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-all duration-300">
                {b.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                {b.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

