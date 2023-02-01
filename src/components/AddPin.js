import React from "react";
// import PropTypes from "prop-types";
import "./AddPin.css";
// import { useState } from "react";

function AddPin(props){
  return(props.trigger) ? (
    <div classname="popup">
      <popup className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
        <label>Location:</label>
          <input type="text" placeholder="City, State/Country"/>
        <label>Travel Date:</label>
        <input type="text"placeholder="dd/mm/yyyy"/>
        {props.children}
      </popup>
    </div>
  ): "";
}

export default AddPin;