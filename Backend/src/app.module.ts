import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffees/coffees.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/coffee'),
    CoffeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}