import classes from "./MeetingsItems.module.css";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Tooltip,
  AvatarGroup,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

const MeetingsItem = ({
  id,
  startDateTime,
  endDateTime,
  title,
  onMarkAsCompleted,
  participants,
}) => {
  const startTime = getTimeString(startDateTime);
  const endTime = getTimeString(endDateTime);

  let content = (
    <span>
      {startTime} - {endTime}
    </span>
  );

  const markAsCompleted = () => {
    onMarkAsCompleted(id);
  };
  return (
    <ListItem>
      <ListItemAvatar>
        <Button
          style={{ padding: 0, minWidth: "auto" }}
          onClick={markAsCompleted}
        >
          <Tooltip title="Mark as completed">
            <Avatar>
              <EventIcon
                className={classes.completeMeeting}
                titleAccess=""
              ></EventIcon>
            </Avatar>
          </Tooltip>
        </Button>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        classes={{ primary: classes.meetingTitle }}
        secondary={content}
      />
      <ListItemText>
        {" "}
        <AvatarGroup>
          {participants.map((user, key) => {
            return (
              <Avatar
                key={key}
                sx={{ width: 30, height: 30 }}
                src={`images/${user.logo}`}
              />
            );
          })}
        </AvatarGroup>
      </ListItemText>
    </ListItem>
  );
};

function getTimeString(date) {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const time = hours + ":" + (minutes < 10 ? "0" + minutes : minutes);
  return time;
}

export default MeetingsItem;
