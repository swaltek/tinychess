import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pager from './pages/pager';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pager />} />
      </Routes>
    </BrowserRouter>
  );
}

const container =  document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
