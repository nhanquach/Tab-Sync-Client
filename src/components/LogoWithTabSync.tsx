import React from "react";

import { Typography } from "@mui/material";

import Logo from "./Logo";

export type FontSizeVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "button"
  | "overline";

const LogoWithTabSync: React.FC<{ fontSizeVariant?: FontSizeVariant }> = ({
  fontSizeVariant = "h4",
}) => {
  return (
    <Typography
      variant={fontSizeVariant}
      display="flex"
      gap={2}
      mb={2}
      alignItems="center"
    >
      <Logo />
      TabSync
    </Typography>
  );
};

export default LogoWithTabSync;
