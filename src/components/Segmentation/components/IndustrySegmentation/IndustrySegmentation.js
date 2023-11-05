import { Fragment, useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { CardHeader, Tooltip } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    overflowX: "auto",
    whiteSpace: "nowrap",
  },
  card: {
    width: 300,
  },
}));

const IndustrySegmentation = ({ fetchDataFromParent }) => {
  const [industryData, setIndustryData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromParent();
      setIndustryData(data);
    };

    fetchData();
  }, [fetchDataFromParent]);

  return (
    <Fragment>
      <Typography variant="h4" style={{ fontWeight: "bold", marginLeft: 15 }}>
        Industry Segmentation
      </Typography>

      <div className={classes.container}>
        {industryData.map((industry, index) => (
          <Card
            key={index}
            className={classes.card}
            style={{
              height: 350,
              border: "1 px solid",
              margin: 15,
              background: industry.background,
            }}
          >
            <CardHeader
              title={
                <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  {industry.name}
                </span>
              }
              action={
                <Tooltip
                  title={
                    industry.responsible_person.firstName +
                    " " +
                    industry.responsible_person.lastName
                  }
                >
                  <Avatar
                    src={`images/${industry.responsible_person.logo}`}
                    className={classes.avatar}
                  >
                    {industry.responsible_person.firstName}
                  </Avatar>
                </Tooltip>
              }
            />
            <CardContent>
              <Typography variant="h5"></Typography>

              <div style={{ height: 200, overflowY: "auto" }}>
                {!!industry.clients.length && (
                  <Fragment>
                    <span style={{ fontWeight: "bold" }}>Clients:</span>
                    <List>
                      {industry.clients.map((project, projectIndex) => (
                        <ListItem key={projectIndex}>
                          {projectIndex + 1}. {project.name}
                        </ListItem>
                      ))}
                    </List>
                  </Fragment>
                )}
                {industry.clients.length === 0 && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <p style={{ color: "#979797a3", fontStyle: "italic" }}>
                      No projects.
                    </p>
                  </div>
                )}
              </div>

              <Typography>
                <span style={{ fontWeight: "bold" }}> Responsible: </span>
                {industry?.responsible_person.firstName}{" "}
                {industry?.responsible_person.lastName}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

export default IndustrySegmentation;
