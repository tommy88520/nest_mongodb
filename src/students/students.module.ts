import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Students, StudentSchema } from './schemas/students';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentRepository } from './students.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Students.name, schema: StudentSchema }]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService, StudentRepository],
})
export class StudentsModule {}
