import { Controller, Get, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  findAllUsers(@Query('search') search?: string) {
    return this.adminService.findAllUsers(search);
  }

  @Get('users/:id')
  findUser(@Param('id') id: string) {
    return this.adminService.findUser(id);
  }

  @Put('users/:id/status')
  updateUserStatus(@Param('id') id: string, @Body() updateUserStatusDto: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(id, updateUserStatusDto);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Get('dashboard')
  getDashboardData() {
    return this.adminService.getDashboardData();
  }
}