/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {id: 1, user_id: 2, item_name: 'testitem', description: 'some words here', quantity: 1},
    {id: 2, user_id: 2, item_name: 'testitem', description: 'some words here', quantity: 1},
    {id: 3, user_id: 1, item_name: 'testitem', description: 'some words here', quantity: 1},
    {id: 4, user_id: 1, item_name: 'testitem', description: 'some words here', quantity: 1},
    {id: 5, user_id: 1, item_name: 'testitem', description: 'some words here', quantity: 1},
  ]);
};
