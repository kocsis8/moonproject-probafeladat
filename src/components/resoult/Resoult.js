import * as React  from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export default function Resoult(props) {
  // kapott propsból won érték kinyerése
  const won = props.data.data.won;

// dialogus nyitvatartását tárolja
  const [open, setOpen] = React.useState(true);
// dialogus bázárását álltjabe
  const handleClose = () => {
    setOpen(false);
  };
// tovább fejleszthetőség miatt elkülönített dialogus ablak
 if(won){
     return (
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Gratulálunk nyertél!"}
      </DialogTitle>
        <Button onClick={handleClose}>Értem</Button>
    </Dialog>
  );
 } else{
return(
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Sajnos nem nyertél!"}
    </DialogTitle>
      <Button onClick={handleClose}>Értem</Button>
  </Dialog>
);
 }
 
}
