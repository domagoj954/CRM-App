import React, { Component } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import ClientDialog from "../clients-dialog/ClientsDialog";
import Client from "../../Client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { Avatar, AvatarGroup, Tooltip } from "@mui/material";

const url = "http://localhost:3001/clients";

class ClientsGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      industries: [],
      clients: [],
      isFormOpen: false,
      editingClient: null,
      isDeleteDialogOpen: false,
      clientToDeleteId: null,
      isLoaded: false,
      users: [],
    };
  }

  async componentDidMount() {
    const industries = await this.fetchIndustries();
    this.setState({ industries: industries });
    const users = await this.fetchUsers();
    this.setState({ users: users });
    await this.fetchClients();
    this.setState({ isLoaded: true });
  }

  fetchClients() {
    axios
      .get(url)
      .then((response) => {
        const clientsData = response.data.map((clientData) => {
          return new Client(
            clientData.id,
            clientData.name,
            clientData.address,
            clientData.email,
            clientData.phone_number,
            clientData.category,
            clientData.users,
            clientData.percent,
            clientData.industry,
            clientData.startDate
          );
        });
        this.setState({ clients: clientsData });
      })
      .catch((error) => {
        console.error("Error with fetching clients:", error);
      });
  }

  fetchIndustries = async () => {
    try {
      const response = await fetch("http://localhost:3001/industry");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  OpenForm = () => {
    this.setState({ isFormOpen: true, editingClient: null });
  };

  CloseForm = () => {
    this.setState({ isFormOpen: false });
  };

  CreateClient = (newClientData) => {
    axios
      .post(url, newClientData)
      .then((response) => {
        const newClient = new Client(
          response.data.id,
          response.data.name,
          response.data.address,
          response.data.email,
          response.data.phone_number,
          response.data.category,
          response.data.users,
          response.data.percent,
          response.data.industry,
          response.data.startDate
        );
        this.setState((prevState) => ({
          clients: [...prevState.clients, newClient],
          isFormOpen: false,
        }));
      })
      .catch((error) => {
        console.error("Error when creating client:", error);
      });
  };

  EditClient = (id) => {
    const { clients } = this.state;
    const clientToEdit = clients.find((client) => client.id === id);
    if (clientToEdit) {
      this.setState({ editingClient: clientToEdit, isFormOpen: true });
    }
  };

  UpdateClient = (id, updatedClientData) => {
    axios
      .patch(`${url}/${id}`, updatedClientData)
      .then((response) => {
        const updatedClient = new Client(
          response.data.id,
          response.data.name,
          response.data.address,
          response.data.email,
          response.data.phone_number,
          response.data.category,
          response.data.users,
          response.data.percent,
          response.data.industry,
          response.data.startDate
        );
        this.setState((prevState) => ({
          clients: prevState.clients.map((client) =>
            client.id === id ? updatedClient : client
          ),
          isFormOpen: false,
          editingClient: null,
        }));
      })
      .catch((error) => {
        console.error("Error when updating client:", error);
      });
  };

  DeleteClient = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        this.setState((prevState) => ({
          clients: prevState.clients.filter((client) => client.id !== id),
        }));
      })
      .catch((error) => {
        console.error("Error when deleting client:", error);
      });
  };

  openDeleteDialog = (id) => {
    this.setState({ isDeleteDialogOpen: true, clientToDeleteId: id });
  };

  closeDeleteDialog = () => {
    this.setState({ isDeleteDialogOpen: false, clientToDeleteId: null });
  };

  getUserAvatars(userIds) {
    let _users = [];
    userIds.map((id, key) => {
      _users.push(this.state.users.find((i) => i.id === id));
    });
    const x = _users.map((user, key) => {
      return (
        <Tooltip key={key} title={user.firstName + " " + user.lastName}>
          <Avatar sx={{ width: 25, height: 25 }} src={`/images/${user.logo}`} />
        </Tooltip>
      );
    });
    return x;
  }

  render() {
    const {
      clients,
      isFormOpen,
      editingClient,
      isDeleteDialogOpen,
      clientToDeleteId,
    } = this.state;

    const columns = [
      { field: "name", headerName: "Name", width: 200 },
      { field: "address", headerName: "Address", width: 200 },
      { field: "email", headerName: "Email", width: 300 },
      { field: "phone_number", headerName: "Phone number", width: 150 },
      { field: "category", headerName: "Category", width: 150 },
      { field: "industry", headerName: "Industry", width: 150 },
      {
        field: "startDate",
        headerName: "Start date",
        width: 150,
        valueFormatter: (params) =>
          params.value
            ? new Date(params.value).toLocaleDateString("en-GB", {
                year: "numeric",
                day: "numeric",
                month: "numeric",
              })
            : "",
      },
      {
        field: "users",
        headerName: "Users",
        width: 150,
        renderCell: (params) =>
          params.value ? this.getUserAvatars(params.value) : "",
      },
      {
        field: "Edit",
        headerName: "Edit",
        width: 100,
        filter: "text",
        sortable: false,
        renderCell: (params) => (
          <IconButton onClick={() => this.EditClient(params.row.id)}>
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
          <IconButton onClick={() => this.openDeleteDialog(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];

    return (
      <div className="clients">
        <h1 style={{ marginTop: 0 }}>Clients</h1>
        <Button
          style={{ marginBottom: 20 }}
          variant="contained"
          color="primary"
          size="small"
          onClick={this.OpenForm}
        >
          Create New Client
        </Button>
        {this.state.isLoaded && (
          <Box sx={{ height: 685, width: "100%" }}>
            <DataGrid
              rows={clients}
              columns={columns}
              pagination
              pageSize={5}
              disableSelectionOnClick
            />
          </Box>
        )}
        {isFormOpen && (
          <ClientDialog
            open={isFormOpen}
            onClose={this.CloseForm}
            onCreate={this.CreateClient}
            onUpdate={this.UpdateClient}
            clientToEdit={editingClient}
            isNewClient={true}
            industries={this.state.industries}
          />
        )}
        <Dialog
          open={isDeleteDialogOpen}
          onClose={this.closeDeleteDialog}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete this client?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDeleteDialog}>No</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                this.DeleteClient(clientToDeleteId);
                this.closeDeleteDialog();
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
}

export default ClientsGrid;
