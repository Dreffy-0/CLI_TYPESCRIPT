import * as readline from 'readline-sync';
import { loadData, saveData, Product } from '../utils/fileDatabase';

export function createProduct(): void {
  console.log('\n-- Criar Produto --');
  const nome = readline.question('Nome: ');
  const descricao = readline.question('Descricao: ');
  const preco = parseFloat(readline.question('Preco: '));
  const quantidade = parseInt(readline.question('Quantidade: '), 10);

  const categories = loadData();
  if (categories.length === 0) {
    console.log('Nenhuma categoria cadastrada. Crie uma categoria primeiro.');
    return;
  }

  categories.forEach((c, index) => console.log(`${index + 1}. ${c.nome}`));
  const categoryIndex = parseInt(readline.question('Escolha o número da categoria: '), 10) - 1;

  if (categoryIndex < 0 || categoryIndex >= categories.length) {
    console.log('Categoria inválida.');
    return;
  }

  categories[categoryIndex].produtos.push({ nome, descricao, preco, quantidade });
  saveData(categories);
  console.log('Produto criado com sucesso!');
}

export function listProducts(): void {
  console.log('\n-- Listar Produtos --');
  const categories = loadData();
  categories.forEach((category) => {
    console.log(`\nCategoria: ${category.nome}`);
    if (category.produtos.length === 0) {
      console.log('  Nenhum produto cadastrado.');
    } else {
      category.produtos.forEach((p) =>
        console.log(`  - ${p.nome} | ${p.descricao} | ${p.preco.toFixed(2)} | ${p.quantidade}`)
      );
    }
  });
}

export function searchProduct(): void {
  console.log('\n-- Buscar Produto --');
  const nome = readline.question('Digite o nome do produto: ');

  const categories = loadData();
  const produtos = categories.flatMap((c) => c.produtos);
  const produto = produtos.find((p) => p.nome.toLowerCase() === nome.toLowerCase());
  if (!produto) {
    console.log('Produto não encontrado.');
    return;
  }

  console.log(`Produto encontrado: ${produto.nome}`);
  console.log(`Descrição: ${produto.descricao}`);
  console.log(`Preço: ${produto.preco.toFixed(2)}`);
  console.log(`Quantidade: ${produto.quantidade}`);
}

export function updateProduct(): void {
  console.log('\n-- Atualizar Produto --');
  const nome = readline.question('Digite o nome do produto: ');

  const categories = loadData();
  const category = categories.find((c) => c.produtos.some((p) => p.nome.toLowerCase() === nome.toLowerCase()));
  if (!category) {
    console.log('Produto não encontrado.');
    return;
  }

  const produto = category.produtos.find((p) => p.nome.toLowerCase() === nome.toLowerCase());
  if (!produto) return;

  const novoNome = readline.question(`Novo nome (${produto.nome}): `) || produto.nome;
  const novaDescricao = readline.question(`Nova descrição (${produto.descricao}): `) || produto.descricao;
  const novoPreco = readline.question(`Novo preço (${produto.preco}): `);
  const novaQuantidade = readline.question(`Nova quantidade (${produto.quantidade}): `);

  produto.nome = novoNome;
  produto.descricao = novaDescricao;
  if (novoPreco) produto.preco = parseFloat(novoPreco);
  if (novaQuantidade) produto.quantidade = parseInt(novaQuantidade, 10);

  saveData(categories);
  console.log('Produto atualizado com sucesso!');
}

export function removeProduct(): void {
  console.log('\n-- Remover Produto --');
  const nome = readline.question('Digite o nome do produto: ');

  const categories = loadData();
  const category = categories.find((c) => c.produtos.some((p) => p.nome.toLowerCase() === nome.toLowerCase()));
  if (!category) {
    console.log('Produto não encontrado.');
    return;
  }

  category.produtos = category.produtos.filter((p) => p.nome.toLowerCase() !== nome.toLowerCase());
  saveData(categories);
  console.log('Produto removido com sucesso!');
}
