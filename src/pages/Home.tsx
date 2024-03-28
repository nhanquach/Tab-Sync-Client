import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Snackbar, Typography } from "@mui/material";

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
import HomeSidebar from "../components/HomeSidebar";
import Toolbar, { TOrderBy } from "../components/Toolbar";
import HomeAppBar from "../components/HomeAppBar";
import NoData from "../components/NoData";
import TipsFooter from "../components/TipsFooter";
import HomeBottomNavigationBar from "../components/HomeBottomNavigationBar";
import { isHistoryApiSupported } from "../utils/isHistoryAPISupported";
import { getItem, saveItem } from "../utils/LocalStorageHelper";
import { LAYOUT, LAYOUT_KEY } from "../utils/constants";
import { Layout } from "../interfaces/Layout";

interface IHomeProps {
  user?: any;
  onSignOut: () => void;
}

const Home: React.FC<IHomeProps> = ({ user, onSignOut }) => {
  const [toast, setToast] = useState({ show: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<TABS_VIEWS>(TABS_VIEWS.OPEN_TABS);

  const [tabs, setTabs] = useState<ITab[]>([]);
  const [archivedTabs, setArchivedTabs] = useState<ITab[]>([]);

  const [searchString, setSearchString] = useState<string>("");
  const [displayedBrowsers, setDisplayedBrowsers] = useState<string[]>([]);
  const [showThisWebsite, setShowThisWebsite] = useState<boolean>(false);

  const [layout, setLayout] = useState<Layout>(
    getItem(LAYOUT_KEY) || LAYOUT.LIST
  );
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

  const handleGetTabs = useCallback(async () => {
    setIsLoading(true);
    const fetchFunction = isOpenTabsView ? getOpenTabs : getArchivedTabs;
    const setTabsFunction = isOpenTabsView ? setTabs : setArchivedTabs;

    const { data: newTabs, error } = await fetchFunction();

    if (error) {
      console.error(error);
      showToast("An error occurred while fetching open tabs.");
      return;
    }

    setTabsFunction(newTabs.sort(sortByTimeStamp));
    setIsLoading(false);
    showToast("Tabs are up to date.");
  }, [isOpenTabsView]);

  const toggleLayout = () => {
    setLayout((currentLayout: Layout) => {
      const newLayout =
        currentLayout === LAYOUT.GRID ? LAYOUT.LIST : LAYOUT.GRID;

      saveItem(LAYOUT_KEY, newLayout);
      return newLayout;
    });
  };

  const toggleOrderBy = () => {
    setOrderBy((currentOrderBy) =>
      currentOrderBy === "time" ? "title" : "time"
    );
  };

  // Get Open Tabs and Archived Tabs based on View
  useEffect(() => {
    if (
      (isOpenTabsView && tabs.length === 0) ||
      (!isOpenTabsView && archivedTabs.length === 0)
    )
      handleGetTabs();
  }, [view, handleGetTabs, tabs.length, archivedTabs.length, isOpenTabsView]);

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
            showToast("Tab is synced successfully!");
          });
        }
      } catch (e) {
        console.log("Is not valid url! Skipping...");
        showToast("Is not valid url! Skipping...");
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
      showToast("Tabs are up to date.");
    }, 250);
  };

  const handleSignOut = () => {
    setTabs([]);
    setArchivedTabs([]);
    onSignOut();
  };

  const showToast = (message: string) => {
    setToast({
      show: true,
      message,
    });
  };

  const closeToast = () => {
    setToast({
      show: false,
      message: "",
    });
  };

  return (
    <>
      <HomeAppBar user={user} onSignOut={handleSignOut} />
      <HomeSidebar view={view} setView={setView} />
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
      <HomeBottomNavigationBar view={view} setView={setView} />
      <Snackbar
        open={toast.show}
        autoHideDuration={1000}
        onClose={closeToast}
        message={toast.message || ""}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
};

export default Home;
