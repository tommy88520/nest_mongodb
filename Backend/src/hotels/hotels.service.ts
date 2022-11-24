import { Injectable } from '@nestjs/common';
import { HotelRepository } from './hotels.repository';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { CreateHotelDto } from './dto/create-hotel.dto';
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
  async createHotel(CreateHotelDto: CreateHotelDto): Promise<Hotel> {
    return this.hotelRepo.create({
      cup_id: uuidv4(),
      ...CreateHotelDto,
    });
  }
  async updateHotel(
    cup_id: string,
    hotelUpdate: UpdateHotelDto,
  ): Promise<Hotel> {
    return this.hotelRepo.findOneAndUpdate({ cup_id }, hotelUpdate);
  }

  async findOneAndDelete(cup_id: string): Promise<Hotel> {
    return this.hotelRepo.findOneAndDelete({ cup_id });
  }
}
