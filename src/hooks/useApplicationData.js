import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  console.log("STATE: ", state);
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments)
    console.log("DAY:",days)
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days });
        //updateSpots()
      });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments)
    return axios.delete(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days });
        // updateSpots()
      });

  }

  // Returns array with available spots for the day
  function updateSpots(state, appointments) {
    //finds the day  
    const dayObj = state.days.find(d => d.name === state.day);

    //counts the spots
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const day = { ...dayObj, spots };
    const days = state.days.map(d => d.name === state.day ? day : d);
   
    return days;
  }
  return { state, setDay, bookInterview, cancelInterview, updateSpots };
}
