import React, { useEffect } from "react";

import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

const CalendarPage = () => {
  useEffect(() => {
    const calendarEl = document.getElementById("calendar");

    if (calendarEl) {
      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, googleCalendarPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        googleCalendarApiKey: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        events: `https://calendar.google.com/calendar/ical/${process.env.REACT_APP_CALENDAR_ID}/public/basic.ics`,
      });

      calendar.render();
    }
  }, []);

  return <div id="calendar" />;
};

export default CalendarPage;
