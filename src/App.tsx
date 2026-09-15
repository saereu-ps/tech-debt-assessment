import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import AssessmentStepper from './components/AssessmentStepper';
import ResultDashboard from './components/ResultDashboard';
import { getResultTier, type AssessmentCategory } from './data/assessmentData';

export type ViewState = 'landing' | 'assessment' | 'result';
export interface UserInfo {
  name: string;
  company: string;
  role: string;
}

function App() {
  const [view, setView] = useState<'landing' | 'assessment' | 'result'>('landing');
  const [scores, setScores] = useState<number[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isSharedReport, setIsSharedReport] = useState(false);

  useEffect(() => {
    // Check URL for encoded data
    const searchParams = new URLSearchParams(window.location.search);
    const encodedData = searchParams.get('d');
    
    if (encodedData) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(encodedData)));
        if (decoded.s && decoded.n !== undefined && decoded.c !== undefined && decoded.r !== undefined) {
          setScores(decoded.s);
          setUserInfo({ name: decoded.n, company: decoded.c, role: decoded.r });
          setIsSharedReport(true);
          setView('result');
        }
      } catch (e) {
        console.error("Invalid URL payload");
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
        company: userInfo.company,
        role: userInfo.role,
        scores: finalScores,
        totalScore: totalScore,
        tier: tier
      });
    }

    setView('result');
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
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUzve9mB2E5rr44_kdRMOWmGFGrg-lN6nL4CQ1Aza8q1hrd6Q8xPj4QvsXjpM-9Hjh/exec';
    
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
    <div className="w-full min-h-screen text-white font-sans bg-[#020611] selection:bg-[#00e5ff]/30">
      <AnimatePresence mode="wait">
        {view === 'landing' && <LandingPage key="landing" onStart={handleStart} />}
        {view === 'assessment' && <AssessmentStepper key="assessment" onComplete={handleAssessmentComplete} />}
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
