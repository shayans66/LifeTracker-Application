import React, { useEffect } from 'react'
import './Activity.css'
import { Link, useNavigate } from 'react-router-dom';


export default function Activity(props) {
  console.log('ACTIVITY',props.activity);

  const navigate = useNavigate()

  useEffect(() => {
      if(JSON.stringify(props.user) === '{}')
      navigate('/login')
    },[])
    


  const analytics = props.activity.activity
  return (
    <>

      {/* {JSON.stringify(props.activity.activity)} */}
      <div style={{maxWidth:'1000px'}} className="activity">
        <div className="topbar">
          <p style={{fontSize: "35px"}}>Activity Feed</p>
          <button><Link to="/exercise">Add Exercise</Link></button>
          <button><Link to="/nutrition">Log Sleep</Link></button>
          <button><Link to="/sleep">Record Nutrition</Link></button>
        </div>

        <div className="activity-feed cards">
          {/* <p>{JSON.stringify(analytics)}</p> */}
          <div className='card'>
            <p style={{fontSize: '30px'}}>Total Exercise Minutes</p>
            <p style={{fontSize: '30px'}}>{analytics?.exercise?.totalExerciseMinutes ?? 0}</p>
          </div>
        </div>


        <p style={{'font-size':'30px','fontFamily': 'Dela Gothic One, cursive'}}>More Stats</p>

        <div className="more-stats cards">
          <div className="card">
            <p style={{fontSize: '30px'}}>Maximum Hourly Calories</p>
            {/* <p style={{fontSize: '30px'}}>{Math.floor((analytics?.exercise?.maximumHourlyCalories || 1)*100)/100.0}</p> */}
            <p style={{fontSize: '30px'}}>{parseFloat(analytics?.exercise?.maximumHourlyCalories ?? 0).toFixed(2)}</p>


          </div>
        </div>

      </div>
    </>
  )
}
