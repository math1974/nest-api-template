import Product from '../product.model';

export interface ListProductResponseInterface {
  totalItems?: number;
  totalPages?: number;
  products: Product[];
}
