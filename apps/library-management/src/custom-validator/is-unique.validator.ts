import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, field] = args.constraints;
    const repository = this.dataSource.getRepository(EntityClass);

    if (!value) return true;

    const objectBeingValidated = args.object as any;
    const currentId = objectBeingValidated?.id;

    let existing;
    if (currentId) {
      existing = await repository.findOne({
        where: {
          [field]: value,
          id: Not(currentId),
        },
      });
    } else {
      existing = await repository.findOne({
        where: {
          [field]: value,
        },
      });
    }
    return !existing;
  }

  defaultMessage(args: ValidationArguments) {
    const [_, field] = args.constraints;
    return `${field} must be unique`;
  }
}
