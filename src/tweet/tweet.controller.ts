import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TweetService } from './tweet.service';
import { Request } from 'express';

import { CreateTweetDto } from './dto/create-tweet';
import { UpdateTweetDto } from './dto/update-tweet';

@ApiTags('Tweet')
// @ApiBearerAuth()
@Controller('tweet')
export class TweetController {

    constructor(private readonly tweetService: TweetService) { }
    
    @Post('create')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new Tweet' })
    @ApiResponse({ status: 200, description: 'Successfully created' })
    createTodo(@Body() body: CreateTweetDto,
        @Req() request: Request) {
        const userId = request.user.userId
        
        return this.tweetService.createTweet(userId, body);
    }
}
