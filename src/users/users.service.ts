import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel } from './schemas/user.schema';
import { FilterQuery } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(filter: FilterQuery<User>) {
    return this.userModel.findOne(filter);
  }

  update(filter: FilterQuery<User>, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate(filter, updateUserDto);
  }
}
