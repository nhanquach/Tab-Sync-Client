import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { VIEWS } from "../routes";

interface ISignInProps {
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<{ error: string }>;
  setView: (view: VIEWS) => void;
}

const SignIn: React.FC<ISignInProps> = ({ signIn, setView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await signIn({
      email,
      password,
    });

    if (error) {
      setMessage(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSignIn} action="none">
        <Typography variant="h5">Sign in</Typography>
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
          Sign in
        </Button>
        <Button fullWidth onClick={() => setView(VIEWS.SIGN_UP)}>
          Create a new account
        </Button>
      </form>
    </Container>
  );
};

export default SignIn;
