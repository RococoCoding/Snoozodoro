import React, {useState, useEffect} from "react";
import Prefs from "./preferences";
 //countdown timer from stackoverflow: https://stackoverflow.com/questions/60972542/i-want-to-react-usestate-or-other-hooks-implement-a-60-second-countdown-how

export default function Timer (props) {
  const [workInterval, setWorkInterval] = useState(5);
  const [breakInterval, setBreaktInterval] = useState(3);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5); //mesasured in seconds
  const [showPrefs, setShowPrefs] = useState(false);
  const [intervalType, setIntervalType] = useState("work");
  
  const sound = new Audio("https://raw.githubusercontent.com/RococoCoding/asset_hosting/master/Honk1.mp3");

  function toggleOn() {
    if (!timeLeft) {
      setTimeLeft(workInterval);
    }
    setIsOn(!isOn);
  }

  function timerStop() {
    setIsOn(false);
    setTimeLeft(workInterval);
  }

  function loadPrefs() {
    setShowPrefs(!showPrefs);
  }

  useEffect(() => {  //timer countdown
    if (isOn) {
      if(timeLeft === 0){
        setTimeLeft(workInterval);  
        sound.play();
      }
      const everySecond = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(everySecond);
    }
  }, [isOn, timeLeft]);

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
    </div>
    <button onClick={toggleOn}>{isOn ? "Pause" : "Start"}</button>
    <button onClick={timerStop}>Stop</button>
    <button onClick={loadPrefs}>Preferences</button>
    {showPrefs 
      && 
      <Prefs 
        setWorkInterval={setWorkInterval}
      />}
  </div>)
}

