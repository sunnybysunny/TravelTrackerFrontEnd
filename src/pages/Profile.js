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
      <button onClick = {AddPin} type="submit">Add Pin</button>
      <Settings/>
      <TravelMap />
    </div>
  );
}

export default Profile;


// imported some buttons from pin and settings 