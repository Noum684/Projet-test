import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjetDto {
  @IsNotEmpty()
  title: string;

  description?: string;

  @IsNotEmpty()
  organizationId: string;
}
