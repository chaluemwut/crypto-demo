import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer, User } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
      
  createUser(createUserDto: CreateUserDto) {
    console.log('create user dto', createUserDto);
    // const newUser = this.userRepository.create(user);
    return this.userRepository.save(createUserDto)
  }
      
  findUsersById(id: number) {
    // return this.userRepository.findOne();
  }
}