import { InjectModel } from '@nestjs/sequelize';
import { ForbiddenException, Injectable } from '@nestjs/common';

import Finance from './models/finance.model';
import FinanceProduct from './models/finance-product.model';
import { omit } from 'lodash';
import PaginationUtils from 'src/utils/pagination.utils';
import { ListFinanceResponseInterface } from './interfaces/list-finance.interface';
import ListFinanceDto from './dtos/list-finance.dto';
import QueryUtils from 'src/utils/query.utils';
import FinanceType from 'src/shared/enums/finance-type.enum';
import { Attributes, WhereOptions } from 'sequelize';

@Injectable()
export default class FinanceService {
  constructor(
    @InjectModel(Finance)
    private financeModel: typeof Finance,
    @InjectModel(FinanceProduct)
    private financeProductModel: typeof FinanceProduct,
  ) {}

  async create({ data, filter }): Promise<boolean> {
    const transaction = await this.financeModel.sequelize.transaction();

    try {
      const finance = await this.financeModel.create(
        {
          ...omit(data, ['products']),
          user_id: filter.user_id,
        },
        { transaction },
      );

      if (data.products?.length) {
        const financeProducts = data.products.map((product) => ({
          ...product,
          finance_id: finance.id,
        }));

        await this.financeProductModel.bulkCreate(financeProducts, {
          transaction,
        });
      }

      await transaction.commit();

      return true;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async getFinancesCount(filter): Promise<number> {
    if (filter.page === 1) {
      return 0;
    }

    return this.financeModel.count({
      where: filter,
    });
  }

  getListWhereCondition(
    filter: ListFinanceDto,
  ): WhereOptions<Partial<Finance>> {
    const whereCondition: WhereOptions<Finance> = {
      is_deleted: false,
      type: filter.type,
    };

    if (filter.start_date || filter.end_date) {
      whereCondition.date = QueryUtils.getDateRangeFilter(
        filter.start_date,
        filter.end_date,
      );
    }

    return whereCondition;
  }

  getListAttributes(): (keyof Finance)[] {
    return ['id', 'price'];
  }

  getListQueryOptions(filter: ListFinanceDto): {
    where: WhereOptions<Finance>;
    attributes: (keyof Finance)[];
  } {
    return {
      where: this.getListWhereCondition(filter),
      attributes: this.getListAttributes(),
    };
  }

  async list(filter: ListFinanceDto): Promise<ListFinanceResponseInterface> {
    const pagination = new PaginationUtils({
      page: filter.page,
      itemsPerPage: 20,
    });

    const queryOptions = this.getListQueryOptions(filter);

    const promises = [
      this.financeModel.findAll({
        ...queryOptions,
        ...pagination.getQueryParams(),
      }),
      this.getFinancesCount(queryOptions.where),
    ];

    const [finances, totalItems] = (await Promise.all(promises)) as [
      Finance[],
      number,
    ];

    return {
      finances,
      ...pagination.mount(~~totalItems),
    };
  }

  async remove(filter) {
    const financeExists = await this.financeModel.count({
      where: {
        id: filter.id,
        is_deleted: false,
      },
    });

    if (!financeExists) {
      throw new ForbiddenException('FINANCE_NOT_FOUND');
    }

    await this.financeModel.update(
      {
        is_deleted: true,
      },
      {
        where: {
          id: filter.id,
          is_deleted: false,
        },
      },
    );

    return true;
  }
}
