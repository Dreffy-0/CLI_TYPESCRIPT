import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Category {
  @PrimaryGeneratedColumn() // Gera o ID automaticamente
  id!: number;

  @Column()
  nome!: string;

  @Column()
  descricao!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao!: Date;

  @Column({ type: 'datetime', nullable: true })
  dataAtualizacao?: Date;

  @OneToMany(() => Product, product => product.categoria)
  produtos?: Product[];
}
