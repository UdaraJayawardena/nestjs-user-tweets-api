import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({ example: 'active' })
  accountStatus: string;
}
