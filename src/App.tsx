import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { AssessmentPage } from '@/pages/AssessmentPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { ExploreCareersPage } from '@/pages/ExploreCareersPage';
import type { AssessmentData } from '@/types';

export type Page = 'home' | 'assessment' | 'results' | 'explore';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);

  const handleNavigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessmentData(data);
    setPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setAssessmentData(null);
    setPage('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen bg-ink-900 text-slate-200">
      <Navbar currentPage={page} onNavigate={handleNavigate} />

      <main>
        {page === 'home' && <HomePage onNavigate={handleNavigate} />}
        {page === 'assessment' && (
          <AssessmentPage onComplete={handleAssessmentComplete} onNavigate={handleNavigate} />
        )}
        {page === 'results' && assessmentData && (
          <ResultsPage
            assessmentData={assessmentData}
            onNavigate={handleNavigate}
            onRetake={handleRetake}
          />
        )}
        {page === 'results' && !assessmentData && (
          <AssessmentPage onComplete={handleAssessmentComplete} onNavigate={handleNavigate} />
        )}
        {page === 'explore' && <ExploreCareersPage onNavigate={handleNavigate} />}
      </main>

      {page !== 'assessment' && page !== 'results' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
