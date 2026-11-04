import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana cara mendaftar menjadi nasabah EcoTrust?',
      a: 'Pendaftaran sangat mudah dan 100% gratis. Cukup buka halaman portal kami, masukkan nama dan nomor telepon Anda, dan sistem akan langsung menerbitkan QR Code digital nasabah yang siap digunakan kapan saja.'
    },
    {
      q: 'Apakah sampah yang disetorkan harus dibersihkan terlebih dahulu?',
      a: 'Ya, disarankan dalam kondisi bersih dan kering. Untuk botol plastik, lepaskan label atau remas hingga pipih untuk menghemat ruang. Sampah yang bersih dan kering memiliki grade penimbangan yang lebih tinggi dan mencegah bau tidak sedap.'
    },
    {
      q: 'Berapa batas minimal saldo untuk ditarik ke e-wallet?',
      a: 'Batas minimal pencairan saldo adalah Rp 10.000. Saldo dapat langsung ditransfer ke berbagai dompet digital seperti GoPay, OVO, DANA, ShopeePay, atau rekening bank lokal Anda.'
    },
    {
      q: 'Bagaimana jika saya ingin mendaftar menjadi Mitra Agen EcoTrust?',
      a: 'Kami membuka kesempatan bagi pengurus RT/RW, komunitas pemuda, maupun pegiat lingkungan untuk menjadi mitra agen drop-point resmi. Mitra agen mendapatkan komisi insentif pada setiap kilogram sampah yang berhasil ditampung.'
    },
    {
      q: 'Apakah ada potongan biaya administrasi bulanan?',
      a: 'Tidak ada biaya administrasi bulanan sama sekali. Seluruh nilai sampah yang Anda timbang sepenuhnya menjadi hak Anda tanpa potongan tersembunyi.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-slate-200/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle size={14} />
            <span>Pusat Informasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Semua yang perlu kamu ketahui tentang cara kerja, penimbangan, hingga pencairan saldo EcoTrust.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-100 text-emerald-700' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

