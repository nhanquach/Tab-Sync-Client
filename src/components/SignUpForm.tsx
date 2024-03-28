import React, { useState } from "react";

import {
  Alert,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { ROUTES } from "../routes";

import LogoWithTabSync from "./LogoWithTabSync";

interface ISignUpFormProps {
  isLoading: boolean;
  message: string;
  onSignUp: ({ email, password }: { email: string; password: string }) => void;
  setView: (view: ROUTES) => void;
}

const SignUpForm: React.FC<ISignUpFormProps> = ({
  isLoading,
  message,
  onSignUp,
  setView,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setPasswordsMatch(true);
      return;
    }

    setPasswordsMatch(false);
    onSignUp({ email, password });
  };

  return (
    <Card
      sx={{ backdropFilter: "blur(8px)", background: "none" }}
      elevation={0}
    >
      <CardContent>
        <LogoWithTabSync />
        <form onSubmit={handleSignUp} action="none">
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
          <TextField
            variant="outlined"
            fullWidth
            label="Enter you password again"
            type="password"
            name="password"
            value={repeatPassword}
            onChange={(e) => {
              if (passwordsMatch) setPasswordsMatch(false);
              setRepeatPassword(e.target.value);
            }}
            required
            margin="normal"
          />
          {passwordsMatch && (
            <Alert severity="error">Passwords do not match</Alert>
          )}
          {!!message && <Alert severity="error">{message}</Alert>}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ my: 2, color: "white" }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign up"}
          </Button>
          <Button fullWidth onClick={() => setView(ROUTES.SIGN_IN)}>
            Already have an account? Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
