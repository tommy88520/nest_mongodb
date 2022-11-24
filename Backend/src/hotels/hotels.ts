import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

import { Hotel } from './schema/hotel';
import { HotelService } from './hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelService: HotelService) {}

  @Get(':brand')
  async getHotelsBrand(@Param('brand') brand: string): Promise<Hotel> {
    return this.hotelService.getHotelsBrand(brand);
  }

  @Get()
  async getAllHotel(@Query() query): Promise<Hotel[]> {
    const { price } = query;
    if (price) {
      return this.hotelService.getGtHotel(price);
    } else {
      return this.hotelService.getAllHotel();
    }
  }

  @Post()
  async createHotel(@Body() createUser: CreateHotelDto): Promise<Hotel> {
    return this.hotelService.createHotel(createUser);
  }

  @Patch(':id')
  async updateHotel(
    @Param('id') id: string,
    @Body() updateUser: UpdateHotelDto,
  ): Promise<Hotel> {
    return this.hotelService.updateHotel(id, updateUser);
  }

  @Delete('id')
  async remove(@Param('id') id: string): Promise<Hotel> {
    return this.hotelService.findOneAndDelete(id);
  }
}
