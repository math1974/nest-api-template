import { SequelizeModuleOptions } from '@nestjs/sequelize';

import { config } from 'dotenv';

config();

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  uri: process.env.DATABASE_URL,
  autoLoadModels: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  synchronize: false,
  query: {
    logging: false,
  },
  define: {
    underscored: true,
  },
};
