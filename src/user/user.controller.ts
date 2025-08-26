import { Controller, Get, Post, Body, UseGuards, ConflictException, Param, ParseIntPipe} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user';
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

      const newUser = await this.userService.createUser(username, email, password);
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
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
}
