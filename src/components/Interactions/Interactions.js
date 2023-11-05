import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InteractionCall from "./InteractionCall";
import InteractionItem from "./InteractionItem";
import InteractionMeeting from "./InteractionMeeting";
import InteractionEmail from "./InetractionEmail";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const handleToggle = (data) => {
    setOpen(data);
  };

  return (
    <React.Fragment>
      <InteractionItem
        onOpen={handleToggle}
        open={open}
        key={row.id}
        data={row}
      />
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              {row.type === "call" && (
                <InteractionCall props={row.data} clientData={row.clientData} />
              )}
              {row.type === "meeting" && (
                <InteractionMeeting props={row.data} />
              )}
              {row.type === "email" && (
                <InteractionEmail
                  props={row.data}
                  clientData={row.clientData}
                />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Interactions() {
  const init = async () => {
    const interactions = await fetchInteractions();
    const users = await fetchUsers();
    const clients = await fetchClients();
    interactions.map((interaction) => {
      interaction.clientData = clients.find(
        (item) => item.id === interaction.client_id
      );
      interaction.user = users.find((item) => item.id === interaction.user_id);
      return interaction;
    });
    setData(interactions);
    setFilteredData(interactions);
  };
  React.useEffect(() => {
    init();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };
  const fetchInteractions = async () => {
    try {
      const response = await fetch("http://localhost:3001/interactions");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching interactions data:", error);
    }
  };
  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:3001/clients");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching clients data:", error);
    }
  };
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const handleFilter = (x) => {
    const filteredData = data.filter((item) =>
      item.clientData.name.toLowerCase().includes(x.toLowerCase())
    );

    setFilteredData(filteredData);
  };
  return (
    <React.Fragment>
      <Typography
        variant="h4"
        style={{ fontWeight: "bold", paddingBottom: 10 }}
      >
        Interactions
      </Typography>
      <TextField
        onChange={(e) => handleFilter(e.target.value)}
        id="outlined-basic"
        label="Filter by client"
        variant="outlined"
        size="small"
        style={{ marginBottom: 15 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Client</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Interaction</TableCell>
              <TableCell>Date </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
