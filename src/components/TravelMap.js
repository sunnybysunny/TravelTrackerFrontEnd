import React, { useState, forceUpdate } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import Moment from "moment";
import axios from "axios";

import "./TravelMap.css";

function TravelMap(props) {
  const locations = {
    NorthAmerica: {
      center: {
        lat: 51,
        lng: -110.35,
      },
      zoom: 3.3,
    },
    World: {
      center: {
        lat: 43.7696,
        lng: 11.2558,
      },
      zoom: 1.7,
    },
  };

  const [selectedLocation, setSelectedLocation] = useState(locations.World);

  const [center, setCenter] = useState(selectedLocation.center);
  const [zoom, setZoom] = useState(selectedLocation.zoom);
  const [openedPin, setOpenedPin] = useState(null);

  const mapStyles = {
    default: { pinIcon: "", mapStyle: [] },
    night: {
      pinIcon: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
      mapStyle: [
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
    },
    retro: {
      pinIcon: "https://maps.gstatic.com/mapfiles/ms2/micons/pink-pushpin.png",
      mapStyle: [
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
    },
  };

  const [mapStyle, setMapStyle] = useState(mapStyles.default.mapStyle);
  const [pinIcon, setPinIcon] = useState(mapStyles.default.pinIcon);

  const options = {
    mapTypeControl: false,
    gestureHandling: "cooperative",
    styles: mapStyle,
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        west: -180,
        east: 180,
      },
    },
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  if (!isLoaded) {
    return <div className="Loading">Loading...</div>;
  }

  const openPin = (id) => {
    setOpenedPin(id);
  };

  const removePin = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/pins/${id}`)
      .then(() => {
        props.removePinHandler(id);
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to removed pin");
      });
  };

  const changeMapStyle = (event) => {
    setMapStyle(mapStyles[event.target.value].mapStyle);
    setPinIcon(mapStyles[event.target.value].pinIcon);
  };

  const markers = props.pins.map((data) => {
    const position = { lat: data.pin.latitude, lng: data.pin.longitude };
    return (
      <Marker
        icon={pinIcon}
        position={position}
        key={data.pin.id}
        onClick={() => openPin(data.pin.id)}
      >
        {openedPin === data.pin.id && (
          <InfoWindow
            className="InfoWindow"
            onCloseClick={() => setOpenedPin(null)}
          >
            <div
              className="PinInfo"
              onBlur={(e) => {
                setOpenedPin(null);
              }}
            >
              <span>Location: {data.pin.location_name}</span>
              <span>
                Travel Date: {Moment(data.pin.date).format("DD/MM/YYYY")}
              </span>
              <button
                className="RemovePinBtn"
                onClick={() => removePin(data.pin.id)}
              >
                Remove Pin
              </button>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  });

  return (
    <div className="mapOuterContainer">
      <GoogleMap
        zoom={zoom}
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

        <select
          className="locationSelector"
          onChange={(event) => {
            const location = locations[event.target.value];
            setCenter({ ...location.center });
            setZoom(location.zoom);
          }}
          defaultValue="World"
        >
          <option value="World">World View</option>
          <option value="NorthAmerica">North America View</option>
        </select>

        <button
          className="centerMapButton"
          onClick={() => {
            setCenter({ ...center });
            setZoom(zoom);
          }}
        >
          Center Map
        </button>
        {markers}
      </GoogleMap>
    </div>
  );
}

export default TravelMap;
