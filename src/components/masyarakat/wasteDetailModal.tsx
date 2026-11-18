import { X, CheckCircle2, Leaf, TrendingUp } from 'lucide-react';

export interface WasteItemDetail {
  id: string;
  name: string;
  category: 'Plastik' | 'Kertas' | 'Logam' | 'Lainnya' | 'Minyak' | string;
  price: number;
  unit: string;
  condition: string;
  badge?: string;
  criteria: string[];
  benefits: string;
  carbonReduction: string;
}

interface WasteDetailModalProps {
  item: WasteItemDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForCalculator?: (item: WasteItemDetail) => void;
}

export function WasteDetailModal({ item, isOpen, onClose, onSelectForCalculator }: WasteDetailModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {item.category}
          </span>
          {item.badge && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {item.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {item.name}
        </h3>

        <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Estimasi Nilai Tukar Resmi</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              Rp {item.price.toLocaleString('id-ID')}
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal ml-1">/ {item.unit}</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-100/70 dark:bg-emerald-900/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <TrendingUp size={15} />
            <span>Harga Stabil</span>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>Kriteria & Syarat Penyerahan</span>
            </h4>
            <div className="space-y-2">
              {item.criteria.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 mb-1.5 flex items-center gap-1.5">
              <Leaf size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>Manfaat Lingkungan</span>
            </h4>
            <p className="text-xs text-emerald-950/90 dark:text-emerald-200 leading-relaxed">
              {item.benefits}
            </p>
            <div className="mt-3 pt-3 border-t border-emerald-200/50 dark:border-emerald-900/60 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-400">
              <span>Pengurangan Jejak Karbon:</span>
              <span className="font-bold">{item.carbonReduction}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Tutup
          </button>
          {onSelectForCalculator && (
            <button
              onClick={() => {
                onSelectForCalculator(item);
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors cursor-pointer"
            >
              Hitung di Kalkulator
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
