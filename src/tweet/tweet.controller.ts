import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TweetService } from './tweet.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateTweetDto } from './dto/create-tweet';
import { UpdateTweetDto } from './dto/update-tweet';

@ApiTags('Tweet')
@ApiBearerAuth()
@Controller('tweets')
export class TweetController {

    constructor(private readonly tweetService: TweetService) { }

    @Get('')
    @ApiOperation({ summary: 'Fetch all Tweets' })
    @ApiResponse({ status: 200 })
    findAllEmployees() {
        return this.tweetService.getAllTweets();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Fetch a single Tweet by Id' })
    async fetchById(@Param('id', ParseIntPipe) id: number) {
        return this.tweetService.getTweetById(id);
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new Tweet' })
    @ApiResponse({ status: 200, description: 'Successfully created' })
    createTodo(@Body() body: CreateTweetDto,
        @Req() request: Request) {
        const userId = request.user.userId

        return this.tweetService.createTweet(userId, body);
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a Tweet' })
    @ApiResponse({ status: 200, description: 'Successfully Updated' })
    async updateTodo(
        @Param('id') id: string,
        @Body() body: UpdateTweetDto
    ) {
        return this.tweetService.updateTweet(Number(id), body.tweet);
    }


    @Delete('delete/:id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a Tweet' })
    @ApiResponse({ status: 200, description: 'Successfully Deleted' })
    async deleteTodo(@Param('id') id: string) {
        return this.tweetService.deleteTweet(Number(id));
    }



}
