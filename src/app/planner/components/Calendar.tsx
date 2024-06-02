import { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Props {
  events: any[];
  handleEventClick: (arg: any) => void;
  handleDateSelect: (arg: any) => void;
  handleEventDrop: (arg: any) => void;
  handleEventResize: (arg: any) => void;
}

const Calendar: FC<Props> = ({
  events,
  handleEventClick,
  handleDateSelect,
  handleEventDrop,
  handleEventResize,
}) => {
  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.date,
    end: event.endDate,
    allDay: event.allDay,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={formattedEvents}
      nowIndicator={true}
      editable={true}
      droppable={true}
      selectable={true}
      selectMirror={true}
      eventClick={handleEventClick}
      dateClick={handleDateSelect}
      eventDrop={handleEventDrop}
      eventResize={handleEventResize}
    />
  );
};

export default Calendar;
