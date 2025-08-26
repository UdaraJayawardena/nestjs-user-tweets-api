import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'udara43' })
  username: string;

  @ApiProperty({ example: 'udara43@gmail.com' })
  email: string;

  @ApiProperty({ example: 'udara@43' })
  password: string;
}
