import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RegistrationDto } from './dto/registration.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async register(registrationDto: RegistrationDto) {
    const role = await this.roleRepository.findOne({
      where: { title: 'user' },
    });
    if (!role) {
      throw new NotFoundException('Role with title user not found');
    }

    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
    const user = this.userRepository.create({
      ...registrationDto,
      password: hashedPassword,
      role_id: role,
    });
    const result = await this.userRepository.save(user);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: result,
    };
  }
}
