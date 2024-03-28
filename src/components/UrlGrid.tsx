import React from "react";
// @ts-ignore
import groupBy from "lodash.groupby";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { ArchiveTwoTone, DeleteForeverTwoTone } from "@mui/icons-material";

import { ITab } from "../interfaces/iTab";

import { TABS_VIEWS } from "../interfaces/iView";
import UrlGridItem from "./UrlGridItem";

interface IUrlGridProps {
  view: TABS_VIEWS;
  onClear: (deviceName: string) => void;
  urls: ITab[];
}

const UrlGrid: React.FC<IUrlGridProps> = ({ onClear, urls, view }) => {
  const theme = useTheme();

  const groupByBrowser = groupBy(urls, "deviceName");
  const browsers = Object.keys(groupByBrowser);

  return (
    <Box my={2}>
      {browsers.map((name) => {
        const tabs = groupByBrowser[name];
        return (
          <Card
            key={name}
            variant="outlined"
            sx={{ mb: 2, wordBreak: "break-word", border: 0 }}
          >
            <CardHeader
              sx={{ borderBottom: `0.5px solid ${theme.palette.grey[400]}` }}
              title={name || "Unknown ¯\\_(ツ)_/¯ "}
              action={
                <Box>
                  <Tooltip
                    title={view === "open_tabs" ? "Archive tabs" : "Clear"}
                  >
                    <IconButton onClick={() => onClear(name)}>
                      {view === "open_tabs" && <ArchiveTwoTone />}
                      {view === "archived_tabs" && <DeleteForeverTwoTone />}
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={2} alignItems="stretch">
                {tabs.map((tab: ITab) => {
                  return <UrlGridItem key={tab.id} tab={tab} />;
                })}
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default UrlGrid;
