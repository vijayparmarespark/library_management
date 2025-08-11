import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async signin(email: string, password: string) {
    const findUser = await this.userRepository.findOneBy({ email });
    if (!findUser) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const token = this.jwtService.sign({
      id: findUser.id,
      email: findUser.email,
    });

    const result = { id: findUser.id, email: findUser.email, token };
    return {
      statusCode: HttpStatus.OK,
      message: 'User signin successfully',
      data: result,
    };
  }
}
