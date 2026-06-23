import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Auction } from 'src/auction/entities/auction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Auction])],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
