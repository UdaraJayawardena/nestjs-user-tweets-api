import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTweetDto } from './dto/create-tweet';
@Injectable()
export class TweetService {

    constructor(private readonly prisma: PrismaService) { }

    // Create New Tweet
    async createTweet(userId: number, createTweetDto: CreateTweetDto) {
        return await this.prisma.tweet.create({
            data: {
                userId,
                ...createTweetDto,
            },
        });
    }
}
