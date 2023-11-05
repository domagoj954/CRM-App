import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Icon,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import classes from "./Task.module.css";
import FlagCircleOutlinedIcon from "@mui/icons-material/FlagCircleOutlined";
import { useDispatch } from "react-redux";
import { formModalsActions } from "../../../../store/form-modals-slice";
import { useSelector } from "react-redux";

function Task(props) {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);
  const users = useSelector((state) => state.user.users);
  const { id, index, title, description, priority, client, user_id } = props;
  const clientData = clients.find((item) => item.id === props.client);
  const userData = users.find((item) => item.id === user_id);
  const openModalHandler = () => {
    dispatch(
      formModalsActions.setSelectedTaskData({ ...props, client: clientData })
    );
    dispatch(formModalsActions.setIsTaskFormOpened(true));
  };

  let flagColor = {
    color: "#7bec7b",
  };
  if (priority.toLowerCase() === "medium") {
    flagColor = {
      color: "#e7e701",
    };
  } else if (priority.toLowerCase() === "high") {
    flagColor = {
      color: "red",
    };
  }

  const card = (
    <Card>
      {
        <CardHeader
          avatar={<Avatar src={`/images/${userData.logo}`} />}
          title={
            <Typography variant="h6" className={classes.cardTitle}>
              {title}
            </Typography>
          }
        ></CardHeader>
      }
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <div className={classes.cardBadges}>
          <div className={classes.priority}>
            <span>
              <Tooltip title={priority + " priority"}>
                <Icon>
                  <FlagCircleOutlinedIcon style={flagColor} />
                </Icon>
              </Tooltip>
            </span>
          </div>
          {client && (
            <div className={classes.taskClient}>
              <Chip
                label={clientData.name}
                className={classes.clientName}
                variant="outlined"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={classes.taskBox} onClick={openModalHandler}>
      <Draggable draggableId={id} index={index} type="TASK">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Box sx={{ minWidth: 275, boxShadow: 3 }}>
              <Card className={classes.cardTask} variant="outlined">
                {card}
              </Card>
            </Box>
          </div>
        )}
      </Draggable>
    </div>
  );
}

export default Task;
