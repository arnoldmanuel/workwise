import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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
  @CreateDateColumn({type: Date})
  createdDate: Date;

  @Column({nullable: true})
  publicityDate: Date;
}
