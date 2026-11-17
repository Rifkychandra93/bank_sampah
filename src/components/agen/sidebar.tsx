import { Link, useLocation } from 'react-router-dom';
import { ScanLine, History, LogOut, Leaf, UserCheck } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isScanActive = currentPath === '/agen' || currentPath === '/agen/';
  const isHistoryActive = currentPath.startsWith('/agen/riwayat');

  return (
    <aside className="w-64 bg-white min-h-screen shadow-md flex flex-col border-r border-gray-100 shrink-0">
      <div className="p-6 flex items-center gap-2 border-b border-gray-100 text-eco-green font-bold text-xl">
        <Leaf size={24} className="stroke-[2.5]" />
        <span>EcoBank Agen</span>
      </div>

      <div className="p-4 border-b border-gray-50">
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            AG
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-800 truncate">Pos Melati RW 05</p>
            <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
              <UserCheck size={12} /> Agen Terverifikasi
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-1.5">
        <Link 
          to="/agen" 
          className={`flex items-center gap-3 p-3 rounded-xl font-medium text-sm transition-colors ${
            isScanActive 
              ? 'bg-eco-green/10 text-eco-green font-semibold shadow-xs' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <ScanLine size={19} className={isScanActive ? 'text-eco-green' : 'text-gray-400'} />
          Scan Barcode
        </Link>

        <Link 
          to="/agen/riwayat" 
          className={`flex items-center gap-3 p-3 rounded-xl font-medium text-sm transition-colors ${
            isHistoryActive 
              ? 'bg-eco-green/10 text-eco-green font-semibold shadow-xs' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <History size={19} className={isHistoryActive ? 'text-eco-green' : 'text-gray-400'} />
          Riwayat Transaksi
        </Link>
      </div>

      <div className="p-4 border-t border-gray-100">
        <Link 
          to="/login" 
          className="flex items-center gap-3 text-red-500 p-3 rounded-xl hover:bg-red-50 font-medium text-sm transition-colors"
        >
          <LogOut size={19} />
          Keluar
        </Link>
      </div>
    </aside>
  );
}
