import * as readline from 'readline-sync';
import { createCategory, listCategories, searchCategory, updateCategory, removeCategory } from './controllers/categoryController';
import { createProduct, listProducts, searchProduct, updateProduct, removeProduct } from './controllers/productController';
import { listCategoriesWithProducts } from './listReports';

function menuCategorias(): void {
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
        createCategory();
        break;
      case '2':
        listCategories();
        break;
      case '3':
        searchCategory();
        break;
      case '4':
        updateCategory();
        break;
      case '5':
        removeCategory();
        break;
      case '0':
        exit = true;
        break;
      default:
        console.log('Opcao invalida!');
    }
  }
}

function menuProdutos(): void {
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
        createProduct();
        break;
      case '2':
        listProducts();
        break;
      case '3':
        searchProduct();
        break;
      case '4':
        updateProduct();
        break;
      case '5':
        removeProduct();
        break;
      case '0':
        exit = true;
        break;
      default:
        console.log('Opcao invalida!');
    }
  }
}

function mainMenu(): void {
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
        menuCategorias();
        break;
      case '2':
        menuProdutos();
        break;
      case '3':
        listCategoriesWithProducts();
        break;
      case '0':
        exit = true;
        break;
      default:
        console.log('Opção inválida!');
    }
  }
}

mainMenu();
