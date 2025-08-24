import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export abstract class BaseGuard implements CanActivate {
  constructor(
    protected jwtService: JwtService,
    protected readonly configService: ConfigService,
  ) {}

  abstract canActivate(context: ExecutionContext): Promise<boolean> | boolean;

  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  protected async verifyToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
    });
  }
}
