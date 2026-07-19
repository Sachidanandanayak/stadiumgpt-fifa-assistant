import type { Language } from '@/types';

type TranslationKey =
  | 'nav.home' | 'nav.dashboard' | 'nav.assistant' | 'nav.emergency' | 'nav.about'
  | 'nav.contact' | 'nav.login' | 'nav.register' | 'nav.logout'
  | 'hero.title' | 'hero.subtitle' | 'hero.cta.assistant' | 'hero.cta.dashboard'
  | 'chat.placeholder' | 'chat.send' | 'chat.title' | 'chat.subtitle' | 'chat.clear'
  | 'emergency.sos' | 'emergency.sosConfirm' | 'emergency.title' | 'emergency.contacts'
  | 'emergency.exits' | 'emergency.instructions'
  | 'dashboard.title' | 'dashboard.crowd' | 'dashboard.queue' | 'dashboard.parking'
  | 'dashboard.gates' | 'dashboard.waitTime'
  | 'common.loading' | 'common.error' | 'common.retry';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    'nav.home': 'Home', 'nav.dashboard': 'Dashboard', 'nav.assistant': 'AI Assistant',
    'nav.emergency': 'Emergency', 'nav.about': 'About', 'nav.contact': 'Contact',
    'nav.login': 'Login', 'nav.register': 'Register', 'nav.logout': 'Logout',
    'hero.title': 'Your Smart Companion for FIFA World Cup 2026',
    'hero.subtitle': 'AI-powered assistance, live crowd analytics, and instant safety support — all in one place.',
    'hero.cta.assistant': 'Ask the AI Assistant', 'hero.cta.dashboard': 'View Live Dashboard',
    'chat.placeholder': 'Ask about schedules, seating, parking, tickets...', 'chat.send': 'Send',
    'chat.title': 'StadiumGPT Assistant', 'chat.subtitle': 'Ask me anything about the stadium', 'chat.clear': 'Clear chat',
    'emergency.sos': 'SOS Emergency', 'emergency.sosConfirm': 'Emergency alert sent to stadium security!',
    'emergency.title': 'Smart Emergency Center', 'emergency.contacts': 'Emergency Contacts',
    'emergency.exits': 'Nearest Exits', 'emergency.instructions': 'Safety Instructions',
    'dashboard.title': 'Crowd Analytics Dashboard', 'dashboard.crowd': 'Crowd Density',
    'dashboard.queue': 'Queue Length', 'dashboard.parking': 'Parking Status',
    'dashboard.gates': 'Entry Gate Status', 'dashboard.waitTime': 'Estimated Wait Time',
    'common.loading': 'Loading...', 'common.error': 'Something went wrong', 'common.retry': 'Retry',
  },
  hi: {
    'nav.home': 'होम', 'nav.dashboard': 'डैशबोर्ड', 'nav.assistant': 'एआई सहायक',
    'nav.emergency': 'आपातकाल', 'nav.about': 'हमारे बारे में', 'nav.contact': 'संपर्क करें',
    'nav.login': 'लॉगिन', 'nav.register': 'पंजीकरण', 'nav.logout': 'लॉगआउट',
    'hero.title': 'फीफा वर्ल्ड कप 2026 के लिए आपका स्मार्ट साथी',
    'hero.subtitle': 'एआई सहायता, लाइव भीड़ विश्लेषण और तत्काल सुरक्षा सहायता — सब एक ही जगह।',
    'hero.cta.assistant': 'एआई सहायक से पूछें', 'hero.cta.dashboard': 'लाइव डैशबोर्ड देखें',
    'chat.placeholder': 'शेड्यूल, सीटिंग, पार्किंग, टिकट के बारे में पूछें...', 'chat.send': 'भेजें',
    'chat.title': 'StadiumGPT सहायक', 'chat.subtitle': 'स्टेडियम के बारे में कुछ भी पूछें', 'chat.clear': 'चैट साफ़ करें',
    'emergency.sos': 'एसओएस आपातकाल', 'emergency.sosConfirm': 'स्टेडियम सुरक्षा को आपातकालीन अलर्ट भेजा गया!',
    'emergency.title': 'स्मार्ट आपातकालीन केंद्र', 'emergency.contacts': 'आपातकालीन संपर्क',
    'emergency.exits': 'निकटतम निकास', 'emergency.instructions': 'सुरक्षा निर्देश',
    'dashboard.title': 'भीड़ विश्लेषण डैशबोर्ड', 'dashboard.crowd': 'भीड़ घनत्व',
    'dashboard.queue': 'कतार की लंबाई', 'dashboard.parking': 'पार्किंग स्थिति',
    'dashboard.gates': 'प्रवेश द्वार स्थिति', 'dashboard.waitTime': 'अनुमानित प्रतीक्षा समय',
    'common.loading': 'लोड हो रहा है...', 'common.error': 'कुछ गलत हो गया', 'common.retry': 'पुनः प्रयास करें',
  },
  kn: {
    'nav.home': 'ಮುಖಪುಟ', 'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', 'nav.assistant': 'ಎಐ ಸಹಾಯಕ',
    'nav.emergency': 'ತುರ್ತು', 'nav.about': 'ನಮ್ಮ ಬಗ್ಗೆ', 'nav.contact': 'ಸಂಪರ್ಕಿಸಿ',
    'nav.login': 'ಲಾಗಿನ್', 'nav.register': 'ನೋಂದಣಿ', 'nav.logout': 'ಲಾಗ್ಔಟ್',
    'hero.title': 'ಫಿಫಾ ವಿಶ್ವಕಪ್ 2026 ಗಾಗಿ ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಸಹಚರ',
    'hero.subtitle': 'ಎಐ-ಚಾಲಿತ ಸಹಾಯ, ಲೈವ್ ಜನಸಂದಣಿ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ತಕ್ಷಣದ ಸುರಕ್ಷತಾ ಬೆಂಬಲ.',
    'hero.cta.assistant': 'ಎಐ ಸಹಾಯಕರನ್ನು ಕೇಳಿ', 'hero.cta.dashboard': 'ಲೈವ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವೀಕ್ಷಿಸಿ',
    'chat.placeholder': 'ವೇಳಾಪಟ್ಟಿ, ಆಸನ, ಪಾರ್ಕಿಂಗ್ ಬಗ್ಗೆ ಕೇಳಿ...', 'chat.send': 'ಕಳುಹಿಸಿ',
    'chat.title': 'StadiumGPT ಸಹಾಯಕ', 'chat.subtitle': 'ಸ್ಟೇಡಿಯಂ ಬಗ್ಗೆ ಏನು ಬೇಕಾದರೂ ಕೇಳಿ', 'chat.clear': 'ಚಾಟ್ ಅಳಿಸಿ',
    'emergency.sos': 'ಎಸ್‌ಒಎಸ್ ತುರ್ತು', 'emergency.sosConfirm': 'ಸ್ಟೇಡಿಯಂ ಭದ್ರತೆಗೆ ತುರ್ತು ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಲಾಗಿದೆ!',
    'emergency.title': 'ಸ್ಮಾರ್ಟ್ ತುರ್ತು ಕೇಂದ್ರ', 'emergency.contacts': 'ತುರ್ತು ಸಂಪರ್ಕಗಳು',
    'emergency.exits': 'ಹತ್ತಿರದ ನಿರ್ಗಮನಗಳು', 'emergency.instructions': 'ಸುರಕ್ಷತಾ ಸೂಚನೆಗಳು',
    'dashboard.title': 'ಜನಸಂದಣಿ ವಿಶ್ಲೇಷಣೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', 'dashboard.crowd': 'ಜನಸಂದಣಿ ಸಾಂದ್ರತೆ',
    'dashboard.queue': 'ಸಾಲಿನ ಉದ್ದ', 'dashboard.parking': 'ಪಾರ್ಕಿಂಗ್ ಸ್ಥಿತಿ',
    'dashboard.gates': 'ಪ್ರವೇಶ ಗೇಟ್ ಸ್ಥಿತಿ', 'dashboard.waitTime': 'ಅಂದಾಜು ಕಾಯುವ ಸಮಯ',
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...', 'common.error': 'ಏನೋ ತಪ್ಪಾಗಿದೆ', 'common.retry': 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
  },
  es: {
    'nav.home': 'Inicio', 'nav.dashboard': 'Panel', 'nav.assistant': 'Asistente IA',
    'nav.emergency': 'Emergencia', 'nav.about': 'Acerca de', 'nav.contact': 'Contacto',
    'nav.login': 'Iniciar sesión', 'nav.register': 'Registrarse', 'nav.logout': 'Cerrar sesión',
    'hero.title': 'Tu compañero inteligente para la Copa Mundial de la FIFA 2026',
    'hero.subtitle': 'Asistencia con IA, análisis de multitudes en vivo y soporte de seguridad instantáneo, todo en un solo lugar.',
    'hero.cta.assistant': 'Preguntar al asistente IA', 'hero.cta.dashboard': 'Ver panel en vivo',
    'chat.placeholder': 'Pregunta sobre horarios, asientos, estacionamiento...', 'chat.send': 'Enviar',
    'chat.title': 'Asistente StadiumGPT', 'chat.subtitle': 'Pregúntame lo que quieras sobre el estadio', 'chat.clear': 'Borrar chat',
    'emergency.sos': 'SOS Emergencia', 'emergency.sosConfirm': '¡Alerta de emergencia enviada a seguridad del estadio!',
    'emergency.title': 'Centro Inteligente de Emergencias', 'emergency.contacts': 'Contactos de emergencia',
    'emergency.exits': 'Salidas más cercanas', 'emergency.instructions': 'Instrucciones de seguridad',
    'dashboard.title': 'Panel de análisis de multitudes', 'dashboard.crowd': 'Densidad de multitud',
    'dashboard.queue': 'Longitud de fila', 'dashboard.parking': 'Estado del estacionamiento',
    'dashboard.gates': 'Estado de puertas de entrada', 'dashboard.waitTime': 'Tiempo de espera estimado',
    'common.loading': 'Cargando...', 'common.error': 'Algo salió mal', 'common.retry': 'Reintentar',
  },
};

export function t(lang: Language, key: TranslationKey): string {
  return translations[lang]?.[key] ?? translations.en[key];
}

export const languageNames: Record<Language, string> = {
  en: 'English', hi: 'हिन्दी', kn: 'ಕನ್ನಡ', es: 'Español',
};
