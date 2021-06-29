import React from "react";
import "./Info.css";

export default function Info() {
  return (
    <div className="Info">
      <p className="title">Life Tracker</p>
      <p>Helping you take back control of your world</p>


        <img
          alt="watch"
          src="http://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg"
        />


      <div className="desc">
        <div><span className="material-icons">fitness_center</span><br/>Fitness</div>
        
        <div><span className="material-icons">lunch_dining</span><br/>Food</div>
        <div><span className="material-icons">bed</span><br/>Rest</div>
        <div><span className="material-icons">event</span><br/>Planner</div>
      </div>
    </div>
  );
}
