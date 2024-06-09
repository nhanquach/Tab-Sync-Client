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
        display="flex"
        gap={4}
        width="100%"
        flexWrap="wrap"
        justifyContent="center"
        alignContent="center"
        minHeight="50vh"
        mb={12}
        color={theme.palette.grey[500]}
      >
        <TabTwoTone sx={{ fontSize: 100 }} />
        <Box
          sx={{
            textAlign: "left",
            [theme.breakpoints.down("sm")]: {
              textAlign: "center",
            },
          }}
        >
          <Typography variant="h4">No tab found</Typography>
          <Typography variant="body1">
            Tabs can be searched by name or url
          </Typography>
          <Typography variant="body1">
            Try another search term, add more devices to the list
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignContent="center"
      gap={4}
      width="100%"
      sx={{
        [theme.breakpoints.up("md")]: {
          py: 32,
        },
        py: 16,
      }}
    >
      <PhonelinkTwoTone sx={{ fontSize: 100 }} />
      <Box
        sx={{
          textAlign: "left",
          [theme.breakpoints.down("sm")]: {
            textAlign: "center",
          },
        }}
        padding={2}
      >
        <Typography variant="h4">Open a New Tab to begin</Typography>
        <Typography variant="subtitle1">
          Closed tabs will be saved to Archived Tabs.
        </Typography>
      </Box>
    </Box>
  );
};

export default NoData;
