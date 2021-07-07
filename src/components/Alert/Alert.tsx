import React, { FC, useEffect } from "react";
import { Alert as MUIAlert } from "@material-ui/lab";
import { withStyles } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { alertState } from "./alert.store";

const StyledAlert = withStyles({
  root: (props: { isVisible: boolean }) => ({
    position: "fixed",
    right: 15,
    bottom: 15,
    zIndex: 1500,
    opacity: props.isVisible ? 1 : 0,
    transition: "opacity 0.5s ease-out",
  }),
})(MUIAlert);

interface AlertProps {
  /**
   * Delay in milliseconds before the toaster desapears
   */
  visibilityTime?: number;
}

const Alert: FC<AlertProps> = (props) => {
  const { visibilityTime = 3000 } = props;

  const [alert, setAlert] = useRecoilState(alertState);

  useEffect(() => {
    alert.isVisible &&
      setTimeout(function () {
        setAlert({ ...alert, isVisible: false });
      }, visibilityTime);
  }, [alert, setAlert]);

  return (
    <StyledAlert
      variant="filled"
      severity={alert.data?.severity}
      children={alert.data?.message}
      isVisible={alert.isVisible}
    />
  );
};

export default Alert;
