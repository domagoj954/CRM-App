import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Modal,
  Autocomplete,
  Box,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import classes from "./MeetingForm.module.css";
import { useDispatch } from "react-redux";
import { formModalsActions } from "../../../../store/form-modals-slice";

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getOneHourFromCurrentTime() {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function MeetingForm({ onSubmit }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getTodayDate);
  const [startTime, setStartTime] = useState(getCurrentTime);
  const [endTime, setEndTime] = useState(getOneHourFromCurrentTime);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [selectedOption, setSelectedOption] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([]);
  const isModalOpen = useSelector(
    (state) => state.formModals.isMeetingFormOpened
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !startTime || !endTime || !selectedOption) {
      setError("All fields are required");
      return;
    }
    const meetingParticipants = participants
      .map((item) => item.id)
      .concat([loggedInUser.id]);

    const meetingData = {
      title,
      startDateTime: new Date(date + " " + startTime),
      endDateTime: new Date(date + " " + endTime),
      status: "active",
      participants: meetingParticipants,
    };
    onSubmit(meetingData);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    dispatch(formModalsActions.setIsMeetingFormOpened(false));
  };

  const resetForm = () => {
    setTitle("");
    setDate(getTodayDate);
    setStartTime(getCurrentTime);
    setEndTime(getOneHourFromCurrentTime);
    setError("");
    setSelectedOption([]);
  };

  const handleParticipants = (event, newValue) => {
    setSelectedOption(newValue);
    setParticipants(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let result = await response.json();
        result = result.filter((user) => user.id !== loggedInUser.id);
        setAvailableOptions(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Modal open={isModalOpen}>
      <Container maxWidth="xs" className={classes.meetingForm}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Add Meeting
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
              <Autocomplete
                multiple
                id="multiselect-autocomplete"
                options={availableOptions}
                onChange={handleParticipants}
                autoHighlight
                value={selectedOption}
                filterSelectedOptions
                getOptionLabel={(option) => {
                  return option.firstName + " " + option.lastName;
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 10, flexShrink: 0 } }}
                    {...props}
                  >
                    <Avatar
                      style={{ marginRight: 10 }}
                      src={`/images/${option.logo}`}
                    ></Avatar>
                    {option.firstName + " " + option.lastName}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={selectedOption}
                    label="Choose assignee"
                    required
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                      required: selectedOption.length === 0,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                variant="outlined"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                variant="outlined"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="End Time"
                type="time"
                variant="outlined"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
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
}

export default MeetingForm;
