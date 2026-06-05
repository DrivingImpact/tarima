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
    // OTA web-bundle updates (Capgo). autoUpdate stays OFF until a Capgo
    // project is set up (`npx @capgo/cli init`), so a launch build never
    // polls an unconfigured backend. Flip to true once configured; then
    // `npx @capgo/cli bundle upload` ships JS/UI changes without a Play
    // release. Native changes (plugins/permissions/icon) still need a build.
    CapacitorUpdater: {
      autoUpdate: false,
    },
  },
};

export default config;
