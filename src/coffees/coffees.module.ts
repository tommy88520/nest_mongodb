import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, coffeeSchema } from './schema/coffee';
import { CoffeesController } from './coffees.controller';
import { CoffeeService } from './coffees.service';
import { CoffeeRepository } from './coffees.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coffee.name, schema: coffeeSchema }]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeeService, CoffeeRepository],
})
export class CoffeeModule {}
