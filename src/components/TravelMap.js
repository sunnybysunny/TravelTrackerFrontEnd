import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import Moment from "moment";
import axios from "axios";

import "./TravelMap.css";

function TravelMap(props) {
  const center = useMemo(() => ({ lat: 51, lng: -108.35 }), []);
  const [openedPin, setOpenedPin] = useState(null);
  const [allPins, setAllPins] = useState(props.pins);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const openPin = (id) => {
    setOpenedPin(id);
  };

  const removePin = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/pins/${id}`
      )
      .then(() => {
        const existingPins = allPins.filter((pin) => pin.id !== id);
        setAllPins(existingPins);
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to removed pin");
      });
  };


  const markers = allPins.map((data) => {
    const position = { lat: data.pin.latitude, lng: data.pin.longitude };
    return (
      <MarkerF
        position={position}
        key={data.pin.id}
        onClick={() => openPin(data.pin.id)}
      >
        {openedPin === data.pin.id && (
          <InfoWindowF>
            <div className="PinInfo">
              <span>Location: {data.pin.location_name}</span>
              <span>
                Travel Date: {Moment(data.pin.date).format("DD/MM/YYYY")}
              </span>
              <button onClick={() => removePin(data.pin.id)}>Remove Pin</button>
            </div>
          </InfoWindowF>
        )}
      </MarkerF>
    );
  });


  return (
    <div className="mapOuterContainer">
      <GoogleMap
        zoom={3}
        center={center}
        mapContainerClassName="mapInnerContainer"
      >
        {markers}
      </GoogleMap>
    </div>
  );
}

export default TravelMap;
