import 'reflect-metadata';
import { Auction } from './auction/entities/auction.entity';
import { Offer } from './offer/entities/offer.entity';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Auction, Offer, User],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
