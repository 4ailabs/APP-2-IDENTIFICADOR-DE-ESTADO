export enum AppView {
  HOME = 'HOME',
  VENTRAL = 'VENTRAL',
  SYMPATHETIC = 'SYMPATHETIC',
  DORSAL = 'DORSAL',
  BREATHING_GUIDE = 'BREATHING_GUIDE',
  GROUNDING_GUIDE = 'GROUNDING_GUIDE'
}

export interface StateContent {
  id: AppView;
  title: string;
  subtitle: string;
  color: string;
  textColor: string;
  buttonColor: string;
  iconType: 'sun' | 'zap' | 'moon';
  signs: string[];
  actions: string[];
  guideButtonText?: string;
  guideTargetView?: AppView;
}
