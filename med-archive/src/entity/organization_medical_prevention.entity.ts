import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsString, IsBoolean, IsInt, MaxLength } from 'class-validator';

@Entity('organization_medical_prevention')
export class OrganizationMedicalPrevention extends BaseEntity  {
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
