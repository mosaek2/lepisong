import { Controller, Get, Post, Delete, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { QueueService } from './queue.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddToQueueDto } from './dto/add-to-queue.dto';
import { ReorderQueueDto } from './dto/reorder-queue.dto';

@Controller('queue')
@UseGuards(JwtAuthGuard)
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  findAll() {
    return this.queueService.findAll();
  }

  @Post('add')
  addToQueue(@Body() addToQueueDto: AddToQueueDto, @Request() req) {
    return this.queueService.addToQueue(addToQueueDto, req.user.id);
  }

  @Delete(':queueId')
  removeFromQueue(@Param('queueId') queueId: string) {
    return this.queueService.removeFromQueue(queueId);
  }

  @Put('reorder')
  reorderQueue(@Body() reorderQueueDto: ReorderQueueDto) {
    return this.queueService.reorderQueue(reorderQueueDto);
  }
}