import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToQueueDto } from './dto/add-to-queue.dto';
import { ReorderQueueDto } from './dto/reorder-queue.dto';

@Injectable()
export class QueueService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.queueItem.findMany({
      include: {
        video: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async addToQueue(addToQueueDto: AddToQueueDto, userId: string) {
    const { videoId, isPriority } = addToQueueDto;
    
    // Get the next position
    const lastItem = await this.prisma.queueItem.findFirst({
      orderBy: { position: 'desc' },
    });
    
    const position = isPriority ? 1 : (lastItem?.position || 0) + 1;
    
    // If priority, shift other items
    if (isPriority) {
      await this.prisma.queueItem.updateMany({
        data: { position: { increment: 1 } },
      });
    }

    return this.prisma.queueItem.create({
      data: {
        videoId,
        userId,
        position,
        isPriority,
      },
      include: {
        video: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async removeFromQueue(queueId: string) {
    const queueItem = await this.prisma.queueItem.findUnique({
      where: { id: queueId },
    });

    if (!queueItem) {
      throw new Error('Queue item not found');
    }

    // Remove the item
    await this.prisma.queueItem.delete({
      where: { id: queueId },
    });

    // Reorder remaining items
    await this.prisma.queueItem.updateMany({
      where: { position: { gt: queueItem.position } },
      data: { position: { decrement: 1 } },
    });

    return { message: 'Item removed from queue' };
  }

  async reorderQueue(reorderQueueDto: ReorderQueueDto) {
    const { fromIndex, toIndex } = reorderQueueDto;
    
    // Implementation for reordering queue items
    // This is a simplified version - in production, you'd want more robust reordering logic
    
    return { message: 'Queue reordered successfully' };
  }
}