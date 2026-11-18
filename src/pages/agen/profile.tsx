import { useState, useEffect } from 'react';
import { Sidebar } from '../../components/agen/sidebar';
import { ThemeToggle } from '../../context/ThemeContext';
import {
  User,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Lock,
  Bell,
  Menu,
  X
} from 'lucide-react';

export default function ProfileAgen() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Agent identity states
  const [officerName, setOfficerName] = useState('Bambang Sutrisno');
  const [agentId] = useState('AG-082');
  const [phone, setPhone] = useState('0812-3456-7890');
  const [email, setEmail] = useState('bambang.sutrisno@posagen.ecotrust.id');
  const [nik] = useState('3273241005820003');

  // Operational Pos states
  const [posName, setPosName] = useState('Pos Kelurahan Sukamaju');
  const [posAddress, setPosAddress] = useState('Jl. Pemuda No. 45, RT 02 / RW 04, Kelurahan Sukamaju');
  const [district] = useState('Kecamatan Coblong');
  const [operatingHours, setOperatingHours] = useState('08.00 - 17.00 WIB');
  const [operatingDays, setOperatingDays] = useState('Senin - Sabtu');
  const [scaleType] = useState('Timbangan Digital Kalibrasi (Maks. 150 kg)');

  // Membership & Account status
  const [membershipGrade] = useState('Pos Mitra Utama Grade A');
  const [joinDate] = useState('15 Januari 2024');
  const [totalProcessedWeight] = useState('1.420 kg');

  // Preferences & Alerts
  const [smsReceiptAlert, setSmsReceiptAlert] = useState(true);
  const [instantSync, setInstantSync] = useState(true);

  // Modals & UI states
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Load saved agent info from localStorage
  useEffect(() => {
    const savedOfficerName = localStorage.getItem('ecoBank_agentOfficerName');
    if (savedOfficerName) setOfficerName(savedOfficerName);

    const savedPhone = localStorage.getItem('ecoBank_agentPhone');
    if (savedPhone) setPhone(savedPhone);

    const savedEmail = localStorage.getItem('ecoBank_agentEmail');
    if (savedEmail) setEmail(savedEmail);

    const savedPosName = localStorage.getItem('ecoBank_agentPosName');
    if (savedPosName) setPosName(savedPosName);

    const savedPosAddress = localStorage.getItem('ecoBank_agentPosAddress');
    if (savedPosAddress) setPosAddress(savedPosAddress);

    const savedHours = localStorage.getItem('ecoBank_agentHours');
    if (savedHours) setOperatingHours(savedHours);
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ecoBank_agentOfficerName', officerName);
    localStorage.setItem('ecoBank_agentPhone', phone);
    localStorage.setItem('ecoBank_agentEmail', email);
    localStorage.setItem('ecoBank_agentPosName', posName);
    localStorage.setItem('ecoBank_agentPosAddress', posAddress);
    localStorage.setItem('ecoBank_agentHours', operatingHours);

    setSaveToast('Data profil operasional agen berhasil disimpan!');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert('Kata sandi baru minimal 6 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setIsPasswordModalOpen(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors">
      {/* Agent Sidebar */}
      <Sidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Layout with Left Offset for Fixed Sidebar */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        {/* Top Header Bar for Agent */}
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Buka Menu"
              >
                <Menu size={22} />
              </button>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Profil Agen Operasional
                </h1>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-tight">
                  {posName} • ID: {agentId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">Pos Beroperasi Aktif</span>
              </div>
            </div>
          </div>
        </header>

        {/* Profile Content Body */}
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 flex-1">
          {/* Toast Notification */}
          {saveToast && (
            <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <CheckCircle2 size={18} />
              <span className="text-sm font-bold">{saveToast}</span>
            </div>
          )}

          {/* Top Banner: Pos & Agent Membership Badge */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-emerald-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
                  {membershipGrade}
                </span>
                <span className="text-xs font-mono text-slate-300">
                  ID Petugas: {agentId}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {posName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Penanggung Jawab: <strong>{officerName}</strong> • {posAddress}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 relative z-10 text-xs">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-slate-300 uppercase block">Bergabung Sejak</span>
                <span className="font-bold text-white text-xs">{joinDate}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-slate-300 uppercase block">Total Timbang</span>
                <span className="font-black text-emerald-400 text-xs">{totalProcessedWeight}</span>
              </div>
            </div>
          </div>

          {/* 2-Column: Identity Form (Left) & Operational + Account Settings (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Cols: Personal Identity & Pos Location Details Form */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Identitas Petugas & Pos Operasional</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Data resmi yang tercantum di sistem timbangan dan struk transaksi nasabah.</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Nama Lengkap Petugas
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={officerName}
                        onChange={(e) => setOfficerName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Nomor Induk Kependudukan (NIK)
                    </label>
                    <input
                      type="text"
                      disabled
                      value={nik}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 font-mono cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Nomor Telepon / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Email Operasional Agen
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Nama Pos Agen
                    </label>
                    <div className="relative">
                      <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={posName}
                        onChange={(e) => setPosName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Alamat Lengkap Operasional Pos
                    </label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3.5 top-3 text-slate-400" />
                      <textarea
                        rows={2}
                        required
                        value={posAddress}
                        onChange={(e) => setPosAddress(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                        Jam Operasional Layanan
                      </label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={operatingHours}
                          onChange={(e) => setOperatingHours(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                        Hari Operasional
                      </label>
                      <input
                        type="text"
                        value={operatingDays}
                        onChange={(e) => setOperatingDays(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer"
                  >
                    Simpan Perubahan Data Pos Agen
                  </button>
                </div>
              </form>
            </div>

            {/* Right 5 Cols: Pos Status & Account Settings */}
            <div className="lg:col-span-5 space-y-6">
              {/* Account Status & Hardware Specification */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Status & Keanggotaan</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Verifikasi lisensi dan perlengkapan pos.</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block">Status Lisensi Agen:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Aktif & Berizin Resmi</span>
                    </div>
                    <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 dark:text-slate-500 block mb-0.5">Timbangan Terpasang:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{scaleType}</span>
                    <span className="block text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">✓ Tera Kalibrasi Terakhir: 01 Nov 2026</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 dark:text-slate-500 block mb-0.5">Wilayah Layanan:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{district} & Sekitarnya</span>
                  </div>
                </div>
              </div>

              {/* Account Security & Preferences */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Pengaturan Akun & Keamanan</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Sinkronisasi data timbangan dan sandi.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 cursor-pointer">
                    <div className="pr-3">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">Sinkronisasi Instan Saldo</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Kirim reward langsung setelah konfirmasi timbang.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={instantSync}
                      onChange={(e) => setInstantSync(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 cursor-pointer">
                    <div className="pr-3">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">Kirim Bukti Struk via WA</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Struk digital dikirim ke nomor nasabah.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsReceiptAlert}
                      onChange={(e) => setSmsReceiptAlert(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
                    />
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-200 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Lock size={14} className="text-slate-400" />
                      Ubah Kata Sandi Agen
                    </span>
                    <span className="text-xs text-emerald-600 font-semibold">Ubah</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {passwordSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Kata Sandi Berhasil Diperbarui!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Kata sandi akun agen telah berhasil diubah.</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ubah Kata Sandi Agen</h4>
                    <p className="text-[11px] text-slate-400">Gunakan kombinasi minimal 6 karakter</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kata Sandi Lama
                  </label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Simpan Sandi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
