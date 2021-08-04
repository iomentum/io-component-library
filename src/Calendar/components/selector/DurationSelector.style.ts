import { withStyles, FormControlLabel as MuiFormControlLabel } from '@material-ui/core';

export const FormControlLabel = withStyles({
  root: {
    margin: '10px 0',
    width: '100%',
  },
})(MuiFormControlLabel);
