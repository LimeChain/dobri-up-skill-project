import { IsEmail, IsString, IsUUID, IsEnum } from 'class-validator';
import { UserRole } from '../auth/roles/role.enum';

export class CreateUserDto {
  @IsString()
  firstaName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UserDto extends CreateUserDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsEnum(UserRole)
  role: UserRole;
}
