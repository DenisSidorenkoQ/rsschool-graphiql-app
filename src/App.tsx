import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Welcome } from './pages/Welcome/Welcome';
import './App.css';
import { PageHeader } from './components/PageHeader';
import { Main } from './pages/Main';

const App = () => {
  return (
    <div className="App">
      <PageHeader>
        <Routes>
          <Route path={'/'} element={<Welcome />} />
          <Route path={'/main'} element={<Main />} />
        </Routes>
      </PageHeader>
    </div>
  );
};

export default App;
