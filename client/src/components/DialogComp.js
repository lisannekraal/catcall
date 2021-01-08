import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

export default function AlertDialog({ text, state }) {
  const [open, setOpen] = useState(state);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}