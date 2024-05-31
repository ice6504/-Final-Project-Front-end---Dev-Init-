"use client";

import { useState } from "react";

// components
import Calendar from "./components/Calendar";

function PlannerPage() {
  const [events, setEvents] = useState([
    // Example events
    { title: "Event 1", date: "2023-06-01" },
    { title: "Event 2", date: "2023-06-02" },
  ]);

  const handleEventClick = (arg: any) => {
    console.log("Event clicked:", arg.event.title);
  };

  const handleDateSelect = (arg: any) => {
    const title = prompt("Enter a title for the event:");
    if (title) {
      setEvents([...events, { title, date: arg.startStr }]);
    }
  };

  const handleEventDrop = (arg: any) => {
    const updatedEvents = events.map((event) =>
      event.title === arg.event.title
        ? { ...event, date: arg.event.startStr }
        : event
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="p-5 flex flex-col gap-5 h-screen">
      <h2 className="text-5xl font-bold text-primary max-lg:hidden">
        🗓️Planner Page
      </h2>
      <Calendar
        events={events}
        handleEventClick={handleEventClick}
        handleDateSelect={handleDateSelect}
        handleEventDrop={handleEventDrop}
      />
    </div>
  );
}

export default PlannerPage;
