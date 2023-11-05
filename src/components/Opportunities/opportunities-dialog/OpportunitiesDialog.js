import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";

function OpportunitiesDialog(props) {
  const [formData, setFormData] = useState({
    client: "",
    opportunity: "",
    description: "",
    status: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    initializeFormData();
  }, [props.opportunityToEdit]);

  const initializeFormData = () => {
    const { opportunityToEdit } = props;
    const newData = opportunityToEdit
      ? {
          client: opportunityToEdit.client_id,
          opportunity: opportunityToEdit.opportunity,
          description: opportunityToEdit.description,
          status: opportunityToEdit.status,
        }
      : {
          client: "",
          opportunity: "",
          description: "",
          status: "",
        };
    setFormData(newData);
  };

  const saveOpportunity = () => {
    const { opportunityToEdit, onUpdate, onCreate } = props;

    if (isFormValid()) {
      if (opportunityToEdit) {
        onUpdate(opportunityToEdit.id, formData);
      } else {
        onCreate(formData);
      }
    }
  };

  const fieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const isFormValid = () => {
    const errors = {};

    if (!formData.client) {
      errors.client = "Client is required";
    }
    if (!formData.opportunity) {
      errors.opportunity = "Opportunity is required";
    }
    if (!formData.description) {
      errors.description = "Description is required";
    }
    if (!formData.status) {
      errors.status = "Status is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clients = useSelector((state) => state.clients.clients);

  const { open, onClose, isNewOpportunity } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isNewOpportunity ? "Create New Opportunity" : "Edit Opportunity"}
      </DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Client"
            variant="outlined"
            fullWidth
            select
            value={formData.client}
            onChange={(e) => fieldChange("client", e.target.value)}
            margin="normal"
            required
            error={!!formErrors.client}
            helperText={formErrors.client}
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Opportunity"
            variant="outlined"
            fullWidth
            value={formData.opportunity}
            onChange={(e) => fieldChange("opportunity", e.target.value)}
            margin="normal"
            required
            error={!!formErrors.opportunity}
            helperText={formErrors.opportunity}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => fieldChange("description", e.target.value)}
            margin="normal"
            required
            error={!!formErrors.description}
            helperText={formErrors.description}
          />
          <TextField
            label="Status"
            variant="outlined"
            fullWidth
            select
            value={formData.status}
            onChange={(e) => fieldChange("status", e.target.value)}
            margin="normal"
            required
            error={!!formErrors.status}
            helperText={formErrors.status}
          >
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
            <MenuItem value="Waiting for response">
              Waiting for response
            </MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            onClick={saveOpportunity}
            style={{ float: "right", marginTop: 30 }}
          >
            {isNewOpportunity ? "Create" : "Update"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            style={{ marginTop: 30 }}
          >
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default OpportunitiesDialog;
