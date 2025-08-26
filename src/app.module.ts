import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { TweetController } from './tweet/tweet.controller';

import { UserService } from './user/user.service';
import { AppService } from './app.service';
import { TweetService } from './tweet/tweet.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, TweetController, UserController],
  providers: [AppService,PrismaService, TweetService, UserService],
})
export class AppModule {}
