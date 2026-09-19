import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import AssessmentStepper from './components/AssessmentStepper';
import ResultDashboard from './components/ResultDashboard';
import AnalyzingScreen from './components/AnalyzingScreen';
import { ThemeToggle } from './components/ThemeToggle';
import { getResultTier, type AssessmentCategory } from './data/assessmentData';

export type ViewState = 'landing' | 'assessment' | 'analyzing' | 'result';
export interface UserInfo {
  name: string;
  email: string;
  company: string;
  role: string;
}

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [isSharedReport, setIsSharedReport] = useState(false);

  // Check URL for shared report data
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('d');
    
    if (encodedData) {
      try {
        const decodedString = atob(encodedData);
        if (!decodedString.startsWith('{') || !decodedString.endsWith('}')) {
          throw new Error("Invalid payload format");
        }

        const decoded = JSON.parse(decodedString);
        
        // Strict runtime type validation
        if (
          Array.isArray(decoded.s) && 
          decoded.s.length === 5 && 
          decoded.s.every((n: any) => typeof n === 'number') &&
          typeof decoded.n === 'string' &&
          decoded.n.length > 0
        ) {
          setScores(decoded.s);
          setUserInfo({ 
            name: decoded.n, 
            email: typeof decoded.e === 'string' ? decoded.e : "", 
            company: typeof decoded.c === 'string' ? decoded.c : "", 
            role: typeof decoded.r === 'string' ? decoded.r : "" 
          });
          setIsSharedReport(true);
          setView('result');
        } else {
          throw new Error("Invalid payload signature");
        }
      } catch (e) {
        console.warn("Security Alert: Malformed URL payload detected and blocked.");
        // Gracefully ignore the bad payload and clear the URL to prevent retry loops
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  const handleStart = (info: UserInfo) => {
    setUserInfo(info);
    setView('assessment');
  };

  const handleAssessmentComplete = (finalScores: number[]) => {
    setScores(finalScores);
    
    if (userInfo) {
      const totalScore = finalScores.reduce((a, b) => a + b, 0);
      const tier = getResultTier(totalScore);
      
      saveAssessmentData({
        name: userInfo.name,
        email: userInfo.email,
        company: userInfo.company,
        role: userInfo.role,
        scores: finalScores,
        totalScore: totalScore,
        tier: tier
      });
    }

    setView('analyzing');
    setTimeout(() => {
      setView('result');
    }, 2800);
  };

  const handleRestart = () => {
    setScores([]);
    setUserInfo(null);
    setIsSharedReport(false);
    setView('landing');
    // Clear URL
    window.history.pushState({}, '', window.location.pathname);
  };

  // Backend integration (Google Sheets Webhook)
  const saveAssessmentData = (data: any) => {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw7F7dd1zGWacLdJni9aKGdjoGHS2m6bGwySHAJHFLWEZ-igPmofWBnFOZp9egaOEEc/exec';
    
    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Important for avoiding CORS preflight on simple Google Apps Script setups
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(() => console.log('Data successfully dispatched to Google Sheets'))
    .catch(error => console.error('Error saving data:', error));
  };

  return (
    <div className="w-full min-h-[100dvh] font-sans selection:bg-[#00e5ff]/30 overflow-x-hidden">
      <ThemeToggle />
      <AnimatePresence mode="wait">
        {view === 'landing' && <LandingPage key="landing" onStart={handleStart} />}
        {view === 'assessment' && <AssessmentStepper key="assessment" onComplete={handleAssessmentComplete} />}
        {view === 'analyzing' && <AnalyzingScreen key="analyzing" />}
        {view === 'result' && (
          <ResultDashboard 
            key="result"
            scores={scores} 
            userInfo={userInfo!} 
            onRestart={handleRestart} 
            isSharedReport={isSharedReport}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
