import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';

// Public Pages
import LandingPage from './components/public/LandingPage';
import LoginPage from './components/public/LoginPage';
import RegisterSelectPage from './components/public/RegisterSelectPage';

// Registration Forms
import WorkerRegistration from './components/worker/WorkerRegistration';
import SponsorRegistration from './components/sponsor/SponsorRegistration';
import AgencyRegistration from './components/agency/AgencyRegistration';

// Worker Routes
import WorkerDashboard from './components/worker/WorkerDashboard';
import WorkerProfile from './components/worker/WorkerProfile';
import WorkerDocuments from './components/worker/WorkerDocuments';
import WorkerSponsorshipTransfer from './components/worker/WorkerSponsorshipTransfer';
import WorkerJobOpportunities from './components/worker/WorkerJobOpportunities';
import WorkerApplicationTracking from './components/worker/WorkerApplicationTracking';
import WorkerJobOffer from './components/worker/WorkerJobOffer';

// Sponsor Routes
import SponsorDashboard from './components/sponsor/SponsorDashboard';
import SponsorWorkerRequests from './components/sponsor/SponsorWorkerRequests';
import SponsorWorkerSearch from './components/sponsor/SponsorWorkerSearch';
import SponsorRecommendedWorkers from './components/sponsor/SponsorRecommendedWorkers';
import SponsorJobOffers from './components/sponsor/SponsorJobOffers';
import SponsorRecruitmentApproval from './components/sponsor/SponsorRecruitmentApproval';

// Agency Routes
import AgencyDashboard from './components/agency/AgencyDashboard';
import AgencyRegisterWorker from './components/agency/AgencyRegisterWorker';
import AgencyManageWorkers from './components/agency/AgencyManageWorkers';
import AgencyVerifyDocuments from './components/agency/AgencyVerifyDocuments';
import AgencyRecruitmentRequests from './components/agency/AgencyRecruitmentRequests';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterSelectPage />} />
          
          <Route path="/register/worker" element={<WorkerRegistration />} />
          <Route path="/register/sponsor" element={<SponsorRegistration />} />
          <Route path="/register/agency" element={<AgencyRegistration />} />
          
          {/* Worker Routes */}
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/worker/profile" element={<WorkerProfile />} />
          <Route path="/worker/documents" element={<WorkerDocuments />} />
          <Route path="/worker/sponsorship" element={<WorkerSponsorshipTransfer />} />
          <Route path="/worker/jobs" element={<WorkerJobOpportunities />} />
          <Route path="/worker/applications" element={<WorkerApplicationTracking />} />
          <Route path="/worker/offers/:id" element={<WorkerJobOffer />} />

          {/* Sponsor Routes */}
          <Route path="/sponsor/dashboard" element={<SponsorDashboard />} />
          <Route path="/sponsor/requests" element={<SponsorWorkerRequests />} />
          <Route path="/sponsor/search" element={<SponsorWorkerSearch />} />
          <Route path="/sponsor/recommended" element={<SponsorRecommendedWorkers />} />
          <Route path="/sponsor/offers" element={<SponsorJobOffers />} />
          <Route path="/sponsor/approval" element={<SponsorRecruitmentApproval />} />

          {/* Agency Routes */}
          <Route path="/agency/dashboard" element={<AgencyDashboard />} />
          <Route path="/agency/register-worker" element={<AgencyRegisterWorker />} />
          <Route path="/agency/workers" element={<AgencyManageWorkers />} />
          <Route path="/agency/documents" element={<AgencyVerifyDocuments />} />
          <Route path="/agency/requests" element={<AgencyRecruitmentRequests />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}
