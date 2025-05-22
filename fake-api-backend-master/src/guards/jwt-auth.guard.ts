import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log("user", user);
    console.log("err", err);
    console.log("info", info);

    if (info instanceof TokenExpiredError){
      throw new UnauthorizedException('TOKEN_EXPIRED');
    }

    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('TOKEN_INVALID');
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
