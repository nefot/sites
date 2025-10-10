import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsString, IsOptional, MaxLength, IsEmail } from 'class-validator';

@Entity('site_settings')
export class SiteSettings extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsString()
  @MaxLength(100)
  main_title: string;

  @Column({ length: 100 })
  @IsString()
  @MaxLength(100)
  subtitle: string;

  @Column({ length: 100 })
  @IsString()
  @MaxLength(100)
  block1_name: string;

  @Column({ length: 100 })
  @IsString()
  @MaxLength(100)
  block2_name: string;

  @Column({ length: 99 })
  @IsString()
  @MaxLength(99)
  block3_name: string;

  @Column({ length: 255 })
  @IsString()
  @MaxLength(255)
  site_name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  logo?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  mini_logo?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsEmail()
  contact_email?: string;

  @Column({ length: 20, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone_number?: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  facebook_link?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  twitter_link?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  instagram_link?: string;
}

