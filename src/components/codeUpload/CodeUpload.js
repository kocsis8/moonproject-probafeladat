import React from "react";
import { useForm } from "react-hook-form";
//material UI elemek
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
//validátor
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//komponensek
import DatePicker from "../datePicker/DatePicker";
import Signup from "../signup/Signup";
import Resoult from "../resoult/Resoult";
//css
import "./CodeUpload.css";

// a form validáláshoz való yup schema
const schema = yup.object().shape({
  Email: yup
    .string()
    .email("Az email nem valós") // email validáció
    .required("email mező kitöltése kötelező"), //kötelezőség vizsgálata
  Code: yup
    .string()
    .matches(/^[A-Za-z0-9]{8,9}$/i, "A kód formátuma nem megfelelő") //illeszkedés regexre
    .required("A kód megadása kötelező"), //kötelezőség vizsgálata
});

export default function CodeUpload() {
  //helpertext megjelenése a datepicker alatt
  const [showHelperText, setShowHelperText] = React.useState(false);
  // konponens megjelenése van benne szabályozva
  const [showSignup, setShowSignup] = React.useState(false);
  const [showResoult, setShowResult] = React.useState(false);
  // a két konponensek átküldött adatokat tárolja
  const [signupData, setSignupData] = React.useState(null);
  const [dataToResoult, setDataToResoult] = React.useState("");
  // a datepicker től kapott dátumat tárolja
  const [formatedDate, setFormatedDate] = React.useState("");
  // hook-form változói
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //datepickertől viszakapott adatok elmentése
  const handleDataFromChild = (data) => {
    setFormatedDate(data);
  };

  //form sikeres validálása után lefutó esemény
  const onSubmit = async (data) => {
    setShowResult(false); // ez csak azért van hogy frissítés nélkül is eltudjunk többet küldeni

    // validálása a datepickernek
    if (formatedDate.length !== 16) {
      setShowHelperText(true);
      return;
    }

    // json amit meg fog kapni az API
    const dataToSend = {
      email: data.Email,
      code: data.Code,
      purchase_time: formatedDate,
    };

    // Api fele post
    try {
      const response = await fetch(
        "https://ncp-dummy.staging.moonproject.io/api/kocsis-marton-pal/code/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      
      // ha minden rendben van
      if (response.status === 201) {
        const responseData = await response.json();
        setShowResult(true);
        setDataToResoult(responseData);
        // ha 422 jön vissza az apitol
      } else if (response.status === 422) {
        const errorData = await response.json();
        const errorCodes = errorData.errors.map((error) => error.code);
        // ha ennek a 422 nek a kodja nincs emailcím
        if (errorCodes[0] === "email:not_found") {
          setSignupData(dataToSend); // beállítja a regiszráció felé küldendő props-t
          setShowSignup(true); // beállítja a felugró ablak megjelenésének feltételét
        }
        console.log("Hiba az adatküldés során:"+ errorData);
      }
    } catch (error) {
      console.error("Hiba történt az API-kérés során:", error);
    }
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Card className="Card" sx={{ minWidth: 345 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <>
              <h1>Kódfeltöltés</h1>
              <TextField
                label="Email cím"
                variant="outlined"
                {...register("Email")}
                helperText={errors.Email?.message}
              />

              <TextField
                label="Kód"
                variant="outlined"
                {...register("Code")}
                helperText={errors.Code?.message}
              />
            </>
            <Divider>Vásárlás dátuma:</Divider>
            <DatePicker sendDataToParent={handleDataFromChild} />
            {showHelperText && (
              <p className="MuiFormHelperText-root">Dátum megadása kötelező.</p>
            )}
            <CardActions>
              {showSignup && <Signup data={signupData} />}
              {showResoult && <Resoult data={dataToResoult} />}
              <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={handleSubmit(onSubmit)}
              >
                Kódfeltöltés
              </Button>
            </CardActions>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
}
