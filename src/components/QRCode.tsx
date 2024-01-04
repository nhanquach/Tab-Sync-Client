import * as React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface IQRCodeProps {
  width?: number;
  height?: number;
  text?: string;
}

const SVGComponent: React.FC<IQRCodeProps> = ({
  width = "264",
  height = "264",
  text = "",
}) => {
  // QR Code needs to be black in order to be scannable on most devices.
  const theme = useTheme();

  return (
    <Box
      mt={2}
      sx={{ backdropFilter: "blur(8px)", borderRadius: 2 }}
      display="flex"
      flexDirection="column"
      alignContent="center"
    >
      <Box
        bgcolor={theme.palette.common.white}
        borderRadius={6}
        sx={{ opacity: 0.9}}
      >
        <svg
          width={width}
          height={height}
          fill={theme.palette.common.black}
          viewBox="0 0 264 264"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path fill="transparent" d="M0 0h264v264H0z" />
          <defs>
            <path id="a" d="M0 0h8v8H0z" />
          </defs>
          <use xlinkHref="#a" x={32} y={32} />
          <use xlinkHref="#a" x={32} y={40} />
          <use xlinkHref="#a" x={32} y={48} />
          <use xlinkHref="#a" x={32} y={56} />
          <use xlinkHref="#a" x={32} y={64} />
          <use xlinkHref="#a" x={32} y={72} />
          <use xlinkHref="#a" x={32} y={80} />
          <use xlinkHref="#a" x={32} y={96} />
          <use xlinkHref="#a" x={32} y={104} />
          <use xlinkHref="#a" x={32} y={120} />
          <use xlinkHref="#a" x={32} y={128} />
          <use xlinkHref="#a" x={32} y={144} />
          <use xlinkHref="#a" x={32} y={152} />
          <use xlinkHref="#a" x={32} y={176} />
          <use xlinkHref="#a" x={32} y={184} />
          <use xlinkHref="#a" x={32} y={192} />
          <use xlinkHref="#a" x={32} y={200} />
          <use xlinkHref="#a" x={32} y={208} />
          <use xlinkHref="#a" x={32} y={216} />
          <use xlinkHref="#a" x={32} y={224} />
          <use xlinkHref="#a" x={40} y={32} />
          <use xlinkHref="#a" x={40} y={80} />
          <use xlinkHref="#a" x={40} y={96} />
          <use xlinkHref="#a" x={40} y={120} />
          <use xlinkHref="#a" x={40} y={128} />
          <use xlinkHref="#a" x={40} y={136} />
          <use xlinkHref="#a" x={40} y={144} />
          <use xlinkHref="#a" x={40} y={152} />
          <use xlinkHref="#a" x={40} y={176} />
          <use xlinkHref="#a" x={40} y={224} />
          <use xlinkHref="#a" x={48} y={32} />
          <use xlinkHref="#a" x={48} y={48} />
          <use xlinkHref="#a" x={48} y={56} />
          <use xlinkHref="#a" x={48} y={64} />
          <use xlinkHref="#a" x={48} y={80} />
          <use xlinkHref="#a" x={48} y={104} />
          <use xlinkHref="#a" x={48} y={128} />
          <use xlinkHref="#a" x={48} y={136} />
          <use xlinkHref="#a" x={48} y={176} />
          <use xlinkHref="#a" x={48} y={192} />
          <use xlinkHref="#a" x={48} y={200} />
          <use xlinkHref="#a" x={48} y={208} />
          <use xlinkHref="#a" x={48} y={224} />
          <use xlinkHref="#a" x={56} y={32} />
          <use xlinkHref="#a" x={56} y={48} />
          <use xlinkHref="#a" x={56} y={56} />
          <use xlinkHref="#a" x={56} y={64} />
          <use xlinkHref="#a" x={56} y={80} />
          <use xlinkHref="#a" x={56} y={104} />
          <use xlinkHref="#a" x={56} y={120} />
          <use xlinkHref="#a" x={56} y={136} />
          <use xlinkHref="#a" x={56} y={176} />
          <use xlinkHref="#a" x={56} y={192} />
          <use xlinkHref="#a" x={56} y={200} />
          <use xlinkHref="#a" x={56} y={208} />
          <use xlinkHref="#a" x={56} y={224} />
          <use xlinkHref="#a" x={64} y={32} />
          <use xlinkHref="#a" x={64} y={48} />
          <use xlinkHref="#a" x={64} y={56} />
          <use xlinkHref="#a" x={64} y={64} />
          <use xlinkHref="#a" x={64} y={80} />
          <use xlinkHref="#a" x={64} y={96} />
          <use xlinkHref="#a" x={64} y={104} />
          <use xlinkHref="#a" x={64} y={112} />
          <use xlinkHref="#a" x={64} y={136} />
          <use xlinkHref="#a" x={64} y={152} />
          <use xlinkHref="#a" x={64} y={176} />
          <use xlinkHref="#a" x={64} y={192} />
          <use xlinkHref="#a" x={64} y={200} />
          <use xlinkHref="#a" x={64} y={208} />
          <use xlinkHref="#a" x={64} y={224} />
          <use xlinkHref="#a" x={72} y={32} />
          <use xlinkHref="#a" x={72} y={80} />
          <use xlinkHref="#a" x={72} y={96} />
          <use xlinkHref="#a" x={72} y={112} />
          <use xlinkHref="#a" x={72} y={144} />
          <use xlinkHref="#a" x={72} y={160} />
          <use xlinkHref="#a" x={72} y={176} />
          <use xlinkHref="#a" x={72} y={224} />
          <use xlinkHref="#a" x={80} y={32} />
          <use xlinkHref="#a" x={80} y={40} />
          <use xlinkHref="#a" x={80} y={48} />
          <use xlinkHref="#a" x={80} y={56} />
          <use xlinkHref="#a" x={80} y={64} />
          <use xlinkHref="#a" x={80} y={72} />
          <use xlinkHref="#a" x={80} y={80} />
          <use xlinkHref="#a" x={80} y={96} />
          <use xlinkHref="#a" x={80} y={112} />
          <use xlinkHref="#a" x={80} y={128} />
          <use xlinkHref="#a" x={80} y={144} />
          <use xlinkHref="#a" x={80} y={160} />
          <use xlinkHref="#a" x={80} y={176} />
          <use xlinkHref="#a" x={80} y={184} />
          <use xlinkHref="#a" x={80} y={192} />
          <use xlinkHref="#a" x={80} y={200} />
          <use xlinkHref="#a" x={80} y={208} />
          <use xlinkHref="#a" x={80} y={216} />
          <use xlinkHref="#a" x={80} y={224} />
          <use xlinkHref="#a" x={88} y={112} />
          <use xlinkHref="#a" x={88} y={144} />
          <use xlinkHref="#a" x={88} y={152} />
          <use xlinkHref="#a" x={96} y={32} />
          <use xlinkHref="#a" x={96} y={40} />
          <use xlinkHref="#a" x={96} y={48} />
          <use xlinkHref="#a" x={96} y={56} />
          <use xlinkHref="#a" x={96} y={72} />
          <use xlinkHref="#a" x={96} y={80} />
          <use xlinkHref="#a" x={96} y={112} />
          <use xlinkHref="#a" x={96} y={120} />
          <use xlinkHref="#a" x={96} y={128} />
          <use xlinkHref="#a" x={96} y={160} />
          <use xlinkHref="#a" x={96} y={168} />
          <use xlinkHref="#a" x={96} y={184} />
          <use xlinkHref="#a" x={96} y={192} />
          <use xlinkHref="#a" x={96} y={216} />
          <use xlinkHref="#a" x={96} y={224} />
          <use xlinkHref="#a" x={104} y={48} />
          <use xlinkHref="#a" x={104} y={64} />
          <use xlinkHref="#a" x={104} y={72} />
          <use xlinkHref="#a" x={104} y={88} />
          <use xlinkHref="#a" x={104} y={104} />
          <use xlinkHref="#a" x={104} y={136} />
          <use xlinkHref="#a" x={104} y={160} />
          <use xlinkHref="#a" x={104} y={184} />
          <use xlinkHref="#a" x={104} y={200} />
          <use xlinkHref="#a" x={104} y={208} />
          <use xlinkHref="#a" x={104} y={216} />
          <use xlinkHref="#a" x={112} y={32} />
          <use xlinkHref="#a" x={112} y={48} />
          <use xlinkHref="#a" x={112} y={56} />
          <use xlinkHref="#a" x={112} y={72} />
          <use xlinkHref="#a" x={112} y={80} />
          <use xlinkHref="#a" x={112} y={120} />
          <use xlinkHref="#a" x={112} y={128} />
          <use xlinkHref="#a" x={112} y={152} />
          <use xlinkHref="#a" x={112} y={176} />
          <use xlinkHref="#a" x={112} y={184} />
          <use xlinkHref="#a" x={112} y={192} />
          <use xlinkHref="#a" x={112} y={224} />
          <use xlinkHref="#a" x={120} y={32} />
          <use xlinkHref="#a" x={120} y={48} />
          <use xlinkHref="#a" x={120} y={56} />
          <use xlinkHref="#a" x={120} y={64} />
          <use xlinkHref="#a" x={120} y={88} />
          <use xlinkHref="#a" x={120} y={104} />
          <use xlinkHref="#a" x={120} y={112} />
          <use xlinkHref="#a" x={120} y={128} />
          <use xlinkHref="#a" x={120} y={136} />
          <use xlinkHref="#a" x={120} y={144} />
          <use xlinkHref="#a" x={120} y={168} />
          <use xlinkHref="#a" x={120} y={176} />
          <use xlinkHref="#a" x={120} y={184} />
          <use xlinkHref="#a" x={120} y={200} />
          <use xlinkHref="#a" x={120} y={208} />
          <use xlinkHref="#a" x={128} y={40} />
          <use xlinkHref="#a" x={128} y={56} />
          <use xlinkHref="#a" x={128} y={80} />
          <use xlinkHref="#a" x={128} y={96} />
          <use xlinkHref="#a" x={128} y={120} />
          <use xlinkHref="#a" x={128} y={128} />
          <use xlinkHref="#a" x={128} y={136} />
          <use xlinkHref="#a" x={128} y={160} />
          <use xlinkHref="#a" x={128} y={176} />
          <use xlinkHref="#a" x={128} y={184} />
          <use xlinkHref="#a" x={128} y={192} />
          <use xlinkHref="#a" x={128} y={208} />
          <use xlinkHref="#a" x={128} y={216} />
          <use xlinkHref="#a" x={136} y={32} />
          <use xlinkHref="#a" x={136} y={56} />
          <use xlinkHref="#a" x={136} y={64} />
          <use xlinkHref="#a" x={136} y={72} />
          <use xlinkHref="#a" x={136} y={104} />
          <use xlinkHref="#a" x={136} y={112} />
          <use xlinkHref="#a" x={136} y={136} />
          <use xlinkHref="#a" x={136} y={144} />
          <use xlinkHref="#a" x={136} y={168} />
          <use xlinkHref="#a" x={136} y={208} />
          <use xlinkHref="#a" x={144} y={32} />
          <use xlinkHref="#a" x={144} y={40} />
          <use xlinkHref="#a" x={144} y={72} />
          <use xlinkHref="#a" x={144} y={80} />
          <use xlinkHref="#a" x={144} y={88} />
          <use xlinkHref="#a" x={144} y={96} />
          <use xlinkHref="#a" x={144} y={112} />
          <use xlinkHref="#a" x={144} y={136} />
          <use xlinkHref="#a" x={144} y={160} />
          <use xlinkHref="#a" x={144} y={176} />
          <use xlinkHref="#a" x={144} y={192} />
          <use xlinkHref="#a" x={144} y={200} />
          <use xlinkHref="#a" x={144} y={208} />
          <use xlinkHref="#a" x={152} y={32} />
          <use xlinkHref="#a" x={152} y={48} />
          <use xlinkHref="#a" x={152} y={64} />
          <use xlinkHref="#a" x={152} y={104} />
          <use xlinkHref="#a" x={152} y={112} />
          <use xlinkHref="#a" x={152} y={128} />
          <use xlinkHref="#a" x={152} y={136} />
          <use xlinkHref="#a" x={152} y={144} />
          <use xlinkHref="#a" x={152} y={152} />
          <use xlinkHref="#a" x={152} y={160} />
          <use xlinkHref="#a" x={152} y={168} />
          <use xlinkHref="#a" x={152} y={200} />
          <use xlinkHref="#a" x={152} y={208} />
          <use xlinkHref="#a" x={152} y={224} />
          <use xlinkHref="#a" x={160} y={32} />
          <use xlinkHref="#a" x={160} y={40} />
          <use xlinkHref="#a" x={160} y={56} />
          <use xlinkHref="#a" x={160} y={72} />
          <use xlinkHref="#a" x={160} y={80} />
          <use xlinkHref="#a" x={160} y={88} />
          <use xlinkHref="#a" x={160} y={104} />
          <use xlinkHref="#a" x={160} y={112} />
          <use xlinkHref="#a" x={160} y={136} />
          <use xlinkHref="#a" x={160} y={152} />
          <use xlinkHref="#a" x={160} y={160} />
          <use xlinkHref="#a" x={160} y={168} />
          <use xlinkHref="#a" x={160} y={176} />
          <use xlinkHref="#a" x={160} y={184} />
          <use xlinkHref="#a" x={160} y={192} />
          <use xlinkHref="#a" x={160} y={200} />
          <use xlinkHref="#a" x={160} y={208} />
          <use xlinkHref="#a" x={168} y={112} />
          <use xlinkHref="#a" x={168} y={128} />
          <use xlinkHref="#a" x={168} y={144} />
          <use xlinkHref="#a" x={168} y={152} />
          <use xlinkHref="#a" x={168} y={160} />
          <use xlinkHref="#a" x={168} y={192} />
          <use xlinkHref="#a" x={168} y={208} />
          <use xlinkHref="#a" x={168} y={224} />
          <use xlinkHref="#a" x={176} y={32} />
          <use xlinkHref="#a" x={176} y={40} />
          <use xlinkHref="#a" x={176} y={48} />
          <use xlinkHref="#a" x={176} y={56} />
          <use xlinkHref="#a" x={176} y={64} />
          <use xlinkHref="#a" x={176} y={72} />
          <use xlinkHref="#a" x={176} y={80} />
          <use xlinkHref="#a" x={176} y={128} />
          <use xlinkHref="#a" x={176} y={152} />
          <use xlinkHref="#a" x={176} y={160} />
          <use xlinkHref="#a" x={176} y={176} />
          <use xlinkHref="#a" x={176} y={192} />
          <use xlinkHref="#a" x={176} y={200} />
          <use xlinkHref="#a" x={176} y={208} />
          <use xlinkHref="#a" x={176} y={216} />
          <use xlinkHref="#a" x={176} y={224} />
          <use xlinkHref="#a" x={184} y={32} />
          <use xlinkHref="#a" x={184} y={80} />
          <use xlinkHref="#a" x={184} y={96} />
          <use xlinkHref="#a" x={184} y={120} />
          <use xlinkHref="#a" x={184} y={144} />
          <use xlinkHref="#a" x={184} y={152} />
          <use xlinkHref="#a" x={184} y={160} />
          <use xlinkHref="#a" x={184} y={192} />
          <use xlinkHref="#a" x={184} y={200} />
          <use xlinkHref="#a" x={184} y={216} />
          <use xlinkHref="#a" x={192} y={32} />
          <use xlinkHref="#a" x={192} y={48} />
          <use xlinkHref="#a" x={192} y={56} />
          <use xlinkHref="#a" x={192} y={64} />
          <use xlinkHref="#a" x={192} y={80} />
          <use xlinkHref="#a" x={192} y={104} />
          <use xlinkHref="#a" x={192} y={136} />
          <use xlinkHref="#a" x={192} y={144} />
          <use xlinkHref="#a" x={192} y={152} />
          <use xlinkHref="#a" x={192} y={160} />
          <use xlinkHref="#a" x={192} y={168} />
          <use xlinkHref="#a" x={192} y={176} />
          <use xlinkHref="#a" x={192} y={184} />
          <use xlinkHref="#a" x={192} y={192} />
          <use xlinkHref="#a" x={192} y={216} />
          <use xlinkHref="#a" x={200} y={32} />
          <use xlinkHref="#a" x={200} y={48} />
          <use xlinkHref="#a" x={200} y={56} />
          <use xlinkHref="#a" x={200} y={64} />
          <use xlinkHref="#a" x={200} y={80} />
          <use xlinkHref="#a" x={200} y={96} />
          <use xlinkHref="#a" x={200} y={104} />
          <use xlinkHref="#a" x={200} y={112} />
          <use xlinkHref="#a" x={200} y={128} />
          <use xlinkHref="#a" x={200} y={144} />
          <use xlinkHref="#a" x={200} y={160} />
          <use xlinkHref="#a" x={200} y={184} />
          <use xlinkHref="#a" x={200} y={192} />
          <use xlinkHref="#a" x={200} y={208} />
          <use xlinkHref="#a" x={200} y={216} />
          <use xlinkHref="#a" x={208} y={32} />
          <use xlinkHref="#a" x={208} y={48} />
          <use xlinkHref="#a" x={208} y={56} />
          <use xlinkHref="#a" x={208} y={64} />
          <use xlinkHref="#a" x={208} y={80} />
          <use xlinkHref="#a" x={208} y={96} />
          <use xlinkHref="#a" x={208} y={112} />
          <use xlinkHref="#a" x={208} y={120} />
          <use xlinkHref="#a" x={208} y={128} />
          <use xlinkHref="#a" x={208} y={144} />
          <use xlinkHref="#a" x={208} y={152} />
          <use xlinkHref="#a" x={208} y={160} />
          <use xlinkHref="#a" x={208} y={184} />
          <use xlinkHref="#a" x={208} y={192} />
          <use xlinkHref="#a" x={208} y={200} />
          <use xlinkHref="#a" x={208} y={216} />
          <use xlinkHref="#a" x={208} y={224} />
          <use xlinkHref="#a" x={216} y={32} />
          <use xlinkHref="#a" x={216} y={80} />
          <use xlinkHref="#a" x={216} y={96} />
          <use xlinkHref="#a" x={216} y={104} />
          <use xlinkHref="#a" x={216} y={120} />
          <use xlinkHref="#a" x={216} y={128} />
          <use xlinkHref="#a" x={216} y={136} />
          <use xlinkHref="#a" x={216} y={152} />
          <use xlinkHref="#a" x={216} y={192} />
          <use xlinkHref="#a" x={216} y={200} />
          <use xlinkHref="#a" x={216} y={208} />
          <use xlinkHref="#a" x={216} y={216} />
          <use xlinkHref="#a" x={216} y={224} />
          <use xlinkHref="#a" x={224} y={32} />
          <use xlinkHref="#a" x={224} y={40} />
          <use xlinkHref="#a" x={224} y={48} />
          <use xlinkHref="#a" x={224} y={56} />
          <use xlinkHref="#a" x={224} y={64} />
          <use xlinkHref="#a" x={224} y={72} />
          <use xlinkHref="#a" x={224} y={80} />
          <use xlinkHref="#a" x={224} y={96} />
          <use xlinkHref="#a" x={224} y={128} />
          <use xlinkHref="#a" x={224} y={184} />
          <use xlinkHref="#a" x={224} y={200} />
          <use xlinkHref="#a" x={224} y={224} />
          <g />
        </svg>
      </Box>
      {text && (
        <Typography textAlign="center" fontStyle="italic">
          {text}
        </Typography>
      )}
    </Box>
  );
};
export default SVGComponent;
