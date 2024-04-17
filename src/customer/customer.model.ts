import { literal } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

import CustomerType from 'src/shared/enums/customer-type.enum';

@Table({
  tableName: 'customers',
})
export default class Customer extends Model<Customer> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  email: string;

  @Column({
    type: DataType.STRING(14),
    allowNull: true,
    defaultValue: null,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  type: CustomerType;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  is_pf: boolean;

  @Column({
    type: DataType.STRING(11),
    allowNull: true,
    defaultValue: null,
  })
  cpf: string;

  @Column({
    type: DataType.STRING(14),
    allowNull: true,
    defaultValue: null,
  })
  cnpj: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  address: string;

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

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_deleted: boolean;
}
