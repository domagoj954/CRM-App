import {
  Avatar,
  AvatarGroup,
  Chip,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LinearProgressBar from "../../UI/LinearProgressBar/LinearProgressBar";

const DashboardClientItem = (props) => {
  const { name, users, percent } = props.client;
  const startDate = new Date(props.client.startDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
  let backgroundColor = "#1a90ff";
  let barColor = "#308fe8";

  if (percent >= 0 && percent <= 30) {
    backgroundColor = "#fb4d55";
    barColor = "#fcc4c4";
  } else if (percent > 30 && percent <= 50) {
    backgroundColor = "#f49949";
    barColor = "#fff2de";
  } else {
    backgroundColor = "#2ea351";
    barColor = "#a8edba";
  }
  return (
    <Grid
      container
      alignItems="center"
      key={props.index}
      style={{ marginBottom: 8 }}
    >
      <Grid item xs={3}>
        <Typography variant="subtitle" style={{ fontWeight: "bold" }}>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="subtitle1" style={{ color: "grey" }}>
          <span style={{ position: "sticky", marginRight: 5, top: "50%" }}>
            <CalendarMonthIcon />
          </span>
          {startDate}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <AvatarGroup style={{ float: "left" }} max={2}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {users.map((user) => (
              <Tooltip
                title={user.firstName + " " + user.lastName}
                key={user.firstName}
              >
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  src={`/images/${user.logo}`}
                />
              </Tooltip>
            ))}
          </div>
        </AvatarGroup>
      </Grid>
      <Grid item xs={2}>
        <div style={{ width: "80%" }}>
          <LinearProgressBar percent={percent} index={props.index} />
        </div>
      </Grid>
      <Grid item xs={1}>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <Chip
            style={{
              border: `2px solid ${backgroundColor}`,
              background: barColor,
              color: backgroundColor,
              fontWeight: "bold",
            }}
            label={percent + "%"}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default DashboardClientItem;
