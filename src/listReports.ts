import { getCategories } from './controllers/categoryController';
import { getProducts } from './controllers/productController';

export function listCategoriesWithProducts(): void {
  const categories = getCategories();
  const products = getProducts();

  if (categories.length === 0) {
    console.log('Nenhuma categoria cadastrada.');
    return;
  }

  categories.forEach(category => {
    console.log(`\nCategoria: ${category.nome} (ID: ${category.id})`);
    console.log('Descrição:', category.descricao);
    console.log('Data de Criação:', category.dataCriacao);
    
    // Filtra os produtos que pertencem a esta categoria
    const produtosDaCategoria = products.filter(p => p.categoriaId === category.id);
    
    if (produtosDaCategoria.length === 0) {
      console.log('  Nenhum produto cadastrado para esta categoria.');
    } else {
      console.table(produtosDaCategoria, ['id', 'nome', 'descricao', 'preco', 'quantidade', 'dataCriacao', 'dataAtualizacao']);
    }
  });
}
