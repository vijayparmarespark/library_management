import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    const result = await this.roleRepository.save(role);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Role created successfully',
      data: result,
    };
  }

  async list() {
    const result = await this.roleRepository.find();

    return {
      statusCode: HttpStatus.OK,
      message: 'Retrived roles data',
      data: result,
    };
  }

  async findOne(id: number) {
    const result = await this.roleRepository.findOne({ where: { id } });

    return {
      statusCode: HttpStatus.OK,
      message: 'Retrived role data',
      data: result,
    };
  }

  async update(id: number, createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException();
    }
    Object.assign(role, createRoleDto);
    const result = await this.roleRepository.save(role);

    return {
      statusCode: HttpStatus.OK,
      message: 'Role data updated successfully',
      data: result,
    };
  }

  async delete(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException();
    }
    const result = await this.roleRepository.remove(role);

    return {
      statusCode: HttpStatus.OK,
      message: 'Role deleted successfully',
      data: result,
    };
  }
}
