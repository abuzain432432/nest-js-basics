import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { LoggingService } from '../logging/logging.service';
import { ForbiddenException } from 'src/util/forbidden.exception';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly loggingService: LoggingService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    try {
      throw new UnauthorizedException();
      return await this.usersService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  // Routes with parameters should be declared after any static paths.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
