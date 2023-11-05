import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserWelcomeView from "../UI/UserWelcomeView/UserWelcomeView";
import CashFlow from "../Home/CashFlow/CashFlow";
import axios from "axios";
import MonthSalesChart from "./MonthSalesChart/MonthSalesChart";
import ProductSalesChart from "./ProductSalesChart/ProductSalesChart";
import ClientList from "./DashboardClientsList/DashboardClientsList";

function Home() {
  const [cashFlow, setCashFlow] = useState();
  const [monthId, setMonthId] = useState(2023);
  const height = 300;

  const handleCashflow = (data) => {
    fetchCashflowData(data);
  };

  const fetchCashflowData = (id = "last30Days") => {
    axios
      .get(`http://localhost:3001/cashflow/${id}`)
      .then((response) => {
        setTimeout(() => {
          setCashFlow(response.data);
        }, 2500);
      })
      .catch((error) => {
        console.error("Error with fetching cashflow:", error);
      });
  };

  const fetchSalesReport = async () => {
    try {
      const response = await fetch("http://localhost:3001/sales");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:3001/clients");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchMonthReport = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/monthlyReport/${monthId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMontlySales = (data) => {
    setMonthId(data);
  };

  useEffect(() => {
    fetchCashflowData();
  }, []);
  return (
    <Container
      maxWidth="xl"
      style={{ background: "#8080800f", height: "100%" }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <UserWelcomeView />
        </Grid>

        <Grid item xs={8}>
          <MonthSalesChart
            onChange={handleMontlySales}
            fetchDataFromParent={fetchMonthReport}
          />
        </Grid>
        <Grid item xs={4} style={{ maxHeight: height }}>
          <ProductSalesChart fetchDataFromParent={fetchSalesReport} />
        </Grid>
        <Grid item xs={8} style={{ maxHeight: height, overflow: "hidden" }}>
          <ClientList fetchDataFromParent={fetchClients} />
        </Grid>
        <Grid item xs={4} style={{ maxHeight: height }}>
          <CashFlow cashFlowData={cashFlow} onChange={handleCashflow} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
