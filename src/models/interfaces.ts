export interface Category {
    id: number;
    nome: string;
    descricao: string;
    dataCriacao: Date;
  }
  
  export interface Product {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoriaId: number;
    dataCriacao: Date;
    dataAtualizacao?: Date;
  }
  