import React from "react";
//material UI elemek
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
//css
import "./DatePicker.css";

export default function DatePicker(props) {
  // adatok visszaküldése szülő konponensbe
  const sendDataToParent = () => {
    props.sendDataToParent(timeFormat());
  };

  // liták amiben a feltételnek megfelelően kerülnek az értékek
  const dayList = [];
  const hourList = [];
  const minuteList = [];
  // aktuális dátom változoja
  let currentDay = "";

  // katuális napot beállító fvg
  const setDaySelect = () => { 
    // aktuális nap lekérdezése
    const currentDate = new Date();
    // szétbontás nap és hónapra
    const month = currentDate.getMonth() + 1; 
    let day = currentDate.getDate();

    // hónapok nevesítt változója
    const jun = "Június";
    const jul = "Júlisu";
    const alg = "Algusztus";

    if (day < 10) {
      day = "0" + day;
    }

    if (month === 6) {
      currentDay = jun + " " + day + ".";
    }
    if (month === 7) {
      currentDay = jul + " " + day + ".";
    }
    if (month === 8) {
      currentDay = alg + " " + day + ".";
    }
  };
//nap választó feltöltő fvg
  const loadDay = () => {
    const jun = "Június";
    const jul = "Júlisu";
    const alg = "Algusztus";
    let tindex = 0;

    for (let index = 1; index < 31; index++) {
      if (index < 10) {
        dayList[tindex] = jun + " 0" + index + ".";
      } else {
        dayList[tindex] = jun + " " + index + ".";
      }
      if (dayList[tindex] === currentDay) {
        return;
      }
      tindex++;
    }

    for (let index = 1; index < 32; index++) {
      if (index < 10) {
        dayList[tindex] = jul + " 0" + index + ".";
        currentDay.replace(" ", " 0");
      } else {
        dayList[tindex] = jul + " " + index + ".";
        currentDay.replace(" 0", " ");
      }

      if (dayList[tindex] === currentDay) {
        return;
      }
      tindex++;
    }

    for (let index = 1; index < 31; index++) {
      if (index < 10) {
        dayList[tindex] = alg + " 0" + index + ".";
      } else {
        dayList[tindex] = alg + " " + index + ".";
      }
      if (dayList[tindex] === currentDay) {
        return;
      }
      tindex++;
    }
  };
// perc választó feltöltő fvg
  const loadHourandMinut = () => {
    for (let index = 0; index < 24; index++) {
      if (index < 10) {
        hourList[index] = "0" + index;
      } else {
        hourList[index] = index;
      }
    }

    for (let index = 0; index < 60; index++) {
      if (index < 10) {
        minuteList[index] = "0" + index;
      } else {
        minuteList[index] = index;
      }
    }
  };
// dátum és idő formáző fvg
  const timeFormat = () => {
    let puredate = "2023-";

    const jun = "Június";
    const jul = "Júlisu";
    const alg = "Algusztus";

    const dayParts = day.split(" ");

    if (dayParts[0] === jun) {
      puredate += "06-";
    }

    if (dayParts[0] === jul) {
      puredate += "07-";
    }

    if (dayParts[0] === alg) {
      puredate += "08-";
    }
    puredate += dayParts[1].slice(0, -1);

    puredate += " " + hours + ":" + minutes;

    return puredate;
  };

  setDaySelect();
  loadDay();
  loadHourandMinut();

  // választásokat tárolo us.
  const [day, setDay] = React.useState(currentDay);
  const [hours, setHour] = React.useState("");
  const [minutes, setMinute] = React.useState("");

  // változtatáskori elküldés a szülő fele
  React.useEffect(() => {
    sendDataToParent();
    // eslint-disable-next-line
  }, [day, hours, minutes]);

  // nap változtatását álltjabe
  const handleChangeDay = (event) => {
    setDay(event.target.value);
  };
// óra változtatását álltja be
  const handleChangeHour = (event) => {
    setHour(event.target.value);
  };
// perc változtatását állítja be
  const handleChangeMinute = (event) => {
    setMinute(event.target.value);
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Select
          labelId="demo-simple-select"
          id="demo-simple-select"
          value={day}
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
