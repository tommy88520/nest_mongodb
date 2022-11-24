import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  // HttpCode,
  // HttpStatus,
  // Res,
} from '@nestjs/common';

import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

import { Coffee } from './schema/coffee';
import { CoffeeService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeeService) {}
  // @Get()
  // findAll() {
  //   return 'this is for coffeeeeee.';
  // }
  // findAll(@Res() response) {
  //   response.status(200).send('This return is ok.');
  // }// 還是可以用express的方法，但不受所管理
  @Get()
  async getAllCoffee(): Promise<Coffee[]> {
    return this.coffeeService.getAllCoffee();
  }
  @Get(':id')
  async getCoffeesBrand(@Param('brand') brand: string): Promise<Coffee> {
    return this.coffeeService.getCoffeesBrand(brand);
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

  // @Post()
  // // @HttpCode(HttpStatus.GONE) 這邊可以更改狀態碼
  // create(@Body() body) {
  //   return body;
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() body) {
  //   return 'this is for ' + id;
  // }
  @Delete('id')
  remove(@Param('id') id: string) {
    return 'this is for ' + id;
  }
}
