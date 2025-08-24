import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from './base.guard';
import { ROLES_KEY } from '../roles/role.decorator';
import { UserRole } from '../roles/role.enum';

@Injectable()
export class RoleGuard extends BaseGuard {
  constructor(
    private reflector: Reflector,
    jwtService: JwtService,
    configService: ConfigService,
  ) {
    super(jwtService, configService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.verifyToken(token);
      return requiredRoles.includes(payload.role);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
