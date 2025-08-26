import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  // Check if email or username already exists in the database
  async findByEmailOrUsername(email: string, username: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });
  }

  // Register a new user
  async createUser(username: string, email: string, password: string) {

    // Ensure username and password are provided
    if (!username || !password) {
      throw new Error('Username and Password are required');
    }

    // Check if email or username already exists
    const existingUser = await this.findByEmailOrUsername(email, username);

    if (existingUser) {
      throw new ConflictException('Email or Username already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    const { password: _, ...updatedUserObj } = newUser;

    return updatedUserObj;

  }

  // Fetch all users
  async findAllUsers() {
    const listOfUsers = await this.prisma.user.findMany();

    const updatedList = listOfUsers.map(({ password, ...rest }) => rest);

    return updatedList;
  }
}
