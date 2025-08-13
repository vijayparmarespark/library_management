import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { IsUnique } from '../../custom-decorator/is-unique.decorator';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Binary } from 'typeorm';
import { UploadedFile } from '@nestjs/common';

export class RegistrationDto {
  @ApiProperty({
    example: 'Vijay',
    required: true,
  })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name should be a string' })
  @Length(2, 20, { message: 'First name must be between 2 and 20 characters' })
  first_name: string;

  @ApiProperty({
    example: 'Parmar',
    required: true,
  })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name should be a string' })
  @Length(2, 20, { message: 'Last name must be between 2 and 20 characters' })
  last_name: string;

  @ApiProperty({
    example: '+917359551245',
    required: true,
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number should be a string' })
  @Length(8, 15, { message: 'Phone number must be between 2 and 20 digits' })
  @Matches(/^\+?\d+$/, {
    message: 'Invalid phone number',
  })
  phone_number: string;

  @ApiProperty({
    example: 'vijay.parmar@esparkbizmail.com',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email should be a string' })
  @IsUnique(User, 'email', { message: 'Email already exist!' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Vijay@123',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(
    /^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[A-Z]))(?=(.*[!@#$%^&*()_+={}[\]|:;"'<>,.?/\\]))[A-Za-z\d!@#$%^&*()_+={}[\]|:;"'<>,.?/\\]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long and contain at least one letter, one digit, one uppercase letter, and one special character.',
    }
  )
  password: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  profile_image: string;
}
