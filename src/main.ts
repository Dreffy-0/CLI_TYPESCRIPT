import * as readline from 'readline-sync';
import { createCategory, listCategories, searchCategory, updateCategory, removeCategory } from './controllers/categoryController';
import { createProduct, listProducts, searchProduct, updateProduct, removeProduct } from './controllers/productController';
import { listCategoriesWithProducts } from './listReports';
import { initializeDataSource } from './data-source';

async function categoryMenu(): Promise<void> {
  while (true) {
    console.log('\n--- Menu Categorias ---');
    console.log('1 - Criar categoria');
    console.log('2 - Listar categorias');
    console.log('3 - Buscar categoria');
    console.log('4 - Atualizar categoria');
    console.log('5 - Remover categoria');
    console.log('0 - Voltar');
    const option = readline.question('Escolha uma opcao: ');

    switch (option) {
      case '1':
        await createCategory();
        break;
      case '2':
        await listCategories(); // Chama a função para listar categorias
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
        return;
      default:
        console.log('Opção inválida!');
    }
  }
}

async function productMenu(): Promise<void> {
  while (true) {
    console.log('\n--- Menu Produtos ---');
    console.log('1 - Criar produto');
    console.log('2 - Listar produtos');
    console.log('3 - Buscar produto');
    console.log('4 - Atualizar produto');
    console.log('5 - Remover produto');
    console.log('0 - Voltar');
    const option = readline.question('Escolha uma opcao: ');

    switch (option) {
      case '1':
        await createProduct();
        break;
      case '2':
        await listProducts(); // Chama a função para listar produtos
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
        return;
      default:
        console.log('Opção inválida!');
    }
  }
}

async function mainMenu(): Promise<void> {
  while (true) {
    console.log('\n=== Sistema de Gerenciamento de Inventário ===');
    console.log('1 - Gestão de Categorias');
    console.log('2 - Gestão de Produtos');
    console.log('3 - Listar Categorias com Produtos');
    console.log('0 - Sair');
    const option = readline.question('Escolha uma opcao: ');

    switch (option) {
      case '1':
        await categoryMenu();
        break;
      case '2':
        await productMenu();
        break;
      case '3':
        await listCategoriesWithProducts(); // Chama a função para listar categorias com produtos
        break;
      case '0':
        console.log('Saindo...');
        process.exit(0);
      default:
        console.log('Opção inválida!');
    }
  }
}

async function main(): Promise<void> {
  await initializeDataSource();
  await mainMenu();
}

main().catch(error => console.error('Erro ao iniciar a aplicação:', error));
