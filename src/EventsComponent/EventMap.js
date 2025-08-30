import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./EventMaps.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const formatDateTime = (datetimeStr) => {
  const date = new Date(datetimeStr);
  const options = { 
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit" 
  };
  return date.toLocaleString("en-IN", options);
};

const EventMap = ({ event }) => {
  const position = [event.latitude, event.longitude];

  return (
    <MapContainer center={position} zoom={14} className="event-map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          📍 {event.name} <br />
          {event.description} <br />
         
          🕒 {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)} <br />
          ({event.latitude}, {event.longitude})
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default EventMap;
