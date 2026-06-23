import { User } from '../../user/entities/user.entity';
import { Auction } from '../../auction/entities/auction.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'numeric', scale: 2, nullable: true })
  bidPrice!: number;

  @Column({ type: 'numeric' })
  auctionId!: number;

  @Column({ type: 'numeric' })
  buyerId!: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @ManyToOne(() => Auction, (auction: Auction) => auction.offers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'auctionId' })
  auction!: Auction;

  @ManyToOne(() => User, (user: User) => user.offers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buyerId' })
  buyer!: User;
}
