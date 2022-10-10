import React from "react";
import 'components/Appointment/styles.scss';

import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() =>
      transition(SHOW)
    );
  }

  function deleteAppt(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING);
    props.cancelInterview(props.id, interview).then(() =>
      transition(EMPTY)

    );
  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          //onEdit={action("onEdit")}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"
        />)}
      {mode === CONFIRM && (
        <Confirm
        onCancel={back}
        onConfirm={deleteAppt}
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />)}

    </article>

  );
}