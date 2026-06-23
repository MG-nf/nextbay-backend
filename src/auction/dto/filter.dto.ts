import { IsInt, IsOptional, Min, Max, IsIn, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'Optional filter parameters',
})
export class FilterDto {
  @ApiProperty({
    description: 'Page',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number = 10;

  @ApiProperty({
    example: 'open',
    required: false,
  })
  @IsOptional()
  @IsIn(['open', 'closed'])
  @Type(() => String)
  status: string;

  @ApiProperty({
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number = 0;

  @ApiProperty({
    example: 10_000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  maxPrice?: number;

  @ApiProperty({
    example: 'desc',
    required: false,
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';
}
