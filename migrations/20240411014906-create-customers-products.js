'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'customers',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            validate: {
              isEmail: true,
            },
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
          },
          phone: {
            type: Sequelize.STRING(14),
            allowNull: true,
            defaultValue: null,
          },
          type: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          is_pf: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
          cpf: {
            type: Sequelize.STRING(11),
            allowNull: true,
            defaultValue: null,
          },
          cnpj: {
            type: Sequelize.STRING(14),
            allowNull: true,
            defaultValue: null,
          },
          address: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
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
        'products',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
          },
          unity: {
            type: Sequelize.STRING(20),
            allowNull: false,
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
      await queryInterface.dropTable('customers', { transaction });
      await queryInterface.dropTable('products', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },
};
