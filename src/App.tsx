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
import AdvancedSEO from './components/AdvancedSEO';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StripeProvider>
          <AdvancedSEO />
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
              {/* Hero Section with Current Timestamp */}
              <section className="text-center mb-12">
                <CurrentTimestamp />
              </section>

              {/* Current Date Details */}
              <CurrentDateDetails />

              {/* Main Converters - Now Tabbed */}
              <MainConverters />

              {/* Competitive Features Section */}
              <CompetitiveFeatures />

              {/* Week and Year Tools */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <YearWeeksOverview />
                <EpochDates />
              </div>

              {/* API Service and Analytics */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <ApiService />
                <UsageAnalytics />
              </div>

              {/* API Testing Dashboard */}
              <section className="mb-12">
                <ApiTester />
              </section>

              {/* Support Us Section */}
              <SupportUs />

              {/* Collapsible Reference Tools */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <TimeReference />
                <div className="space-y-8">
                  <ProgrammingExamples />
                </div>
              </div>

              {/* Batch Converter */}
              <section className="mb-12">
                <BatchConverter />
              </section>

              {/* Collapsible About Section */}
              <AboutEpoch />

              {/* FAQ Section */}
              <FAQ />
            </main>

            <Footer />
          </div>
        </StripeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;