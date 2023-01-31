import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";

import "./GoogleMap.css";

function GoogleMap() {
  const center = useMemo(() => ({ lat: 51, lng: -108.35 }), []);

  return (
    <GoogleMap
      zoom={3}
      center={center}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
}

export default GoogleMap;
