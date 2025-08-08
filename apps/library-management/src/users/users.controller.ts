import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { RegistrationDto } from './dto/registration.dto';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() registrationDto: RegistrationDto) {
    return this.userService.register(registrationDto);
  }
}
