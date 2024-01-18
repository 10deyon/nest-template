import { DELIVERY_ADDRESSES } from 'src/shared';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class DeliveryAddress1697198076298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DELIVERY_ADDRESSES,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'customer_id',
            type: 'varchar',
            length: '37',
            isNullable: false,
          },
          {
            name: 'recipient_name',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'street_address',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar(60)',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'postal_code',
            type: 'varchar(20)',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'recipient_phone_number',
            type: 'varchar(20)',
            isNullable: false,
          },
          {
            name: 'is_default',
            type: 'boolean',
            default: true,
            isNullable: false,
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
      DELIVERY_ADDRESSES,
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'NO ACTION',
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DELIVERY_ADDRESSES);
  }
}
