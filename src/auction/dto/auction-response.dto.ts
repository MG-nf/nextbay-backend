import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OfferResponseDto } from 'src/offer/dto/offer-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import type { Status } from '../types/status';

@ApiSchema({
  name: 'Auction Response',
})
export class AuctionResponseDto {
  @ApiProperty({
    description: 'Auction ID',
    example: 1,
  })
  @Expose()
  id!: number;

  @ApiProperty({
    description: 'Auction title',
    example: 'Apple AirPods',
  })
  @Expose()
  title!: string;

  @ApiProperty({
    description: 'Auction description',
    example: 'Apple AirPods description',
  })
  @Expose()
  description!: string;

  @ApiProperty({
    description: 'Auction current bid proce',
    example: 99.99,
  })
  @Expose()
  currentPrice!: number;

  @ApiProperty({
    description: 'Auction start date',
    example: '2026-06-07T10:04:48.524Z',
  })
  @Expose()
  startDate!: Date;

  @ApiProperty({
    description: 'Auction end date',
    example: '2026-06-07T10:04:48.524Z',
  })
  @Expose()
  endDate!: Date;

  @ApiProperty({
    description: 'Seller information',
    example: 'John Doe',
  })
  @Expose()
  @Type(() => UserResponseDto)
  seller!: UserResponseDto;

  @ApiProperty({
    description: 'Bid history',
    example: [
      {
        id: 1,
        auctionId: 2,
        bidPrice: 99,
        buyer: { username: 'John Doe' },
        createdAt: '2026-06-07T10:04:48.524Z',
      },
      {
        id: 1,
        auctionId: 2,
        bidPrice: 133,
        buyer: { username: 'Jane Doe' },
        createdAt: '2026-06-07T10:05:48.524Z',
      },
    ],
  })
  @Expose()
  @Type(() => OfferResponseDto)
  offers!: OfferResponseDto[];

  @ApiProperty({
    description: 'Creation date',
    example: '2026-06-07T10:05:48.524Z',
  })
  @Expose()
  createdAt!: Date;

  @Expose()
  status!: Status;
}
