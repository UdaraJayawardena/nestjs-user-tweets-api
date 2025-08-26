import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTweetDto } from './dto/create-tweet';
@Injectable()
export class TweetService {

    constructor(private readonly prisma: PrismaService) { }

    // Create a new Tweet
    async createTweet(userId: number, createTweetDto: CreateTweetDto) {
        return await this.prisma.tweet.create({
            data: {
                userId,
                ...createTweetDto,
            },
        });
    }

    // Update a Tweet
    async updateTweet(id: number, tweet: string) {
        return this.prisma.tweet.update({
            where: { id },
            data: {
                tweet: tweet
            },
        });
    }

    // Fetch all Tweets
    async getAllTweets() {
        const listOftweets = await this.prisma.tweet.findMany();
        return listOftweets;
    }

    // Fetch a single Tweet by ID
    async getTweetById(id: number) {
        const tweet = await this.prisma.tweet.findUnique({
            where: { id }
        });

        if (!tweet) {
            throw new NotFoundException(`Tweet with ID ${id} not found`);
        }

        return tweet;
    }

    // Delete a Tweet
    async deleteTweet(id: number) {
        return this.prisma.tweet.delete({
            where: { id },
        });
    }
}
