import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT as string;
export const SALT_ROUND = process.env.SALT_ROUND as string;
export const SECRET = process.env.SECRET as string;
export const MONGODB =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_TEST
    : process.env.MONGODB;
