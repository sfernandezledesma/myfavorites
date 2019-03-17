import React, { memo, useContext, useCallback } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from "@material-ui/core";
import { AppError, AppErrorDispatch } from '../context/contexts';
import { ERROR_CLOSE } from '../context/reducers';

function ErrorDialog(props) {
  const { errorOpen, errorDescription } = useContext(AppError);
  const errorDispatch = useContext(AppErrorDispatch);
  console.log("Error dialog rendered");

  const onErrorClose = useCallback(() => {
    console.log("Closing Error Dialog...");
    errorDispatch({ type: ERROR_CLOSE });
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