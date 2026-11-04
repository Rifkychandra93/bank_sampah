import { Trash2, ScanLine, Wallet, CheckCircle2 } from 'lucide-react';

export function FeaturesSection() {
  const steps = [
    {
      step: '01',
      icon: <Trash2 size={26} className="text-emerald-600" />,
      title: 'Pilah Sampah dari Rumah',
      desc: 'Pisahkan sampah kering bernilai ekonomis seperti botol plastik PET, kardus, kaleng alumunium, dan minyak jelantah dari sampah organik rumah tangga.',
      highlights: ['Kondisi kering & bersih', 'Nilai tukar lebih optimal', 'Kategori terstandarisasi']
    },
    {
      step: '02',
      icon: <ScanLine size={26} className="text-emerald-600" />,
      title: 'Scan QR di Agen Terdekat',
      desc: 'Kunjungi pos agen EcoTrust di lingkunganmu. Tunjukkan QR Code dari ponselmu untuk verifikasi identitas, lalu timbang sampah secara transparan.',
      highlights: ['Timbangan presisi digital', 'Verifikasi identitas instan', 'Tanpa antrean buku manual']
    },
    {
      step: '03',
      icon: <Wallet size={26} className="text-emerald-600" />,
      title: 'Saldo Cair Otomatis',
      desc: 'Petugas mencatat data timbangan dan saldo digitalmu langsung bertambah seketika. Saldo dapat ditarik ke GoPay, OVO, DANA, atau rekening bank.',
      highlights: ['Notifikasi realtime', 'Tarik saldo fleksibel', 'Riwayat transaksi tercatat rapi']
    }
  ];

  return (
    <section id="cara-kerja" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-100">
            Alur Praktis 3 Langkah
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-5">
            Semudah Menghitung Jari, Tanpa Antre Tanpa Ribet.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Tidak ada lagi buku tabungan kertas yang mudah rusak atau hilang. Semua proses penimbangan dan pencatatan telah didigitalkan secara aman dan transparan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="group relative bg-slate-50/70 hover:bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-emerald-50 border border-slate-200/80 group-hover:border-emerald-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-300 group-hover:text-emerald-500/40 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/60 flex flex-col gap-2">
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
