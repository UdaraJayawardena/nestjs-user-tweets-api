import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TweetService } from './tweet/tweet.service';
import { TweetController } from './tweet/tweet.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule],
  controllers: [AppController, TweetController],
  providers: [AppService,PrismaService, TweetService],
})
export class AppModule {}
