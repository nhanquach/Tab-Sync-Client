import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { VIEWS } from "../routes";
import { CloudSyncTwoTone } from "@mui/icons-material";

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
    <Container maxWidth="sm" sx={{mt: 4}}>
      <Card sx={{ backdropFilter: "blur(8px)", background: "none" }} elevation={0}>
        <CardContent>
          <Typography variant="h4" display="flex" gap={2} mb={2}>
            <CloudSyncTwoTone sx={{ fontSize: 40 }} />
            Tab Sync
          </Typography>
          <form onSubmit={onSignIn} action="none">
            <Typography variant="h5">Sign in</Typography>
            <Typography color="#696969">
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignIn;
