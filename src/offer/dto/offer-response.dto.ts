import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@ApiSchema({
  name: 'Offer Response',
})
export class OfferResponseDto {
  @ApiProperty({
    description: 'Offer ID',
    example: 1,
  })
  @Expose()
  id!: number;

  @ApiProperty({
    description: 'Auction ID',
    example: 99,
  })
  @Expose()
  auctionId!: number;

  @Expose()
  @ApiProperty({
    description: 'The bid price',
    example: 42,
  })
  bidPrice!: number;

  @Expose()
  @ApiProperty({
    description: 'Buyer info',
    example: { username: 'John Doe' },
  })
  @Type(() => UserResponseDto)
  buyer!: UserResponseDto;

  @ApiProperty({
    description: 'Creation date',
    example: '2026-06-04T10:04:48.000Z',
  })
  @Expose()
  createdAt!: Date;
}
