import { useContext, useEffect, useState } from 'react';

import { LangContext } from '../context/lang';

type Locales = Record<string, string>;

export const useLanguage = (file: string): Locales => {
  const { language } = useContext(LangContext);
  const [locale, setlocale] = useState<Locales>({});

  useEffect(() => {
    const getLocale = async () => {
      const locale = await import(`../locales/${language}/${file}.json`);
      setlocale(locale);
    };

    getLocale();
  }, [file, language]);

  return locale;
};
