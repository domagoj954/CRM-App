import { Box, Tabs, Tab } from "@mui/material";
import * as React from "react";
import TicketsList from "./components/TicketsList/TicketsList";
import CustomTabPanel from "../HelpDesk/components/CustomTabPanel/CustomTabPanel";
import TicketsBoard from "./components/TicketsBoard/TicketsBoard";

const HelpDesk = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab style={{ padding: "12px 16px" }} label="New tickets" />
          <Tab style={{ padding: "12px 16px" }} label="Board" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TicketsList></TicketsList>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TicketsBoard />
      </CustomTabPanel>
    </Box>
  );
};

export default HelpDesk;
