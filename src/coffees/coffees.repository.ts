import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Coffee, CoffeeDocument } from './schema/coffee';

@Injectable()
export class CoffeeRepository {
  constructor(
    @InjectModel(Coffee.name) private coffeeModel: Model<CoffeeDocument>,
  ) {}
  async findOne(query: FilterQuery<Coffee>): Promise<Coffee> {
    return this.coffeeModel.findOne(query);
  }
  async find(query: FilterQuery<Coffee>): Promise<Coffee[]> {
    return this.coffeeModel.find(query);
  }
  async create(query: FilterQuery<Coffee>): Promise<Coffee> {
    const result = new this.coffeeModel(query);
    return result.save();
  }
  async findOneAndUpdate(
    query: FilterQuery<Coffee>,
    coffee: Partial<Coffee>,
  ): Promise<Coffee> {
    return this.coffeeModel.findOneAndUpdate(query, coffee, { new: true });
  }
}
