import React, { useState } from "react";
import { CloseTwoTone, QrCode2TwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

import TransitionComponent from "./TransitionComponent";
import DownloadCard from "./CardDownload";
import QRCode from "./QRCode";
import CardShare from "./CardShare";

import { isMobileApp } from "../utils/isMobile";

type Props = {};

const QRCodeDialog: React.FC<Props> = () => {
  const isMobile = isMobileApp();
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
        <DialogTitle sx={{ mt: isMobile ? 1 : 0 }}>QR Code</DialogTitle>
        {!isMobile && (
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
            mb={isMobile ? 2 : 4}
            mt={isMobile ? -4 : 0}
          >
            <QRCode text={window.location.href} />
          </Box>
          <DownloadCard />
          <CardShare />
        </DialogContent>
        <DialogActions sx={{ mb: isMobile ? 2 : 0 }}>
          <Button variant="text" onClick={closeQRCode} fullWidth={isMobile}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QRCodeDialog;
