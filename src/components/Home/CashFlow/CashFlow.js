import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Loader from "../../UI/Loader/Loader";

const CashFlow = ({ cashFlowData, onChange }) => {
  const [period, setPeriod] = useState("last30Days");
  const [isLoaded, setIsLoaded] = useState(!!cashFlowData);
  const handlePeriod = (event, newValue) => {
    setPeriod(newValue.props?.value);
    onChange(newValue.props?.value);
    setIsLoaded(false);
  };
  const isBusinessResultPositive = cashFlowData?.percent > 0;

  useEffect(() => {
    if (!!cashFlowData) {
      setIsLoaded(true);
    }
  }, [cashFlowData]);
  const title = (
    <Typography style={{ fontWeight: "bold" }} variant="h5" gutterBottom>
      Cashflow
    </Typography>
  );

  const date = (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="date-period">Period</InputLabel>
      <Select
        labelId="date-period"
        id="period"
        label="Period"
        value={period}
        onChange={handlePeriod}
      >
        <MenuItem value={"last30Days"}>Last 30 days</MenuItem>
        <MenuItem value={"last6Months"}>Last 6 months</MenuItem>
        <MenuItem value={"thisYear"}>This year</MenuItem>
        <MenuItem value={"lastYear"}>Last year</MenuItem>
      </Select>
    </FormControl>
  );
  return (
    <Card sx={{ minHeight: 150, height: "100%" }}>
      <CardHeader style={{ fontWeight: "bold" }} action={date} title={title} />
      {isLoaded && (
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                $ {cashFlowData.total}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  fontSize: 18,
                  color: isBusinessResultPositive ? "#5cdb5c" : "red",
                }}
              >
                {cashFlowData.percent}%
                <span>
                  {isBusinessResultPositive && (
                    <TrendingUpIcon
                      fontSize="small"
                      style={{ color: "#5cdb5c", marginLeft: 5 }}
                    />
                  )}
                  {!isBusinessResultPositive && (
                    <TrendingDownIcon
                      fontSize="small"
                      style={{ color: "red", marginLeft: 5 }}
                    />
                  )}
                </span>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <div style={{ border: "1px solid #8080808f", borderRadius: 5 }}>
                <p style={{ margin: "0px 5px", color: "#5cdb5c" }}>INCOMING</p>
                <p style={{ margin: "0px 5px", fontWeight: "bold" }}>
                  $ {cashFlowData.incoming}
                </p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  border: "1px solid #8080808f",
                  borderRadius: 5,
                  marginLeft: 5,
                }}
              >
                <p style={{ margin: "0px 5px", color: "red" }}>OUTGOING</p>
                <p style={{ margin: "0px 5px", fontWeight: "bold" }}>
                  $ {cashFlowData.outgoing}
                </p>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      )}

      {!isLoaded && (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            minHeight: 150,
          }}
        >
          <Loader></Loader>
        </div>
      )}
    </Card>
  );
};

export default CashFlow;
