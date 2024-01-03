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
} from "@mui/material";
import {
  ArchiveTwoTone,
  DeleteForeverTwoTone,
  PhonelinkTwoTone,
} from "@mui/icons-material";

import { ITab } from "../interfaces/iTab";

import { TABS_VIEWS } from "../interfaces/iView";
import TabItem from "./TabItem";

interface IUrlGridProps {
  view: TABS_VIEWS;
  onClear: (deviceName: string) => void;
  urls: ITab[];
}

const UrlGrid: React.FC<IUrlGridProps> = ({ onClear, urls, view }) => {
  const groupByBrowser = groupBy(urls, "deviceName");
  const browsers = Object.keys(groupByBrowser);

  if (urls.length === 0) {
    return (
      <Box
        mt={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <PhonelinkTwoTone sx={{ fontSize: 100, color: "#d3d3d3" }} />
        <p>
          No tab was found, continue browsing from your computers or phones.
        </p>
        <p>Your open tabs will be shown here.</p>
        <hr />
        <p>Still can't see your tabs? Check if you are signed out.</p>
      </Box>
    );
  }

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
                  return <TabItem key={tab.id} tab={tab} layout="grid" />;
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
