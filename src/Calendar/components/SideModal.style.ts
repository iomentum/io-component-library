import { Paper, withStyles, Button as MuiButton } from '@material-ui/core';
import styled from 'styled-components';

export const SideModalContent = styled(Paper)`
  width: 250px;
  height: 100%;
  margin: 0 0 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PrimaryButton = withStyles({
  root: {
    width: '100%',
  },
})(MuiButton);
