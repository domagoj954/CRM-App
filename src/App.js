import React, { Fragment, useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import { useDispatch } from "react-redux";
import { clientsActions } from "./store/clients-slice";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { userActions } from "./store/user-slice";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const clientsUrl = "http://localhost:3001/clients";
  const usersUrl = "http://localhost:3001/users";
  useEffect(() => {
    fetchClients();
    fetchUsers();
    setIsLoaded(true);
  }, []);

  const fetchClients = () => {
    axios
      .get(clientsUrl)
      .then((response) => {
        dispatch(clientsActions.setClients(response.data));
      })
      .catch((error) => {
        console.error("Error with fetching interactions:", error);
      });
  };
  const fetchUsers = () => {
    axios
      .get(usersUrl)
      .then((response) => {
        dispatch(userActions.setUsers(response.data));
      })
      .catch((error) => {
        console.error("Error with fetching interactions:", error);
      });
  };

  return (
    <BrowserRouter>
      <Fragment>{isLoaded && <Layout />}</Fragment>
    </BrowserRouter>
  );
}

export default App;
