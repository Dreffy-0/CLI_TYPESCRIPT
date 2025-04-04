import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn() // Gera o ID automaticamente
  id!: number;

  @Column()
  nome!: string;

  @Column()
  descricao!: string;

  @Column('decimal')
  preco!: number;

  @Column('int')
  quantidade!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao!: Date;

  @Column({ type: 'datetime', nullable: true })
  dataAtualizacao?: Date;

  @ManyToOne(() => Category, category => category.produtos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoriaId' })
  categoria!: Category;
}
