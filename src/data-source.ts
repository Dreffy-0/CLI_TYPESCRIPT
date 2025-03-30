import { DataSource } from 'typeorm';
import { Category } from './entities/Category';
import { Product } from './entities/Product';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Category, Product],
});
