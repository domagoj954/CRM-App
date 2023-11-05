import React, { useEffect, useState } from "react";
import { Button, List } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import classesH from "./TicketBoard.module.css";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import TicketItem from "../TicketItem/TicketItem";
import axios from "axios";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2% 10%",
  },
  listContainer: {
    maxHeight: "300px",
    overflowY: "auto",
    transition: "max-height 0.3s ease-in-out",
    maxHeight: "300px",
    width: "90%",
    marginBottom: "20px",
  },
  hidden: {
    maxHeight: "0",
    overflow: "hidden",
  },
}));

const TicketsBoard = () => {
  const initialData = {
    open: [],
    progress: [],
    done: [],
  };
  const classes = useStyles();
  const ticketsUrl = "http://localhost:3001/tickets";
  const [data, setData] = useState(initialData);
  const [showOpen, setShowOpen] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [showDone, setShowDone] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleToggle = (listName) => {
    if (listName === "open") setShowOpen(!showOpen);
    if (listName === "progress") setShowProgress(!showProgress);
    if (listName === "done") setShowDone(!showDone);
  };

  const fetchTickets = () => {
    axios
      .get(ticketsUrl)
      .then((response) => {
        const filteredTickets = response.data.filter(
          (item) => item.status !== null
        );
        filteredTickets.map((ticket) => {
          initialData[ticket.status].push(ticket);
          return ticket;
        });
        setData(initialData);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error with fetching interactions:", error);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className={classes.container}>
      {isLoaded && (
        <Box style={{ width: "100%" }}>
          <div>
            <div style={{ display: "inline-flex", width: "100%" }}>
              <div className={classesH.toDoColumnHeader}>To do</div>
              {
                <span
                  className={classesH.toggleButton}
                  onClick={() => handleToggle("open")}
                >
                  {showOpen ? <ExpandLess /> : <ExpandMore />}
                </span>
              }
            </div>

            {data.open.length > 0 && (
              <List
                className={`${classes.listContainer} ${
                  !showOpen ? classes.hidden : ""
                }`}
              >
                {data.open.map((item) => (
                  <TicketItem
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    timestamp={item.timestamp}
                    type={item.type}
                    clientId={item.client_id}
                    feedbackText={item.feedbackText}
                    respPersonId={item.user_id}
                  />
                ))}
              </List>
            )}
            {data.open.length === 0 && (
              <div className={classesH.noItems}>No items.</div>
            )}
          </div>

          <div>
            <div style={{ display: "inline-flex", width: "100%" }}>
              <div className={classesH.inProgressColumnHeader}>In Progress</div>
              <span
                className={classesH.toggleButton}
                onClick={() => handleToggle("progress")}
              >
                {showProgress ? <ExpandLess /> : <ExpandMore />}
              </span>
            </div>

            {data.progress.length > 0 && (
              <List
                className={`${classes.listContainer} ${
                  !showProgress ? classes.hidden : ""
                }`}
              >
                {data.progress.map((item) => (
                  <TicketItem
                    id={item.id}
                    key={item.id}
                    gender={item.responsiblePerson?.gender}
                    name={item.name}
                    timestamp={item.timestamp}
                    type={item.type}
                    clientId={item.client_id}
                    feedbackText={item.feedbackText}
                    respPersonId={item.user_id}
                  />
                ))}
              </List>
            )}
            {data.progress.length === 0 && (
              <div className={classesH.noItems}>No items.</div>
            )}
          </div>

          <div>
            <div style={{ display: "inline-flex", width: "100%" }}>
              <div className={classesH.doneColumnHeader}>Done</div>
              <span
                className={classesH.toggleButton}
                onClick={() => handleToggle("done")}
              >
                {showDone ? <ExpandLess /> : <ExpandMore />}
              </span>
            </div>

            {data.done.length > 0 && (
              <List
                className={`${classes.listContainer} ${
                  !showDone ? classes.hidden : ""
                }`}
              >
                {data.done.map((item) => (
                  <TicketItem
                    id={item.id}
                    key={item.id}
                    gender={item.responsiblePerson?.gender}
                    name={item.name}
                    timestamp={item.timestamp}
                    type={item.type}
                    clientId={item.client_id}
                    feedbackText={item.feedbackText}
                    respPersonId={item.user_id}
                  />
                ))}
              </List>
            )}
            {data.done.length === 0 && (
              <div className={classesH.noItems}>No items.</div>
            )}
          </div>
        </Box>
      )}
    </div>
  );
};

export default TicketsBoard;
