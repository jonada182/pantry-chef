import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const definedVariables = {};
  definedVariables["process.env.FIREBASE_API_KEY"] = `"${env.FIREBASE_API_KEY}"`;

  return {
    plugins: [react()],
    envPrefix: "APP_",
    server: {
      port: 3000,
      host: true,
    },
    define: definedVariables,
  }
});
