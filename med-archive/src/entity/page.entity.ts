import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsString, IsBoolean, IsInt, MaxLength } from 'class-validator';

@Entity('page')
export class Page extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  section: number;

  @Column({ length: 255 })
  @IsString()
  @MaxLength(255)
  title: string;

  @Column('text')
  @IsString()
  content: string;

  @Column({ default: true })
  @IsBoolean()
  published: boolean;

  @Column({ length: 255, unique: true })
  @IsString()
  @MaxLength(255)
  slug: string;
}
