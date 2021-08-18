import { withStyles, TextField as MuiTextField, Button as MuiButton } from '@material-ui/core';

export const TextField = withStyles({
  root: {
    margin: '10px 0',
  },
})(MuiTextField);

export const PrimaryButton = withStyles({
  root: {
    width: '100%',
  },
})(MuiButton);
