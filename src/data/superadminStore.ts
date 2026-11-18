export interface AgenRecord {
  id: string;
  code: string;
  posName: string;
  picName: string;
  email: string;
  phone: string;
  area: string;
  status: 'Aktif' | 'Nonaktif';
  totalCollectedKg: number;
  joinedDate: string;
}

export interface MasyarakatRecord {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  posAgen: string;
  balance: number;
  totalWeightKg: number;
  status: 'Aktif' | 'Nonaktif';
  joinedDate: string;
}

export interface WasteCategoryStat {
  id: string;
  key: 'plastik' | 'kertas' | 'kaleng' | 'minyak';
  name: string;
  pricePerKg: number;
  baseKg: number;
  co2Factor: number; // kg CO2 saved per kg waste
  colorClass: string;
  badgeClass: string;
}

export const WASTE_CATEGORIES: WasteCategoryStat[] = [
  {
    id: 'cat-1',
    key: 'plastik',
    name: 'Plastik (PET & Kemasan)',
    pricePerKg: 3000,
    baseKg: 482.5,
    co2Factor: 1.4,
    colorClass: 'bg-emerald-500',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'cat-2',
    key: 'kertas',
    name: 'Kertas & Kardus',
    pricePerKg: 2000,
    baseKg: 415.0,
    co2Factor: 1.1,
    colorClass: 'bg-amber-500',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'cat-3',
    key: 'kaleng',
    name: 'Kaleng & Logam',
    pricePerKg: 5000,
    baseKg: 238.4,
    co2Factor: 2.8,
    colorClass: 'bg-purple-500',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    id: 'cat-4',
    key: 'minyak',
    name: 'Minyak Jelantah',
    pricePerKg: 6000,
    baseKg: 112.6,
    co2Factor: 2.2,
    colorClass: 'bg-teal-500',
    badgeClass: 'bg-teal-50 text-teal-700 border-teal-200'
  }
];

export const DEFAULT_AGENTS: AgenRecord[] = [
  {
    id: 'ag-1',
    code: 'AGN-001',
    posName: 'Pos Melati RW 05',
    picName: 'Hendra Wijaya',
    email: 'agen@gmail.com',
    phone: '0813-2241-9901',
    area: 'Kel. Sukajadi, RW 05',
    status: 'Aktif',
    totalCollectedKg: 412.5,
    joinedDate: '2025-01-15'
  },
  {
    id: 'ag-2',
    code: 'AGN-002',
    posName: 'Pos Cempaka RW 02',
    picName: 'Ratna Sari',
    email: 'pos.cempaka@ecobank.id',
    phone: '0812-8834-1204',
    area: 'Kel. Sukajadi, RW 02',
    status: 'Aktif',
    totalCollectedKg: 328.0,
    joinedDate: '2025-02-04'
  },
  {
    id: 'ag-3',
    code: 'AGN-003',
    posName: 'Pos Kenanga RW 08',
    picName: 'Dedi Kurniawan',
    email: 'pos.kenanga@ecobank.id',
    phone: '0857-9012-4421',
    area: 'Kel. Cempaka Baru, RW 08',
    status: 'Aktif',
    totalCollectedKg: 264.8,
    joinedDate: '2025-03-10'
  },
  {
    id: 'ag-4',
    code: 'AGN-004',
    posName: 'Pos Anggrek RW 01',
    picName: 'Yuliana Putri',
    email: 'pos.anggrek@ecobank.id',
    phone: '0819-4410-7732',
    area: 'Kel. Dago Barat, RW 01',
    status: 'Aktif',
    totalCollectedKg: 185.2,
    joinedDate: '2025-05-22'
  },
  {
    id: 'ag-5',
    code: 'AGN-005',
    posName: 'Pos Dahlia RW 11',
    picName: 'Slamet Riyadi',
    email: 'pos.dahlia@ecobank.id',
    phone: '0821-7753-0189',
    area: 'Kel. Cibadak, RW 11',
    status: 'Nonaktif',
    totalCollectedKg: 58.0,
    joinedDate: '2025-07-08'
  }
];

export const DEFAULT_MEMBERS: MasyarakatRecord[] = [
  {
    id: 'usr-1',
    userId: 'USER-123456',
    name: 'Rifky Chandra',
    email: 'masyarakat@gmail.com',
    phone: '0812-3456-7890',
    address: 'Jl. Melati Raya No. 14, RT 03/RW 05',
    posAgen: 'Pos Melati RW 05',
    balance: 125000,
    totalWeightKg: 23.5,
    status: 'Aktif',
    joinedDate: '2025-03-12'
  },
  {
    id: 'usr-2',
    userId: 'USER-204891',
    name: 'Siti Aminah',
    email: 'siti.aminah@gmail.com',
    phone: '0813-7741-5520',
    address: 'Jl. Cempaka Indah No. 8, RT 01/RW 02',
    posAgen: 'Pos Cempaka RW 02',
    balance: 214500,
    totalWeightKg: 42.0,
    status: 'Aktif',
    joinedDate: '2025-02-20'
  },
  {
    id: 'usr-3',
    userId: 'USER-398124',
    name: 'Budi Santoso',
    email: 'budi.santoso@gmail.com',
    phone: '0856-9102-3348',
    address: 'Gg. Melati II No. 22, RT 04/RW 05',
    posAgen: 'Pos Melati RW 05',
    balance: 89000,
    totalWeightKg: 18.4,
    status: 'Aktif',
    joinedDate: '2025-04-05'
  },
  {
    id: 'usr-4',
    userId: 'USER-410982',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@gmail.com',
    phone: '0822-6019-8831',
    address: 'Jl. Kenanga Barat No. 5, RT 02/RW 08',
    posAgen: 'Pos Kenanga RW 08',
    balance: 310000,
    totalWeightKg: 64.2,
    status: 'Aktif',
    joinedDate: '2025-01-28'
  },
  {
    id: 'usr-5',
    userId: 'USER-551203',
    name: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@gmail.com',
    phone: '0818-3349-1120',
    address: 'Jl. Anggrek Blok C3, RT 05/RW 01',
    posAgen: 'Pos Anggrek RW 01',
    balance: 152000,
    totalWeightKg: 31.8,
    status: 'Aktif',
    joinedDate: '2025-05-14'
  },
  {
    id: 'usr-6',
    userId: 'USER-612094',
    name: 'Nadia Kusuma',
    email: 'nadia.kusuma@gmail.com',
    phone: '0815-9940-2177',
    address: 'Jl. Dahlia No. 19, RT 01/RW 11',
    posAgen: 'Pos Dahlia RW 11',
    balance: 45000,
    totalWeightKg: 9.5,
    status: 'Nonaktif',
    joinedDate: '2025-06-30'
  }
];

const AGENTS_KEY = 'ecoBank_superadmin_agents';
const MEMBERS_KEY = 'ecoBank_superadmin_members';

export function getAgents(): AgenRecord[] {
  try {
    const raw = localStorage.getItem(AGENTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore parse error
  }
  localStorage.setItem(AGENTS_KEY, JSON.stringify(DEFAULT_AGENTS));
  return DEFAULT_AGENTS;
}

export function saveAgents(agents: AgenRecord[]): void {
  localStorage.setItem(AGENTS_KEY, JSON.stringify(agents));
}

export function getMembers(): MasyarakatRecord[] {
  try {
    const raw = localStorage.getItem(MEMBERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore parse error
  }
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(DEFAULT_MEMBERS));
  return DEFAULT_MEMBERS;
}

export function saveMembers(members: MasyarakatRecord[]): void {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
}

export function getMemberLevel(weightKg: number): { label: string; color: string } {
  if (weightKg >= 50) {
    return { label: 'Level 3 • Pejuang', color: 'bg-purple-50 text-purple-700 border-purple-200' };
  }
  if (weightKg >= 20) {
    return { label: 'Level 2 • Sahabat', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  }
  return { label: 'Level 1 • Pemula', color: 'bg-slate-100 text-slate-600 border-slate-200' };
}

export function formatRupiah(val: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(val);
}
