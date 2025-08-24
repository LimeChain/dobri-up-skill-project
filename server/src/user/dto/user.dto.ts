import { IsEmail, IsString, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../auth/roles/role.enum';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
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
