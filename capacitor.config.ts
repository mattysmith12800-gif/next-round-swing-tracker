import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f28f2ba5cf114663bc05d721e7032a34',
  appName: 'next-round-swing-tracker',
  webDir: 'dist',
  server: {
    url: 'https://f28f2ba5-cf11-4663-bc05-d721e7032a34.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#16a34a",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff",
    },
  },
};

export default config;