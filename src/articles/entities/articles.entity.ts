import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles')
export class Articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column('text')
  content: string;

  @Column()
  createdDate: Date;

  @Column()
  publicityDate: Date;
}
