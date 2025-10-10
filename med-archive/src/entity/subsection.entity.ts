import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsString, IsBoolean, IsInt, MaxLength } from 'class-validator';

@Entity('subsection')
export class SubSection extends BaseEntity  {
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
}

