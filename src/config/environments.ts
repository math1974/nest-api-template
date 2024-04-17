import { config } from 'dotenv';

config();

export default {
  app_secret_key: process.env.APP_SECRET_KEY,
};
