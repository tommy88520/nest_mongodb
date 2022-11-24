import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from './coffees.repository';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { v4 as uuidv4 } from 'uuid';
import { Coffee } from './schema/coffee';

@Injectable()
export class CoffeeService {
  constructor(private readonly coffeeRepo: CoffeeRepository) {}

  async getCoffeesBrand(brand: string): Promise<Coffee> {
    return this.coffeeRepo.findOne({ brand });
  }

  async getAllCoffee(): Promise<Coffee[]> {
    return this.coffeeRepo.find({});
  }

  async getGtCoffee(query: number): Promise<Coffee[]> {
    return this.coffeeRepo.find({ price: { $gt: query } });
  }
  async createCoffee(CreateCoffeeDto): Promise<Coffee> {
    return this.coffeeRepo.create({
      cup_id: uuidv4(),
      ...CreateCoffeeDto,
    });
  }
  async updateCoffee(
    cup_id: string,
    coffeeUpdate: UpdateCoffeeDto,
  ): Promise<Coffee> {
    return this.coffeeRepo.findOneAndUpdate({ cup_id }, coffeeUpdate);
  }
}
