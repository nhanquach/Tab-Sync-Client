import React, { useRef } from "react";

import {
  RefreshTwoTone,
  DevicesTwoTone,
  CheckTwoTone,
  Grid3x3TwoTone,
  ListAltTwoTone,
  TimelineTwoTone,
  SortByAlphaTwoTone,
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
} from "@mui/material";
import { useKeyPress } from "../hooks/useKeyPress";

export type TLayout = "grid" | "list";
export type TOrderBy = "time" | "title";

interface IToolbarProps {
  handleRefresh(): void;
  isLoading: boolean;
  searchString: string;
  handleSearch: (e: any) => void;
  browsers: string[];
  displayedBrowsers: string[];
  setDisplayedBrowsers: (browsers: string[]) => void;
  toggleLayout(): void;
  layout: TLayout;
  toggleOrderBy(): void;
  orderBy: TOrderBy;
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
}) => {
  const theme = useTheme();

  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onKeyPress = (e: any) => {
    searchBoxRef.current?.focus();
  };

  useKeyPress({ keys: ["k"], callback: onKeyPress, isCombinedWithCtrl: true });

  const handleSelectDisplayBrowsers = (browser: string) => {
    if (displayedBrowsers.includes(browser)) {
      setDisplayedBrowsers(displayedBrowsers.filter((f) => f !== browser));
    } else {
      setDisplayedBrowsers([...displayedBrowsers, browser]);
    }
  };

  return (
    <>
      {/* Display on Desktop */}
      <Box display="flex" gap={1} mt={1}>
        <Tooltip
          title="Refresh"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <IconButton onClick={handleRefresh}>
            {isLoading ? <CircularProgress size={20} /> : <RefreshTwoTone />}
          </IconButton>
        </Tooltip>
        <TextField
          inputRef={searchBoxRef}
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
              <Box
                ml={1}
                px={2}
                bgcolor={theme.palette.primary.main}
                color="white"
                borderRadius={1}
              >
                ⌘K
              </Box>
            </Box>
          }
          variant="outlined"
          value={searchString}
          onChange={handleSearch}
          fullWidth
        />
        <Tooltip
          title="Device Filters"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <DevicesTwoTone />
          </IconButton>
        </Tooltip>
        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
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
          sx={{
            display: { xs: "none", md: "flex" },
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
          </MenuList>
        </Menu>
        <Tooltip
          title="Change layouts"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <IconButton onClick={toggleLayout}>
            {layout === "grid" ? <Grid3x3TwoTone /> : <ListAltTwoTone />}
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Order by Time / Alphabet"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <IconButton onClick={toggleOrderBy}>
            {orderBy === "time" ? <TimelineTwoTone /> : <SortByAlphaTwoTone />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Display on Mobile */}
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
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <DevicesTwoTone />
          </IconButton>
        </Tooltip>
        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
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
          </MenuList>
        </Menu>
        <Tooltip title="Change layouts">
          <IconButton onClick={toggleLayout}>
            {layout === "grid" ? <Grid3x3TwoTone /> : <ListAltTwoTone />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Order by Time / Alphabet">
          <IconButton onClick={toggleOrderBy}>
            {orderBy === "time" ? <TimelineTwoTone /> : <SortByAlphaTwoTone />}
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default Toolbar;
