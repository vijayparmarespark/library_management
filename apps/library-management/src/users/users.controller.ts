import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './users.service';
import { RegistrationDto } from './dto/registration.dto';
import { FileUploadInterceptor } from '../file-upload/file-upload.interceptor';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileUploadInterceptor)
  register(
    @Body() registrationDto: RegistrationDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      registrationDto.profile_image = `/uploads/${file.filename}`;
    }
    return this.userService.register(registrationDto);
  }
}
