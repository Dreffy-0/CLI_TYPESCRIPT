import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome?: string;

  @Column()
  descricao?: string;

  @Column()
  dataCriacao?: Date;

  @OneToMany(() => Product, (product) => product.categoria)
  produtos?: Product[];
}
