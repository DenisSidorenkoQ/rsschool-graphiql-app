import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import './App.css';
import { Welcome } from './pages/Welcome/Welcome';
import { Main } from './pages/Main';
import { Error } from './pages/Error/Error';

import { PageHeader } from './components/PageHeader';
import { PageFooter } from './components/PageFooter';

import { auth } from './firebase';
import { LangContext } from './context/lang';

const App = () => {
  const [lang, setLang] = React.useState(localStorage.getItem('lang') || 'ru');

  const toggleLang = () => {
    const newLang = lang === 'ru' ? 'en' : 'ru';

    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (user?.uid) {
    return (
      <div className="App">
        <LangContext.Provider value={{ language: lang, toggleLanguage: toggleLang }}>
          <Routes>
            <Route
              path={'/'}
              element={
                <PageHeader>
                  <PageFooter>
                    <Welcome />
                  </PageFooter>
                </PageHeader>
              }
            />
            <Route
              path={'/main'}
              element={
                <PageHeader>
                  <PageFooter>
                    <Main />
                  </PageFooter>
                </PageHeader>
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </LangContext.Provider>
      </div>
    );
  }

  return (
    <div className="App">
      <LangContext.Provider value={{ language: lang, toggleLanguage: toggleLang }}>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route
            path={'/'}
            element={
              <PageHeader>
                <PageFooter>
                  <Welcome />
                </PageFooter>
              </PageHeader>
            }
          />
        </Routes>
      </LangContext.Provider>
    </div>
  );
};

export default App;
