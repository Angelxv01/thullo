import dotenv from 'dotenv';
dotenv.config();

const {PORT} = process.env;
const SALT_ROUND = process.env.SALT_ROUND || '10';
const SECRET = process.env.SECRET || 'fjeiopfhq334jajfe';
const MONGODB =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_TEST
    : process.env.MONGODB;

export default {PORT, SECRET, MONGODB, SALT_ROUND};
