import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import classes from "./RemindersItem.module.css";
import { DeleteForever } from "@mui/icons-material";

const RemindersItem = ({ id, index, title, dateTime, onDeleteReminder }) => {
  const reminderDateTime = new Date(dateTime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const deleteReminder = () => {
    onDeleteReminder(id);
  };
  return (
    <ListItem className={classes.reminderListItem}>
      <ListItemAvatar>
        <Avatar>{index + 1}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={reminderDateTime}
        classes={{ primary: classes.reminderTitle }}
      />
      <Typography variant="body2" className={classes.secondColumn}>
        <Button onClick={deleteReminder}>
          <DeleteForever fontSize="small"></DeleteForever>
        </Button>
      </Typography>
    </ListItem>
  );
};

export default RemindersItem;
