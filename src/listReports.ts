import { loadData } from './utils/fileDatabase';

export async function listCategoriesWithProducts(): Promise<void> {
  const categories = loadData();

  if (categories.length === 0) {
    console.log('Nenhuma categoria cadastrada.');
    return;
  }

  categories.forEach((category) => {
    console.log(`\nCategoria: ${category.nome}`);
    if (category.produtos.length === 0) {
      console.log('  Nenhum produto cadastrado para esta categoria.');
    } else {
      console.table(
        category.produtos.map((p) => ({
          Nome: p.nome,
          Descrição: p.descricao,
          Preço: p.preco.toFixed(2),
          Quantidade: p.quantidade,
        }))
      );
    }
  });
}
