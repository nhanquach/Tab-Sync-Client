import React from "react";

import { Button, Card, CardContent, Typography } from "@mui/material";

interface IDownLoadCardProps {
  small?: boolean;
}

const DownloadCard: React.FC<IDownLoadCardProps> = ({ small }) => {
  return (
    <Card
      sx={{
        backdropFilter: "blur(8px)",
        background: "none",
        my: small ? 0 : 2,
        mx: small ? -2 : 0,
      }}
      elevation={0}
    >
      <CardContent>
        <Typography variant="h5" display="flex" gap={2} mb={2}>
          {small ? "Get TabSync" : "Get TabSync on your browser"}
        </Typography>
        <Button
          size={small ? "small" : "medium"}
          variant="outlined"
          href="https://chromewebstore.google.com/detail/tab-sync/bokjahifgpgcilgpmhmaammkjmhbmjbc"
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

export default DownloadCard;
