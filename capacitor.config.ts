import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "ke.co.werudigital.app",
  appName: "Weru TV",
  webDir: "www",
  server: {
    url: "https://werudigital.co.ke",
    androidScheme: "https",
  },
};

export default config;
