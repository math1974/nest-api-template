import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import FinanceService from './finance.service';
import AuthGuard from 'src/auth/guards/auth.guard';

import User from '../decorators/user.decorator';

import { ListFinanceResponseInterface } from './interfaces/list-finance.interface';

import { CreateFinanceDto } from './dtos/create-finance.dto';
import ListFinanceDto from './dtos/list-finance.dto';

@UseGuards(AuthGuard)
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Controller('finances')
export default class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post()
  create(
    @Body('finance') finance: CreateFinanceDto,
    @User('id') userId: number,
  ): Promise<boolean> {
    const options = {
      filter: {
        user_id: userId,
      },
      data: finance,
    };

    return this.financeService.create(options);
  }

  @Get()
  async list(
    @Query() filter: ListFinanceDto,
  ): Promise<ListFinanceResponseInterface> {
    return this.financeService.list(filter);
  }
}
