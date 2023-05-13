import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import { Welcome } from './pages/Welcome/Welcome';
import './App.css';
import { PageHeader } from './components/PageHeader';
import { Main } from './pages/Main';
import { PageFooter } from './components/PageFooter';
import {Error} from "./pages/Error/Error";

const App = () => {
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
      setAuthToken(localStorage.getItem('token'));
  }, []);

  if(authToken !== '') {
    return (
        <div className="App">
          <Routes>
            <Route path={'/'} element={<PageHeader><PageFooter><Welcome /></PageFooter></PageHeader>} />
            <Route path={'/main'} element={<PageHeader><PageFooter><Main /></PageFooter></PageHeader>} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
    );
  } else {
    return (
      <div className="App">
        <Routes>
            <Route path="*" element={<PageFooter><Error /></PageFooter>} />
            <Route path={'/'} element={<PageHeader><PageFooter><Welcome /></PageFooter></PageHeader>} />
        </Routes>
      </div>
    );
  }

};

export default App;
