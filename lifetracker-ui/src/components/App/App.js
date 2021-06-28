

import Info from '../Info/Info';
import NavBar from '../NavBar/NavBar';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Sleep from '../Sleep/Sleep';
import Nutrition from '../Nutrition/Nutrition';
import Exercise from '../Exercise/Exercise';
import Activity from '../Activity/Activity';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <NavBar />

        <Routes>
          <Route path="/" element={<Info />}>   </Route>
          <Route path="/register" element={<Register />}>   </Route>
          <Route path="/login" element={<Login />}>   </Route>
          <Route path="/sleep" element={<Sleep />}>   </Route>
          <Route path="/nutrition" element={<Nutrition />}>   </Route>
          <Route path="/exercise" element={<Exercise />}>   </Route>
          <Route path="/activity" element={<Activity />}>   </Route>
        </Routes>
        {/* <Info /> */}

      </div>
    </BrowserRouter>
  );
}

export default App;
