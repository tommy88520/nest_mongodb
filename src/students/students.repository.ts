import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Students, StudentsDocument } from './schemas/students';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel(Students.name) private studentModel: Model<StudentsDocument>,
  ) {}
  async findOne(studentsFilterQuery: FilterQuery<Students>): Promise<Students> {
    return this.studentModel.findOne(studentsFilterQuery);
  }
  async find(studentsFilterQuery: FilterQuery<Students>): Promise<Students[]> {
    return this.studentModel.find(studentsFilterQuery);
  }
  async create(students: Students): Promise<Students> {
    const newStudents = new this.studentModel(students);
    return newStudents.save();
  }
  async findOneAndUpdate(
    studentsFilterQuery: FilterQuery<Students>,
    student: Partial<Students>,
  ): Promise<Students> {
    return this.studentModel.findOneAndUpdate(studentsFilterQuery, student, {
      new: true,
    });
  }
}
