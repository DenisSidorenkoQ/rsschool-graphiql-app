import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { Welcome } from './pages/Welcome/Welcome';
import { Sign } from './pages/Sign';
import './App.css';
import {PageHeader} from "./components/PageHeader";

const App = () => {
  return (
    <div className="App">
      <PageHeader>
        <Routes>
          <Route path={'/'} element={<Welcome />} />
          <Route path={'/sign'} element={<Sign />} />
        </Routes>
      </PageHeader>
    </div>
  );
};

export default App;
