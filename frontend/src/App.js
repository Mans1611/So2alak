import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
      <Router>
        <div className="App">
            <Routes>
              <Route path='/signin' element={<div>mans</div>}>
              
              </Route>
            </Routes>
        </div>
      </Router>
  );
}

export default App;
