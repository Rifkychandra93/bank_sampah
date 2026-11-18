import { useState, useEffect, useMemo } from 'react';
import { SuperadminSidebar } from '../../components/superadmin/sidebar';
import {
  getMembers,
  saveMembers,
  getAgents,
  getMemberLevel,
  formatRupiah
} from '../../data/superadminStore';
import type { MasyarakatRecord, AgenRecord } from '../../data/superadminStore';
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
  Power,
  Store
} from 'lucide-react';

interface MemberFormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  posAgen: string;
  balance: string;
  totalWeightKg: string;
  status: 'Aktif' | 'Nonaktif';
}

export default function ManageMasyarakat() {
  const [members, setMembers] = useState<MasyarakatRecord[]>([]);
  const [agents, setAgents] = useState<AgenRecord[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Aktif' | 'Nonaktif'>('all');
  const [posFilter, setPosFilter] = useState('all');

  // Modal & toast states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MasyarakatRecord | null>(null);
  const [form, setForm] = useState<MemberFormState>({
    name: '',
    email: '',
    phone: '',
    address: '',
    posAgen: 'Pos Melati RW 05',
    balance: '0',
    totalWeightKg: '0',
    status: 'Aktif'
  });
  const [deleteTarget, setDeleteTarget] = useState<MasyarakatRecord | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setMembers(getMembers());
    setAgents(getAgents());
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const posOptions = useMemo(() => {
    const names = new Set<string>(agents.map((a) => a.posName));
    members.forEach((m) => {
      if (m.posAgen) names.add(m.posAgen);
    });
    return Array.from(names);
  }, [agents, members]);

  const filteredMembers = useMemo(() => {
    const q = search.toLowerCase().trim();
    return members.filter((m) => {
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.userId.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.address.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || m.status === statusFilter;
      const matchPos = posFilter === 'all' || m.posAgen === posFilter;
      return matchSearch && matchStatus && matchPos;
    });
  }, [members, search, statusFilter, posFilter]);

  const stats = useMemo(() => {
    const active = members.filter((m) => m.status === 'Aktif').length;
    const totalBalance = members.reduce((sum, m) => sum + m.balance, 0);
    const totalWeight = members.reduce((sum, m) => sum + m.totalWeightKg, 0);
    return { total: members.length, active, totalBalance, totalWeight };
  }, [members]);

  const openAddModal = () => {
    setEditingMember(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      posAgen: posOptions[0] || 'Pos Melati RW 05',
      balance: '0',
      totalWeightKg: '0',
      status: 'Aktif'
    });
    setIsFormOpen(true);
  };

  const openEditModal = (member: MasyarakatRecord) => {
    setEditingMember(member);
    setForm({
      name: member.name,
      email: member.email,
      phone: member.phone,
      address: member.address,
      posAgen: member.posAgen,
      balance: String(member.balance),
      totalWeightKg: String(member.totalWeightKg),
      status: member.status
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numBalance = Math.max(0, parseInt(form.balance, 10) || 0);
    const numWeight = Math.max(0, parseFloat(form.totalWeightKg) || 0);

    if (editingMember) {
      const updated = members.map((m) =>
        m.id === editingMember.id
          ? {
              ...m,
              name: form.name.trim(),
              email: form.email.trim(),
              phone: form.phone.trim(),
              address: form.address.trim(),
              posAgen: form.posAgen,
              balance: numBalance,
              totalWeightKg: numWeight,
              status: form.status
            }
          : m
      );
      setMembers(updated);
      saveMembers(updated);
      showToast(`Data nasabah ${form.name} berhasil diperbarui!`);
    } else {
      const randomSix = Math.floor(100000 + Math.random() * 900000);
      const newMember: MasyarakatRecord = {
        id: `usr-${Date.now()}`,
        userId: `USER-${randomSix}`,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        posAgen: form.posAgen,
        balance: numBalance,
        totalWeightKg: numWeight,
        status: form.status,
        joinedDate: new Date().toISOString().slice(0, 10)
      };
      const updated = [newMember, ...members];
      setMembers(updated);
      saveMembers(updated);
      showToast(`Nasabah ${newMember.name} berhasil ditambahkan!`);
    }

    setIsFormOpen(false);
    setEditingMember(null);
  };

  const handleToggleStatus = (member: MasyarakatRecord) => {
    const nextStatus: 'Aktif' | 'Nonaktif' = member.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    const updated = members.map((m) => (m.id === member.id ? { ...m, status: nextStatus } : m));
    setMembers(updated);
    saveMembers(updated);
    showToast(`Status ${member.name} diubah menjadi ${nextStatus}.`);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = members.filter((m) => m.id !== deleteTarget.id);
    setMembers(updated);
    saveMembers(updated);
    showToast(`Data nasabah ${deleteTarget.name} berhasil dihapus.`);
    setDeleteTarget(null);
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      <SuperadminSidebar />

      <main className="flex-1 p-5 sm:p-6 md:p-8 pt-20 lg:pt-8 overflow-y-auto">
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
            <CheckCircle2 size={18} />
            <span className="text-xs sm:text-sm font-bold">{toast}</span>
          </div>
        )}

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Manajemen Akun Nasabah</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Kelola Data Masyarakat
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tambah nasabah baru, ubah informasi domisili/saldo, pantau total setoran, dan kelola status keanggotaan.
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-eco-green hover:bg-eco-dark transition shadow-md shadow-eco-green/20 active:scale-95 cursor-pointer"
            >
              <Plus size={17} />
              <span>Tambah Masyarakat</span>
            </button>
          </div>

          {/* Stat Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Nasabah</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Nasabah Aktif</span>
              <p className="text-2xl font-black text-eco-green mt-1">{stats.active}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Saldo Beredar</span>
              <p className="text-xl sm:text-2xl font-black text-eco-green mt-1">{formatRupiah(stats.totalBalance)}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Setoran Warga</span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {stats.totalWeight.toLocaleString('id-ID', { maximumFractionDigits: 1 })}{' '}
                <span className="text-xs font-semibold text-slate-400">kg</span>
              </p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari ID nasabah, nama, email, atau alamat..."
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green focus:ring-2 focus:ring-eco-green/20 outline-none transition"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="sm:col-span-3">
              <select
                value={posFilter}
                onChange={(e) => setPosFilter(e.target.value)}
                className="w-full py-2.5 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none font-medium text-slate-700"
              >
                <option value="all">Semua Pos Agen</option>
                {posOptions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'Aktif' | 'Nonaktif')}
                className="w-full py-2.5 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none font-medium text-slate-700"
              >
                <option value="all">Semua Status</option>
                <option value="Aktif">Status Aktif</option>
                <option value="Nonaktif">Status Nonaktif</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            {filteredMembers.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Users size={26} />
                </div>
                <h3 className="text-sm font-bold text-slate-800">Tidak ada data masyarakat ditemukan</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Coba sesuaikan pencarian/filter atau tambahkan nasabah baru.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-5">Nasabah & ID</th>
                      <th className="py-3.5 px-5">Kontak & Domisili</th>
                      <th className="py-3.5 px-5">Pos Agen Binaan</th>
                      <th className="py-3.5 px-5 text-right">Setoran & Level</th>
                      <th className="py-3.5 px-5 text-right">Saldo Tabungan</th>
                      <th className="py-3.5 px-5 text-center">Status</th>
                      <th className="py-3.5 px-5 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMembers.map((member) => {
                      const level = getMemberLevel(member.totalWeightKg);
                      return (
                        <tr key={member.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-emerald-100/80 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0">
                                {getInitials(member.name)}
                              </div>
                              <div>
                                <p className="font-bold text-xs text-slate-900">{member.name}</p>
                                <p className="text-[11px] font-mono text-slate-400">{member.userId}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-5 max-w-[230px]">
                            <div className="text-[11px] text-slate-600 flex items-center gap-1 truncate">
                              <Mail size={11} className="shrink-0" /> {member.email}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1">
                              <Phone size={11} className="shrink-0" /> {member.phone}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 truncate mt-0.5">
                              <MapPin size={11} className="shrink-0 text-emerald-600" /> {member.address}
                            </div>
                          </td>

                          <td className="py-4 px-5">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                              <Store size={12} className="text-eco-green" />
                              {member.posAgen}
                            </span>
                          </td>

                          <td className="py-4 px-5 text-right">
                            <p className="font-black text-xs text-slate-900">
                              {member.totalWeightKg.toLocaleString('id-ID')} kg
                            </p>
                            <span
                              className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${level.color}`}
                            >
                              {level.label}
                            </span>
                          </td>

                          <td className="py-4 px-5 text-right">
                            <span className="font-black text-sm text-eco-green">
                              {formatRupiah(member.balance)}
                            </span>
                          </td>

                          <td className="py-4 px-5 text-center">
                            <button
                              onClick={() => handleToggleStatus(member)}
                              title="Klik untuk ubah status aktif/nonaktif"
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition cursor-pointer ${
                                member.status === 'Aktif'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                              }`}
                            >
                              <Power size={11} />
                              {member.status}
                            </button>
                          </td>

                          <td className="py-4 px-5">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => openEditModal(member)}
                                className="p-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-emerald-50 hover:text-eco-green transition cursor-pointer"
                                title="Edit Masyarakat"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => setDeleteTarget(member)}
                                className="p-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                                title="Hapus Masyarakat"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-eco-green flex items-center justify-center">
                <Users size={20} />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">
                  {editingMember ? `Edit Nasabah: ${editingMember.name}` : 'Tambah Nasabah Masyarakat'}
                </h2>
                <p className="text-xs text-slate-500">
                  Lengkapi biodata, pos agen binaan, serta informasi saldo nasabah.
                </p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Contoh: Fajar Nugroho"
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp / HP</label>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Nasabah</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nama@gmail.com"
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Domisili (RT/RW)</label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Contoh: Jl. Melati No. 12, RT 02/RW 05"
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pos Agen Binaan</label>
                  <select
                    value={form.posAgen}
                    onChange={(e) => setForm({ ...form, posAgen: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none font-medium"
                  >
                    {posOptions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status Keanggotaan</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as 'Aktif' | 'Nonaktif' })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none font-medium"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Saldo Tabungan (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    required
                    value={form.balance}
                    onChange={(e) => setForm({ ...form, balance: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Setoran (kg)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    required
                    value={form.totalWeightKg}
                    onChange={(e) => setForm({ ...form, totalWeightKg: e.target.value })}
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-eco-green hover:bg-eco-dark text-white font-bold text-xs transition shadow-md shadow-eco-green/20 cursor-pointer"
                >
                  {editingMember ? 'Simpan Perubahan' : 'Tambahkan Masyarakat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-base font-black text-slate-900">Hapus Data Masyarakat?</h3>
            <p className="text-xs text-slate-500 mt-1.5">
              Anda yakin ingin menghapus akun <strong>{deleteTarget.name}</strong> ({deleteTarget.userId})? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
