import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrgDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;
}
