import React from "react";

export default function SnoozeOverlay(props) {
  const {snoozeOff} = props;
  return (
    <div>
      <button onClick={snoozeOff}>I'm ready for my break!</button>
    </div>
  )
};
