import { InjectModel } from '@nestjs/sequelize';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import PaginationUtils from 'src/utils/pagination.utils';
import { ListCustomerResponseInterface } from './interfaces/list-customer.interface';
import ListCustomerDto from './dtos/list-customer.dto';

import QueryUtils from 'src/utils/query.utils';

import { WhereOptions } from 'sequelize';
import Customer from './customer.model';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export default class CustomerService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
  ) {}

  async create({ data, filter }): Promise<boolean> {
    await this.customerModel.create({
      ...data,
      user_id: filter.user_id,
    });

    return true;
  }

  async update({
    changes,
    filter,
  }: {
    changes: UpdateCustomerDto;
    filter: { id: number };
  }): Promise<Customer> {
    await this.customerModel.update(
      {
        name: changes.name,
        is_pf: changes.is_pf,
        phone: changes.phone || null,
        cnpj: changes.cnpj || null,
        cpf: changes.cpf || null,
        address: changes.address || null,
        email: changes.email || null,
      },
      {
        where: {
          id: filter.id,
          is_deleted: false,
        },
      },
    );

    return this.findById(filter.id);
  }

  async getCustomersCount(filter): Promise<number> {
    if (filter.page === 1) {
      return 0;
    }

    return this.customerModel.count({
      where: filter,
    });
  }

  getListWhereCondition(
    filter: ListCustomerDto,
  ): WhereOptions<Partial<Customer>> {
    const whereCondition: WhereOptions<Customer> = {
      is_deleted: false,
      type: filter.type,
    };

    if (filter.name) {
      whereCondition.name = QueryUtils.iLike(filter.name);
    }

    return whereCondition;
  }

  getListAttributes(): (keyof Customer)[] {
    return [
      'id',
      'name',
      'phone',
      'email',
      'address',
      'type',
      'is_pf',
      'cpf',
      'cnpj',
      'created_at',
    ];
  }

  getListQueryOptions(filter: ListCustomerDto): {
    where: WhereOptions<Customer>;
    attributes: (keyof Customer)[];
    order: [string, 'ASC' | 'DESC'][];
  } {
    return {
      where: this.getListWhereCondition(filter),
      attributes: this.getListAttributes(),
      order: [['name', 'ASC']],
    };
  }

  async list(filter: ListCustomerDto): Promise<ListCustomerResponseInterface> {
    const pagination = new PaginationUtils({
      page: filter.page,
      itemsPerPage: 10,
    });

    const queryOptions = this.getListQueryOptions(filter);

    const promises = [
      this.customerModel.findAll({
        ...queryOptions,
        ...pagination.getQueryParams(),
      }),
      this.getCustomersCount(queryOptions.where),
    ];

    const [customers, totalItems] = (await Promise.all(promises)) as [
      Customer[],
      number,
    ];

    return {
      customers,
      ...pagination.mount(~~totalItems),
    };
  }

  async findById(id: number): Promise<Customer> {
    const customer = await this.customerModel.findOne({
      where: {
        id,
        is_deleted: false,
      },
    });

    if (!customer) {
      throw new NotFoundException('CUSTOMER_NOT_FOUND');
    }

    return customer;
  }

  async remove(id: number): Promise<boolean> {
    const customerExists = await this.customerModel.count({
      where: {
        id,
        is_deleted: false,
      },
    });

    if (!customerExists) {
      throw new ForbiddenException('CUSTOMER_NOT_FOUND');
    }

    await this.customerModel.update(
      {
        is_deleted: true,
      },
      {
        where: {
          id,
          is_deleted: false,
        },
      },
    );

    return true;
  }
}
