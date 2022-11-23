import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateStudentDto } from './dto/update-students.dto';

import { Students } from './schemas/students';
import { StudentRepository } from './students.repository';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentRepository) {}

  async getUserById(userId: string): Promise<Students> {
    return this.studentsRepository.findOne({ userId });
  }

  async getUsers(): Promise<Students[]> {
    return this.studentsRepository.find({});
  }

  async createUser(name: string, age: number): Promise<Students> {
    return this.studentsRepository.create({
      stu_id: uuidv4(),
      name,
      age,
      likes: [],
    });
  }

  async updateUser(
    userId: string,
    userUpdates: UpdateStudentDto,
  ): Promise<Students> {
    return this.studentsRepository.findOneAndUpdate({ userId }, userUpdates);
  }
}
