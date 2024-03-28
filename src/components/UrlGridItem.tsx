import { WebStoriesTwoTone } from "@mui/icons-material";
import {
  Grid,
  Link,
  Tooltip,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";

import { ITab } from "../interfaces/iTab";

import styles from "../styles/UrlGrid.module.css";
import { useLoadFavIcon } from "../hooks/useLoadFavIcon";

interface IUrlGridItemProps {
  tab: ITab;
}

const UrlGridItem: React.FC<IUrlGridItemProps> = ({ tab }) => {
  const [showFallback, handleOnErrorImage] = useLoadFavIcon();

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
                opened on {dayjs(tab.timeStamp).format("DD-MMM-YYYY HH:mm:ss")}
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
};

export default UrlGridItem;
