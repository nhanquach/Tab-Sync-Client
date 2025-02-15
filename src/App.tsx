import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { User } from "@supabase/supabase-js";

import { getUser, signUp, signIn, resetPassword } from "./clients";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { ROUTES } from "./routes";
import Home from "./pages/Home";
import LiveBackground from "./components/LiveBackground";
import { drawerWidth } from "./utils/dimensions";

function App() {
  const [view, setView] = useState<ROUTES>(ROUTES.SIGN_IN);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser().then((userData) => {
      if (userData) {
        setView(ROUTES.HOME);
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
    const { error, data } = await signIn({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    setUser(data.user);
    setView(ROUTES.HOME);

    return {
      error: "",
    };
  };

  const onResetPassword = async ({ email }: { email: string }) => {
    return await resetPassword({ email });
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
        <div className="area">
          {view !== ROUTES.HOME && <LiveBackground fullHeight />}
          <Container
            sx={{
              flexGrow: 1,
              p: 3,
              mt: 6,
              width:
                view === ROUTES.HOME
                  ? { sm: `calc(100% - ${drawerWidth}px)` }
                  : "100%",
              pl: view === ROUTES.HOME ? { md: `${drawerWidth}px` } : {},
            }}
            component="main"
          >
            {view === ROUTES.SIGN_IN && (
              <SignIn
                signIn={onSignIn}
                setView={setView}
                onResetPassword={onResetPassword}
              />
            )}

            {view === ROUTES.SIGN_UP && (
              <SignUp signUp={onSignUp} setView={setView} />
            )}

            {view === ROUTES.HOME && (
              <Box pb={8}>
                <Home user={user} />
              </Box>
            )}
          </Container>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
