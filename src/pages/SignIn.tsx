import React, { useState } from "react";
import { AlertColor, Box, Container, Grid2 } from "@mui/material";

import { ROUTES } from "../routes";
import DownloadCard from "../components/CardDownload";
import AboutAccordion from "../components/AboutAccordion";
import QRCode from "../components/QRCode";
import SignInForm from "../components/SignInForm";
import { AuthError } from "@supabase/supabase-js";
import { isMobileApp } from "../utils/isMobile";

interface ISignInProps {
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<{ error: string }>;
  onResetPassword: ({ email }: { email: string }) => Promise<
    | {
        data: {};
        error: null;
      }
    | {
        data: null;
        error: AuthError;
      }
  >;
  setView: (view: ROUTES) => void;
}

const SignIn: React.FC<ISignInProps> = ({
  signIn,
  setView,
  onResetPassword,
}) => {
  const isMobile = isMobileApp();
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState<{ type: AlertColor; text: string }>({
    type: "error",
    text: "",
  });

  const onSignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    const { error } = await signIn({
      email,
      password,
    });

    if (error) {
      setMessage({ type: "error", text: error });
    }

    setIsLoading(false);
  };

  const resetPassword = async ({ email }: { email: string }) => {
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email" });
      return;
    }

    setMessage({ type: message.type, text: "" });
    setIsLoading(true);

    await onResetPassword({ email });
    setMessage({
      type: "info",
      text: "Check your email for a link to reset your password",
    });
    setIsLoading(false);
  };

  return (
    <Container maxWidth="xl">
      <Grid2
        container
        spacing={4}
        justifyContent={{ xs: "center", md: "space-between" }}
        alignItems="center"
      >
        <Grid2 size={{md: 8, sm: 12}}>
          <SignInForm
            message={message}
            isLoading={isLoading}
            onSignIn={onSignIn}
            setView={setView}
            onResetPassword={resetPassword}
          />
        </Grid2>
        {!isMobile && (
          <Grid2 size={{md: 4, sm: 12}} alignItems="center">
            <Box display="flex" flexDirection={"column"} alignItems="center">
              <DownloadCard />
              <QRCode width={200} height={200} text="TabSync on your phone" />
            </Box>
          </Grid2>
        )}
      </Grid2>
      <AboutAccordion />
    </Container>
  );
};

export default SignIn;
