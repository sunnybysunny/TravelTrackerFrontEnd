import React from "react";
// import PropTypes from "prop-types";
import "./AddPin.css";
import { useState } from "react";

const AddPin = (props) => {
  const [formFields, setFormFields] = useState({
    title: "",
    owner: "",
  });

  return props.trigger ? (
    <form className="popup">
      <popup className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          close
        </button>
        <label>Location:</label>
        <input type="text" placeholder="City, State/Country" />
        <label>Travel Date:</label>
        <input type="text" placeholder="dd/mm/yyyy" />
        <input type="submit" value="Submit" />
        {props.children}
      </popup>
    </form>
  ) : (
    ""
  );
};

export default AddPin;
