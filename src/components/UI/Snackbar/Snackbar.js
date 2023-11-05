import { Snackbar } from "@mui/material";

const Toast = ({ open, message }) => {
  const vertical = "bottom";
  const horizontal = "right";
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      message={message}
      key={vertical + horizontal}
    />
  );
};

export default Toast;
