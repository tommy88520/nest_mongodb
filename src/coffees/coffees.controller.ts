import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'this is for coffee.';
  }
  // findAll(@Res() response) {
  //   response.status(200).send('This return is ok.');
  // }// 還是可以用express的方法，但不受所管理
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `test${id}`;
  }
  @Post()
  // @HttpCode(HttpStatus.GONE) 這邊可以更改狀態碼
  create(@Body() body) {
    return body;
  }
}
