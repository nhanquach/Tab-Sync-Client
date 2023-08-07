import React, { useEffect, useState } from "react";

import "./App.css";
import {
  ITab,
  getArchivedTabs,
  getOpenTabs,
  onArchivedTabChange,
  onOpenTabChange,
  archiveOpenTabs,
  removeArchivedTabs,
} from "./clientApp";

import "@picocss/pico";
import UrlList from "./components/UrlList";

function App() {
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState<Array<ITab>>([]);
  const [filteredTabs, setFilteredTabs] = useState<Array<ITab>>([]);
  const [archivedTabs, setArchivedTabs] = useState<Array<ITab>>([]);

  const [searchString, setSearchString] = useState();

  useEffect(() => {
    onOpenTabChange(() => {
      getOpenTabs().then(
        (openTabs) => {
          setTabs(openTabs);
          setFilteredTabs(openTabs);
        },
        () => {}
      );
    });

    onArchivedTabChange(() => {
      getArchivedTabs().then(
        (archived) => {
          setArchivedTabs(archived);
        },
        () => {}
      );
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    if (filteredTabs.length === 0 && searchString === "") {
      setFilteredTabs(tabs);
    }
  }, [filteredTabs.length, searchString, tabs]);

  const handleSearch = (e: any) => {
    setSearchString(e.target.value);

    if (e.target.value) {
      const newTabs = tabs.filter(
        (tab) =>
          tab.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          tab.url.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredTabs(newTabs);
    } else {
      setFilteredTabs(tabs);
    }
  };

  const clearOpenTabs = (e: React.MouseEvent) => {
    e.preventDefault();
    archiveOpenTabs();
    setFilteredTabs([]);
  };

  const clearArchivedTabs = (e: React.MouseEvent) => {
    e.preventDefault();
    removeArchivedTabs();
  };

  return (
    <div>
      <nav className="container-fluid" style={{ alignItems: "center" }}>
        <h1 style={{ margin: "10px 0" }}>Tab Sync</h1>
      </nav>

      <div className="container">
        <input
          type="text"
          placeholder="search..."
          value={searchString}
          onChange={handleSearch}
        />
      </div>

      <UrlList
        urls={filteredTabs}
        onClear={clearOpenTabs}
        header="Open Tabs"
        isLoading={loading}
      />

      <UrlList
        urls={archivedTabs}
        onClear={clearArchivedTabs}
        header="Archived Tabs"
        isLoading={loading}
      />
    </div>
  );
}

export default App;
