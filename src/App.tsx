import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/public/LandingPage';

// Actual Component Imports
import PortfolioDashboard from './pages/dashboard/PortfolioDashboard';
import MatterCommandCenter from './pages/dashboard/MatterCommandCenter';
import EvidenceIntake from './pages/evidence/EvidenceIntake';
import ChronologyEngine from './pages/chronology/ChronologyEngine';
import FinancialForensics from './pages/financials/FinancialForensics';
import PacketBuilder from './pages/packet-builder/PacketBuilder';
import RequestManager from './pages/collaborator/RequestManager';
import CollaboratorPortal from './pages/collaborator/CollaboratorPortal';
import FormsEngine from './pages/forms/FormsEngine';
import AssetDivisionEngine from './pages/assets/AssetDivisionEngine';
import FirmSettings from './pages/settings/FirmSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / External Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/portal/:requestId" element={<CollaboratorPortal />} />
        
        {/* Authenticated App Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/portfolio" replace />} />
          <Route path="portfolio" element={<PortfolioDashboard />} />
          <Route path="matter/:id" element={<MatterCommandCenter />} />
          <Route path="matter/:id/packet" element={<PacketBuilder />} />
          <Route path="matter/:id/forms" element={<FormsEngine />} />
          <Route path="matter/:id/assets" element={<AssetDivisionEngine />} />
          <Route path="evidence" element={<EvidenceIntake />} />
          <Route path="requests" element={<RequestManager />} />
          <Route path="chronology" element={<ChronologyEngine />} />
          <Route path="financials" element={<FinancialForensics />} />
          <Route path="settings" element={<FirmSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
