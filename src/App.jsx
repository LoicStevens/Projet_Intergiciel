import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Authentification/Login';
import Register from './pages/Authentification/Register';
import ResetPassword from './pages/Authentification/ResetPassword';
import ForgotPassword from './pages/Authentification/ForgotPassword';
import OtpVerification from './pages/Authentification/OtpVerification';
import Home from './pages/Home';
import Loader from './components/Loader';
import HomePrestataire from './pages/HomePrestataire';


import ProfileComplete from './pages/ProfileComplete';
import ProfilePage from './pages/ProfilePage';
import DashboardClient from './pages/DashboardClient';
import Announcement from './pages/Announcement';
import JobDetail from './pages/JobDetail';
import Blog from './components/Blog';
import BlogC from './components/BlogC';
import  Crea from './components/Crea';
import CreateJob from './components/CreateJob';
import CVPreview from './pages/CVPreview';
import HomePage from './pages/HomePage';
import FAQ from './pages/FAQ';
import ViewProfile from './pages/ViewProfile';

// Le composant AppWrapper qui contient la logique du loader
const AppWrapper = () => {
  const [loading, setLoading] = useState(true);  // Loader actif au démarrage
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);  // Activer le loader
    const handleStop = () => setLoading(false);  // Désactiver le loader

    handleStart();  // Démarre le loader lors du changement de route

    // Simuler une requête asynchrone de données (vous remplacerez cette partie par vos appels API réels)
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Remplacez par une requête réelle
      handleStop();  // Arrêter le loader une fois les données prêtes
    };

    loadData();
  }, [location.pathname]);  // Se déclenche lorsque la route change

  return (
    <>
      {loading && <Loader />}  {/* Affiche le loader pendant le chargement */}
      {!loading && (  // Affiche les routes uniquement lorsque les données sont chargées
        <Routes>
          {/* Authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/otpVerification" element={<OtpVerification />} />

          {/* Pages principales */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home-client" element={<Home />} />
          <Route path="/home-prestataire" element={<HomePrestataire />} />
          <Route path="/profil-completion" element={<ProfileComplete />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<ProfilePage />} />
          <Route path="/dashboard-customer" element={<DashboardClient />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/detail" element={<JobDetail />} />
          <Route path="/blogC" element={<BlogC />} />
          <Route path="/blogP" element={<Blog />} />
          <Route path="/cv-preview" element={<CVPreview />} />
          <Route path="/crea" element={<Crea/>} />
          <Route path="/CreateJob" element={<CreateJob/>} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/view-profil" element={<ViewProfile/>} />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper /> {/* Le composant avec le loader à l'intérieur du Router */}
    </Router>
  );
};

export default App;
