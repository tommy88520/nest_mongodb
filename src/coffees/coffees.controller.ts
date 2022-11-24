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

import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

import { Coffee } from './schema/coffee';
import { CoffeeService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get(':brand')
  async getCoffeesBrand(@Param('brand') brand: string): Promise<Coffee> {
    return this.coffeeService.getCoffeesBrand(brand);
  }

  @Get()
  async getAllCoffee(@Query() query): Promise<Coffee[]> {
    const { price } = query;
    if (price) {
      return this.coffeeService.getGtCoffee(price);
    } else {
      return this.coffeeService.getAllCoffee();
    }
  }

  @Post()
  async createCoffee(@Body() createUser: CreateCoffeeDto): Promise<Coffee> {
    return this.coffeeService.createCoffee(createUser);
  }

  @Patch(':id')
  async updateCoffee(
    @Param('id') id: string,
    @Body() updateUser: UpdateCoffeeDto,
  ): Promise<Coffee> {
    return this.coffeeService.updateCoffee(id, updateUser);
  }

  @Delete('id')
  async remove(@Param('id') id: string): Promise<Coffee> {
    return this.coffeeService.findOneAndDelete(id);
  }
}
