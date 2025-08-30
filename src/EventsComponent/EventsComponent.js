import React, { useEffect, useState } from "react";
import EventMap from "./EventMap";
import EventModel from "../Homepage/FootballMatchModel/EventModel";
import "./EventsComponent.css";

const formatDateTime = (datetimeStr) => {
  if (!datetimeStr) return "";
  const date = new Date(datetimeStr);
  const options = { 
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit" 
  };
  return date.toLocaleString("en-IN", options);
};

export default function EventComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/events") // fetch ALL events
      .then((res) => res.json())
      .then((data) => setEvents(data.map(e => EventModel.fromJson(e))));
  }, []);

  if (events.length === 0) return <p>Loading...</p>;

  return (
    <div className="events-container">
      <h1 className="hero-title">⚽ Events</h1>
      {events.map((event, index) => (
       <div key={index} className="event-card">

  {/* Event image */}
  {event.imageUrl && (
    <div className="event-image">
      <img src={event.imageUrl} alt={event.name} />
    </div>
  )}

  {/* Event details */}
  <div className="Event-Info">
    <h3>{event.name}</h3>
    <p>{event.description}</p>
    <p><strong>Event Time</strong></p>
    <p>Start: {formatDateTime(event.startTime)}</p>
    <p>End: {formatDateTime(event.endTime)}</p>
  </div>

  {/* Map first, then button */}
  <EventMap event={event} />
  <button className="button">Book</button>
</div>

      ))}
    </div>
  );
}
