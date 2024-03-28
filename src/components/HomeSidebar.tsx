import React from "react";

import { CloudSyncTwoTone, ArchiveTwoTone } from "@mui/icons-material";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItem,
  Drawer as MUIDrawer,
} from "@mui/material";

import QRCode from "./QRCode";
import DownloadCard from "./CardDownload";
import { TABS_VIEWS } from "../interfaces/iView";
import CardShare from "./CardShare";

interface IHomeSidebarProps {
  view: string;
  setView: (view: TABS_VIEWS) => void;
}

const sidebarWidth = 240;

const HomeSidebar: React.FC<IHomeSidebarProps> = ({ view, setView }) => {
  return (
    <Box
      component="nav"
      sx={{
        width: { md: sidebarWidth },
        flexShrink: { md: 0 },
      }}
    >
      <MUIDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
          },
        }}
        open
      >
        <Box pt={2}>
          <List>
            <ListItemButton
              sx={{ mb: 2 }}
              selected={view === TABS_VIEWS.OPEN_TABS}
              onClick={() => setView(TABS_VIEWS.OPEN_TABS)}
            >
              <ListItemIcon>
                <CloudSyncTwoTone sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary="Open tabs" />
            </ListItemButton>
            <ListItemButton
              sx={{ mb: 2 }}
              selected={view === TABS_VIEWS.ARCHIVED_TABS}
              onClick={() => setView(TABS_VIEWS.ARCHIVED_TABS)}
            >
              <ListItemIcon>
                <ArchiveTwoTone sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary="Archived tabs" />
            </ListItemButton>
            <Divider sx={{ pt: 0 }} />
            <ListItem>
              <DownloadCard small />
            </ListItem>
            <ListItem sx={{ justifyContent: "center", display: "flex" }}>
              <QRCode width={200} height={200} text="TabSync on your phone" />
            </ListItem>
            <ListItem>
              <CardShare small/>
            </ListItem>
          </List>
        </Box>
      </MUIDrawer>
    </Box>
  );
};

export default HomeSidebar;
