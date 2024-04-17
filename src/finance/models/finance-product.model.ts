import { literal } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import Product from '../../product/product.model';
import Finance from './finance.model';

@Table({
  tableName: 'finance_products',
})
export default class FinanceProduct extends Model<FinanceProduct> {
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  price: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  total_price: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  amount: number;

  @ForeignKey(() => Finance)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: null,
  })
  finance_id: number;

  @BelongsTo(() => Finance)
  finance: Finance;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: null,
  })
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_deleted: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  updated_at: Date;
}
