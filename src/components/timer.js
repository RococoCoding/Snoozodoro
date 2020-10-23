import React, {useState, useEffect} from "react";
import Prefs from "./preferences";
 //countdown timer from stackoverflow: https://stackoverflow.com/questions/60972542/i-want-to-react-usestate-or-other-hooks-implement-a-60-second-countdown-how

export default function Timer (props) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5); //mesasured in seconds 
  const [snoozeOn, setSnoozeOn] = useState(true);
  const [intervalType, setIntervalType] = useState("Work");
  const [snoozeCounter, setSnoozeCounter] = useState(0);
  const [breakCounter, setBreakCounter] = useState(0);


  let snoozeEnable = true;
  let workInterval = 5;
  let shortBreakInterval = 4;
  let longBreakInterval = 6;
  let snoozeInterval = 3;
  let showPrefs = false;
  let breakTimes = 1;
  let snoozeTimes = 1;
  const sound = new Audio("https://raw.githubusercontent.com/RococoCoding/asset_hosting/master/Honk1.mp3");

  function toggleOn() {
    if (!timeLeft) {
      setTimeLeft(workInterval);
    }
    setTimerOn(!timerOn);
  }

  function timerStop() {
    setTimerOn(false);
    setTimeLeft(workInterval);
  }

  function loadPrefs() {
    showPrefs = !showPrefs;
  }

  function submitPrefs(){//preferences form submit

  }

  useEffect(()=> {
    switch(intervalType) {
      case "Work":
        setTimeLeft(workInterval);
        break;
      case "Short Break":
        setTimeLeft(shortBreakInterval);
        setSnoozeCounter(0);
        break;
      case "Long Break":
        setTimeLeft(longBreakInterval);
        setSnoozeCounter(0);
        setBreakCounter(0);
        break;
      case "Snooze":
        setTimeLeft(snoozeInterval);
        break;
    }
  }, [intervalType]);

  useEffect(() => {  //timer countdown
    if (timerOn) {
      // let type = intervalType;
      // setIntervalType("null");
      if(timeLeft === 0){ //interval type switch -- work, break or snooze
        switch(intervalType) {
          case "Work": 
            if(snoozeOn) {
              setIntervalType("Snooze");
              setSnoozeCounter(snoozeCounter+1);
              if (snoozeCounter > snoozeTimes) {
                setSnoozeCounter(0);
                setSnoozeOn(false);
              }
            }
            else {
              if (breakCounter < breakTimes) {
                setIntervalType("Short Break");
              }
              else {
                setIntervalType("Long Break");
              }
            }
            break;
          case "Short Break":
            setBreakCounter(breakCounter+1);
            setIntervalType("Work");
            snoozeEnable && setSnoozeOn(true);
            break; 
          case "Snooze":
            if (snoozeCounter < snoozeTimes) {
              // react won't update intervaltype bc value is same; skip straight to set time
              setTimeLeft(snoozeInterval); 
              setSnoozeCounter(snoozeCounter+1);
            }
            else {
              if (breakCounter < breakTimes) {
                setIntervalType("Short Break");
              }
              else {
                setIntervalType("Long Break");
              }
            }
            break;
          case "Long Break":
          setIntervalType("Work");
          snoozeEnable && setSnoozeOn(true);
        } 
        sound.play();
      }
      const everySecond = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(everySecond);
    }
  }, [timerOn, timeLeft]);

  useEffect(()=>{ //converts timeLeft to hr/min/sec for display
    let minutesLeft = -1
    if (timeLeft / (60*60) >= 1) {
      setHours(Math.floor(timeLeft / (60*60))); 
      minutesLeft = timeLeft/60;
    }
    if (timeLeft / 60 >= 1 || minutesLeft/60 > 1) { //if at least 1 minute left or went into previous hour block
      if (minutesLeft === -1) {
        minutesLeft = timeLeft/60;
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
      <p>{hours < 10 ? `0${hours}`: hours}:{minutes < 10 ? `0${minutes}`: minutes}:{seconds < 10 ? `0${seconds}`: seconds}</p>
      <p>{intervalType}</p>
    </div>
    <button onClick={toggleOn}>{timerOn ? "Pause" : "Start"}</button>
    <button onClick={timerStop}>Stop</button>
    <button onClick={loadPrefs}>Preferences</button>
    {showPrefs 
      && 
      <Prefs
        submit={submitPrefs}
      />}
  </div>)
}

