import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

import { VIEWS } from "../routes";

interface ISignInProps {
  signUp: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<{ data: any; error: string }>;
  setView: (view: VIEWS) => void;
}

const SignUp: React.FC<ISignInProps> = ({ signUp, setView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error, data } = await signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error);
    }

    if (!error && data) {
      setView(VIEWS.SETTINGS);
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSignUp} action="none">
        <Typography variant="h5">Sign up for a new account</Typography>
        <Typography color="#696969">
          <b>We do not sell your data.</b>
          <br />
          We only use your account in order to save your tabs.
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          label="Email"
          margin="normal"
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />
        {!!message && <p>{message}</p>}
        <Button variant="contained" type="submit" fullWidth sx={{ my: 2 }}>
          Sign up
        </Button>
        <Button
          fullWidth
          onClick={() => setView(VIEWS.SIGN_IN)}
        >
          Already have an account? Sign in
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
