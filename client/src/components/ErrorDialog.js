import React, { PureComponent } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from "@material-ui/core";

class ErrorDialog extends PureComponent {
  render() {
    const { errorOpen, errorDescription, onErrorClose } = this.props;
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
  }
}

export default ErrorDialog;