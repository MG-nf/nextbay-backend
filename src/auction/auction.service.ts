import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import {
  Between,
  FindOperator,
  LessThanOrEqual,
  MoreThan,
  Repository,
} from 'typeorm';
import { AuctionResponseDto } from './dto/auction-response.dto';
import { FilterDto } from './dto/filter.dto';
import { AuthenticatedUser } from 'src/auth/types/authenticated-user';
import { Status } from './types/status';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,
  ) {}

  async create(user: AuthenticatedUser, createAuctionDto: CreateAuctionDto) {
    const endDate = !createAuctionDto.endDate
      ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // Default to 3 days from now
      : new Date(createAuctionDto.endDate);

    const auctionPayload = this.auctionRepository.create({
      ...createAuctionDto,
      endDate: endDate,
      currentPrice: createAuctionDto.startingPrice,
      sellerId: user.id,
    });

    const auction = await this.auctionRepository.save(auctionPayload);

    //TODO test if status works
    return plainToInstance(
      AuctionResponseDto,
      { ...auction, status: this.getAuctionStatus(endDate) },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll(filter: FilterDto) {
    const { status, page, limit, minPrice, maxPrice, sort } = filter;

    const whereFilters: {
      endDate?: FindOperator<Date>;
      currentPrice?: FindOperator<any>;
    } = {};

    // Apply status filter
    switch (status) {
      case 'open':
        whereFilters.endDate = MoreThan(new Date());
        break;
      case 'closed':
        whereFilters.endDate = LessThanOrEqual(new Date());
        break;
    }

    // Apply price filters
    if (minPrice || maxPrice) {
      if (maxPrice) {
        whereFilters.currentPrice = Between(minPrice, maxPrice);
      } else {
        // If no max price is set, we only need to go higher than the min price
        whereFilters.currentPrice = MoreThan(minPrice);
      }
    }

    const [data, total] = await this.auctionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: whereFilters,
      order: { endDate: sort },
      relations: {
        seller: true,
        offers: {
          buyer: true,
        },
      },
    });

    const auctionResponse = {
      data: plainToInstance(AuctionResponseDto, data, {
        excludeExtraneousValues: true,
      }),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    return auctionResponse;
  }

  async findOne(id: number): Promise<AuctionResponseDto | null> {
    const auction = await this.auctionRepository.findOne({
      where: { id },
      relations: {
        seller: true,
        offers: {
          buyer: true,
        },
      },
    });

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    return plainToInstance(AuctionResponseDto, auction, {
      excludeExtraneousValues: true,
    });
  }

  getAuctionStatus(endDate: Date): Status {
    let status: Status = 'open';
    if (new Date() > endDate) {
      status = 'closed';
    }
    return status;
  }
}
