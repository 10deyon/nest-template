import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { USERS } from '../../shared';

export class User1696173732930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: USERS,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'email',
            type: 'varchar(200)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'phone_number',
            type: 'varchar(50)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'longitude',
            type: 'decimal(10, 7)',
            isNullable: false,
          },
          {
            name: 'latitude',
            type: 'decimal(10, 7)',
            isNullable: false,
          },
          {
            name: 'roles',
            type: 'varchar(30)',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar(500)',
            isNullable: true,
          },
          {
            name: 'password_changed_at',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'boolean',
            default: false,
          },
          {
            name: 'password_reset_token',
            type: 'varchar(80)',
            isNullable: true,
          },
          {
            name: 'password_reset_expires',
            type: 'timestamp',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(USERS);
  }
}
