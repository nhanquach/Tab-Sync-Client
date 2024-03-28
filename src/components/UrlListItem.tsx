import React from "react";
import { WebStoriesTwoTone } from "@mui/icons-material";
import { Box, Link } from "@mui/material";
import dayjs from "dayjs";

import { ITab } from "../interfaces/iTab";
import { useLoadFavIcon } from "../hooks/useLoadFavIcon";

interface IUrlListItem {
  tab: ITab;
}

const UrlListItem: React.FC<IUrlListItem> = ({ tab }) => {
  const [showFallback, handleOnErrorImage] = useLoadFavIcon();

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
      <Box display="flex" flexDirection="column" gap={1} flex={1} minWidth={0}>
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
};

export default UrlListItem;
