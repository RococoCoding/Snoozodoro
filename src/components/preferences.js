import React from "react";
import 'antd/dist/antd.css';
import {TimePicker } from "antd";
import moment from "moment";
export default function Prefs(props) {
  let workTimeInSeconds = 0;
  function selectWork(e) {
    workTimeInSeconds = e._d.getSeconds() + (e._d.getHours() * 60 * 60) + (e._d.getMinutes() * 60)
  }

  return (
    <div>
      <h2>Preferences</h2>
      <form>
        <label>Set Work Interval</label>
        <TimePicker onSelect={selectWork} defaultValue={moment('00:00:00', 'HH:mm:ss')} />
        <label>Set Break Interval</label>
        <TimePicker onSelect={selectBreak} defaultValue={moment('00:00:00', 'HH:mm:ss')} />
      </form>
    </div>
  )
};