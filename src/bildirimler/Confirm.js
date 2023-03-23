import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const ConfirmationButton = styled(Button)({
  marginRight: "10px",
});

export default function Confirm({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Onayla",
  cancelText = "Vazgeç",
  open,
  setOpen,
}) {
  const handleClose = () => {
    setOpen(false);
    onCancel && onCancel();
  };

  const handleConfirm = () => {
    setOpen(false);
    onConfirm && onConfirm();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <ConfirmationButton onClick={handleConfirm} variant="contained">
          {confirmText}
        </ConfirmationButton>
        <Button onClick={handleClose} variant="contained" color="error">
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
