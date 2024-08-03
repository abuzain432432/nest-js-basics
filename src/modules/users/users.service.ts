import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserSchemaClass } from './schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private userModule: Model<UserSchemaClass>,
  ) {}
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.userModule.find();
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
