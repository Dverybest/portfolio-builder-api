export const appConfig = () => ({
  url: process.env.APP_URL,
  apiPrefix:'api/v1',
  frontendUrl: process.env.FRONT_END_URL,
  port: parseInt(process.env.PORT, 10) || 8080,
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwtSecret: process.env.JWT_SECRET,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
});
