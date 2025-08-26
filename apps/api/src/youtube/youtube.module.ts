import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { YouTubeController } from './youtube.controller';
import { YouTubeService } from './youtube.service';

@Module({
  imports: [HttpModule],
  controllers: [YouTubeController],
  providers: [YouTubeService],
  exports: [YouTubeService],
})
export class YouTubeModule {}