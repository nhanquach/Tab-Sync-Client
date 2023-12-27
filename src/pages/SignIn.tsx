import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { VIEWS } from "../routes";
import Logo from "../components/Logo";
import DownloadCard from "../components/DownloadCard";
import AboutCard from "../components/AboutCard";
import QRCode from "../components/QRCode";

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
    <Container>
      <Card
        sx={{ backdropFilter: "blur(8px)", background: "none" }}
        elevation={0}
      >
        <CardContent>
          <Typography variant="h4" display="flex" gap={2} mb={2}>
            <Logo />
            Tab Sync
          </Typography>
          <form onSubmit={onSignIn} action="none">
            <Typography variant="h5">Sign in</Typography>
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
      <Grid2 container gap={2} alignContent="center" justifyContent="center">
        <DownloadCard />
        <Box display="flex" flexDirection="column" alignItems="center">
          <QRCode />
          <span>Open website on phone</span>
        </Box>
      </Grid2>
      <AboutCard />
    </Container>
  );
};

export default SignIn;
