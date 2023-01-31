import "./Profile.css";
import TravelMap from "../components/TravelMap";
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
      <TravelMap />
    </div>
  );
}

export default Profile;
