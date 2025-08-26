import { ApiProperty } from '@nestjs/swagger';

export class CreateTweetDto {
  @ApiProperty({ example: 'Tweet 1' })
  tweet: string;
}
