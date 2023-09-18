import React from "react";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  QrCode2TwoTone,
  ExitToAppTwoTone,
  FeedbackTwoTone,
} from "@mui/icons-material";

import { drawerWidth } from "../utils/dimensions";

import Logo from "./Logo";
import { User } from "@supabase/supabase-js";
import Feedback from "./Feedback";
import { sendFeedback } from "../clients/supabaseClient";

interface IHomeAppBarProps {
  user?: User;
  toggleQRCode: () => void;
  onSignOut: () => void;
}

const HomeAppBar: React.FC<IHomeAppBarProps> = ({
  user,
  toggleQRCode,
  onSignOut,
}) => {
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
    handleCloseFeedback();
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 10 }}>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(8px)",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <Logo />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, color: theme.palette.primary.main }}
          >
            Tab Sync
          </Typography>
          <Box display="flex" gap={1}>
            <Button onClick={toggleQRCode}>
              <QrCode2TwoTone />
            </Button>
            <Button onClick={handleOpenFeedback}>
              <FeedbackTwoTone />
              <Typography
                sx={{
                  display: { xs: "none", md: "inline" },
                  ml: { xs: 0, sm: 1 },
                }}
              >
                Feedback
              </Typography>
            </Button>
            {user && (
              <Button variant="outlined" onClick={onSignOut}>
                <ExitToAppTwoTone />
                <Typography
                  sx={{
                    display: { xs: "none", md: "inline" },
                    ml: { xs: 0, sm: 1 },
                  }}
                >
                  Sign out
                </Typography>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleCloseFeedback}>
        <DialogTitle sx={{ display: "flex" }}>
          <FeedbackTwoTone sx={{ color: theme.palette.primary.main, mr: 1 }} />
          Feedback
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Feedback sendFeedback={onSendFeedback} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFeedback}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomeAppBar;
