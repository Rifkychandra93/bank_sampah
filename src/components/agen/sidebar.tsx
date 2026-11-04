import { Link } from 'react-router-dom';
import { ScanLine, History, LogOut, Leaf } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-white min-h-screen shadow-md flex flex-col border-r border-gray-100">
      <div className="p-6 flex items-center gap-2 border-b border-gray-100 text-eco-green font-bold text-xl">
        <Leaf size={24} />
        EcoBank Agen
      </div>
      <div className="flex-1 p-4 space-y-2">
        <Link to="/agen" className="flex items-center gap-3 bg-eco-green/10 text-eco-green p-3 rounded-lg font-medium">
          <ScanLine size={20} />
          Scan Barcode
        </Link>
        <button className="flex items-center gap-3 text-gray-500 p-3 rounded-lg hover:bg-gray-50 w-full text-left font-medium">
          <History size={20} />
          Riwayat Transaksi
        </button>
      </div>
      <div className="p-4 border-t border-gray-100">
        <Link to="/login" className="flex items-center gap-3 text-red-500 p-3 rounded-lg hover:bg-red-50 font-medium">
          <LogOut size={20} />
          Keluar
        </Link>
      </div>
    </aside>
  );
}