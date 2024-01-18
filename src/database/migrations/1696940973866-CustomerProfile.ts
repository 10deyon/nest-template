import { CUSTOMER_PROFILES } from '../../shared';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CustomerProfile1696940973866 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: CUSTOMER_PROFILES,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'first_name',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar(30)',
            isNullable: false,
          },
          {
            name: 'postal_code',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar(50)',
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
      CUSTOMER_PROFILES,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CUSTOMER_PROFILES);
  }
}
