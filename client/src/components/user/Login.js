import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";
import { FormControl } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "@mui/material";

import authService from "../../services/auth.service";

const Login = (props) => {
  const { setLoginView } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      authService.login(email, password).then(
        () => {
          navigate("/home", { replace: true });
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
    <Container className="Login" noValidate>
      <FormControl>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
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
        <Button type="submit" variant="contained" onClick={handleLogin}>
          Log in
        </Button>
        <Link underline="hover" onClick={() => setLoginView("signup")}>
          Don't have an account? Sign Up
        </Link>
      </FormControl>
    </Container>
  );
};

export default Login;
