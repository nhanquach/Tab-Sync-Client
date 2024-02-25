import React from "react";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";

import { drawerWidth } from "../utils/dimensions";

import Logo from "./Logo";
import { User } from "@supabase/supabase-js";
import FeedbackDialog from "./FeedbackDialog";
import AccountSettings from "./AccountSettings";
import QRCodeDialog from "./QRCodeDialog";
import { isMobile } from "../utils/isMobile";

interface IHomeAppBarProps {
  user?: User;
  onSignOut: () => void;
}

const HomeAppBar: React.FC<IHomeAppBarProps> = ({ user, onSignOut }) => {
  const isMobileApp = isMobile();
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(8px)",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          paddingTop: isMobileApp ? "25px" : "0",
        }}
      >
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <Logo />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, color: theme.palette.primary.main }}
          >
            TabSync
          </Typography>
          <Box display="flex" gap={1}>
            <QRCodeDialog />
            <FeedbackDialog />
            <AccountSettings user={user} onSignOut={onSignOut} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomeAppBar;
