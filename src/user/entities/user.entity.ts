import { Exclude } from 'class-transformer';
import { Auction } from '../../auction/entities/auction.entity';
import { Offer } from '../../offer/entities/offer.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  username!: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password!: string;

  @OneToMany(() => Auction, (auction: Auction) => auction.seller)
  auctions!: Auction[];

  @OneToMany(() => Offer, (offer: Offer) => offer.buyer)
  offers!: Offer[];
}
