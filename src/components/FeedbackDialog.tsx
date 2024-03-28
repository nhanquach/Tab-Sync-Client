import React from "react";

import { CloseTwoTone, FeedbackTwoTone } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { sendFeedback } from "../clients/supabaseClient";
import FeedbackForm from "./FeedbackForm";
import TransitionComponent from "./TransitionComponent";
import { isMobileApp } from "../utils/isMobile";

const FeedbackDialog = () => {
  const isMobile = isMobileApp();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenFeedback = () => {
    setOpen(true);
  };

  const handleCloseFeedback = () => {
    setOpen(false);
  };

  const onSendFeedback = async (title: string, description: string) => {
    await sendFeedback(title, description);
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        handleCloseFeedback();
        resolve();
      }, 1000)
    );
  };

  return (
    <>
      <Button
        onClick={handleOpenFeedback}
        size="small"
        sx={{
          minWidth: { xs: "50px", md: "auto" },
        }}
      >
        <FeedbackTwoTone />
        <Typography
          sx={{
            display: { xs: "none", md: "inline" },
            ml: 1,
          }}
        >
          Feedback & Support
        </Typography>
      </Button>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseFeedback}
        TransitionComponent={TransitionComponent}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            mt: isMobile ? 2 : 0,
          }}
        >
          <FeedbackTwoTone sx={{ color: theme.palette.primary.main, mr: 1 }} />
          Your feedback fuels our fire 🔥
        </DialogTitle>
        {!isMobile && (
          <IconButton
            aria-label="close"
            onClick={handleCloseFeedback}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseTwoTone />
          </IconButton>
        )}
        <DialogContent>
          <DialogContentText>
            <FeedbackForm sendFeedback={onSendFeedback} />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mb: isMobile ? 4 : 0 }}>
          <Button fullWidth={isMobile} onClick={handleCloseFeedback}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FeedbackDialog;
