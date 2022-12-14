/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {user_id: 2, item_name: 'testitem', description: 'some words here', quantity: 1},
    {user_id: 2, item_name: 'testitem', description: 'some words here', quantity: 1},
    {user_id: 1, item_name: 'testitem', description: 'some words here', quantity: 1},
    {user_id: 1, item_name: 'testitem', description: 'some words here', quantity: 1},
    {user_id: 1, item_name: 'testitem', description: 'some words here', quantity: 1},
  ]);
};
