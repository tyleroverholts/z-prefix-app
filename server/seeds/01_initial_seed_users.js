/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, first_name: 'Person', last_name: 'Test', username: 'thisperson1', password:'somevalues'},
    {id: 2, first_name: 'Admin', last_name: 'Test', username: 'thisadmin1', password:'somevaluesagain'}
  ]);
};
