import React from "react";
import "./Exercise.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { func } from "prop-types";
import apiClient from "../../services/apiClient";

export default function Exercise() {
  // const [isCreating, setIsCreating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [exercises, setExercises] = useState([])

  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    category: '',
    duration: 1,
    intensity: 1,
  })

  function handleStartCreateExercise() {
    setIsCreating(true);
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
      setExercises(arr => ([...arr, data]))
      setIsCreating(false)
    }else if(error){
      setError(error)
    }

    

  }
  return (
    <div className="exercise">
      <div className="banner">
        <h2>Exercise</h2>
      </div>

      {isCreating ? (
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
      ) : (
        <div className="info">
          <h3>Overview</h3>
          <button onClick={handleStartCreateExercise}>Add Exercise</button>
          {/* <Link to="create"><button onClick={handleStartCreateExercise}>Add Exercise</button></Link> */}
        </div>
      )}
    </div>
  );
}
