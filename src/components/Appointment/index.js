import React from "react";
import 'components/Appointment/styles.scss';

import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    props.bookInterview(props.id, interview)
      .then(() =>
        transition(SHOW))
      .catch((error) => {
        transition(ERROR_SAVE, true);
        console.log(error);
      });
  }

  function deleteAppt(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING, true);
    props.cancelInterview(props.id, interview)
      .then(() =>
        transition(EMPTY))
      .catch((error) => {
        transition(ERROR_DELETE, true);
        console.log(error);
      });
  }

  return (
    <article
      className="appointment"
      data-testid="appointment"
    >
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
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
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Unable to save"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Unable to delete"
          onClose={back}
        />
      )}

    </article>

  );
}