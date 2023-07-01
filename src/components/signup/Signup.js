import * as React  from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Signup.css";

export default function Signup(props) {
  const schema = yup.object().shape({
    Name: yup.string().min(2, "A név hossza nem megfelelő").required("Név mező kitöltése kötelező"),
    checkbox: yup.boolean().oneOf([true], "A szabályzat elfodása kötelező"),
  });

  // hook-form változói
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const email = props.data?.email || "";
  const [open, setOpen] = React.useState(true);
  const [emailValue, setEmailValue] = React.useState("");

  React.useEffect(() => {
    setEmailValue(email);
  }, [email]);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const onSubmit = async (data) => {

    const dataToSend = {
      email: email,
      name: data.Name
    };

   
    try {
      const response = 
      await fetch('https://ncp-dummy.staging.moonproject.io/api/kocsis-marton-pal/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Sikeres adatküldés:', responseData);
        setOpen(false);
        // Itt kezelheted a sikeres választ és a responseData-t
      } else  {
        const errorData = await response.json();
        console.log('Hiba az adatküldés során:', errorData);
        // Itt kezelheted a hibás választ
      }
    } catch (error) {
      console.error('Hiba történt az API-kérés során:', error);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} BackdropProps={{ onClick: null }}>
        <DialogContent>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <>
                  <h1>Regisztráció</h1>
                  <TextField 
                  disabled
                  label="Email cím" 
                  variant="outlined" 
                  value={emailValue}
                  />

                  <TextField
                    label="Név"
                    variant="outlined"
                    {...register("Name")}
                    helperText={errors.Name?.message}
                  />
                  <FormControlLabel
                    control={<Checkbox {...register("checkbox")} />}
                    label="Elolvastam és elfogadom a játék szabályokat"
                  />
                </>
                
              <p className="MuiFormHelperText-root">{errors.checkbox?.message}</p>
            

                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  onClick={handleSubmit(onSubmit)}
                >
                  Regisztrálok
                </Button>
              </Stack>
            </form>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}
