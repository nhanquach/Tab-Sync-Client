import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { User } from "@supabase/supabase-js";

import { getUser, signUp, signIn } from "./clients";
import { signOut } from "./clients/supabaseClient";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { VIEWS } from "./routes";
import Home from "./pages/Home";
import QRCode from "./components/QRCode";
import HomeAppBar from "./components/HomeAppBar";
import LiveBackground from "./components/LiveBackground";
import { drawerWidth } from "./utils/dimensions";

function App() {
  const [showModal, setShowModal] = useState(false);

  const [view, setView] = useState<VIEWS>(VIEWS.SIGN_IN);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser().then((userData) => {
      if (userData) {
        setView(VIEWS.HOME);
        setUser(userData);
      }
    });
  }, []);

  const onSignUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await signUp({
      email,
      password,
    });

    return {
      data,
      error: error?.message || "",
    };
  };

  const onSignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ error: string }> => {
    // TODO: encrypt password first!
    const { error, data } = await signIn({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    setUser(data.user);
    setView(VIEWS.HOME);

    return {
      error: "",
    };
  };

  const onSignOut = async () => {
    signOut();
    setView(VIEWS.SIGN_IN);
  };

  const showQRCode = () => {
    setShowModal(!showModal);
  };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#8f94fb",
            dark: "#4e54c8",
          },
          secondary: {
            main: "#696969",
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {view === VIEWS.HOME && (
          <HomeAppBar
            user={user}
            onSignOut={onSignOut}
            toggleQRCode={showQRCode}
          />
        )}
        <div className="area">
          {view !== VIEWS.HOME && <LiveBackground />}
          <Container
            sx={{
              flexGrow: 1,
              p: 3,
              mt: 6,
              width:
                view === VIEWS.HOME
                  ? { sm: `calc(100% - ${drawerWidth}px)` }
                  : "100%",
              pl: view === VIEWS.HOME ? { md: `${drawerWidth}px` } : {},
            }}
            component="main"
          >
            {view === VIEWS.SIGN_IN && (
              <SignIn signIn={onSignIn} setView={setView} />
            )}

            {view === VIEWS.SIGN_UP && (
              <SignUp signUp={onSignUp} setView={setView} />
            )}

            {view === VIEWS.HOME && (
              <Box pb={8}>
                <Home />
              </Box>
            )}
          </Container>
        </div>
        <Dialog keepMounted open={showModal} onClose={showQRCode}>
          <DialogTitle bgcolor={theme.palette.primary.main}>
            <Typography variant="h6" textAlign="center">
              {window.location.href}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box display="flex">
              <QRCode />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={showQRCode}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default App;
