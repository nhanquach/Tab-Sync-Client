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

import { IView } from "../interfaces/iView";

import QRCode from "./QRCode";
import DownloadCard from "./DownloadCard";

interface IDrawerProps {
  view: string;
  setView: (view: IView) => void;
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
              selected={view === "open_tabs"}
              onClick={() => setView("open_tabs")}
            >
              <ListItemIcon>
                <CloudSyncTwoTone sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary="Open tabs" />
            </ListItemButton>
            <ListItemButton
              sx={{ mb: 2 }}
              selected={view === "archived_tabs"}
              onClick={() => setView("archived_tabs")}
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
            <ListItem>
              <ListItemIcon
                style={{ maxWidth: "100%" }}
                sx={{
                  backdropFilter: "blur(8px)",
                }}
              >
                <QRCode />
              </ListItemIcon>
            </ListItem>
          </List>
        </Box>
      </MUIDrawer>
    </Box>
  );
};

export default Drawer;
