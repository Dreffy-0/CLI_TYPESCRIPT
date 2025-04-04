import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Category } from './models/entities/Category';
import { Product } from './models/entities/Product';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite',
  synchronize: true, // Garante que as tabelas sejam criadas automaticamente
  logging: false, // Ativa logs para verificar as consultas SQL
  entities: [Category, Product],
  migrations: [],
  subscribers: [],
  extra: {
    // Configuração para garantir que as alterações sejam gravadas imediatamente
    journal_mode: 'WAL',
  },
});

export async function initializeDataSource(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}
