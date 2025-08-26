import { Controller, Get, Post, Put, Body, Patch, UseGuards, ConflictException, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from './user.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnUserGuard } from '../auth/guards/own-user.guard';

import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { DeleteUserDto } from './dto/delete-user';


@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 200, description: 'User created successfully' })
  @ApiResponse({ status: 40, description: 'Email or Username already in use' })
  async registerUser(@Body() body: CreateUserDto) {
    const { username, email, password } = body;
    try {

      const newUser = await this.userService.registerUser(username, email, password);
      return newUser;

    } catch (error) {

      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('An error occurred while registering the user');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
   @ApiOperation({ summary: 'Fetch all Users' })
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a single User data by Id' })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnUserGuard)
  @ApiOperation({ summary: 'Update a User' })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto
  ) {
    return this.userService.updateUser(id, body.email);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, OwnUserGuard)
  @ApiOperation({ summary: 'Delete a User' })
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DeleteUserDto
  ) {
    return this.userService.deleteUser(id, body.accountStatus);
  }
}
