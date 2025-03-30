import * as readline from 'readline-sync';
import { Product } from '../models/interfaces';
import { getCategories, listCategories } from './categoryController';

let products: Product[] = [];
let productIdCounter = 1;

export const getProducts = () => products;

export function createProduct(): void {
  console.log('\n-- Criar Produto --');
  const nome = readline.question('Nome: ');
  const descricao = readline.question('Descricao: ');
  const preco = Number(readline.question('Preco: '));
  const quantidade = Number(readline.question('Quantidade: '));

  // Exibe as categorias para o usuário escolher
  listCategories();
  const categoriaId = Number(readline.question('Digite o ID da categoria para associar: '));
  const categories = getCategories();
  if (!categories.find(c => c.id === categoriaId)) {
    console.log('Categoria invalida.');
    return;
  }

  const product: Product = {
    id: productIdCounter++,
    nome,
    descricao,
    preco,
    quantidade,
    categoriaId,
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  };

  products.push(product);
  console.log('Produto criado com sucesso!');
}

export function listProducts(): void {
  console.log('\n-- Listar Produtos --');
  if (products.length === 0) {
    console.log('Nenhum produto cadastrado.');
    return;
  }
  // Faz junção simples para exibir o nome da categoria
  const list = products.map(p => {
    const category = getCategories().find(c => c.id === p.categoriaId);
    return { ...p, categoriaNome: category ? category.nome : 'N/A' };
  });
  console.table(list, ['id', 'nome', 'descricao', 'preco', 'quantidade', 'categoriaId', 'categoriaNome', 'dataCriacao', 'dataAtualizacao']);
}

export function searchProduct(): void {
  console.log('\n-- Buscar Produto --');
  console.log('Escolha o critério de busca:');
  console.log('1 - Buscar por ID do produto');
  console.log('2 - Buscar por nome do produto');
  console.log('3 - Buscar por ID da categoria');
  const option = readline.question('Opção: ');

  let foundProducts: Product[] = [];

  switch (option) {
    case '1':
      const id = Number(readline.question('Digite o ID do produto: '));
      const productById = products.find(p => p.id === id);
      if (productById) {
        foundProducts.push(productById);
      }
      break;
    case '2':
      const name = readline.question('Digite o nome do produto: ');
      foundProducts = products.filter(p => p.nome.toLowerCase().includes(name.toLowerCase()));
      break;
    case '3':
      const categoryId = Number(readline.question('Digite o ID da categoria: '));
      foundProducts = products.filter(p => p.categoriaId === categoryId);
      break;
    default:
      console.log('Opção inválida.');
      return;
  }

  if (foundProducts.length > 0) {
    console.table(foundProducts);
  } else {
    console.log('Nenhum produto encontrado com o critério informado.');
  }
}


export function updateProduct(): void {
  console.log('\n-- Atualizar Produto --');
  const id = Number(readline.question('Digite o ID do produto: '));
  const product = products.find(p => p.id === id);
  if (!product) {
    console.log('Produto nao encontrado.');
    return;
  }
  const novoNome = readline.question(`Novo nome (${product.nome}): `) || product.nome;
  const novaDescricao = readline.question(`Nova descrição (${product.descricao}): `) || product.descricao;
  const novoPreco = readline.question(`Novo preço (${product.preco}): `);
  const novaQuantidade = readline.question(`Nova quantidade (${product.quantidade}): `);

  product.nome = novoNome;
  product.descricao = novaDescricao;
  if (novoPreco) product.preco = Number(novoPreco);
  if (novaQuantidade) product.quantidade = Number(novaQuantidade);
  product.dataAtualizacao = new Date();
  console.log('Produto atualizado com sucesso!');
}

export function removeProduct(): void {
  console.log('\n-- Remover Produto --');
  const id = Number(readline.question('Digite o ID do produto: '));
  const product = products.find(p => p.id === id);
  if (!product) {
    console.log('Produto nao encontrado.');
    return;
  }
  products = products.filter(p => p.id !== id);
  console.log('Produto removido com sucesso!');
}
