import React from "react";

import { Typography } from "@mui/material";

import Logo from "./Logo";

const TabSyncLogo = () => {
  return (
    <Typography variant="h4" display="flex" gap={2} mb={2} alignItems="center">
      <Logo />
      TabSync
    </Typography>
  );
};

export default TabSyncLogo;
