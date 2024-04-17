'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'finances',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          type: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
          },
          price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
          },
          total_price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
          },
          date: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          customer_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
              model: 'customers',
              key: 'id',
            },
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
            },
          },
          is_deleted: {
            allowNull: false,
            defaultValue: false,
            type: Sequelize.BOOLEAN,
          },
          created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'finance_products',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
          },
          total_price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
          },
          amount: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
          },
          finance_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'finances',
              key: 'id',
            },
          },
          product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'products',
              key: 'id',
            },
          },
          is_deleted: {
            allowNull: false,
            defaultValue: false,
            type: Sequelize.BOOLEAN,
          },
          created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('finance_products');
      await queryInterface.dropTable('finances');

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },
};
