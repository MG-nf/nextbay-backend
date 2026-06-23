import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ApiSchema({
  name: 'Create offer payload',
})
export class CreateOfferDto {
  @ApiProperty({
    description: 'The bid price',
    example: 42,
  })
  @IsNotEmpty()
  @IsNumber()
  bidPrice!: number;
}
