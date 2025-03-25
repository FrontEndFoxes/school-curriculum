export type Language = 'en' | 'hi' | 'it' | 'ja' | 'ko' | 'id' | 'es' | 'fr' | 'ptbr' | 'tr' | 'ar' | 'bn' | 'zhcn';
export type Curriculum = 'ai' | 'ds' | 'web' | 'iot' | 'ml';

export const langs = ['en', 'hi', 'it', 'ja', 'ko', 'id', 'es', 'fr', 'ptbr', 'tr', 'ar', 'bn', 'zhcn'];
export const curricula = ['ai', 'ds', 'web', 'iot', 'ml'];

export const languages = {
  en: 'English',
  hi: 'हिन्दी',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  id: 'Bahasa Indonesia',
  es: 'Español',
  fr: 'Français',
  ptbr: 'Português do Brasil',
  tr: 'Türkçe',
  zhcn: '简体中文',
  ar: 'العربية',
  bn: 'বাংলা',

};



const translations: Record<Curriculum, Record<Language, Promise<Record<string, string>>>> = {
  ai: {
    en: import('./ai/en.json')
  },
  web: {
    en: import('./web/en.json'),
    hi: import('./web/hi.json'),
    it: import('./web/it.json'),
    ja: import('./web/ja.json'),
    ko: import('./web/ko.json'),
    id: import('./web/id.json'),
  },
  ml: {
    en: import('./ml/en.json'),
    es: import('./ml/es.json'),
    fr: import('./ml/fr.json'),
    it: import('./ml/it.json'),
    ptbr: import('./ml/ptbr.json'),
    ja: import('./ml/ja.json'),
    tr: import('./ml/tr.json'),
  },
  ds: {
    en: import('./ds/en.json'),
    es: import('./ds/es.json'),
  },
  iot: {
    en: import('./iot/en.json'),
    ar: import('./iot/ar.json'),
    bn: import('./iot/bn.json'),
    hi: import('./iot/hi.json'),
    zhcn: import('./iot/zhcn.json'),
  }
};

export async function getTranslation(
  lang: Language,
  curriculum: Curriculum
): Promise<Record<string, string>> {
  const curriculumTranslations = translations[curriculum];
  if (!curriculumTranslations) {
    throw new Error(`Curriculum "${curriculum}" not found.`);
  }

  const translation = curriculumTranslations[lang] || curriculumTranslations.en;
  return await translation; // Fallback to English if the language is not found
}