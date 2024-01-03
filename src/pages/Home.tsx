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
import { TABS_VIEWS } from "../interfaces/iView";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import {
  ArchiveTwoTone,
  CloudSyncTwoTone,
  LightbulbCircleTwoTone,
} from "@mui/icons-material";
import { IDatabaseUpdatePayload } from "../interfaces/IDatabaseUpdate";
import { sortByTimeStamp } from "../utils/sortByTimeStamp";
import UrlGrid from "../components/UrlGrid";
import { sortByTitle } from "../utils/sortByTitle";
import Drawer from "../components/Drawer";
import Toolbar, { TLayout, TOrderBy } from "../components/Toolbar";
import HomeAppBar from "../components/HomeAppBar";

interface IHomeProps {
  user?: any;
  onSignOut: () => void;
}

const Home: React.FC<IHomeProps> = ({ user, onSignOut }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<TABS_VIEWS>(TABS_VIEWS.OPEN_TABS);

  const [tabs, setTabs] = useState<ITab[]>([]);
  const [archivedTabs, setArchivedTabs] = useState<ITab[]>([]);

  const [searchString, setSearchString] = useState<string>("");
  const [displayedBrowsers, setDisplayedBrowsers] = useState<string[]>([]);
  const [showThisWebsite, setShowThisWebsite] = useState<boolean>(false);

  const [layout, setLayout] = useState<TLayout>("list");
  const [orderBy, setOrderBy] = useState<TOrderBy>("time");

  const isOpenTabsView = useMemo(() => view === TABS_VIEWS.OPEN_TABS, [view]);

  const browsers = useMemo(() => {
    const devices = Array.from(new Set(tabs.map((url) => url.deviceName)));
    return devices;
  }, [tabs]);

  const urls = useMemo(() => {
    let displayedTabs = isOpenTabsView ? tabs : archivedTabs;

    // apply filters if any
    if (displayedBrowsers.length > 0) {
      displayedTabs = displayedTabs.filter((tab) =>
        displayedBrowsers.includes(tab.deviceName)
      );
    }

    // apply search string if any
    if (searchString) {
      displayedTabs = displayedTabs.filter(
        (tab) =>
          tab.title.toLowerCase().includes(searchString.toLowerCase()) ||
          tab.url.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    if (!showThisWebsite) {
      displayedTabs = displayedTabs.filter(
        (tab) => tab.url !== window.location.href
      );
    }

    return displayedTabs.sort(
      orderBy === "time" ? sortByTimeStamp : sortByTitle
    );
  }, [
    isOpenTabsView,
    tabs,
    archivedTabs,
    displayedBrowsers,
    searchString,
    orderBy,
    showThisWebsite,
  ]);

  const handleGetOpenTabs = async () => {
    setIsLoading(true);

    const { data: newTabs, error } = await getOpenTabs();

    if (error) {
      console.error(error);
      return;
    }

    setTabs(newTabs.sort(sortByTimeStamp));
    setIsLoading(false);
  };

  const handleGetArchivedTabs = async () => {
    setIsLoading(true);

    const { data: newTabs, error } = await getArchivedTabs();

    if (error) {
      console.error(error);
      return;
    }

    setArchivedTabs(newTabs.sort(sortByTimeStamp));
    setIsLoading(false);
  };

  const toggleLayout = () => {
    setLayout((currentLayout) => (currentLayout === "grid" ? "list" : "grid"));
  };

  const toggleOrderBy = () => {
    setOrderBy((currentOrderBy) =>
      currentOrderBy === "time" ? "title" : "time"
    );
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

  // Select all devices as filters
  useEffect(() => {
    const devices = Array.from(new Set(tabs.map((url) => url.deviceName)));
    setDisplayedBrowsers(devices);
  }, [tabs]);

  const handleSearch = (e: any) => {
    setSearchString(e.target.value);
  };

  const clearOpenTabs = (deviceName: string) => {
    archiveOpenTabs(deviceName);
    setDisplayedBrowsers(displayedBrowsers.filter((f) => f !== deviceName));
  };

  const clearArchivedTabs = (deviceName: string) => {
    removeArchivedTabs(deviceName);
    setDisplayedBrowsers(displayedBrowsers.filter((f) => f !== deviceName));
  };

  const handleRefresh = async () => {
    setIsLoading(true);

    if (isOpenTabsView) {
      setTabs((await getOpenTabs()).data.sort(sortByTimeStamp));
    } else {
      setArchivedTabs((await getArchivedTabs()).data.sort(sortByTimeStamp));
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  const handleSignOut = () => {
    setTabs([]);
    setArchivedTabs([]);
    onSignOut();
  };

  return (
    <>
      <HomeAppBar user={user} onSignOut={handleSignOut} />

      <Drawer view={view} setView={setView} />

      <Toolbar
        isLoading={isLoading}
        handleRefresh={handleRefresh}
        searchString={searchString}
        handleSearch={handleSearch}
        browsers={browsers}
        displayedBrowsers={displayedBrowsers}
        setDisplayedBrowsers={setDisplayedBrowsers}
        toggleLayout={toggleLayout}
        layout={layout}
        toggleOrderBy={toggleOrderBy}
        orderBy={orderBy}
        showThisWebsite={showThisWebsite}
        setShowThisWebsite={setShowThisWebsite}
      />

      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          mt={6}
          alignItems="center"
          gap={2}
          color="#696969"
        >
          Getting your tabs...
        </Box>
      )}

      {!isLoading && layout === "list" && (
        <UrlList
          view={view}
          urls={urls}
          onClear={isOpenTabsView ? clearOpenTabs : clearArchivedTabs}
        />
      )}

      {!isLoading && layout === "grid" && (
        <UrlGrid
          view={view}
          urls={urls}
          onClear={isOpenTabsView ? clearOpenTabs : clearArchivedTabs}
        />
      )}

      {!isLoading && (
        <LightbulbCircleTwoTone
          fontSize="large"
          sx={{ display: "flex", width: "100%", my: 2 }}
          color="primary"
        />
      )}

      {!isOpenTabsView && !isLoading && (
        <Typography textAlign="center" color="#696969">
          TabSync was created to make your browsers hopping a breeze, since all
          your tabs are synced.
          <br />
          Happing browsing
        </Typography>
      )}

      {isOpenTabsView && !isLoading && (
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
