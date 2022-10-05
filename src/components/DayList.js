import React from "react";
import 'components/DayListItem';
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const selectedDay = props.days.map((day) => {
    console.log(day.id)
    return <ul key={day.id}>
      <DayListItem
        name={day.name}
        spots={day.spots}
        setDay={props.setDay}
        selected={day.name === props.day} />
    </ul>;

  });
return selectedDay;
};