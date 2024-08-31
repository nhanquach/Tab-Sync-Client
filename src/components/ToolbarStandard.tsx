import React from "react";
import {
  RefreshTwoTone,
  DevicesTwoTone,
  CheckTwoTone,
  Grid3x3TwoTone,
  ListAltTwoTone,
  TimelineTwoTone,
  SortByAlphaTwoTone,
  WebTwoTone,
} from "@mui/icons-material";
import {
  Box,
  Tooltip,
  IconButton,
  CircularProgress,
  TextField,
  Menu,
  MenuList,
  ListItemText,
  Typography,
  MenuItem,
  ListItemIcon,
  useTheme,
  Divider,
} from "@mui/material";
import { useKeyPress } from "../hooks/useKeyPress";
import { Layout } from "../interfaces/Layout";
import { isMobileDevice } from "../utils/isMobile";
import { ORDER } from "../utils/constants";

interface IToolbarStandardProps {
  searchBoxRef: React.MutableRefObject<any>;
  handleRefresh: () => void;
  isLoading: boolean;
  searchString: string;
  handleSearch: (e: any) => void;
  isSelectDeviceDropdownOpen: boolean;
  handleOpenSelectDevicesDropdown: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleSelectDisplayBrowsers: (browser: string) => void;
  displayedBrowsers: string[];
  handleSetShowThisWebsite: () => void;
  showThisWebsite: boolean;
  toggleLayout: () => void;
  layout: Layout;
  browsers: string[];
  toggleOrderBy: () => void;
  orderBy: ORDER;
  selectDeviceDropdownAnchorEl: any;
  handleCloseSelectDeviceDropdown: () => void;
}

export const ToolbarStandard: React.FC<IToolbarStandardProps> = ({
  searchBoxRef,
  handleRefresh,
  isLoading,
  searchString,
  handleSearch,
  isSelectDeviceDropdownOpen,
  handleOpenSelectDevicesDropdown,
  handleSelectDisplayBrowsers,
  displayedBrowsers,
  handleSetShowThisWebsite,
  showThisWebsite,
  toggleLayout,
  layout,
  browsers,
  toggleOrderBy,
  orderBy,
  selectDeviceDropdownAnchorEl,
  handleCloseSelectDeviceDropdown,
}) => {
  const theme = useTheme();
  const isMobileBrowser = isMobileDevice(navigator);
  useKeyPress({
    keys: ["k"],
    callback: () => {
      searchBoxRef.current?.focus();
    },
    isCombinedWithCtrl: true,
  });

  return (
    <Box display="flex" gap={1} mt={1}>
      <Tooltip title="Refresh">
        <IconButton onClick={handleRefresh}>
          {isLoading ? <CircularProgress size={20} /> : <RefreshTwoTone />}
        </IconButton>
      </Tooltip>
      <TextField
        inputRef={searchBoxRef}
        id="search-text-field"
        size="small"
        type="text"
        label={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "inherit",
            }}
          >
            <Typography>Find your tabs</Typography>
            {!isMobileBrowser && (
              <Box
                ml={1}
                px={2}
                bgcolor={theme.palette.primary.main}
                color="white"
                borderRadius={1}
              >
                ⌘K
              </Box>
            )}
          </Box>
        }
        variant="outlined"
        value={searchString}
        onChange={handleSearch}
        fullWidth
      />
      <Tooltip title="Device Filters">
        <IconButton
          id="select-devices-button"
          aria-controls={
            isSelectDeviceDropdownOpen ? "select-devices-menu" : undefined
          }
          aria-haspopup="true"
          aria-expanded={isSelectDeviceDropdownOpen ? "true" : undefined}
          onClick={handleOpenSelectDevicesDropdown}
        >
          <DevicesTwoTone />
        </IconButton>
      </Tooltip>
      <Menu
        id="select-devices-menu"
        anchorEl={selectDeviceDropdownAnchorEl}
        open={isSelectDeviceDropdownOpen}
        onClose={handleCloseSelectDeviceDropdown}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList>
          <ListItemText sx={{ px: 2 }}>
            <Typography>Available devices:</Typography>
            <Typography variant="subtitle2">
              Click to hide or unhide devices from the list
            </Typography>
          </ListItemText>

          {browsers.map((browser: string) => {
            return (
              <MenuItem
                key={browser}
                onClick={() => handleSelectDisplayBrowsers(browser)}
              >
                <ListItemIcon>
                  {displayedBrowsers.includes(browser) && <CheckTwoTone />}
                </ListItemIcon>
                <ListItemText>{browser || "Unknown"}</ListItemText>
              </MenuItem>
            );
          })}
          <Divider />
          <MenuItem key="this-website" onClick={handleSetShowThisWebsite}>
            <ListItemIcon>{showThisWebsite && <CheckTwoTone />}</ListItemIcon>
            <ListItemText>
              <Box display="flex" gap={1} alignItems="center">
                <WebTwoTone />
                This website
              </Box>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <Tooltip title="Change layouts">
        <IconButton onClick={toggleLayout}>
          {layout === "grid" ? <Grid3x3TwoTone /> : <ListAltTwoTone />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Order by Time / Alphabet">
        <IconButton onClick={toggleOrderBy}>
          {orderBy === ORDER.TIME ? (
            <TimelineTwoTone />
          ) : (
            <SortByAlphaTwoTone />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ToolbarStandard;
