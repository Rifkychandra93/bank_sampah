import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/masyarakat/navbar';
import { UserQrModal } from '../../components/masyarakat/userQrModal';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Wallet,
  Award,
  ShieldCheck,
  QrCode,
  Lock,
  Bell,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Leaf,
  TreePine,
  Cloud,
  Coins,
  X,
  ArrowUpRight,
  ChevronRight,
  Clock,
  Building2,
  AlertCircle
} from 'lucide-react';

export default function ProfileMasyarakat() {
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
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Withdrawal form states
  const [withdrawAmount, setWithdrawAmount] = useState('50000');
  const [withdrawMethod, setWithdrawMethod] = useState('DANA');
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

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 selection:bg-emerald-500 selection:text-white">
      <Navbar userName={userName} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Toast Alert */}
        {saveToast && (
          <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle2 size={18} />
            <span className="text-sm font-bold">{saveToast}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Identitas & Pengaturan Akun</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Profil Nasabah EcoBank
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Kelola data diri, kartu anggota digital, pencapaian jejak hijau, dan rekening reward Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/masyarakat"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80 shadow-xs transition"
            >
              <span>← Kembali ke Dashboard</span>
            </Link>

            <button
              onClick={() => setIsQrModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-95 transition cursor-pointer"
            >
              <QrCode size={16} />
              <span>Buka QR Setor</span>
            </button>
          </div>
        </div>

        {/* Hero Section: Digital Member Card & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Digital Member Card (Credit-Card Style) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-900/40 flex flex-col justify-between min-h-[250px]">
            {/* Ambient Background Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top row of card */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 backdrop-blur-xs">
                  <Leaf size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-black text-sm tracking-wider uppercase">EcoBank</span>
                  <span className="block text-[10px] text-emerald-300 font-mono tracking-widest">DIGITAL PASS NASABAH</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <ShieldCheck size={13} /> Terverifikasi
                </span>
              </div>
            </div>

            {/* Middle row: Card chip & ID */}
            <div className="my-6 relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                  <div className="w-7 h-5 border border-amber-300/40 rounded flex flex-col justify-around p-0.5">
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
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-mono text-emerald-300 font-bold bg-white/5 px-2.5 py-0.5 rounded-md">
                  {userId}
                </span>
                <button
                  onClick={handleCopyId}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md transition cursor-pointer"
                >
                  {copiedId ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedId ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>

            {/* Bottom row of card */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Level Keanggotaan</span>
                <span className="font-bold text-emerald-300 text-xs">Level 2: Sahabat Hijau (+5%)</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Pos Agen Terdaftar</span>
                <span className="font-bold text-slate-200 text-xs">{preferredDropPoint}</span>
              </div>
            </div>
          </div>

          {/* Quick Balance & Withdrawal Box */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Saldo Siap Tarik</h3>
                    <p className="text-xs text-slate-400">Hasil tukar sampah terverifikasi</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Aktif
                </span>
              </div>

              <div className="my-2">
                <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {formatRupiah(balance)}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CreditCard size={15} className="text-emerald-600 shrink-0" />
                  <span className="truncate">Tujuan: <strong>{payoutMethod}</strong> ({payoutNumber})</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setWithdrawSuccess(false);
                  setIsWithdrawModalOpen(true);
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <ArrowUpRight size={16} />
                <span>Tarik Tunai / Pindah Saldo</span>
              </button>
              <p className="text-center text-[11px] text-slate-400">
                Pencairan instan ke DANA, GoPay, OVO, atau transfer Bank tanpa biaya admin.
              </p>
            </div>
          </div>
        </div>

        {/* Eco-Impact Tracker (Environmental Contribution) */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <TreePine size={22} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Jejak Dampak Lingkungan Anda
                </h2>
                <p className="text-xs text-slate-500">
                  Kontribusi nyata gaya hidup minim sampah yang Anda hasilkan bersama EcoBank.
                </p>
              </div>
            </div>

            <span className="self-start sm:self-auto text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles size={13} className="text-emerald-600" />
              1.250 Poin Ekologis Aktif
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold text-slate-600">Total Sampah Terolah</span>
                <Leaf size={16} className="text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">23.5 <span className="text-xs font-bold text-slate-400">kg</span></p>
              <p className="text-[11px] text-slate-500 mt-1">Plastik, kardus & kaleng</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold text-slate-600">Emisi Karbon Dicegah</span>
                <Cloud size={16} className="text-teal-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">32.9 <span className="text-xs font-bold text-slate-400">kg CO₂e</span></p>
              <p className="text-[11px] text-slate-500 mt-1">Reduksi gas rumah kaca</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold text-slate-600">Pohon Terselamatkan</span>
                <TreePine size={16} className="text-emerald-700" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">3.2 <span className="text-xs font-bold text-slate-400">Pohon</span></p>
              <p className="text-[11px] text-slate-500 mt-1">Ekuivalen daur ulang serat kayu</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold text-slate-600">Frekuensi Setor</span>
                <Clock size={16} className="text-amber-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">8 <span className="text-xs font-bold text-slate-400">Transaksi</span></p>
              <p className="text-[11px] text-slate-500 mt-1">100% tepat timbang di pos agen</p>
            </div>
          </div>
        </section>

        {/* Main 2-Column: Personal Data Form & Payout/Security Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Editable Personal Info Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3 pb-5 mb-5 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Data Diri & Domisili</h3>
                <p className="text-xs text-slate-500">Perbarui identitas dan alamat tinggal untuk sinkronisasi pos agen terdekat.</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Nama Lengkap Sesuai KTP
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition font-medium"
                    placeholder="Contoh: Rifky Chandra"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Nomor WhatsApp / HP
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition font-medium"
                      placeholder="0812-xxxx-xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition font-medium"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Alamat Lengkap Rumah (RT / RW)
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition font-medium resize-none"
                    placeholder="Alamat domisili lengkap..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Pos Agen Drop-Point Utama
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    value={preferredDropPoint}
                    onChange={(e) => setPreferredDropPoint(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition font-medium text-slate-800"
                  >
                    <option value="Pos Melati RW 05">Pos Melati RW 05 (Jarak 350 m - Agen Aktif)</option>
                    <option value="Pos Cempaka RW 02">Pos Cempaka RW 02 (Jarak 850 m)</option>
                    <option value="Pos Kenanga RW 08">Pos Kenanga RW 08 (Jarak 1.2 km)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer"
                >
                  Simpan Perubahan Data Diri
                </button>
              </div>
            </form>
          </div>

          {/* Column 2: Payout & Preferences */}
          <div className="lg:col-span-5 space-y-6">
            {/* Payout Account Setup */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Rekening Pencairan</h3>
                  <p className="text-xs text-slate-500">Tujuan transfer hasil setor timbangan.</p>
                </div>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Metode E-Wallet / Bank</label>
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 outline-none transition font-medium"
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Rekening / No. HP E-Wallet</label>
                  <input
                    type="text"
                    value={payoutNumber}
                    onChange={(e) => setPayoutNumber(e.target.value)}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 outline-none transition font-medium"
                    placeholder="0812-xxxx-xxxx"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Pemilik Akun</label>
                  <input
                    type="text"
                    value={payoutName}
                    onChange={(e) => setPayoutName(e.target.value)}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 outline-none transition font-medium"
                    placeholder="Nama di akun pencairan"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                  >
                    Simpan Rekening Pencairan
                  </button>
                </div>
              </div>
            </div>

            {/* Notification & Security Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Preferensi & Keamanan</h3>
                  <p className="text-xs text-slate-500">Notifikasi timbang dan sandi akun.</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                  <div className="pr-3">
                    <span className="text-xs font-bold text-slate-900 block">Notifikasi WhatsApp Timbang</span>
                    <span className="text-[11px] text-slate-500">Kirim struk otomatis setiap timbang selesai.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={waNotification}
                    onChange={(e) => setWaNotification(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                  <div className="pr-3">
                    <span className="text-xs font-bold text-slate-900 block">Update Harga Sampah</span>
                    <span className="text-[11px] text-slate-500">Kabar penyesuaian tarif per kg dari bank sampah.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={priceAlert}
                    onChange={(e) => setPriceAlert(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
                  />
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Lock size={14} className="text-slate-500" />
                    Ubah Kata Sandi / PIN Keamanan
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Eco Badges & Gamification Showcase */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Award size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Koleksi Lencana Hijau Nasabah</h3>
                <p className="text-xs text-slate-500">Tanda apresiasi komitmen Anda menjaga bumi dari timbunan sampah.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">
              3 Terbuka • 2 Terkunci
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Badge 1 */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-sm text-xl">
                🌱
              </div>
              <h4 className="text-xs font-bold text-slate-900">Setoran Perdana</h4>
              <p className="text-[10px] text-emerald-800 mt-0.5">Selesaikan setor sampah pertama</p>
              <span className="mt-2 text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                Terbuka
              </span>
            </div>

            {/* Badge 2 */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-sm text-xl">
                ♻️
              </div>
              <h4 className="text-xs font-bold text-slate-900">Pilah Cerdas</h4>
              <p className="text-[10px] text-emerald-800 mt-0.5">Setor 3 jenis sampah berbeda</p>
              <span className="mt-2 text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                Terbuka
              </span>
            </div>

            {/* Badge 3 */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-sm text-xl">
                ⚖️
              </div>
              <h4 className="text-xs font-bold text-slate-900">Pejuang 20 Kg</h4>
              <p className="text-[10px] text-emerald-800 mt-0.5">Akumulasi timbang &gt; 20 kg</p>
              <span className="mt-2 text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                Terbuka
              </span>
            </div>

            {/* Badge 4 (In Progress) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center opacity-85">
              <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center mb-2 text-xl">
                🌳
              </div>
              <h4 className="text-xs font-bold text-slate-700">Duta 50 Kg</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Kumpulkan total 50 kg sampah</p>
              <span className="mt-2 text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                23.5 / 50 kg
              </span>
            </div>

            {/* Badge 5 (Locked) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center opacity-60">
              <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center mb-2 text-xl">
                👑
              </div>
              <h4 className="text-xs font-bold text-slate-700">Juara Wilayah</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Penyetor teraktif bulanan di RW</p>
              <span className="mt-2 text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                Terkunci
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* QR Passport Modal */}
      <UserQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        userId={userId}
        userName={userName}
      />

      {/* Withdrawal Simulation Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsWithdrawModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {withdrawSuccess ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-lg font-black text-slate-900">Penarikan Berhasil!</h3>
                <p className="text-xs text-slate-500">
                  Dana sebesar <strong>{formatRupiah(Number(withdrawAmount))}</strong> telah berhasil diproses ke rekening <strong>{withdrawMethod}</strong> ({payoutNumber}).
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs border border-slate-200">
                  <span className="text-slate-400">Sisa Saldo Anda: </span>
                  <span className="font-bold text-emerald-700">{formatRupiah(balance)}</span>
                </div>
                <button
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div className="text-center pb-2 border-b border-slate-100">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Coins size={24} />
                  </div>
                  <h3 className="text-base font-black text-slate-900">Tarik Saldo EcoBank</h3>
                  <p className="text-xs text-slate-400">Saldo aktif: {formatRupiah(balance)}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nominal Penarikan (Rp)</label>
                  <input
                    type="number"
                    step="5000"
                    min="10000"
                    max={balance}
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold focus:border-emerald-600 outline-none"
                    placeholder="Contoh: 50000"
                  />
                  <div className="flex gap-2 mt-2">
                    {[25000, 50000, 100000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setWithdrawAmount(amt.toString())}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition cursor-pointer"
                      >
                        {formatRupiah(amt)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tujuan Pencairan</label>
                  <select
                    value={withdrawMethod}
                    onChange={(e) => setWithdrawMethod(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="DANA">DANA - {payoutNumber}</option>
                    <option value="GoPay">GoPay - {payoutNumber}</option>
                    <option value="OVO">OVO - {payoutNumber}</option>
                    <option value="Bank BCA">Bank BCA - 8021948123</option>
                  </select>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2 text-[11px] text-amber-800">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>Proses instan tanpa potongan biaya admin dari pihak EcoBank.</span>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsWithdrawModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    Tarik Sekarang
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="text-center pb-2 border-b border-slate-100">
              <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Lock size={22} />
              </div>
              <h3 className="text-base font-black text-slate-900">Ubah Kata Sandi</h3>
              <p className="text-xs text-slate-400">Amankan akses portal nasabah Anda</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Kata sandi berhasil diperbarui!');
                setIsPasswordModalOpen(false);
              }}
              className="space-y-3.5 mt-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi Lama</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi Baru</label>
                <input
                  type="password"
                  required
                  placeholder="Minimal 8 karakter"
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
                >
                  Simpan Sandi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

