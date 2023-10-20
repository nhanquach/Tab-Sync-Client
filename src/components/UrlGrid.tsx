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
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
  ArchiveTwoTone,
  DeleteForeverTwoTone,
  PhonelinkTwoTone,
} from "@mui/icons-material";

import { ITab } from "../interfaces/iTab";
import { IView } from "../interfaces/iView";

import styles from "../styles/UrlGrid.module.css";

interface IUrlGridProps {
  view: IView;
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
                  return (
                    <Grid
                      item
                      alignSelf="stretch"
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={tab.id}
                    >
                      <Link
                        underline="hover"
                        color="inherit"
                        href={tab.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Tooltip
                          enterDelay={1000}
                          classes={{ tooltip: styles["url-detail-tooltip"] }}
                          title={
                            <>
                              <Typography variant="subtitle2">
                                {tab.url}
                              </Typography>

                              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                                opened on{" "}
                                {dayjs(tab.timeStamp).format(
                                  "DD-MMM-YYYY HH:mm:ss"
                                )}
                              </Typography>
                            </>
                          }
                        >
                          <Card sx={{ height: "100%", borderRadius: 4 }}>
                            <CardContent>
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
                                <Typography fontWeight={600}>
                                  {tab.title}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Tooltip>
                      </Link>
                    </Grid>
                  );
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
