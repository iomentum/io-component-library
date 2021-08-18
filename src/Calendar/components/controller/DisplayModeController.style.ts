import { withStyles, FormControlLabel as MuiFormControlLabel } from '@material-ui/core';

export const FormControlLabel = withStyles({
  root: {
    textTransform: 'capitalize',
  },
})(MuiFormControlLabel);
