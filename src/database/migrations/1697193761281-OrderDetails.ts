import { ORDER_DETAILS } from 'src/shared';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class OrderDetails1697193761281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ORDER_DETAILS,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'order_id',
            type: 'varchar',
            length: '37',
            isNullable: false,
          },
          {
            name: 'store_id',
            type: 'varchar',
            length: '37',
            isNullable: false,
          },
          {
            name: 'product_id',
            type: 'varchar',
            length: '37',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal(10,2)',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      ORDER_DETAILS,
      new TableForeignKey({
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      ORDER_DETAILS,
      new TableForeignKey({
        columnNames: ['store_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stores',
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      ORDER_DETAILS,
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'NO ACTION',
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ORDER_DETAILS);
  }
}
