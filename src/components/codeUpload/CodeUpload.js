import React from "react";
import { useForm } from "react-hook-form";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "../datePicker/DatePicker";
import "./CodeUpload.css";
import Signup from "../signup/Signup";

// a form validáláshoz való yup schema
const schema = yup.object().shape({
  Email: yup
    .string()
    .email("Az email nem valós")
    .required("email mező kitöltése kötelező"),
  Code: yup
    .string()
    .matches(/^[A-Za-z0-9]{8,9}$/i, "A kód formátuma nem megfelelő")
    .required("A kód megadása kötelező"),
});

export default function CodeUpload() {
  const [showHelperText, setShowHelperText] = React.useState(false);
  let formatedDate = "";

  // hook-form változói
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleDataFromChild = (data) => {
    formatedDate = data;
  };

  //form sikeres validálása után lefutó esemény
  const onSubmit = async (data) => {
    if (formatedDate.length !== 16) {
      setShowHelperText(true);
      return;
    }
   
    const dataToSend = {
      email: data.Email,
      code: data.Code,
      purchase_time: formatedDate,
    };

   
    try {
      const response = 
      await fetch('https://ncp-dummy.staging.moonproject.io/api/kocsis-marton-pal/code/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Sikeres adatküldés:', responseData);
        // Itt kezelheted a sikeres választ és a responseData-t
      } else {
        const errorData = await response.json();
        const errorCodes = errorData.errors.map(error => error.code);
      
        if(errorCodes[0] === "email:not_found"){ 
          console.log("kod: "+errorCodes);
          <Signup data = {dataToSend}  />
        }
        console.log('Hiba az adatküldés során:', errorData);
        // Itt kezelheted a hibás választ
      }
    } catch (error) {
      console.error('Hiba történt az API-kérés során:', error);
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
