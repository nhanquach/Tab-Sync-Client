import React from "react";
import {
  Box,
  Button,
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

const Feedback: React.FC<IFeedbackProps> = ({ sendFeedback }) => {
  const theme = useTheme();

  const [type, setType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSendFeedback = async () => {
    setIsLoading(true);
    await sendFeedback(type, description);

    setIsLoading(false);
    setMessage("Your feedback has been sent. Thank you!");
    setType("");
    setDescription("");
  };

  return (
    <div>
      <Box>
        <Typography variant="h6">
          <HandshakeOutlined
            sx={{ color: theme.palette.primary.main, mr: 1 }}
          />{" "}
          Hey there!{" "}
        </Typography>
        <Typography>
          {" "}
          If you love our app, we would greatly appreciate your support.{" "}
        </Typography>
        <Typography>
          Sharing is caring! Share the app with your friends and family so they
          can enjoy it too.
        </Typography>
        <Typography>
          Don&lsquo;t forget to rate the app on your app store. Your feedback
          helps us improve!
        </Typography>
        <Typography>
          {" "}
          Thanks for being part of our community. Your support means the world
          to us!
        </Typography>
      </Box>

      <Typography>All feedback are welcome!</Typography>
      <Typography color={theme.palette.primary.main}>{message}</Typography>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="feedback-type-select">Lemme tell you about</InputLabel>
        <Select
          labelId="feedback-type-select"
          id="type-of-feedback-select"
          value={type}
          label="Lemme tell you about"
          onChange={handleChange}
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
          minRows={5}
        />

        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          fullWidth
          onClick={handleSendFeedback}
          disabled={isLoading}
        >
          Submit
        </Button>
      </FormControl>
      <Box color={theme.palette.secondary.main} my={2}>
        <Typography textAlign="center">
          Need more help?&nbsp;
          <Link href="mailto:qtrongnhan+tabsync+support@gmail.com?subject=[Tab Sync]">
            Contact us via email
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Feedback;
