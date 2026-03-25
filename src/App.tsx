
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/public/LandingPage';

// Placeholder empty components for the modules
const PortfolioDashboard = () => <div className="p-6">Portfolio Dashboard</div>;
const MatterCommandCenter = () => <div className="p-6">Matter Command Center</div>;
const EvidenceIntake = () => <div className="p-6">Evidence Intake</div>;
const ChronologyEngine = () => <div className="p-6">Unified Chronology</div>;
const FinancialForensics = () => <div className="p-6">Financial Forensics</div>;
const Settings = () => <div className="p-6">Settings & Rules Engine</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authenticated App Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/portfolio" replace />} />
          <Route path="portfolio" element={<PortfolioDashboard />} />
          <Route path="matter/:id" element={<MatterCommandCenter />} />
          <Route path="evidence" element={<EvidenceIntake />} />
          <Route path="chronology" element={<ChronologyEngine />} />
          <Route path="financials" element={<FinancialForensics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
