import {
  Button,
  CardContent,
  Grid,
  Typography,
  Card,
  CardActions,
} from "@mui/material";
import classes from "./Ticket.module.css";

const Ticket = (props) => {
  const { id, name, timestamp, feedbackText } = props;
  const date = new Date(timestamp).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const handleActionClick = (feedbackId, action) => {
    props.onActionButtonClick({ feedbackId, action });
  };

  return (
    <Grid item xs={12} sm={12} md={12} className={classes.ticket}>
      <Card className={classes.ticketCard}>
        <CardContent className={classes.ticketContent}>
          <Typography className={classes.ticketUsername} variant="h6">
            {name}
          </Typography>
          <Typography className={classes.feedbackText}>
            {feedbackText}
          </Typography>
          <Typography className={classes.date} variant="subtitle2">
            {date}
          </Typography>
        </CardContent>
        <CardActions className={classes.ticketActions}>
          <div className={classes.actions}>
            <Button
              className={` ${classes.actionButton}  ${classes.questionButton}`}
              variant="contained"
              onClick={() => handleActionClick(id, "question")}
            >
              Question
            </Button>
            <Button
              className={classes.actionButton}
              variant="contained"
              color="error"
              onClick={() => handleActionClick(id, "problem")}
            >
              Problem
            </Button>
            <Button
              className={` ${classes.actionButton}  ${classes.praiseButton}`}
              variant="contained"
              onClick={() => handleActionClick(id, "praise")}
            >
              Praise
            </Button>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Ticket;
