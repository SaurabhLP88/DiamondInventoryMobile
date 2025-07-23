import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'diatrac',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resize: "body" // or "ionic" if you're using IonContent properly
    }
  }
};

export default config;
