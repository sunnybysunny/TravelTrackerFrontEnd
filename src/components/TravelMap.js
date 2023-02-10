import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
  MapOptions,
} from "@react-google-maps/api";
import Moment from "moment";
import axios from "axios";

import "./TravelMap.css";

function TravelMap(props) {
  const center = useMemo(() => ({ lat: 43.7696, lng: 11.2558 }), []);
  const [openedPin, setOpenedPin] = useState(null);
  const [allPins, setAllPins] = useState(props.pins);
  const mapStyles = {
    default: [],
    night: [
      { elementType: "geometry", stylers: [{ color: "#2f425c" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
    retro: [
      { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#c9b2a6" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [{ color: "#dcd2be" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ae9e90" }],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#93817c" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#a5b076" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#447530" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#f5f1e6" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#fdfcf8" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#f8c967" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#e9bc62" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#e98d58" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [{ color: "#db8555" }],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#806b63" }],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8f7d77" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#ebe3cd" }],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#b9d3c2" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#92998d" }],
      },
    ],
  };

  const [mapStyle, setMapStyle] = useState(mapStyles.default);

  const options = {
    mapTypeControl: false,
    gestureHandling: "cooperative",
    styles: mapStyle,
  };

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
      .delete(`${process.env.REACT_APP_BACKEND_URL}/pins/${id}`)
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

  const changeMapStyle = (event) => {
    setMapStyle(mapStyles[event.target.value]);
  };

  return (
    <div className="mapOuterContainer">
      <GoogleMap
        zoom={1.7}
        options={options}
        center={center}
        mapContainerClassName="mapInnerContainer"
      >
        <select
          className="selector-control"
          onChange={changeMapStyle}
          defaultValue="default"
        >
          <option value="default">Default</option>
          <option value="night">Night mode</option>
          <option value="retro">Retro</option>
        </select>
        {markers}
      </GoogleMap>
    </div>
  );
}

export default TravelMap;
