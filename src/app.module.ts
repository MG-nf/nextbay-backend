import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuctionModule } from './auction/auction.module';
import { OfferModule } from './offer/offer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auction/entities/auction.entity';
import { Offer } from './offer/entities/offer.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    AuctionModule,
    OfferModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './data/dark-bay.sqlite',
      entities: [Auction, Offer, User],
      synchronize: false,
      logging: false,
      enableWAL: true,
      statementCacheSize: 100,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
