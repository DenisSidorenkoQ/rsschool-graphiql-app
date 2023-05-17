import React from 'react';

export const LangContext = React.createContext({
  language: '',
  toggleLanguage: () => {},
});
