import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import AuthService from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { LoginResponseInterface } from './interfaces/login.interface';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() data: LoginDto): Promise<LoginResponseInterface> {
    return this.authService.login(data);
  }
}
