import React from "react";
import PropTypes from "prop-types";
import "./AddPin.css";
import { useState } from "react";

// function AddPin() {
//   return <button className="ProfileButton" onClick={AddPinButton}> Add Pin</button>;
// }

const AddPin = (props) => {
  const [formFields, setFormFields] = useState({
    location: "",
    date: "",
  });

  const onLocationChange = (event) => {
    setFormFields({
      ...formFields,
      location: event.target.value,
    });
  };

  const onDateChange = (event) => {
    setFormFields({
      ...formFields,
      date: event.target.value,
    });
  };

  const FormSubmit = (event) => {
    event.preventDefault();

    props.onUpdateBoardData({
      location: formFields.location,
      date: formFields.date,
    });

    setFormFields({
      location: "",
      date: "",
    });
  };

  return (

    <form onSubmit={FormSubmit}>
      <div>
        <label>Location:</label>
        <input 
          name="Location" 
          value={formFields.location} 
          onChange={onLocationChange}          
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          date="date"
          value={formFields.date}
          onChange={onDateChange}  
        />
      </div>
      <p> Preview so we can see - </p>
      <p>
        {formFields.location} {formFields.date}{" "}
      </p>
    </form>
  );
};

AddPin.propTypes ={
  location: PropTypes.string,
  date: PropTypes.number
}

export default AddPin;


// created a form function so we can recieve input from the user, but I wasn't able to get the form to show up after a button click, so either the button shows up or only the forms, maybe you can fix? 

// I think this is where we could create a post route for pins