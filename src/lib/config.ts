
export const config = {
  app: {
    name: 'GVS Sales Platform',
    version: '1.0.0',
    description: 'Professional Sales Management Platform',
    url: process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : 'http://localhost:5173'
  },
  company: {
    name: 'GVS',
    fullName: 'GVS Sales Platform',
    email: 'support@gvs.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, Suite 100\nBusiness City, BC 12345'
  },
  features: {
    enableRegistration: true,
    enableEmailNotifications: false,
    enableAdvancedReporting: false,
    maxLineItemsPerDocument: 50
  },
  pdf: {
    companyLogo: '/public/assets/images/logo.png',
    includeWatermark: false,
    defaultTemplate: 'professional'
  }
};

export default config;
