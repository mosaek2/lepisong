import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AddVideoToPlaylistDto } from './dto/add-video-to-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUser(userId: string) {
    return this.prisma.playlist.findMany({
      where: { userId },
      include: {
        videos: {
          include: {
            video: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      include: {
        videos: {
          include: {
            video: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    if (playlist.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return playlist;
  }

  async create(createPlaylistDto: CreatePlaylistDto, userId: string) {
    return this.prisma.playlist.create({
      data: {
        ...createPlaylistDto,
        userId,
      },
    });
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto, userId: string) {
    const playlist = await this.findOne(id, userId);
    
    return this.prisma.playlist.update({
      where: { id },
      data: updatePlaylistDto,
    });
  }

  async remove(id: string, userId: string) {
    const playlist = await this.findOne(id, userId);
    
    return this.prisma.playlist.delete({
      where: { id },
    });
  }

  async addVideo(id: string, addVideoDto: AddVideoToPlaylistDto, userId: string) {
    const playlist = await this.findOne(id, userId);
    
    // Get the next position
    const lastVideo = await this.prisma.playlistVideo.findFirst({
      where: { playlistId: id },
      orderBy: { position: 'desc' },
    });
    
    const position = (lastVideo?.position || 0) + 1;

    return this.prisma.playlistVideo.create({
      data: {
        playlistId: id,
        videoId: addVideoDto.videoId,
        position,
      },
      include: {
        video: true,
      },
    });
  }

  async removeVideo(id: string, videoId: string, userId: string) {
    const playlist = await this.findOne(id, userId);
    
    const playlistVideo = await this.prisma.playlistVideo.findFirst({
      where: {
        playlistId: id,
        videoId,
      },
    });

    if (!playlistVideo) {
      throw new NotFoundException('Video not found in playlist');
    }

    // Remove the video
    await this.prisma.playlistVideo.delete({
      where: { id: playlistVideo.id },
    });

    // Reorder remaining videos
    await this.prisma.playlistVideo.updateMany({
      where: {
        playlistId: id,
        position: { gt: playlistVideo.position },
      },
      data: { position: { decrement: 1 } },
    });

    return { message: 'Video removed from playlist' };
  }
}