import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { HeroSection } from '../components/landing/heroSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-eco-bg">
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-2xl font-bold text-eco-dark">
          <Leaf size={32} />
          EcoBank
        </div>
        <Link to="/login" className="bg-eco-dark text-white px-6 py-2 rounded-full font-medium hover:bg-eco-green transition">
          Masuk / Daftar
        </Link>
      </nav>

      <HeroSection />
    </div>
  );
}