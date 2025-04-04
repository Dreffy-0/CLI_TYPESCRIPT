import * as readline from 'readline-sync';
import { AppDataSource } from '../data-source';
import { Category } from '../models/entities/Category';
import { Product } from '../models/entities/Product';
import { getProducts } from './productController';

let categories: Category[] = [];
let categoryIdCounter = 1;

export const getCategories = () => categories;

export async function createCategory(): Promise<void> {
  const categoryRepository = AppDataSource.getRepository(Category);
  console.log('\n-- Criar Categoria --');
  const nome = readline.question('Nome: ');
  const descricao = readline.question('Descricao: ');

  const existingCategory = await categoryRepository.findOne({ where: { nome } });
  if (existingCategory) {
    console.log('Categoria já existe!');
    return;
  }

  const category = categoryRepository.create({ nome, descricao });
  await categoryRepository.save(category); // Salva a categoria no banco de dados imediatamente
  console.log('Categoria criada com sucesso!');
}

export async function listCategories(): Promise<void> {
  const categoryRepository = AppDataSource.getRepository(Category);

  console.log('\n-- Listar Categorias --');
  const categories = await categoryRepository.find(); // Busca todas as categorias do banco de dados

  if (categories.length === 0) {
    console.log('Nenhuma categoria cadastrada.');
    return;
  }

  console.table(categories, ['id', 'nome', 'descricao', 'dataCriacao']);
}

export async function listCategoriesWithProducts(): Promise<void> {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categories = await categoryRepository.find({ relations: ['produtos'] });

  console.log('\n-- Categorias com Produtos --');
  categories.forEach(category => {
    console.log(`Categoria: ${category.nome}`);
    if (category.produtos && category.produtos.length > 0) {
      category.produtos.forEach(product => {
        console.log(`  - Produto: ${product.nome}, Quantidade: ${product.quantidade}`);
      });
    } else {
      console.log('  Nenhum produto associado.');
    }
  });
}

export async function searchCategory(): Promise<void> {
  const categoryRepository = AppDataSource.getRepository(Category);
  console.log('\n-- Buscar Categoria --');
  const input = readline.question('Buscar por (id/nome): ');

  let category: Category | undefined;
  if (!isNaN(Number(input))) {
    category = await categoryRepository.findOne({ where: { id: Number(input) } }) || undefined;
  } else {
    category = await categoryRepository.findOne({ where: { nome: input } }) || undefined;
  }

  if (category) {
    console.table([category]);
  } else {
    console.log('Categoria não encontrada.');
  }
}

export async function updateCategory(): Promise<void> {
  const categoryRepository = AppDataSource.getRepository(Category);
  console.log('\n-- Atualizar Categoria --');
  const id = Number(readline.question('Digite o ID da categoria: '));
  const category = await categoryRepository.findOne({ where: { id } });

  if (!category) {
    console.log('Categoria não encontrada.');
    return;
  }

  const novoNome = readline.question(`Novo nome (${category.nome}): `) || category.nome;
  const novaDescricao = readline.question(`Nova descrição (${category.descricao}): `) || category.descricao;

  category.nome = novoNome;
  category.descricao = novaDescricao;
  category.dataAtualizacao = new Date(); // Atualiza a data de modificação

  await categoryRepository.save(category);
  console.log('Categoria atualizada com sucesso!');
}

export async function removeCategory(): Promise<void> {
  const categoryRepository = AppDataSource.getRepository(Category);
  const productRepository = AppDataSource.getRepository(Product);

  console.log('\n-- Remover Categoria --');
  const id = Number(readline.question('Digite o ID da categoria: '));
  const category = await categoryRepository.findOne({ where: { id } });

  if (!category) {
    console.log('Categoria não encontrada.');
    return;
  }

  const associatedProducts = await productRepository.find({ where: { categoria: { id } } });
  if (associatedProducts.length > 0) {
    console.log('Não é possível remover categoria com produtos associados.');
    return;
  }

  await categoryRepository.remove(category);
  console.log('Categoria removida com sucesso!');
}
