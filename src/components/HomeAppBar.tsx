import React from "react";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { QrCode2TwoTone, ExitToAppTwoTone } from "@mui/icons-material";

import { drawerWidth } from "../utils/dimensions";

import Logo from "./Logo";
import { User } from "@supabase/supabase-js";

interface IHomeAppBarProps {
  user?: User;
  toggleQRCode: () => void;
  onSignOut: () => void;
}

const HomeAppBar: React.FC<IHomeAppBarProps> = ({
  user,
  toggleQRCode,
  onSignOut,
}) => {
  return (
    <Box sx={{ flexGrow: 1, mb: 10 }}>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(8px)",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <Logo />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Tab Sync
          </Typography>
          <Button onClick={toggleQRCode}>
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
  );
};

export default HomeAppBar;
