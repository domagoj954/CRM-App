import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import UsersAutocomplete from "../../../UI/UsersAutocomplete/UsersAutocomplete";

class ClientDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        address: "",
        email: "",
        phone_number: "",
        category: "",
        users: [],
        percent: 0,
        industry: "",
        startDate: "",
      },
      formErrors: {},
      industries: props.industries,
      users: [],
    };
  }

  getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  componentDidMount() {
    this.initializeFormData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.clientToEdit !== this.props.clientToEdit) {
      this.initializeFormData();
    }
  }

  async initializeFormData() {
    const { clientToEdit } = this.props;
    const formData = clientToEdit
      ? { ...clientToEdit }
      : {
          name: "",
          address: "",
          email: "",
          phone_number: "",
          category: "",
          users: [],
          percent: 0,
          industry: "",
          startDate: this.getTodayDate(),
        };
    this.setState({ formData, formErrors: {} });
  }

  isFormValid = () => {
    const { formData } = this.state;
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.address) {
      errors.address = "Address is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.phone_number) {
      errors.phone_number = "Phone Number is required";
    }
    if (!formData.category) {
      errors.category = "Category is required";
    }
    if (!formData.industry) {
      errors.industry = "Industry is required";
    }

    this.setState({ formErrors: errors });
    return Object.keys(errors).length === 0;
  };

  handleSave = () => {
    const { clientToEdit, onUpdate, onCreate } = this.props;
    const { formData } = this.state;

    if (this.isFormValid()) {
      if (clientToEdit) {
        onUpdate(clientToEdit.id, formData);
      } else {
        onCreate(formData);
      }
    }
  };

  handleFieldChange = (fieldName, value) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [fieldName]: value,
      },
    }));
  };

  handleUsers = (value) => {
    const ids = value.map((item) => item.id);
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, users: ids },
    });
  };

  render() {
    const { open, onClose, isNewClient } = this.props;
    const { formData, formErrors } = this.state;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {isNewClient ? "Create New Client" : "Edit Client"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={(e) => this.handleFieldChange("name", e.target.value)}
              margin="normal"
              required
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={formData.address}
              onChange={(e) =>
                this.handleFieldChange("address", e.target.value)
              }
              margin="normal"
              required
              error={!!formErrors.address}
              helperText={formErrors.address}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={(e) => this.handleFieldChange("email", e.target.value)}
              margin="normal"
              required
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={formData.phone_number}
              onChange={(e) =>
                this.handleFieldChange("phone_number", e.target.value)
              }
              margin="normal"
              required
              error={!!formErrors.phone_number}
              helperText={formErrors.phone_number}
            />
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              select
              value={formData.category}
              onChange={(e) =>
                this.handleFieldChange("category", e.target.value)
              }
              margin="normal"
              error={!!formErrors.category}
              helperText={formErrors.category}
              required
            >
              <MenuItem value="Client">Client</MenuItem>
              <MenuItem value="Potential client">Potential client</MenuItem>
              <MenuItem value="Partner">Partner</MenuItem>
            </TextField>
            <TextField
              label="Industry"
              variant="outlined"
              fullWidth
              select
              required
              value={formData.industry}
              onChange={(e) =>
                this.handleFieldChange("industry", e.target.value)
              }
              margin="normal"
              error={!!formErrors.industry}
              helperText={formErrors.industry}
            >
              {this.state.industries.map((item, index) => {
                return (
                  <MenuItem value={item.name} key={index}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              style={{ marginTop: 16 }}
              fullWidth
              label="Start date"
              type="date"
              variant="outlined"
              value={formData.startDate}
              onChange={(e) =>
                this.handleFieldChange("startDate", e.target.value)
              }
            />
            <UsersAutocomplete
              onChange={this.handleUsers}
              selectedUsers={formData.users}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSave}
              style={{ float: "right", marginTop: 15 }}
            >
              {isNewClient ? "Create Client" : "Update Client"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              style={{ marginTop: 15 }}
            >
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

export default ClientDialog;
