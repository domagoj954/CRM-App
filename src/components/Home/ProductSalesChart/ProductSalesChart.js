import React, { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { PieChart } from "@mui/x-charts/PieChart";
import { CardContent, Typography } from "@mui/material";

const ProductSalesChart = ({ fetchDataFromParent }) => {
  const [data, setData] = useState([{ data: [] }]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromParent();
      setData(data);
    };
    fetchData();
  }, [fetchDataFromParent]);
  return (
    <Fragment>
      <Card style={{ minHeight: 330 }}>
        <CardContent>
          <Typography style={{ fontWeight: "bold" }} variant="h5" gutterBottom>
            Sales Report
          </Typography>
          <PieChart
            style={{ fontSize: 10 }}
            series={data}
            width={350}
            height={200}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ProductSalesChart;
