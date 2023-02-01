import "./Profile.css";
import TravelMap from "../components/TravelMap";
import AddPin from "../components/AddPin";
import Settings from "../components/Settings";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useJsApiLoader, Marker } from "@react-google-maps/api";

function Profile() {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const [addPinPopup, setAddPinPopup] = useState(false); 
  const [settingsPopup, setSettingsPopup] = useState(false);


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Travel Adventures of {data.name}</h1>
      <button onClick={()=> setAddPinPopup(true)}>Add Pin</button>
      <AddPin trigger={addPinPopup} setTrigger={setAddPinPopup} />
      <button onClick={()=> setSettingsPopup(true)}>Settings</button>
      <Settings trigger={settingsPopup} setTrigger={setSettingsPopup}/>
      <TravelMap />
    </div>
  );
}

export default Profile;

