import React from "react";
// @ts-ignore
import groupBy from "lodash.groupby";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ArchiveTwoTone, DeleteForeverTwoTone } from "@mui/icons-material";

import { ITab } from "../interfaces/iTab";
import { TABS_VIEWS } from "../interfaces/iView";
import UrlListItem from "./UrlListItem";

interface IUrlListProps {
  view: TABS_VIEWS;
  onClear: (deviceName: string) => void;
  urls: ITab[];
}

const UrlList: React.FC<IUrlListProps> = ({ onClear, urls, view }) => {
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
            sx={{ mb: 2, wordBreak: "break-word" }}
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
              {tabs.map((tab: ITab) => {
                return <UrlListItem tab={tab} key={tab.id} />;
              })}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default UrlList;
