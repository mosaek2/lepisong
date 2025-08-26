import { Controller, Get, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { PremiumAccountService } from './premium-account.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ConnectGoogleAccountDto } from './dto/connect-google-account.dto';

@Controller('premium-account')
@UseGuards(JwtAuthGuard, AdminGuard)
export class PremiumAccountController {
  constructor(private readonly premiumAccountService: PremiumAccountService) {}

  @Get()
  findActive() {
    return this.premiumAccountService.findActive();
  }

  @Post('connect')
  connectGoogleAccount(@Body() connectGoogleAccountDto: ConnectGoogleAccountDto) {
    return this.premiumAccountService.connectGoogleAccount(connectGoogleAccountDto);
  }

  @Delete()
  disconnect() {
    return this.premiumAccountService.disconnect();
  }
}