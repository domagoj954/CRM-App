import React, { Fragment } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import classes from "./Column.module.css";

function Column(props) {
  const { droppableId, list, type, title } = props;
  let columnBackgroundColor = "#00eaff";
  if (droppableId.toLowerCase() === "progress") {
    columnBackgroundColor = "#ffd500";
  } else if (droppableId.toLowerCase() === "done") {
    columnBackgroundColor = "#7bec7b";
  }

  return (
    <Fragment>
      <Droppable droppableId={droppableId} type={type}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.column}
          >
            <div
              className={classes.columnHeader}
              style={{
                background: columnBackgroundColor,
              }}
            >
              <h2>{title}</h2>
            </div>

            {list.map((val, index) => {
              return (
                <Task
                  id={val.id}
                  key={val.id}
                  index={index}
                  title={val.title}
                  description={val.description}
                  priority={val.priority}
                  client={val.client_id}
                  user_id={val.user_id}
                />
              );
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Fragment>
  );
}

export default Column;
