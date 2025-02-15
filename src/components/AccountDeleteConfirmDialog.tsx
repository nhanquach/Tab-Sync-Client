import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import { signOut, deleteAccount } from "../clients/supabaseClient";

interface IAccountDeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AccountDeleteConfirmDialog: React.FC<
  IAccountDeleteConfirmDialogProps
> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await deleteAccount();
      await signOut();
      onClose();
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete account</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete your account?
        </Typography>
        <Typography variant="body2">
          This action is irreversible and all data will be permanently deleted
          within 24 hours.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleDeleteAccount} color="error" disabled={loading}>
          {loading && <CircularProgress size={16} color="error" sx={{ mr: 1 }} />}
          Delete account
        </Button>
      </DialogActions>
    </Dialog>
  );
};
