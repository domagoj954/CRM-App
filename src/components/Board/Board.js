import { Button, Grid } from "@mui/material";
import MyKanbanBoard from "./components/KanbanBoard/KanbanBoard";
import Checklist from "./components/Checklist/Checklist";
import classes from "./Board.module.css";
import { Fragment, useEffect, useState } from "react";
import { formModalsActions } from "../../store/form-modals-slice";
import { useDispatch } from "react-redux";
import { fetchData } from "../../store/tasks-slice";

const Board = () => {
  const dispatch = useDispatch();
  const [viewAll, setViewAll] = useState(false);
  const openTaskModalHandler = () => {
    dispatch(formModalsActions.setIsTaskFormOpened(true));
  };

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const viewAllTasksHandler = () => {
    setViewAll(!viewAll);
    dispatch(fetchData(!viewAll));
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        className={classes.addNewTaskButton}
        onClick={openTaskModalHandler}
      >
        Add new task
      </Button>
      <Button
        className={viewAll ? classes.viewAllActive : classes.viewAll}
        onClick={viewAllTasksHandler}
      >
        View all tasks
      </Button>
      <Grid container>
        <Grid item xs={9}>
          <MyKanbanBoard viewAll={viewAll} />
        </Grid>

        <Grid item xs={3} className={classes.checklist}>
          <Checklist />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Board;
