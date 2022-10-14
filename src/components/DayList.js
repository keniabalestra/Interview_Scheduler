import React from "react";
import 'components/DayListItem';
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const selectedDay = props.days.map((day) => {

    return <ul key={day.id}>
      <DayListItem
        name={day.name}
        spots={day.spots}
        setDay={props.onChange}
        selected={day.name === props.value} />
    </ul>;
  });
  return selectedDay;
};