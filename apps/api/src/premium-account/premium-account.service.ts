import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConnectGoogleAccountDto } from './dto/connect-google-account.dto';

@Injectable()
export class PremiumAccountService {
  constructor(private readonly prisma: PrismaService) {}

  async findActive() {
    return this.prisma.premiumAccount.findFirst({
      where: { isActive: true },
      select: {
        id: true,
        email: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async connectGoogleAccount(connectGoogleAccountDto: ConnectGoogleAccountDto) {
    // Deactivate existing accounts
    await this.prisma.premiumAccount.updateMany({
      data: { isActive: false },
    });

    // Create or update the new account
    return this.prisma.premiumAccount.upsert({
      where: { googleAccountId: connectGoogleAccountDto.googleAccountId },
      create: {
        ...connectGoogleAccountDto,
        isActive: true,
      },
      update: {
        ...connectGoogleAccountDto,
        isActive: true,
      },
    });
  }

  async disconnect() {
    await this.prisma.premiumAccount.updateMany({
      data: { isActive: false },
    });

    return { message: 'Premium account disconnected' };
  }
}