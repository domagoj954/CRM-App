import { Box, Grid } from "@mui/material";
import IndustrySegmentation from "./components/IndustrySegmentation/IndustrySegmentation";

const Segmentation = () => {
  const fetchData = async () => {
    const _industries = await fetchIndustries();
    const _clients = await fetchClients();
    const _users = await fetchUsers();

    _industries.map((industry) => {
      industry.clients = _clients.filter((i) => i.industry === industry.name);
      industry.responsible_person = _users.find(
        (i) => i.id === industry.user_id
      );

      return industry;
    });
    return _industries;
  };

  const fetchIndustries = async () => {
    try {
      const response = await fetch("http://localhost:3001/industry");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching industries data:", error);
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
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <IndustrySegmentation fetchDataFromParent={fetchData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Segmentation;
