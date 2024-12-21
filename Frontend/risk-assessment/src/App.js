// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './LoginComponents/SignIn';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
