import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
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
import {
  CloudSyncTwoTone,
  ExitToAppTwoTone,
  QrCode2TwoTone,
} from "@mui/icons-material";
import QRCode from "./components/QRCode";

const drawerWidth = 240;

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
          <Box sx={{ flexGrow: 1, mb: 10 }}>
            <AppBar
              position="fixed"
              color="transparent"
              elevation={0}
              sx={{
                backdropFilter: "blur(8px)",
                width:
                  view === VIEWS.HOME
                    ? { md: `calc(100% - ${drawerWidth}px)` }
                    : {},
                ml: view === VIEWS.HOME ? { md: `${drawerWidth}px` } : {},
              }}
            >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="logo"
                >
                  <CloudSyncTwoTone sx={{ fontSize: 40 }} />
                </IconButton>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                  Tab Sync
                </Typography>
                <Button onClick={showQRCode}>
                  <QrCode2TwoTone />
                </Button>
                {user && (
                  <Button variant="outlined" onClick={onSignOut} sx={{ ml: 1 }}>
                    <ExitToAppTwoTone />
                    <Typography
                      sx={{
                        display: { xs: "none", md: "inline" },
                        ml: { xs: 0, sm: 2 },
                      }}
                    >
                      Sign out
                    </Typography>
                  </Button>
                )}
              </Toolbar>
            </AppBar>
          </Box>
        )}
        <div className="area">
          {view !== VIEWS.HOME && (
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          )}
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

            <Dialog keepMounted open={showModal} onClose={showQRCode}>
              <DialogTitle bgcolor={theme.palette.primary.main}>
                <Typography variant="h6" textAlign="center">
                  {window.location.href}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <QRCode />
              </DialogContent>
              <DialogActions>
                <Button onClick={showQRCode}>Close</Button>
              </DialogActions>
            </Dialog>
          </Container>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
