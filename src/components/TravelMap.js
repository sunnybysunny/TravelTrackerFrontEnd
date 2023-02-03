import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import "./TravelMap.css";

function TravelMap(props) {
  const center = useMemo(() => ({ lat: 51, lng: -108.35 }), []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const markers = props.pins.map((data) => {
    const position = { lat: data.pin.latitude, lng: data.pin.longitude };
    return <MarkerF position={position} key={data.pin.id} />;
  });

  return (
    <GoogleMap zoom={3} center={center} mapContainerClassName="map-container">
      {markers}
    </GoogleMap>
  );
}

export default TravelMap;
