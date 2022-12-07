/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema

    .createTable('users', (table) => {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.string('username');
      table.string('password')
    })

    .createTable('items', (table) => {
      table.increments('id');
      table.integer('user_id').references('users.id');
      table.string('item_name');
      table.string('description');
      table.integer('quantity')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .alterTable('items', table => {
    table.dropForeign('user_id')
  })
  .then(() => {
    knex.schema.dropTableIfExists('users')
  })
  .then(() => {
    knex.schema.dropTableIfExists('items')
  })
};
