import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { IsUniqueConstraint } from '../custom-validator/is-unique.validator';
import { AuthGuard } from '../auth/guards/local.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  controllers: [RoleController],
  providers: [RoleService, IsUniqueConstraint, AuthGuard],
})
export class RoleModule {}
