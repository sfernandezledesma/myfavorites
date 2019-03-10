import React, { memo } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from "@material-ui/core";

const ErrorDialog = memo(function ErrorDialog({ errorOpen, errorDescription, onErrorClose }) {
  console.log("Error dialog rendered");
  return (
    <Dialog open={errorOpen} onClose={onErrorClose}>
      <DialogTitle>
        Error
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2">
          {errorDescription}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onErrorClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog >
  );
});

export default ErrorDialog;