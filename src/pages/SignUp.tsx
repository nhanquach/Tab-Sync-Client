import React, { useState } from "react";
import { Box, Container, Grid2 } from "@mui/material";

import { ROUTES } from "../routes";
import AboutAccordion from "../components/AboutAccordion";
import DownloadCard from "../components/CardDownload";
import QRCode from "../components/QRCode";
import SignUpForm from "../components/SignUpForm";
import { isMobileApp } from "../utils/isMobile";

interface ISignUpProps {
  signUp: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<{ data: any; error: string }>;
  setView: (view: ROUTES) => void;
}

const SignUp: React.FC<ISignUpProps> = ({ signUp, setView }) => {
  const isMobile = isMobileApp();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSignUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    const { error, data } = await signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error);
    }

    if (!error && data) {
      setView(ROUTES.HOME);
    }

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
        <Grid2 size={{ md: 8, sm: 12 }}>
          <SignUpForm
            isLoading={isLoading}
            message={message}
            onSignUp={onSignUp}
            setView={setView}
          />
        </Grid2>
        {!isMobile && (
          <Grid2 size={{ md: 8, sm: 12 }} alignItems="center">
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

export default SignUp;
