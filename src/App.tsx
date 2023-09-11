import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
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
import { CloudSyncTwoTone, ExitToAppTwoTone } from "@mui/icons-material";

function App() {
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

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, mb: 10 }}>
        <AppBar
          position="fixed"
          color="transparent"
          elevation={1}
          sx={{
            backdropFilter: "blur(8px)",
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
            {user && (
              <Button variant="outlined" onClick={onSignOut}>
                <ExitToAppTwoTone />
                <Typography
                  sx={{
                    display: { xs: "none", sm: "inline" },
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
      <Container sx={{ padding: "5px" }}>
        {view === VIEWS.SIGN_IN && (
          <SignIn signIn={onSignIn} setView={setView} />
        )}

        {view === VIEWS.SIGN_UP && (
          <SignUp signUp={onSignUp} setView={setView} />
        )}

        {view === VIEWS.HOME && <Home />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
