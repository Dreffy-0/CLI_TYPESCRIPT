import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome?: string;

  @Column()
  descricao?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco?: number;

  @Column('int')
  quantidade?: number;

  @ManyToOne(() => Category, (category) => category.produtos)
  categoria?: Category;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao?: Date;

  @Column({ type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  dataAtualizacao?: Date; // Permite valores nulos e define um valor padrão
}
