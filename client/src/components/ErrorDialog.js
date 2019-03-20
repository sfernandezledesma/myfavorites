import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from "@material-ui/core";
import { connect } from 'react-redux';
import { closeError} from '../actions/errorActions';

const mapStateToProps = (state) => {
  return {
    open: state.errorReducer.open,
    message: state.errorReducer.message
  };
};
const mapDispatchToProps = {
  closeError
};

function ErrorDialog({ open, message, closeError }) {
  console.log("Error dialog rendered");

  return (
    <Dialog open={open} onClose={closeError}>
      <DialogTitle>
        Error
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeError}>
          Close
        </Button>
      </DialogActions>
    </Dialog >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDialog);