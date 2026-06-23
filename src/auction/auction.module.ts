import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { Offer } from 'src/offer/entities/offer.entity';
import { OfferService } from 'src/offer/offer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, Offer])],
  providers: [AuctionService, OfferService],
  controllers: [AuctionController],
})
export class AuctionModule {}
