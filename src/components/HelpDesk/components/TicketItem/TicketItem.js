import { Avatar, ListItem, Chip, Grid } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  listItemTicket: {
    marginBottom: "16px",
    marginLeft: 15,
  },
  descriptionTicket: {
    marginTop: 8,
    whiteSpace: "pre-line",
  },
}));

const TicketItem = (props) => {
  const classes = useStyles();
  const { id, timestamp, type, feedbackText, name, respPersonId, clientId } =
    props;
  const clients = useSelector((state) => state.clients.clients);
  const users = useSelector((state) => state.user.users);
  const clientData = clients.find((item) => item.id === clientId);
  const date = new Date(timestamp).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const color = type === "question" ? "primary" : "error";
  const responsiblePerson = users.find((i) => i.id === respPersonId);
  const avatar = `/images/${responsiblePerson.logo}`;
  return (
    <ListItem key={id}>
      <Tooltip
        title={
          "Ticket is assigned on " +
          responsiblePerson.firstName +
          " " +
          responsiblePerson.lastName
        }
      >
        <Avatar src={avatar}></Avatar>
      </Tooltip>

      <Grid container className={classes.listItemTicket}>
        <Grid item xs={6}>
          <Chip
            label={clientData.name}
            color={type === "problem" ? "secondary" : "primary"}
          />

          <span
            style={{
              fontStyle: "italic",
              color: "grey",
              fontSize: 12,
              marginLeft: 10,
            }}
          >
            {date}
          </span>
        </Grid>
        <Grid
          item
          xs={6}
          container
          justify="flex-end"
          style={{ display: "block", textAlign: "right" }}
        >
          <Chip
            style={{ fontSize: 13, background: "white" }}
            avatar={
              <Avatar style={{ background: "white" }}>
                {type === "question" ? (
                  <ContactSupportIcon
                    style={{ fontSize: 20 }}
                  ></ContactSupportIcon>
                ) : (
                  <ErrorOutlineIcon
                    color={color}
                    style={{ fontSize: 20 }}
                  ></ErrorOutlineIcon>
                )}
              </Avatar>
            }
            label={type}
            variant="outlined"
            color={color}
          />
        </Grid>

        <Grid item xs={12} className={classes.description}>
          {feedbackText}
        </Grid>
        <Grid item xs={12} style={{ textAlign: "right" }}>
          Sender:
          <span style={{ fontWeight: "bold" }}> {name}</span>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default TicketItem;
