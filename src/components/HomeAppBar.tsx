import React from "react";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import {
  QrCode2TwoTone,
} from "@mui/icons-material";

import { drawerWidth } from "../utils/dimensions";

import Logo from "./Logo";
import { User } from "@supabase/supabase-js";
import FeedbackDialog from "./FeedbackDialog";
import AccountSettings from "./AccountSettings";

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
            Tab Sync
          </Typography>
          <Box display="flex" gap={1}>
            <Button
              size="small"
              sx={{
                display: { xs: "flex", md: "none" },
              }}
              onClick={toggleQRCode}
            >
              <QrCode2TwoTone />
            </Button>
            <FeedbackDialog />
            <AccountSettings user={user} onSignOut={onSignOut} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomeAppBar;
