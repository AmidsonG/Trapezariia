import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.trapezaria.app',
  appName: 'Trapezaria',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0, // Desativa o splash automático
      backgroundColor: "#ffffff", // Cor de fundo, pode ser ajustada ou removida
      androidSplashResourceName: "splash", // Recurso de splash opcional
      androidScaleType: "CENTER_CROP", // Ajusta a escala
      showSpinner: false // Remove o spinner de carregamento
    }
  }
};

export default config;
