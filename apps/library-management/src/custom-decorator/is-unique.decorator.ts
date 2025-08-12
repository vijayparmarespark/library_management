import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from '../custom-validator/is-unique.validator';

export function IsUnique(
  entity: Function,
  field: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, field],
      validator: IsUniqueConstraint,
    });
  };
}
