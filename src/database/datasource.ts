import { DataSource, DataSourceOptions } from 'typeorm';

import config from '../core/config/config';

const CONFIG = config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: CONFIG.DB_HOST,
  port: 3306,
  username: CONFIG.DB_USERNAME,
  password: '',
  database: CONFIG.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
};

export const dataSource: DataSource = new DataSource(dataSourceOptions);
