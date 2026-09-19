import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Ghost, Home } from 'lucide-react';

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
            <div className="w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_#00e5ff_0%,_transparent_60%)] opacity-[0.05] mix-blend-screen" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-md text-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl">
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#00e5ff] blur-[30px] opacity-20 rounded-full"></div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-transparent flex items-center justify-center relative border border-[#00e5ff]/30">
                <Ghost className="text-[#00e5ff] w-10 h-10 animate-bounce" strokeWidth={2} />
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white font-[var(--font-display)]">
                แงงง... มีบางอย่างผิดพลาด
              </h1>
              <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed px-4">
                อาจจะมีบั๊กซ่อนอยู่นิดหน่อย ไม่ต้องตกใจน้า<br/>เดี๋ยวเรากลับไปตั้งหลักที่หน้าแรกกันใหม่ดีกว่า!
              </p>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 flex items-center gap-2 bg-[#00e5ff] text-black px-8 py-4 rounded-2xl font-black text-[15px] hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all"
            >
              <Home size={18} strokeWidth={2.5} />
              กลับไปหน้าแรกกันเถอะ
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
