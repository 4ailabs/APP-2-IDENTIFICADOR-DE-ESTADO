import React from 'react';
import { Sun, Zap, Moon } from 'lucide-react';
import { AppView } from '../types';

interface StateCardProps {
  title: string;
  subtitle: string;
  color: string;
  iconType: 'sun' | 'zap' | 'moon';
  onClick: () => void;
}

const StateCard: React.FC<StateCardProps> = ({ title, subtitle, color, iconType, onClick }) => {
  const Icon = () => {
    switch (iconType) {
      case 'sun': return <Sun className="w-8 h-8 text-white" />;
      case 'zap': return <Zap className="w-8 h-8 text-white" />;
      case 'moon': return <Moon className="w-8 h-8 text-white" />;
      default: return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${color} w-full p-6 rounded-3xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-95 text-left flex items-center justify-between group`}
    >
      <div className="flex flex-col text-white">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="opacity-90 font-medium">{subtitle}</p>
      </div>
      <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
        <Icon />
      </div>
    </button>
  );
};

export default StateCard;
