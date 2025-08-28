// Configuration for API endpoints
const config = {
  // Development environment
  development: {
    apiUrl: 'http://localhost:4000'
  },
  // Production environment
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://learn-lect.onrender.com'
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export the appropriate config
export const apiUrl = config[environment].apiUrl;
