import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from 'src/prisma/prisma.service';

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
  async registerUser(username: string, email: string, password: string) {

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

  // Fetch a single User by ID
  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, username: true, createdAt: true, updatedAt: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // Update User
  async updateUser(id: number, email: string) {
    const userExists = await this.prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { email },
      select: { id: true, email: true, username: true, createdAt: true, updatedAt: true }
    });

    return updatedUser;
  }

// Delete User
  async deleteUser(id: number, accountStatus: string) {
    const userExists = await this.prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const deleteUser = await this.prisma.user.update({
      where: { id },
      data: { accountStatus },
      select: { id: true, email: true, username: true, createdAt: true, updatedAt: true }
    });

    return deleteUser;
  }
}
