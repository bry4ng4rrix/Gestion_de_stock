import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './contexts/SidebarContext';
import Home from './Pages/Client/index';
import Dashboard from './Pages/Dashboard/Index';
import Produit from './Pages/Dashboard/Produit';
import { DashboardLayout } from './components/layout/DashboardLayout';
import ClientLayout from './components/layout/ClientLayout';
import Historique from './Pages/Client/Historique';

const App = () => {
  return (
    <Router>
      <SidebarProvider>
        <Routes>
          {/* Routes publiques avec ClientLayout */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/panier" element={<div>Panier</div>} />
            <Route path="/historique" element={<Historique />} />
            <Route path="/compte" element={<div>Mon Compte</div>} />
          </Route>
          
          {/* Routes du tableau de bord avec mise en page */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Produit />} />
            <Route path="/orders" element={<div>Page des commandes</div>} />
            <Route path="/customers" element={<div>Page des clients</div>} />
            <Route path="/settings" element={<div>Paramètres</div>} />
          </Route>
          
          {/* Gestion des routes non trouvées */}
          <Route path="*" element={<div>404 - Page non trouvée</div>} />
        </Routes>
      </SidebarProvider>
    </Router>
  );
};

export default App;