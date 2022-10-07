

//returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(d => d.name === day);
  if (state.appointments === [] || !filteredDays.length) {
    return [];
  }
  const appointments = filteredDays[0].appointments;
  let appointmentArray = [];
  for (let appointment of appointments) {
    appointmentArray.push(state.appointments[appointment]);
  }
  return appointmentArray;

}

// return a new object containing the interview data 
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}