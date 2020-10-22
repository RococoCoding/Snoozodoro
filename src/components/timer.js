import React, {useState, useEffect} from "react";
//timer function
//display interval length at start
//count down every second
//stop at 0

export default function Timer (props) {
  const [workInterval, setWorkInterval] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200);


  function toggle() {
    setIsOn(!isOn);
  }

  useEffect(() => {
    if (isOn) {
      if(timeLeft===0){
          setTimeLeft(null)
      }
      // exit early when we reach 0
      if (!timeLeft) return;
      // save everySecond to clear the interval when the
      // component re-renders
      const everySecond = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(everySecond);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }
  }, [isOn, timeLeft]);

  useEffect(()=>{ //calculates secondsleft to display
    //divides seconds left to get hours then minutes then seconds left for display
    let minutesLeft = -1
    if (timeLeft / (60*60) >= 1) { //if an hour or more left
      setHours(Math.floor(timeLeft / (60*60))); 
      minutesLeft = timeLeft/60;
    }
    if (timeLeft / 60 >= 1 || minutesLeft/60 > 1) { //if at least 1 minute left or went into previous hour block
      if (minutesLeft === -1) { //if did not already divide remaining time by hour
        minutesLeft = timeLeft/60; //divide by minutes
      }
      setMinutes(Math.floor(minutesLeft));
      if (timeLeft % 60 >= 60) {
        setSeconds(0)
      } else setSeconds(Math.floor(timeLeft % 60));
    }
    else setSeconds(Math.floor(timeLeft));
  }, [timeLeft])

  return (
  <div>
    <div>
      <p>{hours}:{minutes}:{seconds < 10 ? `0${seconds}`: seconds}</p>
    </div>
    <button onClick={toggle}>{isOn ? "Stop" : "Start"}</button>
    {/* <button onClick={timerPause}>Pause</button>
    <button onClick={timerEnd}>Stop</button> */}
  </div>)
}

