/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Request() req, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('Registration attempt for:', registerDto.username);
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      console.error('Registration error details:', error);
      throw error; // Let NestJS handle the response
    }
  }
}
