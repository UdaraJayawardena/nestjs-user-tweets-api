import { ApiProperty } from '@nestjs/swagger';

export class UpdateTweetDto {
  @ApiProperty({ example: 'Tweet 1' })
  tweet: string;
}
