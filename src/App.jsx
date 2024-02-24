import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';
import { getStats } from './Redux/actions/stats.js';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Dispatching getStats');
    dispatch(getStats());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
