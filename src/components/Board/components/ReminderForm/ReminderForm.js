import classes from "./ReminderForm.module.css";
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Modal,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { formModalsActions } from "../../../../store/form-modals-slice";

const ReminderForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [error, setError] = useState("");
  const isModalOpen = useSelector(
    (state) => state.formModals.isReminderFormOpened
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !dateTime) {
      setError("All fields are required");
      return;
    }

    onSubmit({ title, dateTime: new Date(dateTime), status: "active" });

    setTitle("");
    setDateTime("");
    setError("");
  };

  const handleClose = () => {
    dispatch(formModalsActions.setIsReminderFormOpened(false));
  };

  return (
    <Modal open={isModalOpen}>
      <Container maxWidth="xs" className={classes.reminderForm}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Create Reminder
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date & Time"
                type="datetime-local"
                variant="outlined"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ float: "right" }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Modal>
  );
};
export default ReminderForm;
