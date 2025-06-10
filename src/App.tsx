import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { StripeProvider } from './contexts/StripeContext';
import Header from './components/Header';
import CurrentTimestamp from './components/CurrentTimestamp';
import CurrentDateDetails from './components/CurrentDateDetails';
import MainConverters from './components/MainConverters';
import YearWeeksOverview from './components/YearWeeksOverview';
import TimeReference from './components/TimeReference';
import EpochDates from './components/EpochDates';
import ProgrammingExamples from './components/ProgrammingExamples';
import BatchConverter from './components/BatchConverter';
import ApiService from './components/ApiService';
import UsageAnalytics from './components/UsageAnalytics';
import CompetitiveFeatures from './components/CompetitiveFeatures';
import ApiTester from './components/ApiTester';
import SupportUs from './components/SupportUs';
import AboutEpoch from './components/AboutEpoch';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StripeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
              {/* Hero Section */}
              <section className="mb-12">
                <CurrentTimestamp />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <CurrentDateDetails />
                </div>
              </section>
              
              {/* Main Converters */}
              <MainConverters />
              
              {/* Year Weeks Overview */}
              <YearWeeksOverview />
              
              {/* Time Reference */}
              <TimeReference />
              
              {/* Epoch Dates */}
              <EpochDates />
              
              {/* Batch Converter */}
              <BatchConverter />
              
              {/* Support Us Section - Added prominently */}
              <SupportUs />
              
              {/* API Service */}
              <ApiService />
              
              {/* API Tester */}
              <ApiTester />
              
              {/* Usage Analytics */}
              <UsageAnalytics />
              
              {/* Competitive Features */}
              <CompetitiveFeatures />
              
              {/* About Epoch */}
              <AboutEpoch />
              
              {/* FAQ */}
              <FAQ />
            </main>
            
            <Footer />
          </div>
        </StripeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

