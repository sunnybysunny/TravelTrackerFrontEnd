import "./Profile.css";
import TravelMap from "../components/TravelMap";
import AddPin from "../components/AddPin";
import Settings from "../components/Settings";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const [settingsPopup, setSettingsPopup] = useState(false);
  const [pins, setPins] = useState(data.pins);
  const renderNewPin = (pin) => {
    pins.push(pin);
    setPins([...pins]);
  };

  return (
    <div>
      <h1>Travel Adventures of {data.name}</h1>
      <AddPin profileId={data.id} addPinHandler={renderNewPin} />
      <button onClick={() => setSettingsPopup(true)}>Settings</button>
      <Settings trigger={settingsPopup} setTrigger={setSettingsPopup} />
      <TravelMap pins={pins} />
    </div>
  );
}

export default Profile;
