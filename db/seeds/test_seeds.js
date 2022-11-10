/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('messages').del()

  await knex('messages').insert([
    {
      username: "test user 1",
      thread: "test thread",
      message: "This is test",
      timestamp: JSON.stringify(Date.now()),
    },
    {
      username: "test user 2",
      thread: "test thread",
      message: "This is test 2",
      timestamp: JSON.stringify(Date.now()),
    },
    {
      username: "test user 3",
      thread: "test thread",
      message: "This is test 3",
      timestamp: JSON.stringify(Date.now()),
    },
  ]);
};
