import React, { memo } from "react";
import { CloudSyncTwoTone, ArchiveTwoTone } from "@mui/icons-material";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

import { TABS_VIEWS } from "../interfaces/iView";
import { isMobile } from "../utils/isMobile";

interface IMobileBottomNavigationBarProps {
  view: TABS_VIEWS;
  setView: (view: TABS_VIEWS) => void;
}

const LiteLiveBackground = memo(() => {
  return (
    <ul className="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
});

const MobileBottomNavigationBar: React.FC<IMobileBottomNavigationBarProps> = ({
  view,
  setView,
}) => {
  const isMobileApp = isMobile();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { md: "none" },
        paddingBottom: isMobileApp ? "10px" : "0",
      }}
      elevation={3}
      className="bottom-navigation"
    >
      <BottomNavigation
        showLabels
        value={view}
        onChange={(_event, newValue) => {
          setView(newValue);
        }}
        sx={{
          position: "relative",
          zIndex: 10,
          background: "transparent",
        }}
      >
        <BottomNavigationAction
          value="open_tabs"
          label="Open tabs"
          icon={<CloudSyncTwoTone />}
        />
        <BottomNavigationAction
          value="archived_tabs"
          label="Archived tabs"
          icon={<ArchiveTwoTone />}
        />
      </BottomNavigation>

      <LiteLiveBackground />
    </Paper>
  );
};

export default MobileBottomNavigationBar;
