import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    define: {
      __EMAIL_API_KEY__: JSON.stringify(env.EMAIL_API_KEY),
      __EMAIL_SERVICE_KEY__: JSON.stringify(env.EMAIL_SERVICE_KEY),
      __EMAIL_TEMPLATE_KEY__: JSON.stringify(env.EMAIL_TEMPLATE_KEY),
    },
  };
});