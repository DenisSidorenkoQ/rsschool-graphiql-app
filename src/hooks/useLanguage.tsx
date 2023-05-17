import React from 'react';

import { LangContext } from '../context/lang';

type Locale = Record<string, string>;

export const useLanguage = (file: string): Locale => {
  const { language } = React.useContext(LangContext);
  const [locale, setlocale] = React.useState<Locale>({});

  React.useEffect(() => {
    const getLocale = async () => {
      const locale = await import(`../locales/${language}/${file}.json`);
      setlocale(locale);
    };

    getLocale();
  }, [file, language]);

  return locale;
};
