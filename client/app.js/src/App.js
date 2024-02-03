import React from 'react';
import './app.css';
import HolidayCalendar from "./components/HolidayCalendar";
import Notifications from './components/Notifications';


function App() {
  return (
    <div className="">
      <Notifications />
      <HolidayCalendar />
    </div>
  );
} 
  

export default App;
