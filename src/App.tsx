import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import AssessmentStepper from './components/AssessmentStepper';
import ResultDashboard from './components/ResultDashboard';
import AnalyzingScreen from './components/AnalyzingScreen';
import { ThemeToggle } from './components/ThemeToggle';
import { getResultTier, type AssessmentCategory } from './data/assessmentData';
import { db, collection, addDoc, serverTimestamp } from './lib/firebase';

export type ViewState = 'landing' | 'assessment' | 'analyzing' | 'result';
export interface UserInfo {
  name: string;
  email: string;
  company: string;
  role: string;
}

function App() {
  const [view, setView] = useState<'landing' | 'assessment' | 'analyzing' | 'result'>('landing');
  const [scores, setScores] = useState<number[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isSharedReport, setIsSharedReport] = useState(false);

  useEffect(() => {
    // Check URL for encoded data
    const searchParams = new URLSearchParams(window.location.search);
    const encodedData = searchParams.get('d');
    
    if (encodedData) {
      try {
        let cleanData = encodedData.replace(/ /g, "+");
        // Fix for old double-encoded QR codes
        while (cleanData.includes('%')) {
          try {
            cleanData = decodeURIComponent(cleanData);
          } catch(e) { break; }
        }
        const decoded = JSON.parse(decodeURIComponent(atob(cleanData)));
        
        // Strict validation to prevent crashes from tampered or malicious payloads
        if (
          decoded && 
          Array.isArray(decoded.s) && 
          decoded.s.every((n: any) => typeof n === 'number') &&
          typeof decoded.n === 'string'
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

  // Backend integration (Firebase Firestore)
  const saveAssessmentData = async (data: any) => {
    try {
      // Check for eventId in URL
      const urlParams = new URLSearchParams(window.location.search);
      const eventId = urlParams.get('event') || 'default-event';

      await addDoc(collection(db, 'submissions'), {
        ...data,
        eventId: eventId,
        timestamp: serverTimestamp()
      });
      console.log('Data successfully saved to Firebase Firestore');
    } catch (error) {
      console.error('Error saving data to Firebase:', error);
    }
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
