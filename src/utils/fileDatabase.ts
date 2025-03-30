import * as fs from 'fs';

const filePath = './data.md';

export interface Category {
  nome: string;
  produtos: Product[];
}

export interface Product {
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
}

export function loadData(): Category[] {
  if (!fs.existsSync(filePath)) {
    console.error('Arquivo data.md não encontrado.');
    return [];
  }

  // Certifique-se de que o arquivo é lido com a codificação correta
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const sections = fileContent.split('\n## ').map((section, index) => (index === 0 ? section : '## ' + section).trim());
  const categories: Category[] = [];

  for (const section of sections) {
    const lines = section.split('\n').filter((line) => line.trim() !== '');
    if (!lines[0].startsWith('## ')) {
      console.warn(`Seção ignorada: "${lines[0]}" não é uma categoria válida.`);
      continue;
    }

    const categoryName = lines[0].replace('## ', '').trim();
    const produtos: Product[] = lines.slice(1).map((line) => {
      if (!line.startsWith('- ')) {
        console.warn(`Linha ignorada (não é um produto): "${line}"`);
        return null;
      }

      const [nome, descricao, precoStr, quantidadeStr] = line.replace('- ', '').split('|').map((item) => item.trim());
      if (!nome || !descricao || isNaN(parseFloat(precoStr)) || isNaN(parseInt(quantidadeStr, 10))) {
        console.warn(`Produto ignorado: "${line}" está em um formato inválido.`);
        return null;
      }

      return {
        nome,
        descricao,
        preco: parseFloat(precoStr),
        quantidade: parseInt(quantidadeStr, 10),
      };
    }).filter((p) => p !== null) as Product[];

    categories.push({ nome: categoryName, produtos });
  }

  return categories;
}

export function saveData(categories: Category[]): void {
  const content = categories
    .map((category) => {
      const produtos = category.produtos
        .map((p) => `- ${p.nome} | ${p.descricao} | ${p.preco.toFixed(2)} | ${p.quantidade}`)
        .join('\n');
      return `## ${category.nome}\n${produtos}`;
    })
    .join('\n\n');

  // Certifique-se de que o arquivo é salvo com a codificação correta
  fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
}
