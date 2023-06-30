import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import "./DatePicker.css";

export default function DatePicker( props) {


    const sendDataToParent = () => {
       //"purchase_time": "2021-07-21 10:00"
        
        props.sendDataToParent(timeFormat());
      };

  const dayList = [];
  const hourList = [];
  const minuteList = [];
  let currentDay = "";

  const setDaySelect =() =>{
    
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const jun = "Június";
    const jul = "Júlisu";
    const alg = "Algusztus";

    if(month === 6){
        currentDay = jun+" "+day+".";
    }
    if(month === 7){
        currentDay = jul+" "+day+".";
    }
    if(month === 8){
        currentDay = alg+" "+day+".";
    }
  }


  const loadDay = () => {
    
    const jun = "Június";
    const jul = "Júlisu";
    const alg = "Algusztus";
    let tindex = 0;

    for (let index = 1; index < 31; index++) {
      dayList[tindex] = jun + " " + index + ".";
      if( dayList[tindex] === currentDay){
        return;
      }
      tindex++;
    }

    for (let index = 1; index < 32; index++) {
      dayList[tindex] = jul + " " + index + ".";
      if( dayList[tindex] === currentDay){
        return;
      }
      tindex++;
    }

    for (let index = 1; index < 31; index++) {
      dayList[tindex] = alg + " " + index + ".";
      if( dayList[tindex] === currentDay){
        return;
      }
      tindex++;
    }
  };

  const loadHourandMinut = () => {
    for (let index = 0; index < 24; index++) {
        if(index < 10){
         hourList[index] = "0"+index;
        }else{
            hourList[index] = index; 
        }
       
    }

    for (let index = 0; index < 60; index++) {
        if(index < 10){
            minuteList[index] = "0"+index;
           }else{
             minuteList[index] = index;
           }
          
    }
  };

  const timeFormat = () =>{
    let puredate = "2023-"


    const jun = "Június";
    const jul = "Júlisu";
    const alg = "Algusztus";

    const dayParts = day.split(" ");

    if(dayParts[0] === jun){
        puredate += "06-"
    }

    if(dayParts[0] === jul){
        puredate += "07-"
    }

    if(dayParts[0] === alg){
        puredate += "08-"
    }
        puredate += dayParts[1].slice(0, -1);

        puredate += " "+ hours + ":" + minutes;

        console.log(puredate);

        return puredate;

  }



  setDaySelect();
  loadDay();
  loadHourandMinut();

  const [day, setDay] = React.useState(currentDay);
  const [hours, setHour] = React.useState("");
  const [minutes, setMinute] = React.useState("");


  const handleChangeDay = (event) => {
    setDay(event.target.value);
    timeFormat();
  };

  const handleChangeHour = (event) => {
    setHour(event.target.value);
    setTimeout(() => {
        // A kívánt függvény meghívása
        console.log("óra: "+hours);
      }, 0);
    //timeFormat();
  };

  const handleChangeMinute = (event) => {
    setMinute(event.target.value);
    timeFormat();
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Select
          labelId="demo-simple-select"
          id="demo-simple-select"
          value= {day}
          label="Nap"
          onChange={handleChangeDay}
        >
          {dayList.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>

        <Select
          labelId="demo-simple-select"
          id="hourSelect"
          value={hours}
          label="Óra"
          onChange={handleChangeHour}
        >
          {hourList.map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}
            </MenuItem>
          ))}
        </Select>

        <Select
          labelId="demo-simple-select"
          id="demo-simple-select"
          value={minutes}
          label="Perc"
          onChange={handleChangeMinute}
        >
          {minuteList.map((minute) => (
            <MenuItem key={minute} value={minute}>
              {minute}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </>
  );
}
