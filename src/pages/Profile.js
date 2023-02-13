import "./Profile.css";
import TravelMap from "../components/TravelMap";
import AddPin from "../components/AddPin";
import Settings from "../components/Settings";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const data = location.state;

  const [pins, setPins] = useState(data.pins);
  const renderNewPin = (pin) => {
    pins.push(pin);
    setPins([...pins]);
    location.state.pins = [...pins];
    data.pins = [...pins];
  };

  const removePin = (id) => {
    const existingPins = pins.filter((pin) => pin.pin.id !== id);
    setPins([...existingPins]);
  };

  return (
    <div className="ProfilePage">
      <h1 className="ProfileHeader">Travel Adventures of {data.name}</h1>
      <AddPin
        className="ProfileButtons"
        profileId={data.id}
        addPinHandler={renderNewPin}
      />
      <Settings className="ProfileButtons" profileId={data.id} />
      <TravelMap pins={pins} removePinHandler={removePin} />
    </div>
  );
}

export default Profile;
