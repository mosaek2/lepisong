import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { YouTubeService } from './youtube.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('youtube')
@UseGuards(JwtAuthGuard)
export class YouTubeController {
  constructor(private readonly youtubeService: YouTubeService) {}

  @Get('search')
  async searchVideos(@Query('q') query: string, @Query('maxResults') maxResults?: number) {
    return this.youtubeService.searchVideos(query, maxResults);
  }

  @Get('video/:videoId')
  async getVideoDetails(@Param('videoId') videoId: string) {
    return this.youtubeService.getVideoDetails(videoId);
  }
}