import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStartUpMessage(): string {
    return 'User Tweet Backend is Running!';
  }
}
