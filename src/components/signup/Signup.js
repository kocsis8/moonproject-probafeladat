import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Signup.css";

export default function Signup() {
    const [open, setOpen] = React.useState(true);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleBackdropClick = (event) => {
      event.stopPropagation();
    };

    return(

        <div>
  
      <Dialog open={open} onClose={handleClose} onBackdropClick={handleBackdropClick}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <p>Dialog Content</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );


}