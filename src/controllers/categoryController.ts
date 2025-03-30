import * as readline from 'readline-sync';
import { loadData, saveData, Category } from '../utils/fileDatabase';

export function createCategory(): void {
  console.log('\n-- Criar Categoria --');
  const nome = readline.question('Nome: ');

  const categories = loadData();
  if (categories.find((c) => c.nome.toLowerCase() === nome.toLowerCase())) {
    console.log('Categoria já existe!');
    return;
  }

  categories.push({ nome, produtos: [] });
  saveData(categories);
  console.log('Categoria criada com sucesso!');
}

export function listCategories(): void {
  console.log('\n-- Listar Categorias --');
  const categories = loadData();
  if (categories.length === 0) {
    console.log('Nenhuma categoria cadastrada.');
    return;
  }
  categories.forEach((c, index) => console.log(`${index + 1}. ${c.nome}`));
}

export function removeCategory(): void {
  console.log('\n-- Remover Categoria --');
  const nome = readline.question('Digite o nome da categoria: ');

  const categories = loadData();
  const categoryIndex = categories.findIndex((c) => c.nome.toLowerCase() === nome.toLowerCase());
  if (categoryIndex === -1) {
    console.log('Categoria não encontrada.');
    return;
  }

  if (categories[categoryIndex].produtos.length > 0) {
    console.log('Não é possível remover uma categoria com produtos associados.');
    return;
  }

  categories.splice(categoryIndex, 1);
  saveData(categories);
  console.log('Categoria removida com sucesso!');
}

export function searchCategory(): void {
  console.log('\n-- Buscar Categoria --');
  const nome = readline.question('Digite o nome da categoria: ');

  const categories = loadData();
  const category = categories.find((c) => c.nome.toLowerCase() === nome.toLowerCase());
  if (!category) {
    console.log('Categoria não encontrada.');
    return;
  }

  console.log(`Categoria encontrada: ${category.nome}`);
  console.log(`Descrição: ${category.produtos.length > 0 ? 'Possui produtos associados' : 'Sem produtos associados'}`);
}

export function updateCategory(): void {
  console.log('\n-- Atualizar Categoria --');
  const nome = readline.question('Digite o nome da categoria: ');

  const categories = loadData();
  const category = categories.find((c) => c.nome.toLowerCase() === nome.toLowerCase());
  if (!category) {
    console.log('Categoria não encontrada.');
    return;
  }

  const novoNome = readline.question(`Novo nome (${category.nome}): `) || category.nome;
  category.nome = novoNome;

  saveData(categories);
  console.log('Categoria atualizada com sucesso!');
}
