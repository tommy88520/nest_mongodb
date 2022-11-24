import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, hotelSchema } from './schema/hotel';
import { HotelsController } from './hotels';
import { HotelService } from './hotels.service';
import { HotelRepository } from './hotels.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: hotelSchema }]),
  ],
  controllers: [HotelsController],
  providers: [HotelService, HotelRepository],
})
export class HotelModule {}
