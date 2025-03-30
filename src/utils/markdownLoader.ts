import * as fs from 'fs';
import { AppDataSource } from '../data-source';
import { Category } from '../entities/Category';
import { Product } from '../entities/Product';

export async function seedDatabaseFromMarkdown(): Promise<void> {
  const filePath = './data.md'; // Caminho para o arquivo .md
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const categoryRepository = AppDataSource.getRepository(Category);
  const productRepository = AppDataSource.getRepository(Product);

  const sections = fileContent.split('\n# ').map((section) => section.trim()); // Divide por categorias
  for (const section of sections) {
    if (!section) continue;

    const lines = section.split('\n').filter((line) => line.trim() !== '');

    // A primeira linha é o nome da categoria
    const categoryLine = lines[0].startsWith('# ') ? lines[0].slice(2) : lines[0];
    const categoryName = categoryLine.trim();

    const category = categoryRepository.create({
      nome: categoryName,
      descricao: `Categoria de ${categoryName}`,
      dataCriacao: new Date(),
    });
    await categoryRepository.save(category);

    // As linhas seguintes são os produtos
    for (let i = 1; i < lines.length; i++) {
      const productLine = lines[i].trim();
      if (!productLine.startsWith('- ')) {
        console.warn(`Aviso: Linha ignorada (não é um produto): "${productLine}"`);
        continue;
      }

      const productData = productLine.replace('- ', '').trim();
      const [nome, descricao, precoStr, quantidadeStr] = productData.split('|').map((item) => item.trim());

      // Valida e converte os valores de preco e quantidade
      const preco = parseFloat(precoStr);
      const quantidade = parseInt(quantidadeStr, 10);

      if (!nome || !descricao || isNaN(preco) || isNaN(quantidade)) {
        console.error(`Erro ao processar o produto: "${productLine}". Verifique o formato do arquivo .md.`);
        continue; // Ignora este produto e passa para o próximo
      }

      const product = productRepository.create({
        nome,
        descricao,
        preco,
        quantidade,
        categoria: category,
        dataCriacao: new Date(),
        dataAtualizacao: new Date(),
      });
      await productRepository.save(product);
    }
  }

  console.log('Dados carregados do arquivo .md e salvos no banco de dados.');
}
