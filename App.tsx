import React, { useState } from 'react';
import StateCard from './components/StateCard';
import DetailView from './components/DetailView';
import BreathingExercise from './components/BreathingExercise';
import GroundingExercise from './components/GroundingExercise';
import { AppView, StateContent } from './types';

// Constants for state data
const VENTRAL_CONTENT: StateContent = {
  id: AppView.VENTRAL,
  title: "Estás en Ventral Vagal ☀️",
  subtitle: "Seguridad y Conexión Social",
  color: "bg-[#48bb78]",
  textColor: "text-[#2f855a]",
  buttonColor: "bg-[#38a169]",
  iconType: "sun",
  signs: [
    "Respiración lenta y profunda",
    "Te sientes presente y conectado",
    "Puedes pensar con claridad",
    "Rostro relajado, voz con variación"
  ],
  actions: [
    "¡Disfrútalo! Este es tu estado óptimo",
    "Nota cómo se siente tu cuerpo",
    "Desde aquí puedes hacer trabajo profundo"
  ]
};

const SYMPATHETIC_CONTENT: StateContent = {
  id: AppView.SYMPATHETIC,
  title: "Estás en Simpático ⚡",
  subtitle: "Movilización (Lucha o Huida)",
  color: "bg-[#ed8936]",
  textColor: "text-[#c05621]",
  buttonColor: "bg-[#dd6b20]",
  iconType: "zap",
  signs: [
    "Corazón acelerado",
    "Respiración rápida y superficial",
    "Tensión en hombros y mandíbula",
    "Pensamientos acelerados",
    "Todo parece urgente"
  ],
  actions: [
    "Respiración 4-7-8 (3 ciclos)",
    "Movimiento físico (sacudir, caminar)",
    "Orientación 5-4-3-2-1",
    "Agua fría en muñecas"
  ],
  guideButtonText: "Guíame en una técnica",
  guideTargetView: AppView.BREATHING_GUIDE
};

const DORSAL_CONTENT: StateContent = {
  id: AppView.DORSAL,
  title: "Estás en Dorsal Vagal 🌑",
  subtitle: "Inmovilización (Colapso)",
  color: "bg-[#718096]",
  textColor: "text-[#4a5568]",
  buttonColor: "bg-[#4a5568]",
  iconType: "moon",
  signs: [
    "Cuerpo pesado, sin fuerza",
    "Sensación de desconexión",
    "Dificultad para pensar o actuar",
    "Desesperanza o entumecimiento"
  ],
  actions: [
    "Movimiento suave (estirar, caminar lento)",
    "Contacto con agua tibia",
    "Nombrar objetos en voz alta",
    "Llamar a alguien seguro",
    "Envolverse en cobija, algo caliente"
  ],
  guideButtonText: "Guíame en una técnica",
  guideTargetView: AppView.GROUNDING_GUIDE
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const goHome = () => setCurrentView(AppView.HOME);

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 max-w-lg mx-auto shadow-2xl overflow-y-auto">
            <header className="mt-8 mb-10 text-center space-y-2">
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                ¿Cómo está tu<br />sistema nervioso?
              </h1>
              <p className="text-slate-500 text-lg">
                Toca el estado que mejor describe cómo te sientes
              </p>
            </header>

            <div className="w-full space-y-5">
              <StateCard
                title="Ventral Vagal"
                subtitle="Calmado, conectado"
                color="bg-[#48bb78]"
                iconType="sun"
                onClick={() => setCurrentView(AppView.VENTRAL)}
              />
              <StateCard
                title="Simpático"
                subtitle="Acelerado, ansioso"
                color="bg-[#ed8936]"
                iconType="zap"
                onClick={() => setCurrentView(AppView.SYMPATHETIC)}
              />
              <StateCard
                title="Dorsal Vagal"
                subtitle="Apagado, sin energía"
                color="bg-[#718096]"
                iconType="moon"
                onClick={() => setCurrentView(AppView.DORSAL)}
              />
            </div>
            
            <footer className="mt-auto py-8 text-center text-slate-400 text-sm">
              <p>Escucha a tu cuerpo sin juzgar.</p>
            </footer>
          </div>
        );

      case AppView.VENTRAL:
        return <DetailView content={VENTRAL_CONTENT} onBack={goHome} />;

      case AppView.SYMPATHETIC:
        return (
          <DetailView 
            content={SYMPATHETIC_CONTENT} 
            onBack={goHome} 
            onGuideClick={setCurrentView}
          />
        );

      case AppView.DORSAL:
        return (
          <DetailView 
            content={DORSAL_CONTENT} 
            onBack={goHome} 
            onGuideClick={setCurrentView}
          />
        );
      
      case AppView.BREATHING_GUIDE:
        return (
            <BreathingExercise onBack={() => setCurrentView(AppView.SYMPATHETIC)} />
        );

      case AppView.GROUNDING_GUIDE:
        return (
            <GroundingExercise onBack={() => setCurrentView(AppView.DORSAL)} />
        )

      default:
        return <div>View not found</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default App;
