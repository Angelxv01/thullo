import dotenv from 'dotenv';
dotenv.config();

const {PORT} = process.env;
const MONGODB =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_TEST
    : process.env.MONGODB;

export default {PORT, MONGODB};
