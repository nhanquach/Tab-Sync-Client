import React, { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { WebStoriesTwoTone } from "@mui/icons-material";

import { ITab } from "../interfaces/iTab";

import styles from "../styles/UrlGrid.module.css";

interface ITabItemProps {
  tab: ITab;
  layout: "list" | "grid";
}

const TabItem: React.FC<ITabItemProps> = ({ tab, layout }) => {
  const [showFallback, setshowFallback] = useState(false);

  const handleOnErrorImage = () => {
    setshowFallback(true);
  };

  if (layout === "list") {
    return (
      <Box display="flex" alignItems="flex-start" gap={2}>
        {!showFallback ? (
          <img
            src={tab.favIconUrl}
            height={30}
            width={30}
            style={{ minWidth: 30 }}
            alt="favicon"
            onError={handleOnErrorImage}
          />
        ) : (
          <WebStoriesTwoTone sx={{ fontSize: 30 }} />
        )}
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
            opened on {dayjs(tab.timeStamp).format("DD-MMM-YYYY HH:mm:ss")}
          </div>
          <Box my={1} />
        </Box>
      </Box>
    );
  }

  if (layout === "grid") {
    return (
      <Grid item alignSelf="stretch" xs={12} sm={6} md={4} lg={3}>
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
                <Typography variant="subtitle2">{tab.url}</Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  opened on{" "}
                  {dayjs(tab.timeStamp).format("DD-MMM-YYYY HH:mm:ss")}
                </Typography>
              </>
            }
          >
            <Card sx={{ height: "100%", borderRadius: 4 }} variant="outlined">
              <CardContent>
                {!showFallback ? (
                  <img
                    src={tab.favIconUrl}
                    height={30}
                    width={30}
                    style={{ minWidth: 30 }}
                    alt="favicon"
                    onError={handleOnErrorImage}
                  />
                ) : (
                  <WebStoriesTwoTone sx={{ fontSize: 30 }} />
                )}
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  flex={1}
                  minWidth={0}
                >
                  <Typography fontWeight={600}>{tab.title}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Tooltip>
        </Link>
      </Grid>
    );
  }

  return null;
};

export default TabItem;
