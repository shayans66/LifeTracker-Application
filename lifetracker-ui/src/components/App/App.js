

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


import {useEffect, useState} from 'react'
import apiClient from '../../services/apiClient';



function App() {

  const [user, setUser] = useState({})
  const [error, setError] = useState('')

  console.log('user',user);
  

  useEffect(() => {

    const fetchUser = async () => {
      const {data, error} = await apiClient.fetchUserFromToken()
      if(data) setUser(data.user)
      if(error) {
        console.error('error: ',error);
        setError(error)
      }
    }
    const token = localStorage.getItem(apiClient.getTokenName())

    if(token){
      console.log('token',token);
      apiClient.setToken(token)
      fetchUser()
    }
  }, [])

  // async function checkIfLoggedIn(){
  //   let res = await axios.get('http://localhost:3001/auth/me')
  //   res = res.data

  //   if(res.hasOwnProperty('user'))
  //     setIsLoggedIn('true')
  // }

  const props = {
    user,
    setUser,
    error,
    setError
  }

  return (
    <BrowserRouter>
      <div className="App">
        
        <NavBar {...props} />

        <Routes>
          <Route path="/" element={<Info />}>   </Route>
          <Route path="/register" element={<Register {...props} />}>   </Route>
          <Route path="/login" element={<Login {...props} />}>   </Route>
          <Route path="/sleep" element={<Sleep />}>   </Route>
          <Route path="/nutrition" element={<Nutrition />}>   </Route>
          <Route path="/exercise" element={<Exercise />}>   </Route>
          <Route path="/activity" element={<Activity />}>   </Route>
          
          <Route path="/exercise/create" element={<Exercise />}>   </Route>
        </Routes>
        {/* <Info /> */}

      </div>
    </BrowserRouter>
  );
}

export default App;
