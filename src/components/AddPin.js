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
        alert("pin already exists, no duplicate pins allowed");
      });

    event.preventDefault();
  };

  return (
    <Popup
      className="main"
      open={formOpen}
      trigger={<button className="MainBtn">Add Pin</button>}
      position="bottom center"
      onOpen={() => setFormOpen(true)}
    >
      <button className="close-btn" onClick={() => setFormOpen(false)}>
        close
      </button>
      <br></br>
      <form onSubmit={handleAddPin}>
        <div className="PopupInner">
          <div className="location">
            <label className="Label">Location</label>
            <input
              onChange={updateLocation}
              type="text"
              placeholder="City, State/Country"
            />
          </div>
          <div className="Date">
            <label className="Label">Travel Date</label>
            <input onChange={updateDate} type="text" placeholder="dd/mm/yyyy" />
          </div>
          <input className="Submit" type="submit" value="Submit" />

          {props.children}
        </div>
      </form>
    </Popup>
  );
};

export default AddPin;
