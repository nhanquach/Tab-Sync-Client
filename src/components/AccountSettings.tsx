import React, { useMemo, useState } from "react";

import { User } from "@supabase/supabase-js";
import {
  KeyTwoTone,
  ExitToAppTwoTone,
  CloseTwoTone,
  DeleteForeverTwoTone,
} from "@mui/icons-material";
import {
  Tooltip,
  IconButton,
  Avatar,
  CircularProgress,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";

import ChangePasswordForm from "./ChangePasswordForm";
import TransitionComponent from "./TransitionComponent";
import { isMobileApp } from "../utils/isMobile";
import { signOut } from "../clients/supabaseClient";
import { AccountDeleteConfirmDialog } from "./AccountDeleteConfirmDialog";

interface IAccountSettingsProps {
  user?: User;
}

const AccountSettings: React.FC<IAccountSettingsProps> = ({ user }) => {
  const theme = useTheme();
  const isMobile = isMobileApp();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(
    window.location.pathname === "/forgot-password"
  );
  const [isLogingOut, setIsLogingOut] = useState(false);
  const [accountSettingsAchorEl, setAccountSettingsAnchorEl] =
    useState<null | HTMLElement>(null);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);

  const openProfile = Boolean(accountSettingsAchorEl);
  const handleOpenAccountSettings = (event: React.MouseEvent<HTMLElement>) => {
    setAccountSettingsAnchorEl(event.currentTarget);
  };
  const handleCloseAccountSettings = () => {
    setAccountSettingsAnchorEl(null);
  };

  const firstChar = useMemo(() => {
    return user?.email?.charAt(0);
  }, [user]);

  const handleOpenChangePasswordDialog = () => {
    setOpen(true);
  };

  const handleCloseChangePasswordDialog = () => {
    setOpen(false);

    if (window.location.pathname === "/forgot-password") {
      window.location.replace("/");
    }
  };

  const handleLogOut = async () => {
    try {
      setIsLogingOut(true);

      await signOut();

      setTimeout(() => {
        window.location.replace("/");
      }, 500);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLogingOut(false);
    }
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton onClick={handleOpenAccountSettings}>
          <Avatar
            variant={openProfile ? "square" : "circular"}
            sx={{
              bgcolor: theme.palette.primary.main,
            }}
          >
            {isLogingOut ? (
              <CircularProgress sx={{ color: "white" }} size={20} />
            ) : (
              firstChar
            )}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={accountSettingsAchorEl}
        id="account-menu"
        open={openProfile}
        onClick={handleCloseAccountSettings}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleOpenChangePasswordDialog}>
          {!isLogingOut && <KeyTwoTone />}
          <Typography
            ml={2}
            sx={{
              display: { xs: "none", md: "inline" },
            }}
          >
            Change password
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ExitToAppTwoTone />
          <Typography
            ml={2}
            sx={{
              display: { xs: "none", md: "inline" },
            }}
          >
            Sign out
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => setConfirmDeleteAccount(true)}>
          <DeleteForeverTwoTone />
          <Typography
            ml={2}
            sx={{
              display: { xs: "none", md: "inline" },
            }}
          >
            Delete account
          </Typography>
        </MenuItem>
      </Menu>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={open}
        onClose={handleCloseChangePasswordDialog}
        TransitionComponent={TransitionComponent}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            paddingTop: isMobile ? "40px" : "1",
          }}
        >
          <KeyTwoTone sx={{ color: theme.palette.primary.main, mr: 1 }} />
          Change password
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseChangePasswordDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: isMobile ? "35px" : "8px",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseTwoTone />
        </IconButton>

        <ChangePasswordForm
          handleCloseChangePasswordDialog={handleCloseChangePasswordDialog}
        />
      </Dialog>

      <AccountDeleteConfirmDialog
        open={confirmDeleteAccount}
        onClose={() => setConfirmDeleteAccount(false)}
      />
    </>
  );
};

export default AccountSettings;
