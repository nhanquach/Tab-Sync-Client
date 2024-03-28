import React, { memo } from "react";

import { Button, Card, CardContent, Typography } from "@mui/material";

import { EXTENSION_PAGE } from "../utils/constants";

interface IDownLoadCardProps {
  small?: boolean;
}

const DownloadCard: React.FC<IDownLoadCardProps> = ({ small }) => {
  return (
    <Card
      sx={{
        backdropFilter: "blur(8px)",
        background: "none",
        my: small ? 0 : 1,
        mx: small ? -2 : 0,
      }}
      elevation={0}
      variant={small ? undefined : "outlined"}
    >
      <CardContent>
        <Typography variant="h5" display="flex" gap={2} mb={2}>
          {small ? "Get TabSync" : "Get TabSync for"}
        </Typography>
        <Button
          size={small ? "small" : "medium"}
          variant="outlined"
          href={EXTENSION_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontSize: small ? 12 : 14 }}
          fullWidth
        >
          <span style={{ textAlign: "center" }}>
            {small ? "Chromium / Chrome" : "Chromium based browsers"}
          </span>
        </Button>
        <Button
          size={small ? "small" : "medium"}
          variant="outlined"
          disabled
          sx={{ mt: 2, fontSize: small ? 12 : 14 }}
          fullWidth
        >
          <span style={{ textAlign: "center" }}>
            {small ? "Firefox (WIP)" : "Firefox (comming soon...)"}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default memo(DownloadCard);
