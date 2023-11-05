import Button from "@mui/material/Button";
import { Typography, List, Paper } from "@mui/material";
import classes from "./Reminders.module.css";
import RemindersItem from "./RemindersItem/RemindersItem";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { formModalsActions } from "../../../../store/form-modals-slice";
import { useSelector } from "react-redux";
import ReminderForm from "../ReminderForm/ReminderForm";

const Reminders = (props) => {
  const dispatch = useDispatch();
  const [reminders, setReminders] = useState([]);
  const isRemindersFormOpene = useSelector(
    (state) => state.formModals.isRemindersFormOpen
  );
  {
    isRemindersFormOpene && <ReminderForm />;
  }
  const fetchReminders = () => {
    axios
      .get("http://localhost:3001/reminders")
      .then((response) => {
        const data = response.data.filter((item) => item.status === "active");
        setReminders(data);
      })
      .catch((error) => {
        console.error("Error with fetching reminders:", error);
      });
  };
  useEffect(() => {
    fetchReminders();
  }, []);

  const openModal = () => {
    dispatch(formModalsActions.setIsReminderFormOpened(true));
  };

  const saveReminder = (newData) => {
    let url = "http://localhost:3000/reminders";
    let method = "POST";
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then(() => {
        dispatch(formModalsActions.setIsReminderFormOpened(false));
        fetchReminders();
      })
      .catch((error) => {
        console.error("Error saving new data:", error);
      });
  };

  const handleDeleteReminder = (reminderId) => {
    let url = `http://localhost:3000/reminders/${reminderId}`;
    let method = "PATCH";
    const newData = { status: "inactive" };
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then(() => {
        fetchReminders();
      })
      .catch((error) => {
        console.error("Error saving new data:", error);
      });
  };

  const isEmpty = reminders.length === 0;

  return (
    <Fragment>
      {<ReminderForm onSubmit={saveReminder} />}
      <Paper elevation={3} className={classes.reminders}>
        <Typography variant="h5" className={classes.remindersTitle}>
          Reminders
        </Typography>
        <Button
          variant="contained"
          className={classes.addNewReminder}
          onClick={openModal}
        >
          Add New
        </Button>
        <div className={classes.remindersList}>
          {!isEmpty && (
            <List>
              {reminders.map((reminder, index) => {
                return (
                  <RemindersItem
                    id={reminder.id}
                    key={index}
                    title={reminder.title}
                    dateTime={reminder.dateTime}
                    index={index}
                    onDeleteReminder={handleDeleteReminder}
                  />
                );
              })}
            </List>
          )}
          {isEmpty && (
            <div className={classes.noRemindersMessage}>
              You don't have reminders.
            </div>
          )}
        </div>
      </Paper>
    </Fragment>
  );
};

export default Reminders;
