import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUP from './pages/SignUp/SignUP';

function App() {
  return (
    <Router>

    <div className="App">
        <Routes>
          <Route path='/signup' element={<SignUP/>}/>
        </Routes>
      
    </div>
    </Router>
  );
}

export default App;
