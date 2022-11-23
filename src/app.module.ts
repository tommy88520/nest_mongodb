import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { StudentsModule } from './students/students.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/coffee'),
    StudentsModule,
  ],
  controllers: [AppController, CoffeesController],
  providers: [AppService],
})
export class AppModule {}
