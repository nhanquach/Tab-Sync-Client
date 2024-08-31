import React, { useRef } from "react";

import { useTheme, useMediaQuery } from "@mui/material";
import { Layout } from "../interfaces/Layout";
import ToolbarStandard from "./ToolbarStandard";
import ToolbarCompact from "./ToolbarCompact";
import { saveItem } from "../utils/LocalStorageHelper";
import { LAST_SAVED_DISPLAYED_BROWSERS_KEY, ORDER } from "../utils/constants";

interface IToolbarProps {
  handleRefresh(): void;
  isLoading: boolean;
  searchString: string;
  handleSearch: (e: any) => void;
  browsers: string[];
  displayedBrowsers: string[];
  setDisplayedBrowsers: (browsers: string[]) => void;
  toggleLayout(): void;
  layout: Layout;
  toggleOrderBy(): void;
  orderBy: ORDER;
  showThisWebsite: boolean;
  setShowThisWebsite(shouldShow: boolean): void;
}

const Toolbar: React.FC<IToolbarProps> = ({
  isLoading,
  handleRefresh,
  searchString,
  handleSearch,
  browsers,
  displayedBrowsers,
  setDisplayedBrowsers,
  toggleLayout,
  layout,
  toggleOrderBy,
  orderBy,
  showThisWebsite,
  setShowThisWebsite,
}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const searchBoxRef = useRef<HTMLInputElement>(null);

  const [selectDeviceDropdownAnchorEl, setAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isSelectDeviceDropdownOpen = Boolean(selectDeviceDropdownAnchorEl);

  const handleOpenSelectDevicesDropdown = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSelectDeviceDropdown = () => {
    setAnchorEl(null);
  };

  const handleSelectDisplayBrowsers = (browser: string) => {
    const browsers = displayedBrowsers.includes(browser)
      ? displayedBrowsers.filter((f) => f !== browser)
      : [...displayedBrowsers, browser];

    setDisplayedBrowsers(browsers);
    saveItem(LAST_SAVED_DISPLAYED_BROWSERS_KEY, browsers.join(","));
  };

  const handleSetShowThisWebsite = () => {
    setShowThisWebsite(!showThisWebsite);
  };

  if (isLargeScreen) {
    return (
      <ToolbarStandard
        searchBoxRef={searchBoxRef}
        handleRefresh={handleRefresh}
        isLoading={isLoading}
        searchString={searchString}
        handleSearch={handleSearch}
        isSelectDeviceDropdownOpen={isSelectDeviceDropdownOpen}
        handleOpenSelectDevicesDropdown={handleOpenSelectDevicesDropdown}
        handleSelectDisplayBrowsers={handleSelectDisplayBrowsers}
        displayedBrowsers={displayedBrowsers}
        handleSetShowThisWebsite={handleSetShowThisWebsite}
        showThisWebsite={showThisWebsite}
        toggleLayout={toggleLayout}
        layout={layout}
        browsers={browsers}
        toggleOrderBy={toggleOrderBy}
        orderBy={orderBy}
        selectDeviceDropdownAnchorEl={selectDeviceDropdownAnchorEl}
        handleCloseSelectDeviceDropdown={handleCloseSelectDeviceDropdown}
      />
    );
  }

  return (
    <ToolbarCompact
      searchBoxRef={searchBoxRef}
      handleRefresh={handleRefresh}
      isLoading={isLoading}
      searchString={searchString}
      handleSearch={handleSearch}
      isSelectDeviceDropdownOpen={isSelectDeviceDropdownOpen}
      handleOpenSelectDevicesDropdown={handleOpenSelectDevicesDropdown}
      handleSelectDisplayBrowsers={handleSelectDisplayBrowsers}
      displayedBrowsers={displayedBrowsers}
      handleSetShowThisWebsite={handleSetShowThisWebsite}
      showThisWebsite={showThisWebsite}
      toggleLayout={toggleLayout}
      layout={layout}
      browsers={browsers}
      toggleOrderBy={toggleOrderBy}
      orderBy={orderBy}
      selectDeviceDropdownAnchorEl={selectDeviceDropdownAnchorEl}
      handleCloseSelectDeviceDropdown={handleCloseSelectDeviceDropdown}
    />
  );
};

export default Toolbar;
