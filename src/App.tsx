import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={'/main'} element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
