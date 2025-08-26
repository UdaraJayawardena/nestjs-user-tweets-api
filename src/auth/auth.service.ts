import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

    async validateUser(username: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid username or password');
        }

        return this.generateToken(user.id, user.username);
    }

    generateToken(userId: number, username: string) {
        const payload = { sub: userId, username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
