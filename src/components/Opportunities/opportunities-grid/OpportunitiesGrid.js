import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import OpportunitiesDialog from "../opportunities-dialog/OpportunitiesDialog";
import Opportunity from "../Opportunity";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";

const url = "http://localhost:3001/opportunities";

function OpportunitiesGrid() {
  const [opportunities, setOpportunities] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [opportunityToDeleteId, setOpportunityToDeleteId] = useState(null);

  const clients = useSelector((state) => state.clients.clients);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = () => {
    axios
      .get(url)
      .then((response) => {
        const opportunitiesData = response.data.map((opportunityData) => {
          return new Opportunity(
            opportunityData.id,
            opportunityData.client_id,
            opportunityData.opportunity,
            opportunityData.description,
            opportunityData.client,
            opportunityData.status
          );
        });
        setOpportunities(opportunitiesData);
      })
      .catch((error) => {
        console.error("Error with fetching opportunities:", error);
      });
  };

  const OpenForm = () => {
    setIsFormOpen(true);
    setEditingOpportunity(null);
  };

  const CloseForm = () => {
    setIsFormOpen(false);
  };

  const CreateOpportunity = (newOpportunityData) => {
    axios
      .post(url, newOpportunityData)
      .then((response) => {
        const newOpportunity = new Opportunity(
          response.data.id,
          response.data.client_id,
          response.data.opportunity,
          response.data.description,
          response.data.client,
          response.data.status
        );
        setOpportunities((prevOpportunities) => [
          ...prevOpportunities,
          newOpportunity,
        ]);
        setIsFormOpen(false);
      })
      .catch((error) => {
        console.error("Error when creating opportunity:", error);
      });
  };

  const EditOpportunity = (id) => {
    const opportunityToEdit = opportunities.find(
      (opportunity) => opportunity.id === id
    );
    if (opportunityToEdit) {
      setEditingOpportunity(opportunityToEdit);
      setIsFormOpen(true);
    }
  };

  const UpdateOpportunity = (id, updatedOpportunityData) => {
    axios
      .put(`${url}/${id}`, updatedOpportunityData)
      .then((response) => {
        const updatedOpportunity = new Opportunity(
          response.data.id,
          response.data.client_id,
          response.data.opportunity,
          response.data.description,
          response.data.client,
          response.data.status
        );
        setOpportunities((prevOpportunities) =>
          prevOpportunities.map((opportunity) =>
            opportunity.id === id ? updatedOpportunity : opportunity
          )
        );
        setIsFormOpen(false);
        setEditingOpportunity(null);
      })
      .catch((error) => {
        console.error("Error when updating opportunity:", error);
      });
  };

  const DeleteOpportunity = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        setOpportunities((prevOpportunities) =>
          prevOpportunities.filter((opportunity) => opportunity.id !== id)
        );
        setIsDeleteDialogOpen(false);
        setOpportunityToDeleteId(null);
      })
      .catch((error) => {
        console.error("Error when deleting opportunity:", error);
      });
  };

  const columns = [
    {
      field: "client",
      headerName: "Client",
      width: 250,
      valueGetter: (params) => {
        const clientData = clients.find(
          (client) => client.id === params.row.client_id
        );
        return clientData ? clientData.name : "Unknown";
      },
    },
    { field: "opportunity", headerName: "Opportunity", width: 200 },
    { field: "description", headerName: "Description", width: 700 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <div>
          <Chip
            label={params.value}
            color={getStatusColor(params.value)}
            style={{ width: "150px", height: "40px" }}
          />
        </div>
      ),
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => EditOpportunity(params.row.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            setOpportunityToDeleteId(params.row.id);
            setIsDeleteDialogOpen(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  function getStatusColor(status) {
    switch (status.toLowerCase()) {
      case "open":
        return "primary";
      case "closed":
        return "success";
      case "waiting for response":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  }

  return (
    <div className="opportunities">
      <h1 style={{ marginTop: 0 }}>Opportunities</h1>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={OpenForm}
        style={{ marginBottom: 20 }}
      >
        Create New Opportunity
      </Button>
      <Box sx={{ height: 685, width: "100%" }}>
        <DataGrid
          rows={opportunities}
          columns={columns}
          pagination
          pageSize={5}
          disableSelectionOnClick
        />
      </Box>
      <OpportunitiesDialog
        open={isFormOpen}
        onClose={CloseForm}
        onCreate={CreateOpportunity}
        onUpdate={UpdateOpportunity}
        opportunityToEdit={editingOpportunity}
        isNewOpportunity={true}
      />
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this opportunity?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>No</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              DeleteOpportunity(opportunityToDeleteId);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OpportunitiesGrid;
