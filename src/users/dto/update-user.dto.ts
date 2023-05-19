import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { User } from '../schemas/user.schema';

export class UpdateUserDto extends PartialType(User) {}
