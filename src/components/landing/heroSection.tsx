import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <main className="max-w-4xl mx-auto mt-20 text-center px-4">
      <h1 className="text-5xl font-extrabold text-eco-dark mb-6 leading-tight">
        Ubah Sampahmu <br /> Jadi <span className="text-eco-green">Rupiah.</span>
      </h1>
      <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
        Platform bank sampah digital pertama yang menghubungkan masyarakat dengan agen terdekat. Pilah sampahmu, tunjukkan barcode, dan dapatkan saldo reward!
      </p>
      <Link to="/login" className="inline-flex items-center gap-2 bg-eco-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-eco-dark transition shadow-lg shadow-eco-green/30">
        Mulai Sekarang <ArrowRight size={20} />
      </Link>
    </main>
  );
}