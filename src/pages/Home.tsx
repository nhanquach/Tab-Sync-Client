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

function Home() {
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
          if (currentTabs.some((t) => t.id === payload.new.id)) {
            return currentTabs;
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
          if (currentTabs.some((t) => t.id === payload.new.id)) {
            return currentTabs;
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

  return (
    <Container sx={{ mb: 8 }} maxWidth="md">
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

      <LightbulbCircleTwoTone
        fontSize="large"
        sx={{ display: "flex", width: "100%", my: 2 }}
        color="info"
      />

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
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
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
      </Paper>
    </Container>
  );
}

export default Home;
