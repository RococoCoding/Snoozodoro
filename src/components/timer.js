import React, {useState, useEffect} from "react";
import Prefs from "./preferences";
import SnoozeOverlay from "./snoozeOverlay";
 //countdown timer from stackoverflow: https://stackoverflow.com/questions/60972542/i-want-to-react-usestate-or-other-hooks-implement-a-60-second-countdown-how
let initialTimes = {
    "hours": 0,
    "minutes": 0,
    "seconds": 0
  };

let initialIntervals = {
  "work": 3,
  "shortBreak": 3,
  "longBreak": 4,
}

let initialCounters = {
  "snooze": 0,
  "break": 0
}

export default function Timer (props) {
  // #region States and variables

  const [displayTime, setDisplayTime] = useState(initialTimes);
  const [timerOn, setTimerOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5); //mesasured in seconds 
  const [intervals, setIntervals] = useState(initialIntervals);
  const [intervalType, setIntervalType] = useState("Work");
  const [counters, setCounters] = useState(initialCounters);
  const [showPrefs, setShowPrefs] = useState(false);
  const [snoozeEnabled, setSnoozeEnabled] = useState(true);
  const [sound, setSound] = useState(new Audio("/assets/sounds/mariocoins.wav"));

  let snoozeInterval = 10;
  let breakTimes = 1;
  let snoozeTimes = 1;
//#endregion


//#region functions for timer component
  function toggleOn() {
    if (!timeLeft) {
      setTimeLeft(intervals.work);
    }
    setTimerOn(!timerOn);
  }

  function timerStop() {
    sound.pause();
    sound.currentTime = 0;
    setTimerOn(false);
    setIntervalType("Work");
    setCounters({...counters, "break": 0});
    setCounters({...counters, "snooze": 0});
  }

  function loadPrefs() {
    setShowPrefs(!showPrefs);
  }

  function submitPrefs(e){//preferences form submit
    e.preventDefault()
    // setTimeLeft(workInterval);
  } 
  
  function snoozeOff() {
    sound.pause();
    sound.currentTime = 0;
    setTimerOn(true);
    setCounters({...counters, "snooze": 0});
    if (counters.break < breakTimes) {
      setIntervalType("Short Break");
    }
    else {
      setIntervalType("Long Break");
    }
  }  
  
  function playAudio() {
    if (intervalType === "Snooze" && counters.snooze === snoozeTimes-1) { // play alarm on infinite loop at end of cycle
      setTimerOn(false);  
      playLoop();
    }
    else {
      setTimerOn(false);
      sound.play();
      sound.onended = turnBackOn;
    } 
    function playLoop() { 
      sound.play();
      sound.onended = playLoop;
    }    
    function turnBackOn() {
      setTimerOn(true);
    }
  };
 
  
  function whichIsNext() {
    switch(intervalType) {
      case "Work": 
        if(snoozeEnabled) {
          setIntervalType("Snooze");
          setCounters({...counters, "snooze": counters.snooze+1});
          if (counters.snooze > snoozeTimes) {
            setCounters({...counters, "snooze": 0});
            setSnoozeOn(false);
          }
        }
        else {
          if (counters.break < breakTimes) {
            setIntervalType("Short Break");
          }
          else {
            setIntervalType("Long Break");
          }
        }
        break;
      case "Short Break":
        setCounters({...counters, "break": counters.break+1});
        setIntervalType("Work");
        setTimerOn(false);
        break; 
      case "Snooze":
        if (counters.snooze < snoozeTimes) {
          // react won't update intervaltype bc value is same; skip straight to set time
          setTimeLeft(snoozeInterval); 
          setCounters({...counters, "snooze": counters.snooze+1});
        }
        else {
          if (counters.break < breakTimes) {
            setIntervalType("Short Break");
          }
          else {
            setIntervalType("Long Break");
          }
        }
        break;
      case "Long Break":
      setIntervalType("Work");
    }; 
  }
//#endregion

//  #region useEffects - timer countdown & display

  //change interval type auto chagnes time left
  useEffect(()=> {
    switch(intervalType) {
      case "Work":
        setTimeLeft(intervals.work);
        break;
      case "Short Break":
        setTimeLeft(intervals.shortBreak);
        setCounters({...counters, "snooze": 0});
        break;
      case "Long Break":
        setTimeLeft(intervals.longBreak);
        setCounters({...counters, "snooze": 0});
        setCounters({...counters, "break": 0});
        break;
      case "Snooze":
        setTimeLeft(snoozeInterval);
        break;
    }
  }, [intervalType]);


  useEffect(() => {  //timer countdown
    if (timerOn) {
      if(timeLeft === 0){ //interval type switch -- work, break or snooze
        whichIsNext();
        playAudio();
      }; 
      const everySecond = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(everySecond);
    };
  }, [timerOn, timeLeft]);



  useEffect(()=>{ //converts timeLeft to hr/min/sec for display
    let minutesLeft = -1
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (timeLeft / (60*60) >= 1) {
      hours = Math.floor(timeLeft / (60*60)); 
      minutesLeft = timeLeft/60;
    }
    if (timeLeft / 60 >= 1 || minutesLeft/60 > 1) { //if at least 1 minute left or went into previous hour block
      if (minutesLeft === -1) {
        minutesLeft = timeLeft/60;
      }
      minutes = Math.floor(minutesLeft);
      if (timeLeft % 60 >= 60) {
        seconds = 0
      } else seconds = Math.floor(timeLeft % 60);
    }
    else seconds = Math.floor(timeLeft);
    setDisplayTime({"hours": hours, "minutes":minutes, "seconds":seconds});
  }, [timeLeft])
  //#endregion


  // #region functions for components
  function previewSound(e) {
    let previewSound = new Audio(`/assets/sounds/${e.target.value}`);
    previewSound.play();
    setSound(new Audio(`/assets/sounds/${e.target.value}`));
  };


  //#endregion


  return (
  <div>
    <div>
      <p>{displayTime.hours < 10 ? `0${displayTime.hours}`: hours}:{displayTime.minutes < 10 ? `0${displayTime.minutes}`: minutes}:{displayTime.seconds < 10 ? `0${displayTime.seconds}`: displayTime.seconds}</p>
      <p>{intervalType}</p>
    </div>
    {(snoozeEnabled && intervalType === "Snooze") 
      &&
      <SnoozeOverlay 
        snoozeOff={snoozeOff}
      />
    }
    <button onClick={toggleOn}>{timerOn ? "Pause" : "Start"}</button>
    <button onClick={timerStop}>Stop</button>
    <button onClick={loadPrefs}>Preferences</button>
    {showPrefs 
      && 
      <Prefs
        submit={submitPrefs}
        resetTimer={timerStop}
        setTimeLeft={setTimeLeft}
        setIntervals={setIntervals}
        intervals={intervals}
        previewSound={previewSound}
        setSnoozeEnabled={setSnoozeEnabled}
        snoozeEnabled={snoozeEnabled}
      />}
  </div>)
}

