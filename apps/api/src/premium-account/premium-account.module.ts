import { Module } from '@nestjs/common';
import { PremiumAccountController } from './premium-account.controller';
import { PremiumAccountService } from './premium-account.service';

@Module({
  controllers: [PremiumAccountController],
  providers: [PremiumAccountService],
  exports: [PremiumAccountService],
})
export class PremiumAccountModule {}