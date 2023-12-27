import React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMoreTwoTone } from "@mui/icons-material";

const AboutCard = () => {
  return (
    <Accordion
      elevation={2}
      className="what-is-tabsync-accordion"
      style={{
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      }}
      sx={{
        backdropFilter: "blur(12px)",
        background: "none",
        borderRadius: 2,
        my: 2,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreTwoTone />}
        sx={{ borderRadius: 12 }}
      >
        <Typography variant="h5">What is TabSync?</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ borderRadius: 12 }}>
        <Typography variant="h5">TabSync: Your Tabs, Everywhere</Typography>
        <p>
          Hey there! Meet TabSync, the app that makes your life a bit easier.
        </p>
        <Typography variant="h6">What's cool about TabSync:</Typography>
        <p>
          <strong>Works on Any Browser</strong>: Whether you use Chromium,
          Chrome, Vivaldi, Opera, Firefox (comming soon), or whatever, TabSync
          syncs your open tabs to the cloud effortlessly.
        </p>
        <p>
          <strong>Updates in Real Time</strong>: Switch devices, and your tabs
          follow you in real time. No fuss, just seamless browsing.
        </p>
        <p>
          <strong>Safe and Sound</strong>: Your tabs are stored securely in the
          cloud. We take privacy seriously, so your browsing history is safe and
          sound.
        </p>
        <p>
          <strong>Easy to Use</strong>: TabSync is designed to be user-friendly.
          No tech wizardry required, just a simple way to manage your tabs.
        </p>
        <Typography variant="h6">How to get started:</Typography>
        <p>
          <strong>Get the TabSync Extension</strong>: Add the TabSync extension
          to your browser.
        </p>
        <p>
          <strong>Sign Up</strong>: Create a TabSync account to link up with the
          cloud. <i>We don't share your data, we only use it for syncing.</i>
        </p>
        <p>
          <strong>Browse</strong>: Browse like normal. Your tabs will be synced
          automatically to the cloud, you can access them anytime later at
          &nbsp;
          <a href="https://tab-sync-b16b4.web.app/">The TabSync web app</a>
        </p>
        <Typography variant="h6">Why TabSync rocks</Typography>
        <p>
          <strong>Save Time</strong>: No more searching for tabs on different
          devices. TabSync streamlines your browsing, saving you time.{" "}
        </p>
        <p>
          <strong>Your Privacy, Your Rules</strong>: We respect your privacy.
          TabSync doesn't share sensitive info without your say-so.
        </p>
        <p>
          <strong>Always Getting Better</strong>: As a fellow tech enthusiast,
          know that we're always working on cool updates to keep TabSync
          top-notch. Give TabSync a try and let your tabs roam free!
        </p>
      </AccordionDetails>
    </Accordion>
  );
};

export default AboutCard;
