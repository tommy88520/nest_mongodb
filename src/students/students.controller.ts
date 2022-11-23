import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-students.dto';
import { UpdateStudentDto } from './dto/update-students.dto';

import { Students } from './schemas/students';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly usersService: StudentsService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<Students> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<Students[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateStudentDto): Promise<Students> {
    return this.usersService.createUser(createUserDto.name, createUserDto.age);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateStudentDto,
  ): Promise<Students> {
    return this.usersService.updateUser(userId, updateUserDto);
  }
}
