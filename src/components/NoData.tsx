import React from "react";

import { PhonelinkTwoTone, TabTwoTone } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";

interface INoDataProps {
  isEmptySearch: boolean;
}

const NoData: React.FC<INoDataProps> = ({ isEmptySearch }) => {
  const theme = useTheme();

  if (isEmptySearch) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          minHeight: "50vh",
          mb: 12,
          color: theme.palette.grey[500],
        }}
      >
        <TabTwoTone sx={{ fontSize: 100 }} />
        <Typography variant="h4">No tab found</Typography>
        <Typography variant="body1">
          Tabs can be searched by name or url
        </Typography>
        <Typography variant="body1">
          Try another search term, add more devices to the list
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "50vh",
        mb: 12,
        color: theme.palette.grey[500],
      }}
    >
      <PhonelinkTwoTone sx={{ fontSize: 100 }} />
      <Typography variant="h2">Your tabs will be shown here</Typography>
      <Typography variant="h5">
        continue browsing from your computers or phones
      </Typography>
    </Box>
  );
};

export default NoData;
