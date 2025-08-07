import { ArrayNotEmpty, IsArray, isArray, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Unique } from "typeorm";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    title : string;

    @IsString({ each: true })
    @IsArray()
    @ArrayNotEmpty()
    permissions: string[];
}