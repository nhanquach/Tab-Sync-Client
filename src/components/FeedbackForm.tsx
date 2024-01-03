import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  Typography,
  useTheme,
} from "@mui/material";
import { HandshakeOutlined } from "@mui/icons-material";

interface IFeedbackProps {
  sendFeedback: (type: string, description: string) => void;
}

const FeedbackForm: React.FC<IFeedbackProps> = ({ sendFeedback }) => {
  const theme = useTheme();

  const [type, setType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSendFeedback = async () => {
    setIsLoading(true);
    setError("");

    if (type && description) {
      setMessage("Your feedback has been sent. Thank you!");
      await sendFeedback(type, description);

      setType("");
      setDescription("");
    } else {
      setError("Oops, are you forgetting something?");
      setMessage("");
    }

    setIsLoading(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <HandshakeOutlined
          sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 30 }}
        />
        <Typography variant="h4">Hi there 🙌🏼</Typography>
      </Box>
      <Typography>
        Thank you for trying out! We'd love to hear from you.
      </Typography>
      <Typography>All feedback are welcome!</Typography>
      {message && (
        <Alert>
          <Typography>{message}</Typography>
        </Alert>
      )}
      {error && (
        <Alert severity="warning">
          <Typography>Oops, are you forgetting something? 👇🏼</Typography>
        </Alert>
      )}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="feedback-type-select">Lemme tell you about</InputLabel>
        <Select
          labelId="feedback-type-select"
          id="type-of-feedback-select"
          value={type}
          label="Lemme tell you about"
          onChange={handleChange}
          required
        >
          <MenuItem value="bug">a bug</MenuItem>
          <MenuItem value="suggestion">a feature suggestion</MenuItem>
          <MenuItem value="other">something else</MenuItem>
        </Select>

        <TextareaAutosize
          style={{
            marginTop: 10,
            fontFamily: "inherit",
            fontSize: 14,
            font: "Roboto",
            padding: 8,
          }}
          placeholder=" More detail"
          value={description}
          onChange={handleDescriptionChange}
          minRows={10}
          required
        />

        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          fullWidth
          onClick={handleSendFeedback}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={20} /> : "Send"}
        </Button>
      </FormControl>
      <Box color={theme.palette.secondary.main} my={2}>
        <Typography textAlign="center">
          Need more help?&nbsp;
          <Link href="mailto:qtrongnhan+tabsync+support@gmail.com?subject=[TabSync]">
            Contact us via email
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default FeedbackForm;
