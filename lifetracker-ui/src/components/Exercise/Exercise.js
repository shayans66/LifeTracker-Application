import React from "react";
import "./Exercise.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

import apiClient from "../../services/apiClient";
import {v4 as uuid} from 'uuid'



export default function Exercise({ user, exercises, setExercises }) {
  const navigate = useNavigate()

  // const [isCreating, setIsCreating] = useState(false);

  
  

  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    category: '',
    duration: 1,
    intensity: 1,
  })

  useEffect(() => {
    if(JSON.stringify(user) === '{}')
      navigate('/login')
  }, [])

  function handleStartCreateExercise() {

    setForm({
      name: '',
      category: '',
      duration: 1,
      intensity: 1,
    })
    // setIsCreating(true);
    navigate('create')

    
  }

  function handleOnInputChange(e){
    
    setForm((f) => ({...f, [e.target.name]: e.target.value}))
  }
  async function handleOnSubmitForm(e){
    e.preventDefault()

    if(!form.name){
      setError('Name is empty')
      return
    }
    if(!form.category){
      setError('Category is empty')
      return
    }
    

    

    const {data, error} = await apiClient.createExerciseForUser({
      exercise: form
    })
    console.log({data, error});
    if(data){
      setExercises(arr => ([...arr, data])) // maybe rm
      // setIsCreating(false)
      navigate('/exercise')
    }else if(error){
      setError(error)
    }
  }


  const props = {
    handleOnSubmitForm,
    handleOnInputChange,
    error,
    handleStartCreateExercise,
    exercises,
  }
  
  return (
    <div className="exercise">
      <div className="banner">
        <h2>Exercise</h2>
      </div>

      {/* {isCreating ? (
        <ExerciseCreateForm {...props}/>
      ) : (
        <Exercises {...props} />
      )} */}
      <Routes>
        <Route path="" element={ <Exercises {...props} /> } />
        <Route path="create" element={ <ExerciseCreateForm {...props} /> } />
      </Routes>
    </div>
  );
}
export function ExerciseCreateForm({
  handleOnSubmitForm,
  handleOnInputChange,
  error,
  exercises

}){
  return (
    <div className="createExercise">
          <form onSubmit={handleOnSubmitForm}>
            <label>Name</label>
            <input onChange={handleOnInputChange} type="text" placeholder="Exercise name" name="name" />
            <label>Category</label>
            <input onChange={handleOnInputChange} type="text" placeholder="Exercise category" name="category"/>
            <div className="same-line-inputs">
              <div>
                <label>Duration (min)</label>
                <input onChange={handleOnInputChange} type="number" name="duration" value="1" />
              </div>
              <div>
                <label>Intensity (1-10)</label>
                <input onChange={handleOnInputChange} type="number" name="intensity" value="1" />
              </div>
            </div>

            <p value={error} style={{color: "red"}}>{error}</p>
            <button>Save</button>
            {/* <Link to="/exercise"><button>Save</button></Link> */}
          </form>
        </div>
  )
}
export function Exercises({
  handleOnSubmitForm,
  handleOnInputChange,
  error,
  handleStartCreateExercise,
  exercises,
}){
  console.log(exercises);
  return (
    <>
    <div className="info">
      <h3>Overview</h3>
      <button onClick={handleStartCreateExercise}>Add Exercise</button>
    </div>
    <div className="cards">
      {
        exercises.map((exercise) => (
          <div key={uuid()} className="card">

            <p style={{fontSize: '30px'}}><b>{exercise.name}</b></p> 
            <p style={{float: "right",marginRight: '40px',border:'2px solid green',padding:'5px'}}>Category: {exercise.category}</p> 
            <p>Duration: {exercise.duration}</p> 
            <p>Intensity: {exercise.intensity}</p> 
            <p>{exercise.created_at.substring(0,exercise.created_at.indexOf('T'))} </p><br/>
            <br/>

          </div>
        ))
      }
    </div>
    </>
  )
}