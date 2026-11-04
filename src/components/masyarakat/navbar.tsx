import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-eco-green">
        <Leaf size={24} />
        EcoBank
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/masyarakat" className="text-gray-600 font-medium hover:text-eco-green">Home</Link>
        <Link to="/login" className="bg-eco-green text-white px-4 py-2 rounded-lg hover:bg-eco-dark transition">
          Logout
        </Link>
      </div>
    </nav>
  );
}