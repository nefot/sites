import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from 'typeorm';
import { IsString, IsOptional, MaxLength } from 'class-validator';

@Entity('news')
export class News extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  @IsString()
  @MaxLength(200)
  title: string;

  @Column('text')
  @IsString()
  description: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string; // путь к файлу изображения

  @CreateDateColumn()
  created_at: Date;
}

