import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUP from './pages/SignUP';

function App() {
  return (
    <div className="App">
      <Router>

        <div className="App">
          <Routes>

            <Route path='/signup' element={<SignUP />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
