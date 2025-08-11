import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(email: string, password: string) {
    const user = this.authService.signin(email, password);
    console.log(user, 'user object');
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
