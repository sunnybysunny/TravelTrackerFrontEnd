import React from "react";
import "./AddPin.css";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import "./Settings.css";
import { Link, useNavigate } from "react-router-dom";

const Settings = (props) => {
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);

  const handleDeleteProfile = (event) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/profiles/${props.profileId}`
      )
      .then((res) => {
        alert("Your profile has been deleted.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Popup
      className="settings"
      open={formOpen}
      trigger={<button className="MainBtn">Settings</button>}
      position="bottom center"
      onOpen={() => setFormOpen(true)}
    >
      <button className="close-btn" onClick={() => setFormOpen(false)}>
        close
      </button>
      <br></br>
      <div className="SettingActionButtons">
        <button className="SetBtn">Dark Mode</button>
        <button className="SetBtn">Light Mode</button>
        <button className="SetBtn" onClick={handleDeleteProfile}>
          Delete Profile
        </button>
      </div>
    </Popup>
  );
};

export default Settings;
