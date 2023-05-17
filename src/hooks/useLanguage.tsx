import { useContext, useEffect, useState } from 'react';

import { LangContext } from '../context/lang';

type Locale = Record<string, string>;

export const useLanguage = (file: string): Locale => {
  const { language } = useContext(LangContext);
  const [locale, setlocale] = useState<Locale>({});

  useEffect(() => {
    const getLocale = async () => {
      const locale = await import(`../locales/${language}/${file}.json`);
      setlocale(locale);
    };

    getLocale();
  }, [file, language]);

  return locale;
};
