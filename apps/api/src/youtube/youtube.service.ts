import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class YouTubeService {
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('YOUTUBE_API_KEY');
  }

  async searchVideos(query: string, maxResults = 25) {
    const response = await firstValueFrom(
      this.httpService.get<any>('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: query,
          type: 'video',
          maxResults,
          key: this.apiKey,
        },
      })
    );

    return this.mapYouTubeResponse(response.data);
  }

  async getVideoDetails(videoId: string) {
    const response = await firstValueFrom(
      this.httpService.get<any>('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails',
          id: videoId,
          key: this.apiKey,
        },
      })
    );

    return this.mapVideoDetails(response.data.items[0]);
  }

  private mapYouTubeResponse(data: any) {
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: new Date(item.snippet.publishedAt),
    }));
  }

  private mapVideoDetails(item: any) {
    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      duration: this.parseDuration(item.contentDetails.duration),
      channelTitle: item.snippet.channelTitle,
      publishedAt: new Date(item.snippet.publishedAt),
    };
  }

  private parseDuration(duration: string): number {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] ? parseInt(match[1]) : 0);
    const minutes = (match[2] ? parseInt(match[2]) : 0);
    const seconds = (match[3] ? parseInt(match[3]) : 0);
    return hours * 3600 + minutes * 60 + seconds;
  }
}