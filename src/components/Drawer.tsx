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
import DownloadCard from "./DownloadCard";
import { TABS_VIEWS } from "../interfaces/iView";

interface IDrawerProps {
  view: string;
  setView: (view: TABS_VIEWS) => void;
}

const drawerWidth = 240;

const Drawer: React.FC<IDrawerProps> = ({ view, setView }) => {
  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      <MUIDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <Box pt={8}>
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
            <Divider sx={{ pt: 6 }} />
            <ListItem>
              <DownloadCard small />
            </ListItem>
            <ListItem sx={{ justifyContent: "center", display: "flex" }}>
              <QRCode width={200} height={200} text="TabSync on your phone" />
            </ListItem>
          </List>
        </Box>
      </MUIDrawer>
    </Box>
  );
};

export default Drawer;
