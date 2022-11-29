import { Injectable } from '@nestjs/common';
import { HotelRepository } from './hotels.repository';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Appraise } from './dto/appraise.dto';
import { v4 as uuidv4 } from 'uuid';
import { Hotel } from './schema/hotel';

@Injectable()
export class HotelService {
  constructor(private readonly hotelRepo: HotelRepository) {}

  async getHotelsBrand(cup_id: string): Promise<Hotel> {
    return this.hotelRepo.findOne({ cup_id });
  }

  async getAllHotel(): Promise<Hotel[]> {
    return this.hotelRepo.find({});
  }

  async getGtHotel(query: number): Promise<Hotel[]> {
    return this.hotelRepo.find({ price: { $gt: query } });
  }
  async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
    return this.hotelRepo.create({
      cup_id: uuidv4(),
      ...createHotelDto,
    });
  }
  async updateHotel(
    cup_id: string,
    hotelUpdate: UpdateHotelDto,
  ): Promise<Hotel> {
    return this.hotelRepo.findOneAndUpdate({ cup_id }, hotelUpdate);
  }

  async sortByHotelPrice(sort: Appraise): Promise<Hotel[]> {
    return this.hotelRepo.sortByHotelPrice(sort);
  }
  async sortByHotelAppraise(data: string[], sort) {
    const { appraise, price } = sort;
    let filter = {};
    if (appraise && price) {
      filter = {};
    } else if (appraise) {
      filter = { appraise };
    } else if (price) {
      filter = { price };
    }

    const result = {
      meta:
        data.length == 0
          ? await this.hotelRepo.sortByHotelPrice(filter)
          : await this.hotelRepo.sortByHotelAppraise(data, filter),
      length: await this.hotelRepo.getLength(data),
    };

    return result;
  }

  async findOneAndDelete(cup_id: string): Promise<Hotel> {
    return this.hotelRepo.findOneAndDelete({ cup_id });
  }
}
