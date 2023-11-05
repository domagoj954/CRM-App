import React, { Fragment, useEffect, useState } from "react";
import { Grid, Snackbar } from "@mui/material";
import classes from "./TicketsList.module.css";
import Ticket from "../Ticket/Ticket";
import axios from "axios";
import { useSelector } from "react-redux";
import PraiseModalTemplate from "../PraiseModal/PraiseModal";
import Toast from "../../../UI/Snackbar/Snackbar";

const TicketsList = () => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clients = useSelector((state) => state.clients.clients);
  const [feedback, setCurrentFeedback] = useState(null);
  const [state, setState] = React.useState({
    isToastOpen: false,
    message: "",
  });
  const { isToastOpen, message } = state;

  useEffect(() => {
    fetchNewTickets();
  }, []);

  const fetchNewTickets = () => {
    axios
      .get("http://localhost:3001/tickets")
      .then((response) => {
        const tickets = response.data
          .filter((item) => item.seen === 0)
          .map((ticket) => {
            ticket.client = clients.filter(
              (item) => item.id === ticket.client_id
            );
            return ticket;
          });
        setFeedbackItems(tickets);
      })
      .catch((error) => {
        console.error("Error with fetching tickets:", error);
      });
  };

  function handleActionClick(data) {
    switch (data.action) {
      case "praise":
        openPraiseModal(data.feedbackId);
        break;
      case "question":
        handleQuestion(data.feedbackId);
        break;
      case "problem":
        handleProblem(data.feedbackId);
        break;
    }
  }
  async function handleQuestion(feedbackId) {
    const response = await fetch("http://localhost:3001/users");
    const users = await response.json();
    const responsiblePerson = users.find(
      (user) => user.role === "ticket_question"
    );

    const feedback = feedbackItems.find((item) => item.id === feedbackId);
    const date = new Date(feedback.timestamp).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    const task = {
      title: "Customer question",
      description: `Customer ${feedback.name} has sent message: \n\n "${feedback.feedbackText}" at ${date}. \n\n Customer's email address is: ${feedback.email}`,
      priority: "High",
      user_id: responsiblePerson.id,
      client_id: feedback.client_id,
      status: "open",
      date_modified: new Date(),
      ticket_id: feedback.id,
    };
    createNewTask(task);
    markAsSeen(feedback, responsiblePerson.id, "question");
  }

  async function handleProblem(feedbackId) {
    const response = await fetch("http://localhost:3001/users");
    const users = await response.json();
    const responsiblePerson = users.find(
      (user) => user.role === "ticket_problem"
    );

    const feedback = feedbackItems.find((item) => item.id === feedbackId);
    const date = new Date(feedback.timestamp).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    const task = {
      title: "Customer problem",
      description: `Customer ${feedback.name} has sent message: \n\n "${feedback.feedbackText}" at ${date}. \n\n Customer's email address is: ${feedback.email}`,
      priority: "High",
      user_id: responsiblePerson.id,
      client_id: feedback.client_id,
      status: "open",
      date_modified: new Date(),
      ticket_id: feedback.id,
    };
    createNewTask(task);
    markAsSeen(feedback, responsiblePerson.id, "problem");
  }

  async function markAsSeen(feedback, userId, type) {
    const response = await fetch(
      `http://localhost:3001/tickets/${feedback.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          type: type,
          seen: 1,
          status: type === "praise" ? null : "open",
          user_id: userId,
        }),
      }
    );
    await response.json();

    fetchNewTickets();
  }

  const openPraiseModal = (feedbackId) => {
    setIsModalOpen(true);
    const currentFeedback = feedbackItems.find(
      (item) => item.id === feedbackId
    );
    setCurrentFeedback(currentFeedback);
  };

  const handleCloseModal = (message) => {
    setIsModalOpen(false);
    if (!!message) {
      setState(message);

      setTimeout(() => {
        setState({ ...state, open: false });
      }, 4000);
    }
  };

  const handleAfterSendingEmail = (feedbackId) => {
    markAsSeen({ id: feedbackId }, null, "praise");
  };

  async function createNewTask(task) {
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
        method: "POST",
      });
      await response.json();
    } catch (error) {
      console.error("Fetch data error:", error);
    }
  }

  return (
    <Fragment>
      {isModalOpen && (
        <PraiseModalTemplate
          open={isModalOpen}
          item={feedback}
          onModalClose={handleCloseModal}
          onEmailSend={handleAfterSendingEmail}
        >
          /
        </PraiseModalTemplate>
      )}
      <div className={classes.ticketsList}>
        <Grid container spacing={2}>
          {feedbackItems.map((item, index) => (
            <Ticket
              key={index}
              id={item.id}
              name={item.name}
              timestamp={item.timestamp}
              feedbackText={item.feedbackText}
              onActionButtonClick={handleActionClick}
            />
          ))}
        </Grid>
        {feedbackItems.length === 0 && (
          <div className={classes.noItems}>No new tickets.</div>
        )}
      </div>
      <Toast open={isToastOpen} message={message} />
    </Fragment>
  );
};

export default TicketsList;
