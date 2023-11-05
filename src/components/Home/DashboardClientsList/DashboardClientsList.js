import React, { useEffect, useState } from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";
import DashboardClientItem from "../DashboardClientItem/DashboardClientItem";

function ClientList({ fetchDataFromParent }) {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromParent();
      const users = await fetchUsers();
      data.map((client) => {
        return client.users.forEach((item, key) => {
          client.users[key] = users.find((x) => x.id === item);
        });
      });
      const _clients = data.filter((item) => item.category === "Client");
      setClients(_clients);
    };

    fetchData();
  }, [fetchDataFromParent]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container
      maxWidth="xl"
      style={{ paddingLeft: 0, overflowY: "auto", height: 281 }}
    >
      <Card>
        <div style={{ overflowY: "auto", height: 280 }}>
          <CardContent>
            <Typography
              style={{ fontWeight: "bold" }}
              variant="h5"
              gutterBottom
            >
              Clients
            </Typography>
            {clients.map((client, index) => {
              return (
                <DashboardClientItem
                  client={client}
                  index={index}
                  key={index}
                />
              );
            })}
          </CardContent>
        </div>
      </Card>
    </Container>
  );
}

export default ClientList;
