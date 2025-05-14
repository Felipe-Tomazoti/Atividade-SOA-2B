import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class NameRankingQueryDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1930)
  @Max(2020)
  startDecade: number;

  @IsNumber()
  @Min(1930)
  @Max(2020)
  endDecade: number;
}

export class LocationNamesQueryDto {
  @IsString()
  location: string;
}

export class CompareNamesQueryDto {
  @IsString()
  firstName: string;

  @IsString()
  secondName: string;
}
