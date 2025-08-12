import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permissions } from '../custom-decorator/permissions.decorator';
import { PermissionsGuard } from '../guards/permissions.guard';

@Controller('role')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permissions('add_role')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Permissions('view_role')
  @Get()
  list() {
    return this.roleService.list();
  }

  @Permissions('view_role')
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Permissions('edit_role')
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    updateRoleDto.id = +id;
    return this.roleService.update(+id, updateRoleDto);
  }

  @Permissions('delete_role')
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.roleService.delete(+id);
  }
}
