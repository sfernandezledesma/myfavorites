import React, { memo, useContext, useCallback } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from "@material-ui/core";
import { AppError, AppErrorDispatch } from '../contexts';

function ErrorDialog(props) {
  const { errorOpen, errorDescription } = useContext(AppError);
  const errorDispatch = useContext(AppErrorDispatch);
  console.log("Error dialog rendered");

  const onErrorClose = useCallback(() => {
    console.log("Closing Error Dialog...");
    errorDispatch({ type: "closeErrorDialog" });
  }, []);

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
}

export default memo(ErrorDialog);