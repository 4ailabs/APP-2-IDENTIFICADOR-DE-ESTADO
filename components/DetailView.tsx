import React from 'react';
import { ArrowLeft, CheckCircle2, Activity, HeartHandshake } from 'lucide-react';
import { StateContent, AppView } from '../types';

interface DetailViewProps {
  content: StateContent;
  onBack: () => void;
  onGuideClick?: (target: AppView) => void;
}

const DetailView: React.FC<DetailViewProps> = ({ content, onBack, onGuideClick }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-lg mx-auto shadow-2xl overflow-hidden animate-fade-in">
      {/* Header Section */}
      <div className={`${content.color} p-8 text-white rounded-b-[2.5rem] shadow-md relative z-10`}>
        <button 
          onClick={onBack}
          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors mb-6 backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
        <p className="opacity-90">{content.subtitle}</p>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        
        {/* Signs Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Activity className={`w-5 h-5 ${content.textColor}`} />
            <h3 className={`text-lg font-bold ${content.textColor}`}>Señales de este estado</h3>
          </div>
          <ul className="space-y-3">
            {content.signs.map((sign, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-600">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${content.buttonColor}`} />
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <HeartHandshake className={`w-5 h-5 ${content.textColor}`} />
            <h3 className={`text-lg font-bold ${content.textColor}`}>
              {content.id === AppView.VENTRAL ? 'Qué hacer' : 'Qué hacer para regularte'}
            </h3>
          </div>
          <ul className="space-y-3">
            {content.actions.map((action, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-600">
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${content.textColor} opacity-60`} />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 pb-8 space-y-3">
          {content.guideButtonText && content.guideTargetView && onGuideClick && (
            <button
              onClick={() => onGuideClick(content.guideTargetView!)}
              className={`${content.buttonColor} w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2`}
            >
              <span>{content.guideButtonText}</span>
              <span className="text-xl">➜</span>
            </button>
          )}
          
          <button
            onClick={onBack}
            className="w-full py-4 px-6 rounded-xl text-slate-500 font-medium hover:bg-slate-100 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
