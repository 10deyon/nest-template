import mysql from 'mysql2/promise';
import config from '../core/config/config';

const CONFIG = config();

const connection = mysql.createPool({
  host: CONFIG.DB_HOST,
  user: CONFIG.DB_USERNAME,
  database: CONFIG.DB_DATABASE,
  password: CONFIG.DB_PASSWORD,
});

export default connection;
