import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { ThemeToggle } from '../../context/ThemeContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Wallet,
  ShieldCheck,
  Lock,
  Bell,
  CheckCircle2,
  Copy,
  Check,
  Leaf,
  TreePine,
  Cloud,
  X,
  ArrowUpRight,
  ChevronRight,
  Clock,
  Building2,
  ArrowLeft,
  LogOut
} from 'lucide-react';

export default function ProfileMasyarakat() {
  const navigate = useNavigate();
  const userId = 'USER-123456';

  // State for editable profile fields
  const [userName, setUserName] = useState('Rifky Chandra');
  const [phone, setPhone] = useState('0812-3456-7890');
  const [email, setEmail] = useState('rifky.chandra@gmail.com');
  const [address, setAddress] = useState('Jl. Melati Raya No. 14, RT 03 / RW 05, Kel. Sukajadi');
  const [preferredDropPoint, setPreferredDropPoint] = useState('Pos Melati RW 05');

  // Wallet / Payout info
  const [balance, setBalance] = useState<number>(125000);
  const [payoutMethod, setPayoutMethod] = useState('DANA');
  const [payoutNumber, setPayoutNumber] = useState('0812-3456-7890');
  const [payoutName, setPayoutName] = useState('Rifky Chandra');

  // Preferences
  const [waNotification, setWaNotification] = useState(true);
  const [priceAlert, setPriceAlert] = useState(true);

  // Modals & UI states
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Password change states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Withdrawal form states
  const [withdrawAmount, setWithdrawAmount] = useState('50000');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('ecoBank_userName');
    if (savedName) setUserName(savedName);

    const savedPhone = localStorage.getItem('ecoBank_userPhone');
    if (savedPhone) setPhone(savedPhone);

    const savedEmail = localStorage.getItem('ecoBank_userEmail');
    if (savedEmail) setEmail(savedEmail);

    const savedAddress = localStorage.getItem('ecoBank_userAddress');
    if (savedAddress) setAddress(savedAddress);

    const savedDropPoint = localStorage.getItem('ecoBank_preferredDropPoint');
    if (savedDropPoint) setPreferredDropPoint(savedDropPoint);

    const savedBalance = localStorage.getItem('ecoBank_userBalance');
    if (savedBalance) setBalance(Number(savedBalance));

    const savedPayoutMethod = localStorage.getItem('ecoBank_payoutMethod');
    if (savedPayoutMethod) setPayoutMethod(savedPayoutMethod);

    const savedPayoutNumber = localStorage.getItem('ecoBank_payoutNumber');
    if (savedPayoutNumber) setPayoutNumber(savedPayoutNumber);

    const savedPayoutName = localStorage.getItem('ecoBank_payoutName');
    if (savedPayoutName) setPayoutName(savedPayoutName);
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(userId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ecoBank_userName', userName);
    localStorage.setItem('ecoBank_userPhone', phone);
    localStorage.setItem('ecoBank_userEmail', email);
    localStorage.setItem('ecoBank_userAddress', address);
    localStorage.setItem('ecoBank_preferredDropPoint', preferredDropPoint);
    localStorage.setItem('ecoBank_payoutMethod', payoutMethod);
    localStorage.setItem('ecoBank_payoutNumber', payoutNumber);
    localStorage.setItem('ecoBank_payoutName', payoutName);

    setSaveToast('Perubahan data profil berhasil disimpan!');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(withdrawAmount);
    if (isNaN(amountNum) || amountNum < 10000) {
      alert('Minimal penarikan saldo adalah Rp 10.000');
      return;
    }
    if (amountNum > balance) {
      alert('Saldo tidak mencukupi untuk nominal penarikan ini.');
      return;
    }

    const newBalance = balance - amountNum;
    setBalance(newBalance);
    localStorage.setItem('ecoBank_userBalance', newBalance.toString());
    setWithdrawSuccess(true);
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

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 selection:bg-emerald-500 selection:text-white transition-colors">
      {/* Dedicated Clean Header for Profile (No duplicate Dashboard navigation) */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/masyarakat" className="flex items-center group">
              <Logo imgClassName="h-7 sm:h-8 w-auto" subtitle="Profil" />
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Tombol Kembali ke Halaman Sebelumnya */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ArrowLeft size={15} />
              <span>Kembali</span>
            </button>

            <ThemeToggle />

            {/* Tombol Keluar Tunggal */}
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Keluar</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        {/* Toast Alert */}
        {saveToast && (
          <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle2 size={18} />
            <span className="text-sm font-bold">{saveToast}</span>
          </div>
        )}

        {/* Page Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Pengaturan Akun Nasabah</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Profil & Identitas Nasabah
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Kelola data diri, kartu anggota digital, rekening pencairan saldo, dan preferensi akun.
            </p>
          </div>
        </div>

        {/* Top Grid: Digital Member Pass Card & Saldo Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Digital Member Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden border border-emerald-900/50 flex flex-col justify-between min-h-[240px]">
            {/* Ambient Background Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 backdrop-blur-xs">
                  <Leaf size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-extrabold text-sm tracking-wider uppercase">Bank Sampah EcoTrust</span>
                  <span className="block text-[10px] text-emerald-300 font-mono tracking-widest">KARTU ANGGOTA DIGITAL</span>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck size={13} /> Terverifikasi
              </span>
            </div>

            {/* Middle row: Card chip & ID */}
            <div className="my-5 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-7 rounded-md bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                  <div className="w-6 h-4 border border-amber-300/40 rounded flex flex-col justify-around p-0.5">
                    <div className="h-px bg-amber-300/50 w-full" />
                    <div className="h-px bg-amber-300/50 w-full" />
                  </div>
                </div>
                <span className="font-mono text-sm tracking-widest text-slate-300">
                  •••• •••• {userId.slice(-6)}
                </span>
              </div>

              <p className="text-xl sm:text-2xl font-black text-white tracking-wide">
                {userName}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-mono text-emerald-300 font-bold bg-white/10 px-2.5 py-0.5 rounded-md">
                  ID: {userId}
                </span>
                <button
                  onClick={handleCopyId}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md transition cursor-pointer"
                  title="Salin ID Nasabah"
                >
                  {copiedId ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedId ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>

            {/* Bottom row of card */}
            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Level Keanggotaan</span>
                <span className="font-bold text-emerald-300 text-xs">Sahabat Hijau (Level 2)</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Pos Operasional</span>
                <span className="font-bold text-slate-200 text-xs">{preferredDropPoint}</span>
              </div>
            </div>
          </div>

          {/* Quick Balance & Payout Box */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Saldo Siap Tarik</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Hasil verifikasi timbangan sampah</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Aktif
                </span>
              </div>

              <div className="my-2">
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {formatRupiah(balance)}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                  <CreditCard size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">Rekening: <strong>{payoutMethod}</strong> ({payoutNumber})</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setWithdrawSuccess(false);
                  setIsWithdrawModalOpen(true);
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <ArrowUpRight size={16} />
                <span>Tarik Tunai / Pindah Saldo</span>
              </button>
              <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
                Pencairan langsung ke e-wallet atau bank tanpa biaya administrasi.
              </p>
            </div>
          </div>
        </div>

        {/* Main 2-Column: Personal Data Form & Payout/Security Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Editable Personal Info Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Data Diri & Alamat Domisili</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Informasi identitas nasabah dan lokasi tinggal.</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition font-medium"
                    placeholder="Nama lengkap"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Nomor WhatsApp / HP
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition font-medium"
                      placeholder="0812-xxxx-xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition font-medium"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Alamat Lengkap Rumah
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition font-medium resize-none"
                    placeholder="Alamat domisili lengkap..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Pos Mitra Pilihan Utama
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    value={preferredDropPoint}
                    onChange={(e) => setPreferredDropPoint(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition font-medium"
                  >
                    <option value="Pos Melati RW 05">Pos Melati RW 05 (Balai Warga - 350 m)</option>
                    <option value="Pos Kelurahan Sukamaju">Pos Kelurahan Sukamaju (700 m)</option>
                    <option value="Pos Cempaka RW 02">Pos Cempaka RW 02 (1.2 km)</option>
                    <option value="Pos Teratai RW 08">Pos Teratai RW 08 (3.1 km)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer"
                >
                  Simpan Perubahan Data Diri
                </button>
              </div>
            </form>
          </div>

          {/* Column 2: Payout Account & Security Settings */}
          <div className="lg:col-span-5 space-y-6">
            {/* Payout Account Setup */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Rekening Pencairan Saldo</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Tujuan transfer hasil setor timbangan.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Metode E-Wallet / Bank
                  </label>
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className="w-full p-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium"
                  >
                    <option value="DANA">DANA (Dompet Digital)</option>
                    <option value="GoPay">GoPay (Gojek)</option>
                    <option value="OVO">OVO</option>
                    <option value="ShopeePay">ShopeePay</option>
                    <option value="Bank BCA">Bank BCA</option>
                    <option value="Bank BRI">Bank BRI</option>
                    <option value="Bank Mandiri">Bank Mandiri</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nomor Rekening / No. HP
                  </label>
                  <input
                    type="text"
                    value={payoutNumber}
                    onChange={(e) => setPayoutNumber(e.target.value)}
                    className="w-full p-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium"
                    placeholder="0812-xxxx-xxxx"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Pemilik Rekening
                  </label>
                  <input
                    type="text"
                    value={payoutName}
                    onChange={(e) => setPayoutName(e.target.value)}
                    className="w-full p-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-750 focus:border-emerald-600 outline-none transition font-medium"
                    placeholder="Nama di akun pencairan"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer"
                  >
                    Simpan Rekening Pencairan
                  </button>
                </div>
              </div>
            </div>

            {/* Notification & Security Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Preferensi & Keamanan</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Pengaturan struk transaksi dan kata sandi.</p>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 cursor-pointer">
                  <div className="pr-3">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Notifikasi WhatsApp Timbang</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Kirim struk otomatis ke WA saat timbang selesai.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={waNotification}
                    onChange={(e) => setWaNotification(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 cursor-pointer">
                  <div className="pr-3">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Pemberitahuan Kenaikan Harga</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Kabar penyesuaian tarif per kg dari bank sampah.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={priceAlert}
                    onChange={(e) => setPriceAlert(e.target.checked)}
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
                    Ubah Kata Sandi Akun
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Eco-Impact Tracker */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <TreePine size={22} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Jejak Dampak Lingkungan Anda
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kontribusi nyata gaya hidup pilah sampah bersama EcoTrust.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Total Sampah</span>
                <Leaf size={16} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">18.5 <span className="text-xs font-bold text-slate-400">kg</span></p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Plastik, kardus & kaleng</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Emisi Karbon</span>
                <Cloud size={16} className="text-teal-600 dark:text-teal-400" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">25.9 <span className="text-xs font-bold text-slate-400">kg CO₂e</span></p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Reduksi gas rumah kaca</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Pohon Terselamatkan</span>
                <TreePine size={16} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">2.4 <span className="text-xs font-bold text-slate-400">Pohon</span></p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Ekuivalen serat kayu</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Frekuensi Setor</span>
                <Clock size={16} className="text-amber-600 dark:text-amber-400" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">6 <span className="text-xs font-bold text-slate-400">Kali</span></p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">100% tepat timbang di pos</p>
            </div>
          </div>
        </section>
      </main>

      {/* Withdrawal Simulation Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsWithdrawModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {withdrawSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Pencairan Berhasil Diajukan!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dana sebesar <strong>{formatRupiah(Number(withdrawAmount))}</strong> sedang diproses ke {payoutMethod} ({payoutNumber}).
                </p>
                <button
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="w-full mt-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Selesai
                </button>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">Tarik Saldo</h4>
                    <p className="text-xs text-slate-400">Tersedia: {formatRupiah(balance)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nominal Penarikan (Rp)
                  </label>
                  <input
                    type="number"
                    min="10000"
                    step="5000"
                    max={balance}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full p-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Minimal Rp 10.000</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <p>Tujuan: <strong>{payoutMethod}</strong></p>
                  <p>Rekening: <strong>{payoutNumber}</strong> ({payoutName})</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsWithdrawModalOpen(false)}
                    className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
                  >
                    Konfirmasi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Kata Sandi Diperbarui!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Kata sandi akun Anda telah berhasil diubah.</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ubah Kata Sandi</h4>
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
                    className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
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
