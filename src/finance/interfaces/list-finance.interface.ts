import Finance from '../models/finance.model';

export interface ListFinanceResponseInterface {
  totalItems?: number;
  totalPages?: number;
  finances: Finance[];
}
