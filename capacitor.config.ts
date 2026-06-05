import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tarima.freestyle',
  appName: 'Tarima',
  webDir: 'out',
  backgroundColor: '#0a0a0b',
  android: {
    backgroundColor: '#0a0a0b',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 600,
      backgroundColor: '#0a0a0b',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK', // "DARK" content style => light icons over our dark bg
      backgroundColor: '#0a0a0b',
    },
  },
};

export default config;
