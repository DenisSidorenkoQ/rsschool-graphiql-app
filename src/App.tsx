import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Welcome } from './pages/Welcome/Welcome';
import './App.css';
import { PageHeader } from './components/PageHeader';
import { Main } from './pages/Main';
import { PageFooter } from './components/PageFooter';
import {Error} from "./pages/Error/Error";

const App = () => {
  if(localStorage.getItem('token')) {
    return (
        <div className="App">
          <PageHeader>
            <PageFooter>
              <Routes>
                <Route path={'/'} element={<Welcome />} />
                <Route path={'/main'} element={<Main />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </PageFooter>
          </PageHeader>
        </div>
    );
  } else {
    return (
        <div className="App">
            <PageHeader>
                <PageFooter>
                    <Routes>
                        <Route path={'/'} element={<Welcome />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </PageFooter>
            </PageHeader>
        </div>
    );
  }

};

export default App;
