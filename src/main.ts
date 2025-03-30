import * as readline from 'readline-sync';
import { AppDataSource } from './data-source';
import { createCategory, listCategories, searchCategory, updateCategory, removeCategory } from './controllers/categoryController';
import { createProduct, listProducts, searchProduct, updateProduct, removeProduct } from './controllers/productController';
import { listCategoriesWithProducts } from './listReports';

async function menuCategorias(): Promise<void> {
  let exit = false;
  while (!exit) {
    console.log('\n--- Menu Categorias ---');
    console.log('1 - Criar categoria');
    console.log('2 - Listar categorias');
    console.log('3 - Buscar categoria');
    console.log('4 - Atualizar categoria');
    console.log('5 - Remover categoria');
    console.log('0 - Voltar');
    const opcao = readline.question('Escolha uma opcao: ');

    switch (opcao) {
      case '1':
        await createCategory();
        break;
      case '2':
        await listCategories();
        break;
      case '3':
        await searchCategory();
        break;
      case '4':
        await updateCategory();
        break;
      case '5':
        await removeCategory();
        break;
      case '0':
        exit = true;
        break;
      default:
        console.log('Opcao invalida!');
    }
  }
}

async function menuProdutos(): Promise<void> {
  let exit = false;
  while (!exit) {
    console.log('\n--- Menu Produtos ---');
    console.log('1 - Criar produto');
    console.log('2 - Listar produtos');
    console.log('3 - Buscar produto');
    console.log('4 - Atualizar produto');
    console.log('5 - Remover produto');
    console.log('0 - Voltar');
    const opcao = readline.question('Escolha uma opcao: ');

    switch (opcao) {
      case '1':
        await createProduct();
        break;
      case '2':
        await listProducts();
        break;
      case '3':
        await searchProduct();
        break;
      case '4':
        await updateProduct();
        break;
      case '5':
        await removeProduct();
        break;
      case '0':
        exit = true;
        break;
      default:
        console.log('Opcao invalida!');
    }
  }
}

async function main(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log('Banco de dados inicializado.');

    let exit = false;
    while (!exit) {
      console.log('\n=== Sistema de Gerenciamento de Inventário ===');
      console.log('1 - Gestão de Categorias');
      console.log('2 - Gestão de Produtos');
      console.log('3 - Listar Categorias com Produtos');
      console.log('0 - Sair');
      const opcao = readline.question('Escolha uma opcao: ');

      switch (opcao) {
        case '1':
          await menuCategorias();
          break;
        case '2':
          await menuProdutos();
          break;
        case '3':
          await listCategoriesWithProducts();
          break;
        case '0':
          exit = true;
          break;
        default:
          console.log('Opção inválida!');
      }
    }

    console.log('Programa encerrado.');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

main();
