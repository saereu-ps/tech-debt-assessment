import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-[#030508] text-white p-6 relative overflow-hidden font-sans">
          
          {/* Subtle glowing orb for the error screen */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_#ff4d4d_0%,_transparent_60%)] opacity-10 mix-blend-screen" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-md text-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#ff4d4d]/10 flex items-center justify-center">
              <AlertTriangle className="text-[#ff4d4d] w-8 h-8" strokeWidth={2} />
            </div>
            
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-[var(--font-display)]">
                System Interruption
              </h1>
              <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
                We encountered an unexpected error processing your request. Our system has safely halted to prevent data corruption.
              </p>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 flex items-center gap-3 bg-white text-black px-6 py-3 md:py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <RefreshCw size={18} strokeWidth={2.5} />
              Return to System Core
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
