import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../Column/Column";
import classes from "./KanbanBoard.module.css";
import { useSelector } from "react-redux";
import TaskForm from "../TaskForm/TaskForm";
import { fetchData } from "../../../../store/tasks-slice";
import { useDispatch } from "react-redux";

const initialState = {
  open: {
    id: "open",
    groupName: "To do",
    groupId: "open",
    tasks: [],
  },
  progress: {
    id: "progress",
    groupName: "In progress",
    groupId: "progress",
    tasks: [],
  },
  done: {
    id: "done",
    groupName: "Done",
    groupId: "done",
    tasks: [],
  },
};
function MyKanbanBoard({ viewAll }) {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.formModals.taskData);
  const isTaskFormOpen = useSelector(
    (state) => state.formModals.isTaskFormOpened
  );
  const tasks = useSelector((state) => state.tasks.tasks);
  let boardColumns = { ...initialState };

  const [taskList, setTasks] = useState(initialState);
  useEffect(() => {
    Object.keys(boardColumns).map((key) => {
      boardColumns[key]["tasks"] = tasks.filter((task) => {
        return task.status === boardColumns[key]["groupId"];
      });
      return boardColumns[key]["tasks"];
    });
    setTasks(boardColumns);
  }, [tasks]);

  function onDragEnd(val) {
    const { draggableId, source, destination } = val;
    if (!destination) return;
    const sourceGroup = taskList[source.droppableId];
    const destinationGroup = taskList[destination.droppableId];

    const movingTask = sourceGroup.tasks.find((t) => t.id == draggableId);
    sourceGroup.tasks = sourceGroup.tasks.filter((t) => t.id !== draggableId);
    destinationGroup.tasks = [...destinationGroup.tasks, movingTask];

    setTasks((prevValue) => ({
      ...prevValue,
      [source.draggableId]: sourceGroup,
      [destination.droppableId]: destinationGroup,
    }));
    changeTaskStatus(movingTask, destination.droppableId);
  }

  const changeTaskStatus = (taskData, newStatus) => {
    const status = newStatus.replace(" ", "_").toLowerCase();
    const task = {
      status: status,
      date_modified: new Date().toISOString(),
    };
    fetch(`http://localhost:3000/tasks/${taskData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then(() => {
        if (taskData.ticket_id) {
          updateTicketStatus(taskData, newStatus);
        }
        dispatch(fetchData(viewAll));
      })
      .catch((error) => {
        console.error("Error updating resource:", error);
      });
  };

  function updateTicketStatus(taskData, newStatus) {
    const modifiedStatus = newStatus.replace(" ", "_").toLowerCase();
    fetch(`http://localhost:3001/tickets/${taskData.ticket_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: modifiedStatus,
      }),
    });
  }

  return (
    <div>
      {isTaskFormOpen && <TaskForm task={selectedTask} viewAll={viewAll} />}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.wrapper}>
          <Column
            className="column"
            droppableId="open"
            list={taskList.open.tasks}
            type="TASK"
            title="Open"
          />
          <Column
            className="column"
            droppableId="progress"
            list={taskList.progress.tasks}
            type="TASK"
            title="In progress"
          />
          <Column
            className="column"
            droppableId="done"
            list={taskList.done.tasks}
            type="TASK"
            title="Done"
          />
        </div>
      </DragDropContext>
    </div>
  );
}

export default MyKanbanBoard;
