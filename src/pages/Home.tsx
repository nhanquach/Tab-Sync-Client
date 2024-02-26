import React, { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";

import {
  getOpenTabs,
  getArchivedTabs,
  onOpenTabChange,
  onArchivedTabChange,
  archiveOpenTabs,
  removeArchivedTabs,
  sendTab,
} from "../clients";
import UrlList from "../components/UrlList";
import { ITab } from "../interfaces/iTab";
import { TABS_VIEWS } from "../interfaces/iView";
import { IDatabaseUpdatePayload } from "../interfaces/IDatabaseUpdate";
import { sortByTimeStamp } from "../utils/sortByTimeStamp";
import UrlGrid from "../components/UrlGrid";
import { sortByTitle } from "../utils/sortByTitle";
import Drawer from "../components/Drawer";
import Toolbar, { TLayout, TOrderBy } from "../components/Toolbar";
import HomeAppBar from "../components/HomeAppBar";
import NoData from "../components/NoData";
import TipsFooter from "../components/TipsFooter";
import MobileBottomNavigationBar from "../components/MobileBottomNavigationBar";
import { isHistoryApiSupported } from "../utils/isHistoryAPISupported";

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

  // Send tab if is shared
  useEffect(() => {
    if (window.location.pathname === "/share") {
      try {
        const url = new URL(window.location.href);
        const title = url.searchParams.get("title");
        const text = url.searchParams.get("text");

        const randomId = parseInt((Math.random() * 1000000).toString());

        if (title && text) {
          // Checking if text is valid URL
          new URL(text);

          // Sending tab info to server
          sendTab({
            id: randomId,
            url: text,
            favIconUrl: "",
            title: title,
            index: 0,
            timeStamp: new Date().toLocaleDateString(),
            deviceName: "TabSync Web Client",
            windowId: "TabSync Web Client",
          }).then(() => {
            // redirect to home in order to prevent duplicate tabs when refreshing
            if (isHistoryApiSupported()) {
              window.history.pushState({}, "", "/");
            } else {
              window.location.replace("/");
            }
          });
        }
      } catch (e) {
        // TODO: Display a banner/toast message
        console.log("Is not valid url! Skipping...");
      }
    }
  }, []);

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
        <Typography
          my={12}
          textAlign={{ xs: "center", md: "justify" }}
          color="#696969"
          variant="h5"
        >
          Getting your tabs ...
        </Typography>
      )}

      {!isLoading && urls.length === 0 && (
        <NoData isEmptySearch={!!searchString} />
      )}

      {!isLoading && urls.length > 0 && layout === "list" && (
        <UrlList
          view={view}
          urls={urls}
          onClear={isOpenTabsView ? clearOpenTabs : clearArchivedTabs}
        />
      )}

      {!isLoading && urls.length > 0 && layout === "grid" && (
        <UrlGrid
          view={view}
          urls={urls}
          onClear={isOpenTabsView ? clearOpenTabs : clearArchivedTabs}
        />
      )}

      <TipsFooter isOpenTabsView={isOpenTabsView} />
      <MobileBottomNavigationBar view={view} setView={setView} />
    </>
  );
};

export default Home;
