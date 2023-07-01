import * as React  from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Resoult(props) {
  
  const [wonValu, setWonValue] = React.useState("");
  const won = props.data?.won || "";


  React.useEffect(() => {
    setWonValue(won);
  }, [won]);

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  

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
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Értem</Button>
        </DialogActions>
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
    <DialogContent>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Értem</Button>
    </DialogActions>
  </Dialog>
);
 }

 
}
