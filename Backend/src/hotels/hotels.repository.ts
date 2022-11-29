import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Hotel, HotelDocument } from './schema/hotel';

@Injectable()
export class HotelRepository {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}
  async findOne(query: FilterQuery<Hotel>): Promise<Hotel> {
    return this.hotelModel.findOne(query);
  }
  async find(query: FilterQuery<Hotel>): Promise<Hotel[]> {
    return this.hotelModel.find(query);
  }
  async create(query: FilterQuery<Hotel>): Promise<Hotel> {
    const result = new this.hotelModel(query);
    return result.save();
  }
  async findOneAndUpdate(
    query: FilterQuery<Hotel>,
    hotel: Partial<Hotel>,
  ): Promise<Hotel> {
    return this.hotelModel.findOneAndUpdate(query, hotel, { new: true });
  }

  async findOneAndDelete(cup_id: FilterQuery<Hotel>): Promise<Hotel> {
    return this.hotelModel.findOneAndDelete(cup_id, { new: true });
  }
  async sortByHotelPrice(query: FilterQuery<Hotel>): Promise<Hotel[]> {
    return this.hotelModel.find({}).sort(query);
  }

  async sortByHotelAppraise(
    data: string[],
    query: FilterQuery<Hotel>,
  ): Promise<Hotel[]> {
    return this.hotelModel.find({ roomDetail: { $all: data } }).sort(query);
  }

  async getLength(data: string[]): Promise<number> {
    return this.hotelModel.find({ roomDetail: { $all: data } }).count();
  }
}
