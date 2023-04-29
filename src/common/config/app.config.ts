export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwtSecret: process.env.JWT_SECRET,
});
