import React, { useState } from "react";

import {
  AlertColor,
  Card,
  CardContent,
  Typography,
  TextField,
  Alert,
  Button,
} from "@mui/material";

import { ROUTES } from "../routes";

import LogoWithTabSync from "./LogoWithTabSync";

interface ISignInFormProps {
  isLoading: boolean;
  message: { type: AlertColor; text: string };
  onSignIn: ({ email, password }: { email: string; password: string }) => void;
  setView: (view: ROUTES) => void;
  onResetPassword: ({ email }: { email: string }) => void;
}

const SignInForm: React.FC<ISignInFormProps> = ({
  isLoading,
  message,
  onSignIn,
  setView,
  onResetPassword,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn({ email, password });
  };

  const handleResetPassword = () => {
    onResetPassword({ email });
  };

  return (
    <Card
      sx={{ backdropFilter: "blur(8px)", background: "none" }}
      elevation={0}
    >
      <CardContent>
        <LogoWithTabSync />
        <form onSubmit={handleSignIn} action="none">
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
          <Button onClick={handleResetPassword} variant="text">
            Forgot password?
          </Button>

          {!!message.text && (
            <Alert severity={message.type}>{message.text}</Alert>
          )}
          <Button
            variant={isLoading ? "outlined" : "contained"}
            type="submit"
            fullWidth
            disabled={isLoading}
            sx={{ my: 2, color: "white" }}
          >
            {isLoading ? "Loading..." : "Sign in"}
          </Button>
          <Button fullWidth onClick={() => setView(ROUTES.SIGN_UP)}>
            Create a new account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
