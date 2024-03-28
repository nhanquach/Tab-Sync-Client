import React, { useState } from "react";

import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
} from "react-share";
import { CheckCircleTwoTone, ContentCopyTwoTone } from "@mui/icons-material";
import { HOME_PAGE } from "../utils/constants";

interface ICardShareProps {
  small?: boolean;
  textless?: boolean;
  borderless?: boolean;
}

const CardShare: React.FC<ICardShareProps> = ({
  small,
  textless,
  borderless,
}) => {
  const theme = useTheme();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(
      `TabSync - Sync your tabs across devices \n ${HOME_PAGE}`
    );

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Card
      className={`share-card ${small ? "small" : ""}`}
      sx={{
        backdropFilter: "blur(8px)",
        background: "none",
      }}
      elevation={0}
      variant={borderless ? undefined : "outlined"}
    >
      <CardContent>
        {!textless && (
          <Typography
            variant={small ? "body1" : "h5"}
            display="flex"
            gap={2}
            mb={2}
          >
            {small ? "Share TabSync" : "If you like TabSync, share it:"}
          </Typography>
        )}
        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
          justifyContent="space-evenly"
          alignContent="center"
        >
          <Box
            sx={{ cursor: "pointer" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={small ? 45 : 50}
            height={small ? 45 : 50}
            borderRadius={3}
            bgcolor={
              isCopied ? theme.palette.success.main : theme.palette.primary.main
            }
            color={theme.palette.common.white}
            onClick={handleCopyLink}
          >
            {isCopied ? (
              <CheckCircleTwoTone fontSize="medium" />
            ) : (
              <ContentCopyTwoTone fontSize="medium" />
            )}
          </Box>
          <EmailShareButton
            url={HOME_PAGE}
            title="TabSync - Sync your tabs across devices"
          >
            <EmailIcon borderRadius={20} size={small ? 45 : 50} />
          </EmailShareButton>
          <FacebookShareButton
            url={HOME_PAGE}
            title="TabSync - Sync your tabs across devices"
          >
            <FacebookIcon borderRadius={20} size={small ? 45 : 50} />
          </FacebookShareButton>
          <LinkedinShareButton
            url={HOME_PAGE}
            title="TabSync - Sync your tabs across devices"
          >
            <LinkedinIcon borderRadius={20} size={small ? 45 : 50} />
          </LinkedinShareButton>
          <RedditShareButton
            url={HOME_PAGE}
            title="TabSync - Sync your tabs across devices"
          >
            <RedditIcon borderRadius={20} size={small ? 45 : 50} />
          </RedditShareButton>
          <TelegramShareButton
            url={HOME_PAGE}
            title="TabSync - Sync your tabs across devices"
          >
            <TelegramIcon borderRadius={20} size={small ? 45 : 50} />
          </TelegramShareButton>
          <TwitterShareButton
            url={HOME_PAGE}
            title="TabSync - Sync your tabs across devices"
          >
            <TwitterIcon borderRadius={20} size={small ? 45 : 50} />
          </TwitterShareButton>
          <ViberShareButton
            url={HOME_PAGE}
            title="TabSync - Sync your tabs across devices"
          >
            <ViberIcon borderRadius={20} size={small ? 45 : 50} />
          </ViberShareButton>
          <WhatsappShareButton
            url={HOME_PAGE}
            title="TabSync - Sync your tabs across devices"
          >
            <WhatsappIcon borderRadius={20} size={small ? 45 : 50} />
          </WhatsappShareButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardShare;
