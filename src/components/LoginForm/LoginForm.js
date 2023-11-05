import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import classes from "./LoginForm.module.css";
import logo from "../../assets/crm-logo.png";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    const requiredFields = ["username", "password"];
    let hasError = false;
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        hasError = true;
      } else {
        newErrors[field] = false;
      }
    });

    setErrors(newErrors);

    try {
      if (!hasError) {
        const response = await axios.get("http://localhost:3000/users", {
          params: {
            formData,
          },
        });

        const users = response.data;
        const user = users.find(
          (item) =>
            item.username === formData.username &&
            item.password === formData.password
        );

        if (user) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(userActions.setUser(user));
          dispatch(userActions.setIsUserLoggedIn(true));
          navigate("/", { redirect: true });
        } else {
          setError("Invalid credentials");
          navigate("/login");
        }
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} sm={4} className={classes.login}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              fullWidth
              value={formData.username}
              onChange={(e) => handleChange(e)}
              margin="normal"
              required
              name="username"
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              margin="normal"
              required
              name="password"
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
          </form>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={8} className={classes.login}>
          <img src={logo} alt="CRM App" className={classes.logo} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginForm;
