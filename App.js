import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './Notes';
import Todos from './Todos';
import Home from './Home';

function App() {
  return (
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Todos />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </Router>
  );
}
export default App;
