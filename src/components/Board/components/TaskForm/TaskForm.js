import classes from "./TaskForm.module.css";
import { formModalsActions } from "../../../../store/form-modals-slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Modal,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  Autocomplete,
  Avatar,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../store/tasks-slice";

const TaskForm = (props) => {
  const task = props.task;
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);
  const users = useSelector((state) => state.user.users);
  const isTaskFormOpen = useSelector(
    (state) => state.formModals.isTaskFormOpened
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    assigned: null,
    priority: "Low",
  });
  useEffect(() => {
    if (Object.keys(task).length !== 0) {
      const client = task.client ? task.client.name : "";
      const assigned = users.find((item) => item.id === task.user_id);
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        assigned: assigned,
        client: client,
      });
    }
  }, [task]);

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    priority: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClose = () => {
    dispatch(formModalsActions.setSelectedTaskData({}));
    dispatch(formModalsActions.setIsTaskFormOpened(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["title", "priority", "assigned"];
    let hasError = false;
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        hasError = true;
      } else {
        newErrors[field] = false;
      }
    });

    setErrors(newErrors);
    if (!hasError) {
      const clientId = clients.find(
        (client) => client.name === formData.client
      )?.id;

      const status = Object.keys(task).length > 0 ? task.status : "open";
      const newData = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        user_id: formData.assigned.id,
        client_id: clientId,
        status: status,
        date_modified: new Date(),
      };

      saveTask(newData);
    }
  };

  const saveTask = (newData) => {
    let url = "http://localhost:3000/tasks";
    let method = "POST";
    if (Object.keys(task).length !== 0) {
      url = `http://localhost:3000/tasks/${task.id}`;
      method = "PATCH";
    }
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(fetchData(props.viewAll));
        dispatch(formModalsActions.setSelectedTaskData({}));
        dispatch(formModalsActions.setIsTaskFormOpened(false));
      })
      .catch((error) => {
        console.error("Error saving new data:", error);
      });
  };

  const handleAutocomplete = (event, newValue) => {
    setFormData({ ...formData, assigned: newValue });
  };

  return (
    <Modal open={isTaskFormOpen}>
      <Container maxWidth="sm" className={classes.taskForm}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Typography variant="h5" className={classes.formTitle}>
              Create new task
            </Typography>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                value={formData.assigned}
                id="country-select-demo"
                options={users}
                onChange={handleAutocomplete}
                autoHighlight
                getOptionLabel={(option) => {
                  return option.firstName + " " + option.lastName;
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 10, flexShrink: 0 } }}
                    {...props}
                  >
                    <Avatar
                      style={{ marginRight: 10 }}
                      src={`/images/${option.logo}`}
                    ></Avatar>
                    {option.firstName + " " + option.lastName}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Choose assignee"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Client</InputLabel>
                <Select
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.name}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  sx={{ width: 300 }}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div className={classes.formActions}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              type="reset"
            >
              Close
            </Button>
          </div>
        </form>
      </Container>
    </Modal>
  );
};

export default TaskForm;
