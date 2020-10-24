import React from "react";
import 'antd/dist/antd.css';
import {TimePicker } from "antd";
import moment from "moment";


export default function Prefs(props) {
  function timeToSeconds(e) {
    return e._d.getSeconds() + (e._d.getHours() * 60 * 60) + (e._d.getMinutes() * 60);
  }
  function selectWorkTime(e) {
    props.setWorkInterval(timeToSeconds(e));
    props.setTimeLeft(timeToSeconds(e));
  }

  function selectLongBreakTime() {
    props.setLongBreakInterval(timeToSeconds(e));
  }

  function selectShortBreakTime() {
    props.setShortBreakInterval(timeToSeconds(e));
  }

  return (
    <div>
      <h2>Preferences</h2>
      <form onSubmit={props.submit}>
        <label htmlFor="work-interval">Set Work Interval</label>
        <TimePicker onSelect={selectWorkTime} name="work-interval" defaultValue={moment('00:00:00', 'HH:mm:ss')} />
        
        <label htmlFor="short-break-interval">Set Break Interval</label>
        <TimePicker onSelect={selectShortBreakTime} name="short-break-interval" defaultValue={moment('00:00:00', 'HH:mm:ss')} />

        <label htmlFor="long-break-interval">Set Break Interval</label>
        <TimePicker onSelect={selectLongBreakTime} name="long-break-interval" defaultValue={moment('00:00:00', 'HH:mm:ss')} />

        <label htmlFor="audio">Pick an alarm sound</label>
        <select
          name="audio"
          type="dropdown"
          onChange={props.previewSound}
        >
          <option value="honk.mp3">Honk</option>      
          <option value="beep.wav">Beeping</option>        
          <option value="boxing.wav">Boxing Bell</option>      
          <option value="mariocoins.wav">Mario Coin</option>
          <option value="pewpew.wav">Pew Pew</option>
          <option value="psychosis.wav">Psychosis</option>
          <option value="ufo.wav>">UFO</option>
        </select>
      </form>
    </div>
  )
};