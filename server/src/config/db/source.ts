import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { dbConstants } from '../constants';
import { User } from 'src/user/entity/user.entity';

const config = {
  type: 'postgres',
  host: dbConstants.host,
  port: Number(dbConstants.port),
  username: dbConstants.username,
  password: dbConstants.password,
  database: dbConstants.database,
  entities: [User],
  synchronize: false,
};

export const dbSource = registerAs('dbSource', () => config);
export const AppDataSource = new DataSource(config as DataSourceOptions);
