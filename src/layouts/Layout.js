import React, { Fragment, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Home from "../components/Home/Home";
import Interactions from "../components/Interactions/Interactions";
import Board from "../components/Board/Board";
import OpportunitiesGrid from "../components/Opportunities/opportunities-grid/OpportunitiesGrid";
import ClientsGrid from "../components/Clients/components/clients-grid/ClientsGrid";
import LoginForm from "../components/LoginForm/LoginForm";
import { Avatar, Button, Card, CardHeader, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import classes from "./Layout.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpDesk from "../components/HelpDesk/HelpDesk";
import Documents from "../components/Documents/Documents";
import Reports from "../components/Reports/Reports";
import Segmentation from "../components/Segmentation/Segmentation";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(userActions.setUser(null));
    dispatch(userActions.setIsUserLoggedIn(false));
    localStorage.clear("isLoggedIn");
    localStorage.clear("user");
    setOpen(false);
    navigate("/login");
  };
  const isAdmin = user?.role === "admin";

  const title = (
    <div>
      <p style={{ margin: 0, fontWeight: "bold" }}>
        {user?.firstName} {user?.lastName}
      </p>
      {isAdmin && <p style={{ margin: 0 }}>Admin</p>}
    </div>
  );

  return (
    <Fragment>
      (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {user && (
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <Grid container>
                <Grid xs={3} item>
                  <div className={classes.headerTitle}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography
                      variant="h6"
                      component="div"
                      className={classes.crm}
                    >
                      CRM
                    </Typography>
                  </div>
                </Grid>

                <Grid item xs={9}>
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                    }}
                  >
                    <Card
                      sx={{
                        maxWidth: 345,
                        background: "transparent",
                        color: "white",
                        boxShadow: "none",
                      }}
                    >
                      <CardHeader
                        style={{ padding: 0 }}
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            src={`/images/${user.logo}`}
                          ></Avatar>
                        }
                        action={
                          <Button
                            style={{ marginTop: 3 }}
                            color="inherit"
                            onClick={handleLogout}
                          >
                            <LogoutIcon />
                          </Button>
                        }
                        title={title}
                      />
                    </Card>
                  </div>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        )}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {SidebarData.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board" element={<Board />} />
            <Route path="/clients" element={<ClientsGrid />} />
            <Route path="/interactions" element={<Interactions />} />
            <Route path="/opportunities" element={<OpportunitiesGrid />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/help-desk" element={<HelpDesk />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/marketing" element={<Segmentation />} />
          </Routes>
        </Main>
      </Box>
      )
    </Fragment>
  );
}
