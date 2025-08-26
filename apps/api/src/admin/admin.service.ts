import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers(search?: string) {
    const where = search
      ? {
          OR: [
            { username: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        username: true,
        isActive: true,
        isAdmin: true,
        createdAt: true,
        lastLoginAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        isActive: true,
        isAdmin: true,
        createdAt: true,
        lastLoginAt: true,
        playlists: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
        queueItems: {
          select: {
            id: true,
            addedAt: true,
            video: {
              select: {
                title: true,
              },
            },
          },
          take: 10,
          orderBy: {
            addedAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUserStatus(id: string, updateUserStatusDto: UpdateUserStatusDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        isActive: updateUserStatusDto.isActive,
      },
      select: {
        id: true,
        email: true,
        username: true,
        isActive: true,
        isAdmin: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete user and all related data (cascading delete)
    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }

  async getDashboardData() {
    const [totalUsers, activeUsers, totalPlaylists, queueLength] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.playlist.count(),
      this.prisma.queueItem.count(),
    ]);

    return {
      totalUsers,
      activeUsers,
      totalPlaylists,
      queueLength,
    };
  }
}