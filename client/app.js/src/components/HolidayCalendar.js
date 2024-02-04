import React, {useState} from 'react';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//add locales - of the country your calendar will be based on
const locales = {
  "en-US": require("date-fns/locale/en-US"), // we have used english as the language and US as the country
};
const localizer = dateFnsLocalizer({ //
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
      title: "Team building",
      allDay: true, // event will run through out the day
      start: new Date(2024, 3, 4),
      end: new Date(2024, 3, 4),
  },
  {
      title: "AGM Meeting",
      start: new Date(2024, 6, 7),
      end: new Date(2024, 6, 10),
  },
  {
      title: "New product launching Conference",
      start: new Date(2024, 6, 20),
      end: new Date(2024, 6, 23),
  },
];

function HolidayCalendar() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });// cretating a new event with the start and end dates
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
      //for loop for adding all new the events
      for (let i=0; i<allEvents.length; i++){

          const date1 = new Date (allEvents[i].start); //all events
          const date2 = new Date(newEvent.start); // start of a new event
          const date3 = new Date(allEvents[i].end); // all events
          const date4 = new Date(newEvent.end); // end of a new event
    
           if (
            ( (date1  <= date2) && (date2 <= date3) ) || ( (date1  <= date4) &&  //added logical operators AND and OR.
              (date4 <= date3) )
            )
          {   
              alert("SIMILAR"); //an alert if the events dates are similar the break to avoid continuation.
              break;
           }
  
      }
      
      
      setAllEvents([...allEvents, newEvent]);
  }

  return (
      <div className="Calendar">
          <h1>Calendar</h1>
          <h2>Add New Event</h2>
          <div>
              <input type="text" placeholder="Add Title" style={{ width: "20%", 
              marginRight: "10px", }} 
              value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" 
              }}
              selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
              <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
              <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                  Add Event
              </button>
          </div>
          <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} /> 
      </div>
  );
}

export default HolidayCalendar;