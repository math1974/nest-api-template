import Customer from '../customer.model';

export interface ListCustomerResponseInterface {
  totalItems?: number;
  totalPages?: number;
  customers: Customer[];
}
