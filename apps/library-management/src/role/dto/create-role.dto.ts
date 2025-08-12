import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUnique } from '../../custom-decorator/is-unique.decorator';
import { Role } from '../entities/role.entity';

export class CreateRoleDto {
  id?: number;
  @ApiProperty({
    example: 'librarian',
    required: true,
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title should be a string' })
  @Length(2, 20, { message: 'Title must be between 2 and 20 characters' })
  @IsUnique(Role, 'title', { message: 'Role title must be unique' })
  title: string;

  @ApiProperty({
    example: [
      'view_role',
      'add_role',
      'edit_role',
      'delete_role',
      'view_book',
      'add_book',
      'edit_book',
      'delete_book',
      'view_rack',
      'add_rack',
      'edit_rack',
      'delete_rack',
    ],
    required: true,
  })
  @ArrayNotEmpty({ message: 'Permissions is required' })
  @IsArray({ message: 'Permissions should be a array' })
  @IsString({ each: true, message: 'Permission should be array of string' })
  permissions: string[];
}
