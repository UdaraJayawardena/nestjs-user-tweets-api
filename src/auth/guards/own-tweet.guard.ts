import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OwnTweetGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const tweetId = parseInt(request.params.id, 10);

    const tweet = await this.prisma.tweet.findUnique({
      where: { id: tweetId },
      select: { userId: true },
    });

    if (!tweet) {
      throw new ForbiddenException('Tweet not found');
    }

    if (tweet.userId !== userId) {
      throw new ForbiddenException('You can only manage your own tweets');
    }

    return true;
  }
}
