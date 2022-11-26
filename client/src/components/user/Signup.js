import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";
import { FormControl } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "@mui/material";

import authService from "../../services/auth.service";

const Signup = (props) => {
  const { setLoggedIn, setLoginView } = props;
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    try {
      authService
        .signup(username, firstName, lastName, gender, email, password)
        .then(
          (res) => {
            console.log("Sign up successfully", res);

            setLoggedIn(true);
            navigate("/")
            window.location.reload()
          },
          (err) => {
            console.log(err);
          }
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="Signup" noValidate>
      <FormControl>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <TextField
          type="text"
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="filled"
        />
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              type="text"
              label="first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="filled"
            />
          </Grid>
          <Grid item>
            <TextField
              type="text"
              label="last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="filled"
            />
          </Grid>
        </Grid>
        <FormControl>
          <InputLabel>Choose your Gender</InputLabel>
          <Select
            className="select"
            label="gender"
            defaultValue={""}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value={1}>Male</MenuItem>
            <MenuItem value={2}>Female</MenuItem>
            <MenuItem value={3}>other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="email"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="filled"
        />
        <TextField
          type="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
        />
        <Button type="submit" variant="contained" onClick={handleSignup}>
          Sign up
        </Button>
        <Link underline="hover" onClick={() => setLoginView("login")}>
          Already have an account? Log in
        </Link>
      </FormControl>
    </Container>
  );
};

export default Signup;
