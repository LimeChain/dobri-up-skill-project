import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('resiter')
  register() {
    return 'register';
  }

  @Get('login')
  login() {
    return 'login';
  }
}
