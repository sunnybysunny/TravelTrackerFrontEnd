import React from "react";
// import PropTypes from "prop-types";
import "./AddPin.css";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";

const AddPin = (props) => {
  const [formFields, setFormFields] = useState({
    location: "",
    date: "",
  });
  const [formOpen, setFormOpen] = useState(false);

  const updateLocation = (event) => {
    setFormFields({ date: formFields.date, location: event.target.value });
  };

  const updateDate = (event) => {
    setFormFields({ date: event.target.value, location: formFields.location });
  };

  const handleAddPin = (event) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/profiles/${props.profileId}/pins`,
        {
          location_name: formFields.location,
          date: formFields.date,
        }
      )
      .then((res) => {
        props.addPinHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  };

  return (
    <Popup
      open={formOpen}
      trigger={<button>Add Pin</button>}
      position="right center"
      onOpen={() => setFormOpen(true)}
    >
      <button className="close-btn" onClick={() => setFormOpen(false)}>
        close
      </button>
      <form className="popup" onSubmit={handleAddPin}>
        <div className="popup-inner">
          <label>Location:</label>
          <input
            onChange={updateLocation}
            type="text"
            placeholder="City, State/Country"
          />
          <label>Travel Date:</label>
          <input onChange={updateDate} type="text" placeholder="dd/mm/yyyy" />
          <input type="submit" value="Submit" />
          {props.children}
        </div>
      </form>
    </Popup>
  );
};

export default AddPin;
