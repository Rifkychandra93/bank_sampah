import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/landingPage';
import Login from './pages/auth/login';
import HomeMasyarakat from './pages/masyarakat/home';
import ProfileMasyarakat from './pages/masyarakat/profile';
import LokasiSetorMasyarakat from './pages/masyarakat/lokasi';
import RiwayatSetoranMasyarakat from './pages/masyarakat/riwayat';
import DashboardAgen from './pages/agen/dashboard';
import RiwayatAgen from './pages/agen/riwayat';
import DashboardSuperadmin from './pages/superadmin/dashboard';
import ManageAgen from './pages/superadmin/manageAgen';
import ManageMasyarakat from './pages/superadmin/manageMasyarakat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/masyarakat" element={<HomeMasyarakat />} />
        <Route path="/masyarakat/profile" element={<ProfileMasyarakat />} />
        <Route path="/agen" element={<DashboardAgen />} />
        <Route path="/agen/riwayat" element={<RiwayatAgen />} />
        <Route path="/superadmin" element={<DashboardSuperadmin />} />
        <Route path="/superadmin/agen" element={<ManageAgen />} />
        <Route path="/superadmin/masyarakat" element={<ManageMasyarakat />} />
      </Routes>
    </BrowserRouter>
import HargaSampahAgen from './pages/agen/harga';
import ProfileAgen from './pages/agen/profile';
import DashboardAdmin from './pages/admin/dashboard';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/masyarakat" element={<HomeMasyarakat />} />
          <Route path="/masyarakat/lokasi" element={<LokasiSetorMasyarakat />} />
          <Route path="/masyarakat/riwayat" element={<RiwayatSetoranMasyarakat />} />
          <Route path="/masyarakat/profile" element={<ProfileMasyarakat />} />
          <Route path="/agen" element={<DashboardAgen />} />
          <Route path="/agen/riwayat" element={<RiwayatAgen />} />
          <Route path="/agen/harga" element={<HargaSampahAgen />} />
          <Route path="/agen/profile" element={<ProfileAgen />} />
          <Route path="/admin" element={<DashboardAdmin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
