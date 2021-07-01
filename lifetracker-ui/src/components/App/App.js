

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

  const [exercises, setExercises] = useState([])
  const [nutrition, setNutrition] = useState([])
  const [sleep, setSleep] = useState([])
  
  

  const fetchExercises = async () => {
    const {data, error} = await apiClient.getExercisesForUser()
    console.log('{data, error} ',{data, error} );
    if(data){

      setExercises(data.exercises)
      console.log(exercises);
    }else if(error){
      console.error(error);
    }
  }
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
      // console.log('token',token);
      apiClient.setToken(token)
      fetchUser()
      fetchExercises()


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
    setError,
    exercises,
    setExercises,
    fetchExercises,
    nutrition,
    setNutrition,
    sleep,
    setSleep,
  }

  return (
    <BrowserRouter>
      <div className="App">
        
        <NavBar {...props} />



        <Routes>
          <Route path="/" element={<Info />}>   </Route>
          <Route path="/register" element={<Register {...props} />}>   </Route>
          <Route path="/login" element={<Login {...props} />}>   </Route>
          <Route path="/sleep" element={<Sleep {...props} />}>   </Route>
          <Route path="/nutrition" element={<Nutrition {...props} />}>   </Route>
          <Route path="/exercise/*" element={<Exercise {...props} />  }>   </Route>
          <Route path="/activity" element={<Activity {...props} />}>   </Route>


        </Routes>
        {/* <Info /> */}

      </div>
    </BrowserRouter>
  );
}

export default App;
