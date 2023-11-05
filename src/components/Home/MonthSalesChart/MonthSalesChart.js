import {
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthSalesChart = ({ fetchDataFromParent, onChange }) => {
  const [data, setData] = useState([]);
  const [monthId, setMonthId] = useState(2023);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromParent();
      setData(data.data);
    };
    fetchData();
  }, [fetchDataFromParent]);

  const title = (
    <Typography variant="h5" style={{ fontWeight: "bold" }}>
      Sales by Month in {monthId}
    </Typography>
  );

  const handleChange = (event, newValue) => {
    setMonthId(newValue.props.value);
    onChange(newValue.props.value);
  };

  const action = (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="date-period">Period</InputLabel>
      <Select
        labelId="date-period"
        id="period"
        label="Period"
        value={monthId}
        onChange={handleChange}
      >
        <MenuItem value={2023}>2023</MenuItem>
        <MenuItem value={2022}>2022</MenuItem>
      </Select>
    </FormControl>
  );
  return (
    <Container maxWidth="lg" style={{ paddingLeft: 0 }}>
      <Card style={{ minHeight: 280 }}>
        <CardHeader
          style={{ fontWeight: "bold" }}
          action={action}
          title={title}
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart
              width={100}
              height={270}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={60}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="sales"
                fill="#8826e9"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MonthSalesChart;
