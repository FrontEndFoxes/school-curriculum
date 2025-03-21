export type Language = 'en' | 'hi' | 'it' |  'ja' | 'ko' |  'id' ;

export const langs = ['en', 'hi', 'it', 'ja', 'ko', 'id'];

export const languages = {
    en: 'English',
    hi: 'हिन्दी',
    it: 'Italiano', 
    ja: '日本語',
    ko: '한국어',
    id: 'Bahasa Indonesia',
  };
  
const translations: Record<Language, Record<string, string>> = {
    en: await import('./en.json'),
    hi: await import('./hi.json'),
    it: await import('./it.json'),
    ja: await import('./ja.json'),
    ko: await import('./ko.json'),
    id: await import('./id.json'),

};

export function getTranslation(lang: Language): Record<string, string> {
  return translations[lang] || translations.en; // Fallback to English
}