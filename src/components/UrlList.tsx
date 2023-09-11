import React from "react";
import dayjs from "dayjs";
// @ts-ignore
import groupBy from "lodash.groupby";

import { ITab } from "../interfaces/iTab";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
} from "@mui/material";
import { PhonelinkTwoTone } from "@mui/icons-material";

interface IUrlListProps {
  onClear: (deviceName: string) => void;
  onRefresh: (e: React.MouseEvent) => void;
  urls: ITab[];
}

const UrlList: React.FC<IUrlListProps> = ({ onClear, onRefresh, urls }) => {
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
        <p>Still can see your tabs? Check if you are signed out.</p>
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
                <Box mt={1}>
                  <Button
                    className="outline"
                    onClick={() => onClear(name)}
                    style={{ border: 0, padding: "0 10px" }}
                    disabled={urls.length === 0}
                  >
                    Clear
                  </Button>
                  <Button
                    className="outline"
                    onClick={onRefresh}
                    style={{ border: 0, padding: "0 10px" }}
                  >
                    Refresh
                  </Button>
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
                        }}
                      >
                        <p
                          style={{
                            width: "100%",
                            fontSize: 14,
                            textOverflow: "ellipsis",
                            overflow: "auto",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {tab.url}
                        </p>
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
                      <hr />
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
