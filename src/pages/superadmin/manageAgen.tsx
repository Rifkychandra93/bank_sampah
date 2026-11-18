import { useState, useEffect, useMemo } from 'react';
import { SuperadminSidebar } from '../../components/superadmin/sidebar';
import { getAgents, saveAgents } from '../../data/superadminStore';
import type { AgenRecord } from '../../data/superadminStore';
import {
  Store,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Scale,
  AlertTriangle,
  Power
} from 'lucide-react';

interface AgenFormState {
  posName: string;
  picName: string;
  email: string;
  phone: string;
  area: string;
  status: 'Aktif' | 'Nonaktif';
  totalCollectedKg: string;
}

const EMPTY_FORM: AgenFormState = {
  posName: '',
  picName: '',
  email: '',
  phone: '',
  area: '',
  status: 'Aktif',
  totalCollectedKg: '0'
};

export default function ManageAgen() {
  const [agents, setAgents] = useState<AgenRecord[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Aktif' | 'Nonaktif'>('all');

  // Modal & toast state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AgenRecord | null>(null);
  const [form, setForm] = useState<AgenFormState>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<AgenRecord | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setAgents(getAgents());
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredAgents = useMemo(() => {
    const q = search.toLowerCase().trim();
    return agents.filter((a) => {
      const matchSearch =
        !q ||
        a.posName.toLowerCase().includes(q) ||
        a.picName.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.area.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [agents, search, statusFilter]);

  const stats = useMemo(() => {
    const active = agents.filter((a) => a.status === 'Aktif').length;
    const inactive = agents.length - active;
    const totalKg = agents.reduce((sum, a) => sum + a.totalCollectedKg, 0);
    return { total: agents.length, active, inactive, totalKg };
  }, [agents]);

  const openAddModal = () => {
    setEditingAgent(null);
    setForm(EMPTY_FORM);
    setIsFormOpen(true);
  };

  const openEditModal = (agent: AgenRecord) => {
    setEditingAgent(agent);
    setForm({
      posName: agent.posName,
      picName: agent.picName,
      email: agent.email,
      phone: agent.phone,
      area: agent.area,
      status: agent.status,
      totalCollectedKg: String(agent.totalCollectedKg)
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const collected = parseFloat(form.totalCollectedKg) || 0;

    if (editingAgent) {
      const updated = agents.map((a) =>
        a.id === editingAgent.id
          ? {
              ...a,
              posName: form.posName.trim(),
              picName: form.picName.trim(),
              email: form.email.trim(),
              phone: form.phone.trim(),
              area: form.area.trim(),
              status: form.status,
              totalCollectedKg: collected
            }
          : a
      );
      setAgents(updated);
      saveAgents(updated);
      showToast(`Data ${form.posName} berhasil diperbarui!`);
    } else {
      const nextNum = String(agents.length + 1).padStart(3, '0');
      const newAgent: AgenRecord = {
        id: `ag-${Date.now()}`,
        code: `AGN-${nextNum}`,
        posName: form.posName.trim(),
        picName: form.picName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        area: form.area.trim(),
        status: form.status,
        totalCollectedKg: collected,
        joinedDate: new Date().toISOString().slice(0, 10)
      };
      const updated = [newAgent, ...agents];
      setAgents(updated);
      saveAgents(updated);
      showToast(`Pos agen ${newAgent.posName} berhasil ditambahkan!`);
    }

    setIsFormOpen(false);
    setEditingAgent(null);
  };

  const handleToggleStatus = (agent: AgenRecord) => {
    const newStatus: 'Aktif' | 'Nonaktif' = agent.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    const updated = agents.map((a) => (a.id === agent.id ? { ...a, status: newStatus } : a));
    setAgents(updated);
    saveAgents(updated);
    showToast(`Status ${agent.posName} diubah menjadi ${newStatus}.`);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = agents.filter((a) => a.id !== deleteTarget.id);
    setAgents(updated);
    saveAgents(updated);
    showToast(`Pos agen ${deleteTarget.posName} berhasil dihapus.`);
    setDeleteTarget(null);
  };

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
                <span>Manajemen Mitra Drop-Point</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Kelola Data Agen Pos
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tambah, perbarui, ubah status operasional, atau hapus data pos agen pengumpul sampah.
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-eco-green hover:bg-eco-dark transition shadow-md shadow-eco-green/20 active:scale-95 cursor-pointer"
            >
              <Plus size={17} />
              <span>Tambah Agen Baru</span>
            </button>
          </div>

          {/* Stat Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Pos Agen</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Pos Aktif</span>
              <p className="text-2xl font-black text-eco-green mt-1">{stats.active}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Pos Nonaktif</span>
              <p className="text-2xl font-black text-rose-600 mt-1">{stats.inactive}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Akumulasi Sampah</span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {stats.totalKg.toLocaleString('id-ID', { maximumFractionDigits: 1 })}{' '}
                <span className="text-xs font-semibold text-slate-400">kg</span>
              </p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kode pos, nama pos, penanggung jawab, atau wilayah..."
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

            <div className="flex items-center gap-2">
              {(['all', 'Aktif', 'Nonaktif'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    statusFilter === st
                      ? 'bg-eco-green text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st === 'all' ? 'Semua' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            {filteredAgents.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Store size={26} />
                </div>
                <h3 className="text-sm font-bold text-slate-800">Tidak ada data agen ditemukan</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Coba ubah kata kunci pencarian atau tambahkan agen pos baru.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-5">Pos Agen & Kode</th>
                      <th className="py-3.5 px-5">Penanggung Jawab</th>
                      <th className="py-3.5 px-5">Wilayah</th>
                      <th className="py-3.5 px-5 text-right">Terkumpul</th>
                      <th className="py-3.5 px-5 text-center">Status</th>
                      <th className="py-3.5 px-5 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAgents.map((agent) => (
                      <tr key={agent.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-eco-green font-black text-xs flex items-center justify-center shrink-0 border border-emerald-100">
                              <Store size={17} />
                            </div>
                            <div>
                              <p className="font-bold text-xs text-slate-900">{agent.posName}</p>
                              <p className="text-[11px] font-mono text-slate-400">{agent.code}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <p className="font-semibold text-xs text-slate-800">{agent.picName}</p>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Mail size={11} /> {agent.email}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Phone size={11} /> {agent.phone}
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <span className="text-xs text-slate-700 flex items-center gap-1">
                            <MapPin size={13} className="text-emerald-600 shrink-0" />
                            {agent.area}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-right">
                          <span className="font-black text-sm text-slate-900">
                            {agent.totalCollectedKg.toLocaleString('id-ID')}
                          </span>{' '}
                          <span className="text-xs font-semibold text-slate-400">kg</span>
                        </td>

                        <td className="py-4 px-5 text-center">
                          <button
                            onClick={() => handleToggleStatus(agent)}
                            title="Klik untuk ubah status aktif/nonaktif"
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition cursor-pointer ${
                              agent.status === 'Aktif'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                : 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                            }`}
                          >
                            <Power size={11} />
                            {agent.status}
                          </button>
                        </td>

                        <td className="py-4 px-5">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => openEditModal(agent)}
                              className="p-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-emerald-50 hover:text-eco-green transition cursor-pointer"
                              title="Edit Agen"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(agent)}
                              className="p-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                              title="Hapus Agen"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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
                <Store size={20} />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">
                  {editingAgent ? `Edit ${editingAgent.posName}` : 'Tambah Pos Agen Baru'}
                </h2>
                <p className="text-xs text-slate-500">
                  Lengkapi informasi operasional pos agen pengumpul sampah.
                </p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Pos Agen</label>
                  <input
                    type="text"
                    required
                    value={form.posName}
                    onChange={(e) => setForm({ ...form, posName: e.target.value })}
                    placeholder="Contoh: Pos Mawar RW 09"
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Penanggung Jawab (PIC)</label>
                  <input
                    type="text"
                    required
                    value={form.picName}
                    onChange={(e) => setForm({ ...form, picName: e.target.value })}
                    placeholder="Contoh: Agus Pratama"
                    className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Akun Agen</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="pos.mawar@ecotrust.id"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Wilayah / Alamat Pos</label>
                <input
                  type="text"
                  required
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  placeholder="Contoh: Kel. Sukajadi, RW 09"
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Total Terkumpul (kg)
                  </label>
                  <div className="relative">
                    <Scale size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      required
                      value={form.totalCollectedKg}
                      onChange={(e) => setForm({ ...form, totalCollectedKg: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-eco-green outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status Operasional</label>
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
                  {editingAgent ? 'Simpan Perubahan' : 'Tambahkan Agen'}
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
            <h3 className="text-base font-black text-slate-900">Hapus Pos Agen?</h3>
            <p className="text-xs text-slate-500 mt-1.5">
              Anda yakin ingin menghapus <strong>{deleteTarget.posName}</strong> ({deleteTarget.code})? Tindakan ini tidak dapat dibatalkan.
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
