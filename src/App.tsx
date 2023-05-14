import { Route, Routes } from 'react-router-dom';
import { Welcome } from './pages/Welcome/Welcome';
import './App.css';
import { PageHeader } from './components/PageHeader';
import { Main } from './pages/Main';
import { PageFooter } from './components/PageFooter';
import { Error } from './pages/Error/Error';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (user?.uid) {
    return (
      <div className="App">
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
      </div>
    );
  }

  return (
    <div className="App">
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
    </div>
  );
};

export default App;
