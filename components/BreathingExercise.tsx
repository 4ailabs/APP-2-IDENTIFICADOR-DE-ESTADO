import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingExerciseProps {
  onBack: () => void;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onBack }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'IDLE' | 'INHALE' | 'HOLD' | 'EXHALE' | 'DONE'>('IDLE');
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycle, setCycle] = useState(0);

  // Configuration for 4-7-8
  const INHALE_TIME = 4;
  const HOLD_TIME = 7;
  const EXHALE_TIME = 8;
  const TOTAL_CYCLES = 3;

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && phase !== 'DONE') {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handlePhaseTransition();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, phase, timeLeft]);

  const handlePhaseTransition = () => {
    switch (phase) {
      case 'IDLE':
        setPhase('INHALE');
        setTimeLeft(INHALE_TIME);
        break;
      case 'INHALE':
        setPhase('HOLD');
        setTimeLeft(HOLD_TIME);
        break;
      case 'HOLD':
        setPhase('EXHALE');
        setTimeLeft(EXHALE_TIME);
        break;
      case 'EXHALE':
        if (cycle < TOTAL_CYCLES - 1) {
          setCycle(c => c + 1);
          setPhase('INHALE');
          setTimeLeft(INHALE_TIME);
        } else {
          setPhase('DONE');
          setIsActive(false);
        }
        break;
    }
  };

  const startExercise = () => {
    setCycle(0);
    setPhase('INHALE');
    setTimeLeft(INHALE_TIME);
    setIsActive(true);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('IDLE');
    setCycle(0);
    setTimeLeft(0);
  };

  const getCircleSize = () => {
    if (phase === 'IDLE') return 'scale-100';
    if (phase === 'INHALE') return 'scale-150 duration-[4000ms]';
    if (phase === 'HOLD') return 'scale-150 duration-0'; // Stay expanded
    if (phase === 'EXHALE') return 'scale-100 duration-[8000ms]';
    return 'scale-100';
  };

  const getText = () => {
    switch (phase) {
      case 'IDLE': return 'Presiona Play para iniciar';
      case 'INHALE': return 'Inhala por la nariz...';
      case 'HOLD': return 'Mantén el aire...';
      case 'EXHALE': return 'Exhala por la boca...';
      case 'DONE': return '¡Ejercicio completado!';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#fff7ed] flex flex-col max-w-lg mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full p-6 z-10">
        <button onClick={onBack} className="text-[#ed8936] bg-white/50 p-2 rounded-full hover:bg-white/80">
          <ArrowLeft />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-3xl font-bold text-[#ed8936] mb-2">Respiración 4-7-8</h2>
        <p className="text-slate-600 mb-12">Para calmar el sistema nervioso</p>

        <div className="relative mb-12">
            {/* Visual Circle */}
            <div className={`w-48 h-48 rounded-full bg-[#ed8936] opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform ease-linear ${getCircleSize()}`} />
            <div className={`w-40 h-40 rounded-full bg-[#ed8936] opacity-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform ease-linear ${getCircleSize()}`} />
            
            <div className="w-32 h-32 rounded-full bg-white border-4 border-[#ed8936] flex items-center justify-center relative z-10 mx-auto shadow-sm">
              <span className="text-4xl font-bold text-[#ed8936]">
                {phase === 'IDLE' || phase === 'DONE' ? (phase === 'DONE' ? '✓' : 'Start') : timeLeft}
              </span>
            </div>
        </div>

        <div className="h-16 mb-8">
            <h3 className="text-2xl font-bold text-slate-700 animate-fade-in transition-all">
                {getText()}
            </h3>
            {phase !== 'IDLE' && phase !== 'DONE' && (
                <p className="text-slate-500 mt-2">Ciclo {cycle + 1} de {TOTAL_CYCLES}</p>
            )}
        </div>

        <div className="flex gap-4">
            {!isActive && phase !== 'DONE' && (
                 <button 
                 onClick={startExercise}
                 className="bg-[#ed8936] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#dd6b20] active:scale-95 transition-all flex items-center gap-2"
               >
                 <Play fill="currentColor" /> Iniciar
               </button>
            )}
           
           {isActive && (
                <button 
                onClick={() => setIsActive(false)}
                className="bg-slate-200 text-slate-600 px-8 py-4 rounded-full font-bold shadow-md hover:bg-slate-300 transition-all flex items-center gap-2"
                >
                <Pause fill="currentColor" /> Pausar
                </button>
           )}

           {(phase === 'DONE' || (!isActive && phase !== 'IDLE')) && (
                <button 
                onClick={resetExercise}
                className="bg-slate-200 text-slate-600 px-8 py-4 rounded-full font-bold shadow-md hover:bg-slate-300 transition-all flex items-center gap-2"
                >
                <RotateCcw /> Reiniciar
                </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;
