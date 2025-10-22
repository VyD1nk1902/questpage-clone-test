import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      include: [
        "stream",
        "http",
        "https",
        "url",
        "crypto",
        "util",
        "buffer",
        "events",
        "querystring",
        "path",
        "os",
        "assert",
      ],
      exclude: ["fs"],
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      external: [],
      output: {
        globals: {
          buffer: "Buffer",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  publicDir: "public",
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    include: [
      "@solana/web3.js",
      "@solana/spl-token",
      "@metaplex-foundation/umi",
      "@metaplex-foundation/mpl-token-metadata",
      "eventemitter3",
      "buffer",
    ],
  },
});
