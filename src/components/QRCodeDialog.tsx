import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import TransitionComponent from "./TransitionComponent";
import DownloadCard from "./DownloadCard";
import QRCode from "./QRCode";
import ShareCard from "./ShareCard";
import { CloseTwoTone, QrCode2TwoTone } from "@mui/icons-material";
import { isMobile } from "../utils/isMobile";

type Props = {};

const QRCodeDialog = (props: Props) => {
  const isMobileApp = isMobile();
  const [showModal, setShowModal] = useState(false);

  const showQRCode = () => {
    setShowModal(true);
  };

  const closeQRCode = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button
        size="small"
        onClick={showQRCode}
        sx={{
          display: { xs: "flex", md: "none" },
          minWidth: { xs: "50px", md: "auto" },
        }}
      >
        <QrCode2TwoTone />
      </Button>
      <Dialog
        fullScreen
        fullWidth
        open={showModal}
        onClose={closeQRCode}
        TransitionComponent={TransitionComponent}
      >
        <DialogTitle sx={{ mt: isMobileApp ? 1 : 0 }}>QR Code</DialogTitle>
        {!isMobileApp && (
          <IconButton
            aria-label="close"
            onClick={closeQRCode}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseTwoTone />
          </IconButton>
        )}
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            mb={isMobileApp ? 2 : 4}
            mt={isMobileApp ? -4 : 0}
          >
            <QRCode text={window.location.href} />
          </Box>
          <DownloadCard />
          <ShareCard />
        </DialogContent>
        <DialogActions sx={{ mb: isMobileApp ? 2 : 0 }}>
          <Button variant="text" onClick={closeQRCode} fullWidth={isMobileApp}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QRCodeDialog;
