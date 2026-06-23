import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { OfferService } from 'src/offer/offer.service';
import { CreateOfferDto } from 'src/offer/dto/create-offer.dto';
import { OfferResponseDto } from 'src/offer/dto/offer-response.dto';
import { FilterDto } from 'src/auction/dto/filter.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { AuthenticatedUser } from 'src/auth/types/authenticated-user';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('auctions')
export class AuctionController {
  constructor(
    private readonly auctionService: AuctionService,
    private readonly offerService: OfferService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createAuctionDto: CreateAuctionDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return await this.auctionService.create(user, createAuctionDto);
  }

  @Get()
  findAll(@Query() filter: FilterDto) {
    console.log(filter);
    return this.auctionService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionService.findOne(+id);
  }

  @Post(':id/offers')
  @UseGuards(JwtAuthGuard)
  async addOffer(
    @Param('id') auctionId: string,
    @Body() createOfferDto: CreateOfferDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<OfferResponseDto> {
    return await this.offerService.create(
      user,
      Number(auctionId),
      createOfferDto,
    );
  }
}
