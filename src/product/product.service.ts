import { InjectModel } from '@nestjs/sequelize';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import PaginationUtils from 'src/utils/pagination.utils';
import { ListProductResponseInterface } from './interfaces/list-product.interface';
import ListProductDto from './dtos/list-product.dto';

import QueryUtils from 'src/utils/query.utils';

import Product from './product.model';

import { WhereOptions } from 'sequelize';

import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export default class CustomerService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async create(data: CreateProductDto): Promise<boolean> {
    await this.productModel.create(data);

    return true;
  }

  async update({
    changes,
    filter,
  }: {
    changes: UpdateProductDto;
    filter: { id: number };
  }): Promise<Product> {
    await this.productModel.update(
      {
        name: changes.name,
        price: changes.price,
        unity: changes.unity,
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

  async getProductsCount(filter): Promise<number> {
    if (filter.page === 1) {
      return 0;
    }

    return this.productModel.count({
      where: filter,
    });
  }

  getListWhereCondition(
    filter: ListProductDto,
  ): WhereOptions<Partial<Product>> {
    const whereCondition: WhereOptions<Product> = {
      is_deleted: false,
    };

    if (filter.name) {
      whereCondition.name = QueryUtils.iLike(filter.name);
    }

    return whereCondition;
  }

  getListAttributes(): (keyof Product)[] {
    return ['id', 'name', 'unity', 'price', 'created_at'];
  }

  getListQueryOptions(filter: ListProductDto): {
    where: WhereOptions<Product>;
    attributes: (keyof Product)[];
    order: [string, 'ASC' | 'DESC'][];
  } {
    return {
      where: this.getListWhereCondition(filter),
      attributes: this.getListAttributes(),
      order: [
        ['name', 'ASC'],
        ['created_at', 'ASC'],
      ],
    };
  }

  async list(filter: ListProductDto): Promise<ListProductResponseInterface> {
    const pagination = new PaginationUtils({
      page: filter.page,
      itemsPerPage: 10,
    });

    const queryOptions = this.getListQueryOptions(filter);

    const promises = [
      this.productModel.findAll({
        ...queryOptions,
        ...pagination.getQueryParams(),
      }),
      this.getProductsCount(queryOptions.where),
    ];

    const [products, totalItems] = (await Promise.all(promises)) as [
      Product[],
      number,
    ];

    return {
      products,
      ...pagination.mount(~~totalItems),
    };
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productModel.findOne({
      where: {
        id,
        is_deleted: false,
      },
    });

    if (!product) {
      throw new NotFoundException('PRODUCT_NOT_FOUND');
    }

    return product;
  }

  async remove(id: number): Promise<boolean> {
    const customerExists = await this.productModel.count({
      where: {
        id,
        is_deleted: false,
      },
    });

    if (!customerExists) {
      throw new ForbiddenException('PRODUCT_NOT_FOUND');
    }

    await this.productModel.update(
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
