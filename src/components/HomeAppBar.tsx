import React from "react";

import { Box, AppBar, Toolbar } from "@mui/material";
import { User } from "@supabase/supabase-js";

import { drawerWidth } from "../utils/dimensions";
import { isMobileApp } from "../utils/isMobile";

import FeedbackDialog from "./FeedbackDialog";
import AccountSettings from "./AccountSettings";
import QRCodeDialog from "./QRCodeDialog";
import LogoWithTabSync from "./LogoWithTabSync";

interface IHomeAppBarProps {
  user?: User;
}

const HomeAppBar: React.FC<IHomeAppBarProps> = ({ user }) => {
  const isMobile = isMobileApp();

  return (
    <Box sx={{ flexGrow: 1, alignItems: "center" }}>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(8px)",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          paddingTop: isMobile ? "25px" : "0",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, marginBottom: "-15px" }}>
            <LogoWithTabSync fontSizeVariant="h5" />
          </Box>
          <Box display="flex" gap={1}>
            <QRCodeDialog />
            <FeedbackDialog />
            <AccountSettings user={user} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomeAppBar;
