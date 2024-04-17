import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import CustomerService from './customer.service';
import AuthGuard from 'src/auth/guards/auth.guard';

import User from '../decorators/user.decorator';

import { ListCustomerResponseInterface } from './interfaces/list-customer.interface';

import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import ListCustomerDto from './dtos/list-customer.dto';
import Customer from './customer.model';

@UseGuards(AuthGuard)
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Controller('customers')
export default class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(
    @Body() customer: CreateCustomerDto,
    @User('id') userId: number,
  ): Promise<boolean> {
    const options = {
      filter: {
        user_id: userId,
      },
      data: customer,
    };

    return this.customerService.create(options);
  }

  @Put('/:id')
  update(
    @Param('id') customerId: number,
    @Body() customer: UpdateCustomerDto,
  ): Promise<Customer> {
    const options = {
      filter: {
        id: customerId,
      },
      changes: customer,
    };

    return this.customerService.update(options);
  }

  @Delete('/:id')
  remove(@Param('id') customerId: number): Promise<boolean> {
    return this.customerService.remove(customerId);
  }

  @Get('/:id')
  find(@Param('id') customerId: number): Promise<Customer> {
    return this.customerService.findById(customerId);
  }

  @Get()
  async list(
    @Query() filter: ListCustomerDto,
  ): Promise<ListCustomerResponseInterface> {
    return this.customerService.list(filter);
  }
}
