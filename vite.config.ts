import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "TabSync - Your Tabs Accross Devices",
        short_name: "TabSync",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: "/",
        share_target: {
          action: "/share",
          params: {
            title: "title",
            text: "text",
            url: "url",
          },
        },
        display: "standalone",
        theme_color: "#8f94fb",
        background_color: "#ddd",
      },
    }),
  ],
});
