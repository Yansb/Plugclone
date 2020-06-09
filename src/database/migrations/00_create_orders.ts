import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('orders', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('zipCode').notNullable();
    table.string('city').notNullable();
    table.string('street').notNullable();
    table.string('uf', 2).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('orders');
}
