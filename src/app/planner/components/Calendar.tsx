import { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Props {
  events: any[];
  handleEventClick: (arg: any) => void;
  handleDateSelect: (arg: any) => void;
  handleEventDrop: (arg: any) => void;
}

const Calendar: FC<Props> = ({
  events,
  handleEventClick,
  handleDateSelect,
  handleEventDrop,
}) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      nowIndicator={true}
      editable={true}
      droppable={true}
      selectable={true}
      selectMirror={true}
      eventClick={handleEventClick}
      dateClick={handleDateSelect}
      drop={handleEventDrop}
    />
  );
};

export default Calendar;
