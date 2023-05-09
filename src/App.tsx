import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Welcome } from './pages/Welcome/Welcome';
import './App.css';
import { PageHeader } from './components/PageHeader';
import { Main } from './pages/Main';
import { PageFooter } from './components/PageFooter';

const App = () => {
  return (
    <div className="App">
      <PageHeader>
        <PageFooter>
          <Routes>
            <Route path={'/'} element={<Welcome />} />
            <Route path={'/main'} element={<Main />} />
          </Routes>
        </PageFooter>
      </PageHeader>
    </div>
  );
};

export default App;
