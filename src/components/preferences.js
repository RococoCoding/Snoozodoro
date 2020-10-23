import React from "react";
import 'antd/dist/antd.css';
import {TimePicker } from "antd";
import moment from "moment";


export default function Prefs(props) {
  let workTimeInSeconds = 0;
  function selectTime(e) {
    workTimeInSeconds = e._d.getSeconds() + (e._d.getHours() * 60 * 60) + (e._d.getMinutes() * 60)
  }

  return (
    <div>
      <h2>Preferences</h2>
      <form>
        <label htmlFor="work-interval">Set Work Interval</label>
        <TimePicker onSelect={selectTime} name="work-interval" defaultValue={moment('00:00:00', 'HH:mm:ss')} />
        
        <label htmlFor="short-break-interval">Set Break Interval</label>
        <TimePicker onSelect={selectTime} name="short-break-interval" defaultValue={moment('00:00:00', 'HH:mm:ss')} />

        <label htmlFor="long-break-interval">Set Break Interval</label>
        <TimePicker onSelect={selectTime} name="long-break-interval" defaultValue={moment('00:00:00', 'HH:mm:ss')} />

        <label htmlFor="audio">Pick an alarm sound</label>
        <select
          name="audio"
          type="dropdown"
          onChange={props.previewSound}
        >
          <option value="honk.mp3">Honk</option>
          <option value="mariocoins.wav">Mario Coin</option>
          <option value="boxing.wav">Boxing Bell</option>
          <option value="beep.wav">Beeping</option>
        </select>

      </form>
    </div>
  )
};