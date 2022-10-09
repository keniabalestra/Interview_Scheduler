import react, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); //keeps track of the history of the modes


  const transition = (newMode) => {
    setMode(newMode);
    setHistory(prev => [...prev, newMode]);
  };

  const back = () => {
    const newHistory = [...history];
    console.log("newHisory: ", newHistory);
    if (history.length > 1) {
     setHistory(prev=>[...prev.slice(0, prev.length-1)])
     setMode(history[history.length-2])
    }
  };
  return { mode, transition, back };
}