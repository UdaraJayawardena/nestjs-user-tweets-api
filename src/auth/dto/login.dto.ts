import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @ApiProperty({ example: 'udara43' })
  username: string;

  @IsString()
  @ApiProperty({ example: 'udara@43' })
  password: string;
}
