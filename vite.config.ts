import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "development") {
    dotenv.config({ path: "./.env.local"});
  }

  return {
    plugins: [react()],
    envPrefix: "APP_",
    server: {
      port: 3000,
      host: true,
    },
    define: {
      "process.env.FIREBASE_API_KEY": `"${process.env.FIREBASE_API_KEY}"`,
    }
  }
});
