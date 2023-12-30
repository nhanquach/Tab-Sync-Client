import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { changePassword } from "../clients";

interface IChangePasswordFormProps {
  handleCloseChangePasswordDialog: () => void;
}

const ChangePasswordForm: React.FC<IChangePasswordFormProps> = ({
  handleCloseChangePasswordDialog,
}) => {
  const [newPassword, setNewPassword] = React.useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value as string);
  };
  const handleRepeatedNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatedNewPassword(event.target.value as string);
  };

  const handleChangePassword = async () => {
    if (!newPassword || !repeatedNewPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== repeatedNewPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    const result = await changePassword({ newPassword });

    if (result?.error) {
      setError(result.error?.message as string);
      setIsLoading(false);
      return;
    }

    setError("");
    setMessage("Your password has been changed.");
    setIsLoading(false);

    setTimeout(() => {
      handleCloseChangePasswordDialog();
    }, 1000);
  };

  return (
    <>
      <DialogContent
        sx={{
          backdropFilter: "blur(8px)",
          backgroundColor: "transparent",
        }}
      >
        <Typography variant="h5">Change your password</Typography>
        <Box display="flex" alignItems="center">
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              sx={{ mt: 1 }}
              type="password"
              label="New password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <TextField
              sx={{ mt: 3 }}
              type="password"
              label="Repeat the new password"
              value={repeatedNewPassword}
              onChange={handleRepeatedNewPasswordChange}
            />
            {error && (
              <Alert severity="error" sx={{ my: 2 }}>
                <Typography>{error}</Typography>
              </Alert>
            )}

            {message && (
              <Alert sx={{ my: 2 }}>
                <Typography>{message}</Typography>
              </Alert>
            )}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseChangePasswordDialog}>Close</Button>

        <Button
          variant="contained"
          onClick={handleChangePassword}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={20} /> : "Change password"}
        </Button>
      </DialogActions>
    </>
  );
};

export default ChangePasswordForm;
