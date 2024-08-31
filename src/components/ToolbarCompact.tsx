import {
  RefreshTwoTone,
  DevicesTwoTone,
  CheckTwoTone,
  WebTwoTone,
  Grid3x3TwoTone,
  ListAltTwoTone,
  TimelineTwoTone,
  SortByAlphaTwoTone,
} from "@mui/icons-material";
import {
  TextField,
  Box,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress,
  Menu,
  MenuList,
  ListItemText,
  MenuItem,
  ListItemIcon,
  Divider,
  useTheme,
} from "@mui/material";
import React from "react";
import { Layout } from "../interfaces/Layout";
import { ORDER } from "../utils/constants";
import { isMobileDevice } from "../utils/isMobile";

interface IToolbarCompactProps {
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

const ToolbarCompact: React.FC<IToolbarCompactProps> = ({
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

  return (
    <>
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
        style={{
          marginTop: isMobileBrowser ? "20px" : 0,
        }}
      />

      <Box
        gap={1}
        mt={1}
        justifyContent="space-between"
        sx={{
          display: { xs: "flex", md: "none" },
        }}
      >
        <Tooltip title="Refresh">
          <IconButton onClick={handleRefresh}>
            {isLoading ? <CircularProgress size={20} /> : <RefreshTwoTone />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Device Filters">
          <IconButton
            id="basic-button"
            aria-controls={
              isSelectDeviceDropdownOpen ? "basic-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={isSelectDeviceDropdownOpen ? "true" : undefined}
            onClick={handleOpenSelectDevicesDropdown}
          >
            <DevicesTwoTone />
          </IconButton>
        </Tooltip>
        <Menu
          id="filter-menu"
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
                  <ListItemText>{browser}</ListItemText>
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
    </>
  );
};

export default ToolbarCompact;
