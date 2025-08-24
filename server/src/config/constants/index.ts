import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const enviroment = process.env.NODE_ENV;

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRATION,
};
