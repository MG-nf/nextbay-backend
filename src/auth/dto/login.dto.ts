import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

@ApiSchema({
  name: 'Login payload',
})
export class LoginDto {
  @ApiProperty({
    description: 'The username to login',
    example: 'user',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    description: 'The password to login',
    example: 'password123!',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
