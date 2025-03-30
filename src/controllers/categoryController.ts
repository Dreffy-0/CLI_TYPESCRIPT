import * as readline from 'readline-sync';
import { Category } from '../models/interfaces';
import { getProducts } from './productController';

let categories: Category[] = [];
let categoryIdCounter = 1;

export const getCategories = () => categories;

export function createCategory(): void {
  console.log('\n-- Criar Categoria --');
  const nome = readline.question('Nome: ');
  const descricao = readline.question('Descricao: ');

  // Verifica se já existe categoria com mesmo nome
  if (categories.find(c => c.nome.toLowerCase() === nome.toLowerCase())) {
    console.log('Categoria ja existe!');
    return;
  }

  const category: Category = {
    id: categoryIdCounter++,
    nome,
    descricao,
    dataCriacao: new Date()
  };

  categories.push(category);
  console.log('Categoria criada com sucesso!');
}

export function listCategories(): void {
  console.log('\n-- Listar Categorias --');
  if (categories.length === 0) {
    console.log('Nenhuma categoria cadastrada.');
    return;
  }
  console.table(categories, ['id', 'nome', 'descricao', 'dataCriacao']);
}

export function searchCategory(): void {
  console.log('\n-- Buscar Categoria --');
  const input = readline.question('Buscar por (id/nome): ');
  let category: Category | undefined;
  if (!isNaN(Number(input))) {
    category = categories.find(c => c.id === Number(input));
  } else {
    category = categories.find(c => c.nome.toLowerCase() === input.toLowerCase());
  }

  if (category) {
    console.table([category]);
  } else {
    console.log('Categoria nao encontrada.');
  }
}

export function updateCategory(): void {
  console.log('\n-- Atualizar Categoria --');
  const id = Number(readline.question('Digite o ID da categoria: '));
  const category = categories.find(c => c.id === id);
  if (!category) {
    console.log('Categoria nao encontrada.');
    return;
  }
  const novoNome = readline.question(`Novo nome (${category.nome}): `) || category.nome;
  const novaDescricao = readline.question(`Nova descrição (${category.descricao}): `) || category.descricao;

  category.nome = novoNome;
  category.descricao = novaDescricao;
  console.log('Categoria atualizada com sucesso!');
}

export function removeCategory(): void {
  console.log('\n-- Remover Categoria --');
  const id = Number(readline.question('Digite o ID da categoria: '));
  const category = categories.find(c => c.id === id);
  if (!category) {
    console.log('Categoria nao encontrada.');
    return;
  }
  // Verifica se existem produtos associados à categoria
  const associatedProducts = getProducts().filter(p => p.categoriaId === id);
  if (associatedProducts.length > 0) {
    console.log('Nao eh possivel remover categoria com produtos associados.');
    return;
  }
  categories = categories.filter(c => c.id !== id);
  console.log('Categoria removida com sucesso!');
}
