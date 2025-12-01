import React, { useState } from 'react';
import { ArrowLeft, Eye, Hand, Ear, Coffee, User } from 'lucide-react';

interface GroundingExerciseProps {
  onBack: () => void;
}

const GroundingExercise: React.FC<GroundingExerciseProps> = ({ onBack }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: <Eye className="w-12 h-12 text-[#718096]" />,
      title: "Mira a tu alrededor",
      instruction: "Nombra 5 cosas que puedes ver ahora mismo.",
      count: 5,
      color: "bg-[#718096]"
    },
    {
        icon: <Hand className="w-12 h-12 text-[#718096]" />,
        title: "Toca y siente",
        instruction: "Nombra 4 cosas que puedes tocar o sentir en tu cuerpo.",
        count: 4,
        color: "bg-[#718096]"
    },
    {
        icon: <Ear className="w-12 h-12 text-[#718096]" />,
        title: "Escucha atentamente",
        instruction: "Nombra 3 sonidos que puedes escuchar.",
        count: 3,
        color: "bg-[#718096]"
    },
    {
        icon: <Coffee className="w-12 h-12 text-[#718096]" />,
        title: "Olfatea",
        instruction: "Nombra 2 cosas que puedes oler (o tus olores favoritos).",
        count: 2,
        color: "bg-[#718096]"
    },
    {
        icon: <User className="w-12 h-12 text-[#718096]" />,
        title: "Saborea",
        instruction: "Nombra 1 cosa que puedes saborear, o una cualidad buena sobre ti.",
        count: 1,
        color: "bg-[#718096]"
    }
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
        onBack();
    }
  };

  const isComplete = step === steps.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-lg mx-auto shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full p-6 z-10">
        <button onClick={onBack} className="text-slate-600 bg-white p-2 rounded-full hover:bg-slate-100 shadow-sm border border-slate-200">
          <ArrowLeft />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        {!isComplete ? (
            <>
                <div className="w-full bg-slate-200 h-2 rounded-full mb-12 overflow-hidden">
                    <div 
                        className="h-full bg-[#718096] transition-all duration-500" 
                        style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    />
                </div>

                <div className="bg-white p-8 rounded-full shadow-lg mb-8 animate-bounce-slow">
                    {steps[step].icon}
                </div>

                <h2 className="text-4xl font-bold text-slate-800 mb-2">{steps[step].count}</h2>
                <h3 className="text-2xl font-bold text-slate-700 mb-4">{steps[step].title}</h3>
                <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                    {steps[step].instruction}
                </p>

                <button 
                    onClick={handleNext}
                    className="bg-[#718096] text-white w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-slate-600 active:scale-[0.98] transition-all"
                >
                    Siguiente
                </button>
            </>
        ) : (
            <div className="animate-fade-in text-center">
                 <div className="bg-green-100 p-8 rounded-full shadow-lg mb-8 mx-auto w-32 h-32 flex items-center justify-center">
                    <span className="text-4xl">🌿</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">¡Bien hecho!</h2>
                <p className="text-lg text-slate-600 mb-12">
                    Has completado la orientación. Tómate un momento para notar cómo te sientes ahora.
                </p>
                <button 
                    onClick={onBack}
                    className="bg-slate-800 text-white w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-slate-900 active:scale-[0.98] transition-all"
                >
                    Volver al inicio
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default GroundingExercise;
