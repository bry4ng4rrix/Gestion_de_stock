import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './contexts/SidebarContext';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import { DashboardLayout } from './components/layout/DashboardLayout';

const App = () => {
  return (
    <Router>
      <SidebarProvider>
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<Home />} />
          
          {/* Routes du tableau de bord avec mise en page */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Ajoutez ici d'autres routes protégées par le tableau de bord */}
            <Route path="/products" element={<div>Page des produits</div>} />
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