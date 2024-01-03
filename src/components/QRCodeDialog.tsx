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

type Props = {};

const QRCodeDialog = (props: Props) => {
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
        <DialogTitle>QR Code</DialogTitle>
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
        <DialogContent>
          <Box display="flex" justifyContent="center" mb={4}>
            <QRCode text={window.location.href} />
          </Box>
          <DownloadCard />
          <ShareCard />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={showQRCode}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QRCodeDialog;
