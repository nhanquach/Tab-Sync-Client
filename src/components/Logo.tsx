import { SVGProps } from "react";
import { useTheme } from "@mui/material";

const Logo = (props: SVGProps<SVGSVGElement>) => {
  const theme = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 132.813 120"
      style={{
        backgroundColor: theme.palette.primary.main,
        borderRadius: "20%",
      }}
      {...props}
    >
      <path
        fill="#fff"
        d="M107.55 90H75c-2.75 0 -5 -2.25 -5 -5s2.25 -5 5 -5h6.25v-1.25c0 -4.85 3.9 -8.75 8.75 -8.75s8.75 3.9 8.75 8.75V85h8.8c1.4 0 2.5 1.1 2.5 2.5 -0.05 1.35 -1.15 2.5 -2.5 2.5z"
        opacity={0.3}
      />
      <path
        fill="#fff"
        d="M107.5 74.9c-0.1 0 -0.15 0 -0.25 0.05A17.45 17.45 0 0 0 90 60c-7 0 -13 4.15 -15.8 10.1A14.94 14.94 0 0 0 60 85c0 8.3 6.7 15 15 15l32.5 -0.1a12.5 12.5 0 0 0 0 -25zm0.05 15.1H75c-2.75 0 -5 -2.25 -5 -5s2.25 -5 5 -5h6.25v-1.25c0 -4.85 3.9 -8.75 8.75 -8.75s8.75 3.9 8.75 8.75V85h8.8c1.4 0 2.5 1.1 2.5 2.5 -0.05 1.35 -1.15 2.5 -2.5 2.5zM50 21.3v10.45C38.35 35.9 30 46.95 30 60c0 8.85 3.9 16.7 10 22.2V70h10v30H20v-10h13.65A39.71 39.71 0 0 1 20 60c0 -18.65 12.75 -34.25 30 -38.7zM100 30h-13.65a39.9 39.9 0 0 1 13.3 25h-10.1c-1.15 -6.8 -4.65 -12.75 -9.55 -17.2V50h-10V20h30v10z"
      />
    </svg>
  );
};

export default Logo;
