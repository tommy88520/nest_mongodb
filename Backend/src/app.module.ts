import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './hotels/hotels.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hotel'),
    HotelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
