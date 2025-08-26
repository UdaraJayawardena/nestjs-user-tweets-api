import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class OwnUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    
    const request = context.switchToHttp().getRequest();
    const loggedInUserId = request.user.userId;
    const targetUserId = Number(request.params.id);

    if (loggedInUserId !== targetUserId) {
      throw new ForbiddenException('You can only access your own data.');
    }

    return true;
  }
}
