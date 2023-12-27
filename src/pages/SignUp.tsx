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
import Grid2 from "@mui/material/Unstable_Grid2";

import { VIEWS } from "../routes";
import Logo from "../components/Logo";
import AboutCard from "../components/AboutCard";
import DownloadCard from "../components/DownloadCard";
import QRCode from "../components/QRCode";

interface ISignUpProps {
  signUp: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<{ data: any; error: string }>;
  setView: (view: VIEWS) => void;
}

const SignUp: React.FC<ISignUpProps> = ({ signUp, setView }) => {
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
          <form onSubmit={onSignUp} action="none">
            <Typography variant="h5">Sign up for a new account</Typography>
            <Typography color="#696969">
              <b>Hi, thank you for joining us.</b>
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
            <Button fullWidth onClick={() => setView(VIEWS.SIGN_IN)}>
              Already have an account? Sign in
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

export default SignUp;
