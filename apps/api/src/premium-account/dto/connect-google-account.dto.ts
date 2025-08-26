import { IsString, IsEmail } from 'class-validator';

export class ConnectGoogleAccountDto {
  @IsString()
  googleAccountId: string;

  @IsEmail()
  email: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}