import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
