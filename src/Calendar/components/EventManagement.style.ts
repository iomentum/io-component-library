import { withStyles, TextField as MuiTextField } from '@material-ui/core';

export const TextField = withStyles({
  root: {
    margin: '10px 0',
  },
})(MuiTextField);
