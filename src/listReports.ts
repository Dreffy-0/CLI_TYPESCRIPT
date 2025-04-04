import { AppDataSource } from './data-source';
import { Category } from './models/entities/Category';

export async function listCategoriesWithProducts(): Promise<void> {
  const categoryRepository = AppDataSource.getRepository(Category);

  console.log('\n-- Categorias com Produtos --');
  const categories = await categoryRepository.find({ relations: ['produtos'] }); // Inclui os produtos relacionados

  if (categories.length === 0) {
    console.log('Nenhuma categoria cadastrada.');
    return;
  }

  categories.forEach(category => {
    console.log(`Categoria: ${category.nome}`);
    if (category.produtos && category.produtos.length > 0) {
      category.produtos.forEach(product => {
        console.log(`  - Produto: ${product.nome}, Preço: ${product.preco}, Quantidade: ${product.quantidade}`);
      });
    } else {
      console.log('  Nenhum produto associado.');
    }
  });
}
