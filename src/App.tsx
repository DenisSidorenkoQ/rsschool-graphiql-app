import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { Welcome } from './pages/Welcome/Welcome';
import { Sign } from './pages/Sign';
import './App.css';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Footer />} />
        <Route path={'/main'} element={<Main />} />
        <Route path={'/sign'} element={<Sign />} />
      </Routes>
    </div>
  );
};

export default App;
