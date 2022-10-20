

// Returns an array of appointments for that day
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

// Returns a new object containing the interview data 
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}

// Returns the interview object for the specific appointment slot
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(d => d.name === day);
  if (state.interviewers === [] || !filteredDays.length) {
    return [];
  }
  const interviewers = filteredDays[0].interviewers;
  let interviewerArray = [];
  for (let interviewer of interviewers) {
    interviewerArray.push(state.interviewers[interviewer]);
  }
  return interviewerArray;

}