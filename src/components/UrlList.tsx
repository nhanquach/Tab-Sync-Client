import React from "react";
import dayjs from "dayjs";
// @ts-ignore
import groupBy from "lodash.groupby";

import { ITab } from "../interfaces/iTab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Link,
  Tooltip,
} from "@mui/material";
import {
  ArchiveTwoTone,
  DeleteForeverTwoTone,
  PhonelinkTwoTone,
} from "@mui/icons-material";
import { IView } from "../interfaces/iView";

interface IUrlListProps {
  view: IView;
  onClear: (deviceName: string) => void;
  urls: ITab[];
}

const UrlList: React.FC<IUrlListProps> = ({ onClear, urls, view }) => {
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
                return (
                  <Box
                    key={tab.id}
                    display="flex"
                    alignItems="flex-start"
                    gap={2}
                  >
                    <img
                      src={tab.favIconUrl}
                      height={30}
                      width={30}
                      style={{ minWidth: 30 }}
                      alt="favicon"
                    />
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap={1}
                      flex={1}
                      minWidth={0}
                    >
                      <Link
                        underline="hover"
                        color="inherit"
                        href={tab.url}
                        target="_blank"
                        rel="noreferrer"
                        fontWeight={700}
                      >
                        {tab.title}
                      </Link>
                      <Box
                        sx={{
                          flex: 1,
                          width: "100%",
                          fontSize: 14,
                          overflow: "auto",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {tab.url}
                      </Box>
                      <div
                        style={{
                          fontStyle: "italic",
                          fontSize: 14,
                        }}
                      >
                        opened on{" "}
                        {dayjs(tab.timeStamp).format("DD-MMM-YYYY HH:mm:ss")}
                      </div>
                      <Box my={1} />
                    </Box>
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default UrlList;
