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
import DatePicker from "../datePicker/DatePicker"
import "./CodeUpload.css";

// a form validáláshoz való yup schema
const schema = yup.object().shape({
  Email: yup.string().email("Az email nem valós").required("email mező kitöltése kötelező"),
  Code: yup.string().matches(/^[A-Za-z0-9]{8,9}$/i, "A kód formátuma nem megfelelő").required("A kód megadása kötelező")
});

export default function CodeUpload() {
  // hook-form változói
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let formatedDate = "";

 const handleDataFromChild = (data) => {
        formatedDate = data
      };

  //form sikeres validálása után lefutó esemény
  const onSubmit = (data) => {

   console.log(formatedDate);

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
            <DatePicker  sendDataToParent={handleDataFromChild} />

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
