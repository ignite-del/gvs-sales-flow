
export const buildInfo = {
  version: '1.0.0',
  buildDate: new Date().toISOString(),
  environment: process.env.NODE_ENV || 'development',
  features: {
    authentication: 'mock', // Will be 'supabase' after integration
    database: 'localStorage', // Will be 'supabase' after integration
    fileStorage: 'none', // Will be 'supabase' after integration
    emailService: 'none' // Will be 'supabase' after integration
  }
};

export const isProduction = () => buildInfo.environment === 'production';
export const isDevelopment = () => buildInfo.environment === 'development';

export const logBuildInfo = () => {
  console.log('🚀 GVS Sales Platform');
  console.log('📦 Version:', buildInfo.version);
  console.log('🏗️ Build Date:', buildInfo.buildDate);
  console.log('🌍 Environment:', buildInfo.environment);
  console.log('🔧 Features:', buildInfo.features);
};
