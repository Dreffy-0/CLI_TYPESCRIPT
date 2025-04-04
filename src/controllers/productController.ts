import { AppDataSource } from '../data-source';
import { Product } from '../models/entities/Product';
import { Category } from '../models/entities/Category';
import * as readline from 'readline-sync';

let productIdCounter = 1;

export const getProducts = async () => {
  const productRepository = AppDataSource.getRepository(Product);
  return await productRepository.find();
};

export async function createProduct(): Promise<void> {
  const productRepository = AppDataSource.getRepository(Product);
  const categoryRepository = AppDataSource.getRepository(Category);

  console.log('\n-- Criar Produto --');
  const nome = readline.question('Nome: ');
  const descricao = readline.question('Descricao: ');
  const preco = Number(readline.question('Preco: '));
  const quantidade = Number(readline.question('Quantidade: '));

  const categorias = await categoryRepository.find();
  if (categorias.length === 0) {
    console.log('Nenhuma categoria disponível. Crie uma categoria antes de adicionar produtos.');
    return;
  }

  console.table(categorias, ['id', 'nome']);
  const categoriaId = Number(readline.question('Digite o ID da categoria para associar: '));
  const categoria = await categoryRepository.findOne({ where: { id: categoriaId } });
  if (!categoria) {
    console.log('Categoria inválida.');
    return;
  }

  const product = productRepository.create({ nome, descricao, preco, quantidade, categoria });
  await productRepository.save(product); // Salva o produto no banco de dados
  console.log('Produto criado com sucesso!');
}

export async function listProducts(): Promise<void> {
  const productRepository = AppDataSource.getRepository(Product);

  console.log('\n-- Listar Produtos --');
  const products = await productRepository.find({ relations: ['categoria'] }); // Inclui a categoria relacionada

  if (products.length === 0) {
    console.log('Nenhum produto cadastrado.');
    return;
  }

  // Ajusta a exibição para mostrar o nome da categoria corretamente
  const formattedProducts = products.map(product => ({
    id: product.id,
    nome: product.nome,
    descricao: product.descricao,
    preco: product.preco,
    quantidade: product.quantidade,
    categoria: product.categoria ? product.categoria.nome : 'Sem categoria', // Exibe "Sem categoria" se não houver categoria associada
    dataCriacao: product.dataCriacao,
  }));

  console.table(formattedProducts);
}

export async function searchProduct(): Promise<void> {
  const productRepository = AppDataSource.getRepository(Product);

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
      const productById = await productRepository.findOne({ where: { id }, relations: ['categoria'] });
      if (productById) {
        foundProducts.push(productById);
      }
      break;
    case '2':
      const name = readline.question('Digite o nome do produto: ');
      foundProducts = await productRepository.find({ where: { nome: name }, relations: ['categoria'] });
      break;
    case '3':
      const categoryId = Number(readline.question('Digite o ID da categoria: '));
      foundProducts = await productRepository.find({ where: { categoria: { id: categoryId } }, relations: ['categoria'] });
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

export async function updateProduct(): Promise<void> {
  const productRepository = AppDataSource.getRepository(Product);

  console.log('\n-- Atualizar Produto --');
  const id = Number(readline.question('Digite o ID do produto: '));
  const product = await productRepository.findOne({ where: { id } });
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
  await productRepository.save(product);
  console.log('Produto atualizado com sucesso!');
}

export async function removeProduct(): Promise<void> {
  const productRepository = AppDataSource.getRepository(Product);

  console.log('\n-- Remover Produto --');
  const id = Number(readline.question('Digite o ID do produto: '));
  const product = await productRepository.findOne({ where: { id } });
  if (!product) {
    console.log('Produto nao encontrado.');
    return;
  }
  await productRepository.remove(product);
  console.log('Produto removido com sucesso!');
}
