import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { YouTubeModule } from '../youtube/youtube.module';
import { QueueModule } from '../queue/queue.module';
import { PlaylistsModule } from '../playlists/playlists.module';
import { PremiumAccountModule } from '../premium-account/premium-account.module';
import { AdminModule } from '../admin/admin.module';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    YouTubeModule,
    QueueModule,
    PlaylistsModule,
    PremiumAccountModule,
    AdminModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
