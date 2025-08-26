import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AddVideoToPlaylistDto } from './dto/add-video-to-playlist.dto';

@Controller('playlists')
@UseGuards(JwtAuthGuard)
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Get()
  findAll(@Request() req) {
    return this.playlistsService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.playlistsService.findOne(id, req.user.id);
  }

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto, @Request() req) {
    return this.playlistsService.create(createPlaylistDto, req.user.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto, @Request() req) {
    return this.playlistsService.update(id, updatePlaylistDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.playlistsService.remove(id, req.user.id);
  }

  @Post(':id/videos')
  addVideo(@Param('id') id: string, @Body() addVideoDto: AddVideoToPlaylistDto, @Request() req) {
    return this.playlistsService.addVideo(id, addVideoDto, req.user.id);
  }

  @Delete(':id/videos/:videoId')
  removeVideo(@Param('id') id: string, @Param('videoId') videoId: string, @Request() req) {
    return this.playlistsService.removeVideo(id, videoId, req.user.id);
  }
}