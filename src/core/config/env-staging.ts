import * as dotenv from 'dotenv';

dotenv.config();

export default {
  APP_NAME: process.env.APP_NAME || 'E-COMMERCE APP',
  API_URL: process.env.API_URL || 'http://localhost:3000/',
  APP_DEBUG: process.env.APP_DEBUG || false,
  APP_TIMEZONE: process.env.APP_TIMEZONE || 'Africa/Lagos',
  APP_PORT: process.env.APP_PORT || (3000 as number),
  APP_ENV: process.env.APP_ENV || ('staging' as string),

  JWT_SECRET:
    process.env.JWT_SECRET || 'eSlzb+NGcg0EC316a4WJEqnxKmHgsyvVewkMjv3BlRKQ==',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET ||
    'syvVewkMjv3BlRKQNGcg0EC316a4WJEqnxKmHg==',
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || '24h',

  DB_CONNECTION: process.env.DB_CONNECTION,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_SYNC: process.env.DB_DATABASE,
  DB_LOGGING: process.env.DB_DATABASE,

  SWAGGER_USER: process.env.SWAGGER_USER,
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD,

  HASH_PASSWORD:
    process.env.HASH_PASSWORD ||
    '#29thSeptember2023_NGcg0EC316a4WJEqnxKmHgsyvVewkMjv3BlRKQ#',
};
