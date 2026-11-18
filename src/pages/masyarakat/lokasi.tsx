import { useState, useMemo } from 'react';
import { Sidebar } from '../../components/masyarakat/sidebar';
import { Header } from '../../components/masyarakat/header';
import { UserQrModal } from '../../components/masyarakat/userQrModal';
import {
  MapPin,
  Clock,
  Phone,
  Search,
  Navigation,
  Info,
  CheckCircle2,
  ExternalLink,
  X,
  Compass,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import posSukamajuImg from '../../assets/pos-sukamaju.jpg';

export interface LocationItem {
  id: string;
  name: string;
  type: string;
  address: string;
  district: string;
  distance: string;
  distanceMeters: number;
  hours: string;
  days: string;
  status: 'Buka' | 'Tutup';
  officerName: string;
  officerPhone: string;
  acceptedWaste: string[];
  facilities: string[];
  image: string;
  mapCoords: { x: number; y: number };
  lat: number;
  lng: number;
}

const mockLocations: LocationItem[] = [
  {
    id: 'pos-1',
    name: 'Pos Kelurahan Sukamaju',
    type: 'Pos Mitra Kelurahan',
    address: 'Jl. Pemuda No. 45, RT 02 / RW 04, Kelurahan Sukamaju',
    district: 'Sukamaju',
    distance: '350 m',
    distanceMeters: 350,
    hours: '08.00 - 17.00 WIB',
    days: 'Senin - Sabtu',
    status: 'Buka',
    officerName: 'Bambang Sutrisno',
    officerPhone: '0812-3456-7890',
    acceptedWaste: ['Plastik', 'Kertas', 'Logam', 'Minyak'],
    facilities: ['Timbangan Digital Kalibrasi', 'Parkir Motor & Mobil', 'Area Pilah Beratap', 'Pencairan Saldo Tunai & QRIS'],
    image: posSukamajuImg,
    mapCoords: { x: 42, y: 38 },
    lat: -6.2088,
    lng: 106.8456
  },
  {
    id: 'pos-2',
    name: 'Pos Melati RW 05',
    type: 'Pos RW Mitra',
    address: 'Balai Warga RW 05, Jl. Melati Raya No. 12, Kel. Sukajadi',
    district: 'Sukajadi',
    distance: '700 m',
    distanceMeters: 700,
    hours: '08.00 - 17.00 WIB',
    days: 'Setiap Hari',
    status: 'Buka',
    officerName: 'Siti Aminah',
    officerPhone: '0813-8821-4451',
    acceptedWaste: ['Plastik', 'Kertas', 'Logam'],
    facilities: ['Timbangan Gantung Digital', 'Lokasi Nyaman di Balai Warga', 'Bimbingan Pilah Sampah'],
    image: posSukamajuImg,
    mapCoords: { x: 65, y: 55 },
    lat: -6.211,
    lng: 106.848
  },
  {
    id: 'pos-3',
    name: 'Pos Cempaka RW 02',
    type: 'Pos Komunitas',
    address: 'Jl. Cempaka Putih No. 12, RT 01 / RW 02',
    district: 'Cempaka Putih',
    distance: '1,2 km',
    distanceMeters: 1200,
    hours: '09.00 - 16.30 WIB',
    days: 'Senin - Jumat',
    status: 'Buka',
    officerName: 'Asep Sunandar',
    officerPhone: '0856-7123-9081',
    acceptedWaste: ['Plastik', 'Kertas', 'Logam', 'Minyak', 'Kaca'],
    facilities: ['Timbangan Lantai Kapasitas 100 kg', 'Wadah Jerigen Minyak Khusus', 'Penerimaan Botol Sirup/Kaca'],
    image: posSukamajuImg,
    mapCoords: { x: 28, y: 72 },
    lat: -6.2035,
    lng: 106.852
  },
  {
    id: 'pos-4',
    name: 'Bank Sampah Induk EcoTrust',
    type: 'Pusat Pengolahan Induk',
    address: 'Kompleks Daur Ulang Mandiri Kav. 8, Jl. Raya Lingkar Hijau',
    district: 'Lingkar Hijau',
    distance: '2,4 km',
    distanceMeters: 2400,
    hours: '07.30 - 18.00 WIB',
    days: 'Senin - Sabtu',
    status: 'Buka',
    officerName: 'Ir. Hendra Prasetyo',
    officerPhone: '0811-9234-5678',
    acceptedWaste: ['Semua Jenis', 'Plastik', 'Kertas', 'Logam', 'Minyak', 'Elektronik'],
    facilities: ['Gudang Press Hidrolik', 'Timbangan Akurasi Industri', 'Penerimaan Partai Besar & Rumah Tangga'],
    image: posSukamajuImg,
    mapCoords: { x: 80, y: 28 },
    lat: -6.2155,
    lng: 106.839
  },
  {
    id: 'pos-5',
    name: 'Pos Teratai RW 08',
    type: 'Pos RW Mitra',
    address: 'Jl. Teratai Blok C No. 5, RW 08',
    district: 'Teratai Indah',
    distance: '3,1 km',
    distanceMeters: 3100,
    hours: '08.00 - 15.00 WIB',
    days: 'Sabtu - Minggu',
    status: 'Buka',
    officerName: 'Sri Wahyuni',
    officerPhone: '0877-2245-1234',
    acceptedWaste: ['Plastik', 'Kertas', 'Logam'],
    facilities: ['Drop Box Terpilah', 'Petugas Verifikasi Akhir Pekan', 'Timbangan Gantung'],
    image: posSukamajuImg,
    mapCoords: { x: 22, y: 22 },
    lat: -6.198,
    lng: 106.856
  },
  {
    id: 'pos-6',
    name: 'Pos Kencana Berseri RW 03',
    type: 'Pos Komunitas',
    address: 'Jl. Taman Kencana Raya No. 19, RW 03',
    district: 'Kencana Baru',
    distance: '3,8 km',
    distanceMeters: 3800,
    hours: '08.30 - 16.00 WIB',
    days: 'Senin - Sabtu',
    status: 'Buka',
    officerName: 'Dedi Kusnadi',
    officerPhone: '0819-3321-7788',
    acceptedWaste: ['Plastik', 'Kertas', 'Logam'],
    facilities: ['Timbangan Digital Akurat', 'Tukar Saldo Langsung', 'Area Parkir Luas'],
    image: posSukamajuImg,
    mapCoords: { x: 85, y: 70 },
    lat: -6.221,
    lng: 106.862
  }
];

export default function LokasiSetorMasyarakat() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'Semua' | 'Buka' | 'Terdekat'>('Semua');
  const [selectedLocation, setSelectedLocation] = useState<LocationItem>(mockLocations[0]);
  const [detailModalLoc, setDetailModalLoc] = useState<LocationItem | null>(null);
  const [directionsModalLoc, setDirectionsModalLoc] = useState<LocationItem | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Pagination state: 3 items per page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  // Filter locations
  const filteredLocations = useMemo(() => {
    return mockLocations
      .filter((loc) => {
        const q = searchQuery.toLowerCase().trim();
        const matchSearch =
          loc.name.toLowerCase().includes(q) ||
          loc.address.toLowerCase().includes(q) ||
          loc.district.toLowerCase().includes(q);

        if (!matchSearch) return false;
        if (filterCategory === 'Buka') return loc.status === 'Buka';
        return true;
      })
      .sort((a, b) => {
        if (filterCategory === 'Terdekat') {
          return a.distanceMeters - b.distanceMeters;
        }
        return 0;
      });
  }, [searchQuery, filterCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredLocations.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedLocations = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return filteredLocations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLocations, safeCurrentPage, itemsPerPage]);

  const handleFilterChange = (cat: 'Semua' | 'Buka' | 'Terdekat') => {
    setFilterCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const openGoogleMaps = (loc: LocationItem) => {
    const query = encodeURIComponent(`${loc.name} ${loc.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const startRecord = filteredLocations.length === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(safeCurrentPage * itemsPerPage, filteredLocations.length);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-x-clip transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab="lokasi"
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Layout */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onOpenQr={() => setIsQrModalOpen(true)}
          title="Lokasi Pos Setor"
          subtitle="Cari pos agen mitra bank sampah terdekat untuk menyetor sampah secara langsung."
        />

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 flex-1">
          {/* Direct Deposit Workflow Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Navigation size={18} />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Alur Setor Sampah Langsung ke Pos Agen
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Masyarakat datang langsung ke lokasi pos terdekat tanpa perlu menunggu penjemputan.
                </p>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Cari Pos Terdekat</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Pilih pos agen aktif dari daftar atau peta.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Bawa Sampah Terpilah</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Bawa sampah kering langsung ke pos agen.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Tunjukkan QR ID</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Petugas memindai kode QR dari tombol Buka QR di atas.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Timbang & Terima Saldo</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Ditimbang akurat, saldo otomatis bertambah.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar & Filter Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Cari nama pos, kelurahan, atau jalan..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => handleFilterChange('Semua')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === 'Semua'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                Semua Pos ({mockLocations.length})
              </button>
              <button
                onClick={() => handleFilterChange('Terdekat')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === 'Terdekat'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                Terdekat
              </button>
              <button
                onClick={() => handleFilterChange('Buka')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === 'Buka'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                Sedang Buka
              </button>
            </div>
          </div>

          {/* Interactive Map & Agent Directory Split View */}
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Left: Stylized Interactive Visual Map (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass size={17} className="text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Peta Jaringan Pos Agen</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    Klik pin untuk memilih pos
                  </span>
                </div>

                {/* Stylized Visual Map Canvas */}
                <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-slate-50 to-green-50/50 dark:from-slate-800 dark:via-slate-850 dark:to-emerald-950/40 border border-emerald-100/70 dark:border-slate-700 overflow-hidden select-none">
                  {/* Subtle Grid Roads Background */}
                  <svg className="absolute inset-0 w-full h-full opacity-40 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <path d="M 0 100 Q 150 120 400 90" stroke="#cbd5e1" strokeWidth="6" fill="none" />
                    <path d="M 180 0 Q 200 200 240 400" stroke="#cbd5e1" strokeWidth="6" fill="none" />
                    <path d="M 50 250 Q 200 220 400 300" stroke="#cbd5e1" strokeWidth="4" fill="none" />
                    <circle cx="280" cy="180" r="45" fill="#86efac" fillOpacity="0.25" />
                  </svg>

                  {/* User Location Pulse Marker (Center) */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
                    style={{ left: '50%', top: '48%' }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-blue-400 opacity-60" />
                      <div className="w-5 h-5 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900 shadow-md flex items-center justify-center text-white text-[9px] font-bold">
                        •
                      </div>
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded-md bg-slate-900 text-white text-[9px] font-bold shadow-md whitespace-nowrap">
                      Lokasi Anda
                    </span>
                  </div>

                  {/* Agent Location Pins */}
                  {mockLocations.map((loc) => {
                    const isSelected = selectedLocation.id === loc.id;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all z-20 ${
                          isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                        }`}
                        style={{ left: `${loc.mapCoords.x}%`, top: `${loc.mapCoords.y}%` }}
                        aria-label={loc.name}
                      >
                        <div className="flex flex-col items-center">
                          <div
                            className={`px-2 py-1 rounded-xl shadow-lg border text-[10px] font-extrabold flex items-center gap-1 transition-colors whitespace-nowrap ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-700 ring-4 ring-emerald-400/20'
                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                            }`}
                          >
                            <MapPin size={11} className={isSelected ? 'fill-white' : 'fill-emerald-600 text-emerald-600'} />
                            <span>{loc.name.replace('Pos ', '')}</span>
                          </div>
                          <div
                            className={`w-2 h-2 rotate-45 -mt-1 ${
                              isSelected ? 'bg-emerald-600' : 'bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-700'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Agent Quick Preview Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Pos Terpilih:
                    </p>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {selectedLocation.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {selectedLocation.distance} • {selectedLocation.hours}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setDirectionsModalLoc(selectedLocation)}
                      className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      <Navigation size={13} />
                      <span>Rute</span>
                    </button>
                    <button
                      onClick={() => setDetailModalLoc(selectedLocation)}
                      className="p-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition cursor-pointer"
                      title="Detail Pos"
                    >
                      <Info size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Agent Directory Cards List with Pagination (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>Daftar Pos Agen Mitra</span>
                <span>Terverifikasi EcoTrust</span>
              </div>

              {paginatedLocations.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'border-emerald-600 dark:border-emerald-500 ring-2 ring-emerald-500/15 shadow-sm'
                        : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                      {/* Image + Info */}
                      <div className="flex items-start gap-3.5 flex-1">
                        <img
                          src={loc.image}
                          alt={loc.name}
                          className="w-20 sm:w-22 h-20 sm:h-22 rounded-xl object-cover shrink-0 border border-slate-100 dark:border-slate-700"
                        />
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                              {loc.name}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                              {loc.status}
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1 leading-relaxed">
                            <MapPin size={13} className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{loc.address}</span>
                          </p>

                          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 flex-wrap pt-0.5">
                            <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                              <Navigation size={12} className="text-emerald-600 dark:text-emerald-400" />
                              {loc.distance}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              <Clock size={12} />
                              {loc.hours} ({loc.days})
                            </span>
                          </div>

                          {/* Waste Type Badges */}
                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Terima:</span>
                            {loc.acceptedWaste.map((type, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-300"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Detail Lokasi & Petunjuk Arah */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Petugas: <strong className="text-slate-800 dark:text-slate-200">{loc.officerName}</strong></span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailModalLoc(loc);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200/80 dark:border-slate-700 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Info size={14} />
                          <span>Detail Pos</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDirectionsModalLoc(loc);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1.5 active:scale-95"
                        >
                          <Navigation size={14} />
                          <span>Petunjuk Arah</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {paginatedLocations.length === 0 && (
                <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-slate-400 text-xs">
                  Tidak ditemukan pos agen yang sesuai dengan pencarian Anda.
                </div>
              )}

              {/* Pagination Bar for Locations */}
              {filteredLocations.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Menampilkan <strong className="text-slate-800 dark:text-slate-200">{startRecord}-{endRecord}</strong> dari{' '}
                    <strong className="text-slate-800 dark:text-slate-200">{filteredLocations.length}</strong> pos agen
                    <span className="ml-1 text-slate-400 dark:text-slate-500">(Hal {safeCurrentPage} dari {totalPages})</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={safeCurrentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <ChevronLeft size={14} />
                      <span>Sebelumnya</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setCurrentPage(num)}
                          className={`w-7 h-7 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                            safeCurrentPage === num
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={safeCurrentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Berikutnya</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal: Detail Lokasi Agen */}
      {detailModalLoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 space-y-4">
            <button
              onClick={() => setDetailModalLoc(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {detailModalLoc.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {detailModalLoc.status}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {detailModalLoc.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex items-start gap-1">
                <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                <span>{detailModalLoc.address}</span>
              </p>
            </div>

            {/* Operational Info Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 dark:text-slate-500 block font-medium">Jam Buka:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{detailModalLoc.hours}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block font-medium">Hari Operasional:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{detailModalLoc.days}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block font-medium">Jarak dari Anda:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{detailModalLoc.distance}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block font-medium">Petugas Penerima:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{detailModalLoc.officerName}</span>
              </div>
            </div>

            {/* Facilities & Services */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Fasilitas & Layanan di Pos:
              </h4>
              <div className="space-y-2">
                {detailModalLoc.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accepted Materials */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Kategori Sampah Diterima:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {detailModalLoc.acceptedWaste.map((type, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold text-xs"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <a
                href={`https://wa.me/${detailModalLoc.officerPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
              >
                <Phone size={14} />
                <span>Hubungi Petugas</span>
              </a>

              <button
                onClick={() => {
                  setDetailModalLoc(null);
                  setDirectionsModalLoc(detailModalLoc);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center gap-1.5 shadow-sm"
              >
                <Navigation size={14} />
                <span>Petunjuk Arah</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Petunjuk Arah Menuju Agen */}
      {directionsModalLoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 animate-in zoom-in-95 duration-200 space-y-4">
            <button
              onClick={() => setDirectionsModalLoc(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Navigation size={22} />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Petunjuk Arah ke {directionsModalLoc.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Jarak perkiraan {directionsModalLoc.distance} (~3-5 menit berkendara)
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  A
                </span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Titik Awal (Lokasi Anda)</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Jl. Melati Raya, Sukajadi</p>
                </div>
              </div>

              <div className="ml-2.5 pl-4 border-l-2 border-dashed border-slate-300 dark:border-slate-700 py-1 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                <p>• Bergerak lurus ke arah barat di Jl. Melati Raya (200 m)</p>
                <p>• Belok kanan ke Jl. Pemuda (150 m)</p>
                <p>• Pos berada di sebelah kiri sebelum Balai Kelurahan</p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  B
                </span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Tujuan: {directionsModalLoc.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{directionsModalLoc.address}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setDirectionsModalLoc(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => openGoogleMaps(directionsModalLoc)}
                className="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Google Maps</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User QR Code Modal */}
      <UserQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        userId="USER-123456"
        userName="Rifky Chandra"
      />
    </div>
  );
}
