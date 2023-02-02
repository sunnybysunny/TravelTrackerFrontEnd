import React from "react";
import PropTypes from "prop-types";
import "./Settings.css";

function Settings(props) {
  return props.trigger ? (
    <div className="popup">
      <popup className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          close
        </button>
        <button>Dark Mode</button>
        <button>Light Mode</button>
        <button>Delete Profile</button>
        {props.children}
      </popup>
    </div>
  ) : (
    ""
  );
}

export default Settings;
