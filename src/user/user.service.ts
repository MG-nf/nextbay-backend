import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const existingUser = await this.findByUsername(dto.username);
    if (existingUser) {
      throw new ConflictException(`Username is already taken.`);
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = this.usersRepository.create({
      username: dto.username,
      password: passwordHash,
    });
    const saved = await this.usersRepository.save(user);

    return plainToInstance(UserResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }
}
