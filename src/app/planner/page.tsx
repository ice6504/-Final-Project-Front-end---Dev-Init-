"use client";
import { useState, useEffect } from "react";

// components
import Calendar from "./components/Calendar";

interface Event {
  id: number;
  title: string;
  allDay: boolean;
  date: string;
  endDate?: string;
}

function PlannerPage() {
  const [allEvents, setAllEvents] = useState<Event[]>(() => {
    const saveEvents = localStorage.getItem("events");
    return saveEvents ? JSON.parse(saveEvents) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Function to save events to localStorage
  const saveEventsToLocalStorage = (events: Event[]) => {
    localStorage.setItem("events", JSON.stringify(events));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setInputTitle("");
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEventClick = (arg: any) => {
    const clickedEvent = allEvents.find(
      (event) => event.id === Number(arg.event.id)
    );
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setEditTitle(clickedEvent.title);
    }
    toggleEditModal();
  };

  const handleDateSelect = (arg: any) => {
    setSelectedDate(arg.dateStr);
    toggleModal();
  };

  const handleEventDrop = (arg: any) => {
    const { event } = arg;
    const updatedEvents = allEvents.map((ev) =>
      ev.id === Number(event.id)
        ? { ...ev, date: event.startStr, endDate: event.endStr }
        : ev
    );
    setAllEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
  };

  const handleEventResize = (arg: any) => {
    const { event } = arg;
    const updatedEvents = allEvents.map((ev) =>
      ev.id === Number(event.id)
        ? { ...ev, date: event.startStr, endDate: event.endStr }
        : ev
    );
    setAllEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add new event
    if (inputTitle.trim()) {
      const newEvent: Event = {
        id: Date.now(),
        title: inputTitle,
        allDay: true,
        date: selectedDate,
      };
      setAllEvents([...allEvents, newEvent]);
      saveEventsToLocalStorage([...allEvents, newEvent]); // Save events after add
      toggleModal();
    }
  };

  const handleEditFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedEvent) {
      const updatedEvents = allEvents.map((ev) =>
        ev.id === selectedEvent.id ? { ...ev, title: editTitle } : ev
      );
      setAllEvents(updatedEvents);
      saveEventsToLocalStorage(updatedEvents); // Save events after edit
      toggleEditModal();
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const updatedEvents = allEvents.filter(
        (event) => event.id !== selectedEvent.id
      );
      setAllEvents(updatedEvents);
      saveEventsToLocalStorage(updatedEvents); // Save events after delete
      toggleEditModal();
    }
  };

  return (
    <>
      <div className="p-5 flex flex-col gap-5 h-screen">
        <h2 className="text-5xl font-bold text-primary max-lg:hidden">
          🗓️Planner Page
        </h2>
        <Calendar
          events={allEvents}
          handleEventClick={handleEventClick}
          handleDateSelect={handleDateSelect}
          handleEventDrop={handleEventDrop}
          handleEventResize={handleEventResize}
        />
      </div>
      {isModalOpen && (
        <dialog open className="modal bg-black/30">
          <div className="modal-box">
            <button
              onClick={toggleModal}
              className="btn btn-sm btn-circle btn-outline btn-primary text-primary absolute right-3 top-2"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark fa-xl"></i>
            </button>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Add your event"
                className="input bg-primary text-white placeholder:text-white/60 w-full mt-8"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                aria-label="Add event"
              />
              <div className="mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-outline w-full"
                  aria-label="Save event"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
      {isEditModalOpen && selectedEvent && (
        <dialog open className="modal bg-black/30">
          <div className="modal-box">
            <button
              onClick={toggleEditModal}
              className="btn btn-sm btn-circle btn-outline btn-primary text-primary absolute right-3 top-2"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark fa-xl"></i>
            </button>
            <form onSubmit={handleEditFormSubmit}>
              <input
                type="text"
                placeholder="Edit your event"
                className="input bg-primary text-white placeholder:text-white/60 w-full mt-8"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                aria-label="Edit event"
              />
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="btn btn-success btn-outline w-[47%] sm:w-[48%]"
                  aria-label="Save event"
                >
                  Save <i className="fa-solid fa-check"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-error btn-outline w-[47%] sm:w-[48%]"
                  onClick={handleDeleteEvent}
                  aria-label="Delete event"
                >
                  Delete <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}

export default PlannerPage;
