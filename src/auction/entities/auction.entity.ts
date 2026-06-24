import { User } from '../../user/entities/user.entity';
import { Offer } from '../../offer/entities/offer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar' })
  description!: string;

  @Column({ type: 'numeric', scale: 2 })
  startingPrice!: number;

  @Column({ type: 'numeric', scale: 2 })
  currentPrice!: number;

  @Column({ type: 'timestamptz' })
  endDate!: Date;

  @Column({ type: 'numeric' })
  sellerId!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @OneToMany(() => Offer, (offer) => offer.auction)
  offers!: Offer[];

  @ManyToOne(() => User, (user: User) => user.auctions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sellerId' })
  seller!: User;
}
