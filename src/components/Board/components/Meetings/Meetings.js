import Button from "@mui/material/Button";
import { List, Paper } from "@mui/material";
import classes from "./Meetings.module.css";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import MeetingsItem from "./MeetingsItem/MeetingsItem";
import MeetingForm from "../MeetingForm/MeetingForm";
import { useDispatch } from "react-redux";
import { formModalsActions } from "../../../../store/form-modals-slice";
import { useSelector } from "react-redux";

const Meetings = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [meetings, setMeetings] = useState([]);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const fetchData = async () => {
    const meetings = await fetchMeetings();
    const users = await fetchUsers();
    const today = new Date();
    const data = meetings.filter((item) => {
      return (
        item.status === "active" &&
        item.participants.includes(user.id) &&
        new Date(item.startDateTime).toLocaleDateString() ===
          today.toLocaleDateString()
      );
    });
    data.map((meeting) => {
      return meeting.participants.forEach((item, key) => {
        meeting.participants[key] = users.find((x) => x.id === item);
      });
    });
    setMeetings(data);
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchMeetings = async () => {
    try {
      const response = await fetch("http://localhost:3001/meetings");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => {
    dispatch(formModalsActions.setIsMeetingFormOpened(true));
  };

  const saveMeeting = (data) => {
    let url = "http://localhost:3000/meetings";
    let method = "POST";
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        dispatch(formModalsActions.setIsMeetingFormOpened(false));
        fetchData();
      })
      .catch((error) => {
        console.error("Error saving new data:", error);
      });
  };

  const isEmpty = meetings.length === 0;

  const handleMarkAsCompleted = (meetingId) => {
    const data = { status: "inactive" };
    let url = `http://localhost:3000/meetings/${meetingId}`;
    let method = "PATCH";
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        dispatch(formModalsActions.setIsMeetingFormOpened(false));
        fetchData();
      })
      .catch((error) => {
        console.error("Error saving new data:", error);
      });
  };

  return (
    <Fragment>
      {<MeetingForm onSubmit={saveMeeting} />}
      <Paper elevation={3} className={classes.meetings}>
        <div className={classes.meetingsTitle}>
          <div className={classes.meetingsLabel}>
            Today's {meetings.length > 1 ? "meetings" : "meeting"}
          </div>

          <div className={classes.meetingsToday}>{today}</div>
        </div>
        <Button
          variant="contained"
          className={classes.addMeetingButton}
          onClick={openModal}
        >
          Add New
        </Button>
        <div className={classes.meetingsList}>
          {!isEmpty && (
            <List>
              {meetings.map((meeting, index) => {
                return (
                  <MeetingsItem
                    key={index}
                    id={meeting.id}
                    title={meeting.title}
                    startDateTime={meeting.startDateTime}
                    endDateTime={meeting.endDateTime}
                    index={index}
                    participants={meeting.participants}
                    onMarkAsCompleted={handleMarkAsCompleted}
                  />
                );
              })}
            </List>
          )}
          {!!isEmpty && (
            <div className={classes.noMeetingsMessage}>No meetings today.</div>
          )}
        </div>
      </Paper>
    </Fragment>
  );
};

export default Meetings;
