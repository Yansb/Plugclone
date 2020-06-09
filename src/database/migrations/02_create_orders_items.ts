import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('orders_items', table => {
    table.increments('id').primary();
    table.integer('order_id').notNullable().references('id').inTable('orders');
    table.integer('item_id').notNullable().references('id').inTable('items');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('orders_items');
}
