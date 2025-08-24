import {
  BadRequestException,
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    email: string;
    firstName: string;
    lastName: string | null | undefined;
    sub: string;
    role: string;
    iat?: number;
    exp?: number;
  };
}

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Get('/me')
  getAuthUser(@Req() request: AuthenticatedRequest) {
    console.log('request.user', request.user);
    if (!request.user) {
      throw new BadRequestException('No user information!');
    }

    return {
      id: request.user.sub,
      email: request.user.email,
      firstName: request.user.firstName,
      lastName: request.user.lastName,
      role: request.user.role,
    };
  }
}
