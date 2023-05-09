import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { Welcome } from './pages/Welcome/Welcome';
import { Sign } from './pages/Sign';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Welcome />} />
        <Route path={'/main'} element={<Main />} />
        <Route path={'/sign'} element={<Sign />} />
      </Routes>
    </div>
  );
};

export default App;
