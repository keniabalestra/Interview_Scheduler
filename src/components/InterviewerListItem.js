import React from "react";
import 'components/InterviewerListItem.scss';
import classNames from "classnames";


export default function InterviewerListItem(props) {
  let interviewerClass = classNames("interviewers__item", { "interviewers__item--selected": props.selected });
  const showName = (selected) => {
    if (props.selected) {
      return selected;
    } else {
      return "";
    }
  };

  return (
    <li className={interviewerClass}
      onClick={props.setInterviewer}  >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {showName(props.name)}
    </li>
  );
}