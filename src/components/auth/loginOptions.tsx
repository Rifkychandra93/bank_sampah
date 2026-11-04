import { useNavigate } from 'react-router-dom';
import { Users, Store } from 'lucide-react';

export function LoginOptions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <button 
        onClick={() => navigate('/masyarakat')} 
        className="w-full flex items-center justify-center gap-3 bg-eco-green text-white py-3 rounded-xl hover:bg-eco-dark transition font-semibold text-lg"
      >
        <Users size={22} />
        Masuk sebagai Masyarakat
      </button>
      
      <button 
        onClick={() => navigate('/agen')} 
        className="w-full flex items-center justify-center gap-3 bg-eco-dark text-white py-3 rounded-xl hover:bg-eco-green transition font-semibold text-lg"
      >
        <Store size={22} />
        Masuk sebagai Agen
      </button>
    </div>
  );
}