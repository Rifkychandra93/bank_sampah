import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import Login from './pages/auth/login';
import HomeMasyarakat from './pages/masyarakat/home';
import ProfileMasyarakat from './pages/masyarakat/profile';
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
  );
}

export default App;
