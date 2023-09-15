import React, { useEffect, useMemo, useState } from "react";
import {
  getOpenTabs,
  getArchivedTabs,
  onOpenTabChange,
  onArchivedTabChange,
  archiveOpenTabs,
  removeArchivedTabs,
} from "../clients";
import UrlList from "../components/UrlList";
import { ITab } from "../interfaces/iTab";
import { IView } from "../interfaces/iView";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CircularProgress,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArchiveTwoTone,
  CloudSyncTwoTone,
  LightbulbCircleTwoTone,
} from "@mui/icons-material";
import { IDatabaseUpdatePayload } from "../interfaces/IDatabaseUpdate";
import { sortByTimeStamp } from "../utils/sortByTimeStamp";
import QRCode from "../components/QRCode";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<IView>("open_tabs");

  const [tabs, setTabs] = useState<ITab[]>([]);
  const [filteredTabs, setFilteredTabs] = useState<ITab[]>([]);
  const [archivedTabs, setArchivedTabs] = useState<ITab[]>([]);

  const [searchString, setSearchString] = useState();

  const isOpenTabsView = view === "open_tabs";

  const handleGetOpenTabs = async () => {
    setLoading(true);

    const { data: newTabs, error } = await getOpenTabs();

    if (error) {
      console.error(error);
      return;
    }

    setTabs(newTabs.sort(sortByTimeStamp));
    setFilteredTabs(newTabs.sort(sortByTimeStamp));
    setLoading(false);
  };

  const handleGetArchivedTabs = async () => {
    setLoading(true);

    const { data: newTabs, error } = await getArchivedTabs();

    if (error) {
      console.error(error);
      return;
    }

    setArchivedTabs(newTabs.sort(sortByTimeStamp));
    setLoading(false);
  };

  // Get Open Tabs and Archived Tabs based on View
  useEffect(() => {
    if (view === "open_tabs" && tabs.length === 0) {
      handleGetOpenTabs();
    } else if (view === "archived_tabs" && archivedTabs.length === 0) {
      handleGetArchivedTabs();
    }
  }, [archivedTabs.length, tabs.length, view]);

  // On Open Tabs change
  useEffect(() => {
    onOpenTabChange((payload: IDatabaseUpdatePayload) => {
      if (payload.eventType === "UPDATE") {
        setTabs((currentTabs) => {
          const index = currentTabs.findIndex(
            (tab) => tab.id === payload.new.id
          );

          if (index > -1) {
            const newTabs = [...currentTabs];
            newTabs.splice(index, 1, payload.new);
            return newTabs;
          }

          return [payload.new, ...currentTabs];
        });
      }

      if (payload.eventType === "DELETE") {
        setTabs((currentTabs) =>
          currentTabs.filter((t) => t.id !== payload.old.id)
        );
      }
    });
  }, [tabs]);

  // On Archived Tabs change
  useEffect(() => {
    onArchivedTabChange((payload: IDatabaseUpdatePayload) => {
      if (payload.eventType === "UPDATE") {
        setArchivedTabs((currentTabs) => {
          const index = currentTabs.findIndex(
            (tab) => tab.id === payload.new.id
          );

          if (index > -1) {
            const newTabs = [...currentTabs];
            newTabs.splice(index, 1, payload.new);
            return newTabs;
          }

          return [payload.new, ...currentTabs];
        });
      }

      if (payload.eventType === "DELETE") {
        setArchivedTabs((currentTabs) =>
          currentTabs.filter((t) => t.id !== payload.old.id)
        );
      }
    });
  }, [archivedTabs]);

  useEffect(() => {
    if (filteredTabs.length === 0 && searchString === "") {
      setFilteredTabs(tabs);
    }
  }, [filteredTabs.length, searchString, tabs]);

  const handleSearch = (e: any) => {
    setSearchString(e.target.value);

    if (e.target.value) {
      const originTabs = isOpenTabsView ? tabs : archivedTabs;

      const newTabs = originTabs.filter(
        (tab) =>
          tab.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          tab.url.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredTabs(newTabs);
    } else {
      setFilteredTabs(tabs);
    }
  };

  const clearOpenTabs = (deviceName: string) => {
    archiveOpenTabs(deviceName);
    setFilteredTabs([]);
  };

  const clearArchivedTabs = (deviceName: string) => {
    removeArchivedTabs(deviceName);
    setFilteredTabs([]);
  };

  const urls = useMemo(() => {
    if (searchString) {
      return filteredTabs;
    }

    return isOpenTabsView ? tabs : archivedTabs;
  }, [searchString, isOpenTabsView, tabs, archivedTabs, filteredTabs]);

  const drawerWidth = 240;

  const drawer = (
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
  );

  return (
    <>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
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
          {drawer}
        </Drawer>
      </Box>

      <TextField
        type="text"
        placeholder="search..."
        value={searchString}
        onChange={handleSearch}
        fullWidth
      />

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          mt={6}
          alignItems="center"
          gap={2}
          color="#696969"
        >
          <CircularProgress /> Getting your tabs...
        </Box>
      )}

      {!loading && (
        <UrlList
          urls={urls}
          onClear={isOpenTabsView ? clearOpenTabs : clearArchivedTabs}
          onRefresh={() => {
            isOpenTabsView
              ? getOpenTabs().then(
                  (openTabs) => {
                    setTabs(openTabs.data);
                    setFilteredTabs(openTabs.data);
                  },
                  () => {}
                )
              : getArchivedTabs().then(
                  (archived) => {
                    setArchivedTabs(archived.data);
                  },
                  () => {}
                );
          }}
        />
      )}

      {!loading && (
        <LightbulbCircleTwoTone
          fontSize="large"
          sx={{ display: "flex", width: "100%", my: 2 }}
          color="primary"
        />
      )}

      {!isOpenTabsView && !loading && (
        <Typography textAlign="center" color="#696969">
          Tab Sync was created to make your browsers hopping a breeze, since all
          your tabs are synced.
          <br />
          Happing browsing
        </Typography>
      )}

      {isOpenTabsView && !loading && (
        <Typography textAlign="center" color="#696969">
          <span>
            <b>Tip</b>: If your tabs are not showing up, one possible reason is
            that you are signed out of the extension.
            <br />
            To check, click on the extension icon in your browser toolbar and
            sign in.
          </span>
        </Typography>
      )}

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
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
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
      </Paper>
    </>
  );
};

export default Home;
