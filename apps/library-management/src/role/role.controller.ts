import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService:RoleService
    ){}

     @Post()
    create(@Body() createRoleDto:CreateRoleDto){
        return this.roleService.create(createRoleDto)
    }

    @Get()
    list(){
        return this.roleService.list();
    }

    @Get('/:id')
    findOne(@Param('id') id:string){
        return this.roleService.findOne(+id)
    }

    @Patch('/:id')
    update(@Param('id') id:string, @Body() createRoleDto:CreateRoleDto){
        return this.roleService.update(+id,createRoleDto)
    }

    @Delete('/:id')
    delete(@Param('id') id:string){
        return this.roleService.delete(+id)
    }
}