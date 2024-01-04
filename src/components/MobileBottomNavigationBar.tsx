import React from "react";
import { CloudSyncTwoTone, ArchiveTwoTone } from "@mui/icons-material";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

import { TABS_VIEWS } from "../interfaces/iView";

interface IMobileBottomNavigationBarProps {
  view: TABS_VIEWS;
  setView: (view: TABS_VIEWS) => void;
}

const LiteLiveBackground = () => {
  return (
    <ul className="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
};

const MobileBottomNavigationBar: React.FC<IMobileBottomNavigationBarProps> = ({
  view,
  setView,
}) => {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { md: "none" },
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
