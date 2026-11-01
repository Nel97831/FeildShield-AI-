import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { RegisterFarmPage } from './pages/RegisterFarmPage';
import { DashboardPage } from './pages/DashboardPage';
import { CropRiskCenterPage } from './pages/CropRiskCenterPage';
import { WeatherWarningsPage } from './pages/WeatherWarningsPage';
import { FloodMapPage } from './pages/FloodMapPage';
import { CropPlannerPage } from './pages/CropPlannerPage';
import { PostFloodRecoveryPage } from './pages/PostFloodRecoveryPage';
import { CropPhotoAssessmentPage } from './pages/CropPhotoAssessmentPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { SmsAlertsPage } from './pages/SmsAlertsPage';
import { CustomerCarePage } from './pages/CustomerCarePage';
import { GoogleEarthPage } from './pages/GoogleEarthPage';
import { FloatingChatbot } from './components/FloatingChatbot';

const AppContent: React.FC = () => {
  const { activePage } = useApp();
  const [quotaExceeded, setQuotaExceeded] = React.useState(false);

  React.useEffect(() => {
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'earth':
        return <GoogleEarthPage />;

      case 'register':
        return <RegisterFarmPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'booth':
        return <DashboardPage />;
      case 'risks':
        return <CropRiskCenterPage />;
      case 'insurance':
        return <DashboardPage />;
      case 'smsAlerts':
        return <SmsAlertsPage />;
      case 'customerCare':
        return <CustomerCarePage />;
      case 'floodMap':
        return <FloodMapPage />;
      case 'warnings':
        return <WeatherWarningsPage />;
      case 'planner':
        return <CropPlannerPage />;
      case 'safety':
        return <CustomerCarePage />;
      case 'recovery':
        return <PostFloodRecoveryPage />;
      case 'photoAssess':
        return <CropPhotoAssessmentPage />;
      case 'reports':
        return <DashboardPage />;
      case 'settings':
        return <SmsAlertsPage />;
      case 'dataSources':
        return <DataSourcesPage />;
      case 'assistant':
        return <DashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#051F20] text-[#F1F5F9] font-sans selection:bg-[#8EB69B] selection:text-[#051F20]">

      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">

        {renderPage()}
      </main>
      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
