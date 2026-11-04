import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import Login from './pages/auth/login';
import HomeMasyarakat from './pages/masyarakat/home';
import DashboardAgen from './pages/agen/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/masyarakat" element={<HomeMasyarakat />} />
        <Route path="/agen" element={<DashboardAgen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;