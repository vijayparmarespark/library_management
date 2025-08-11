import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'vijay.parmar@esparkbizmail.com',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Vijay@123',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
