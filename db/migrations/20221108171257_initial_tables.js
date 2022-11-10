/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable("messages", (table) => {
    table.increments("id").primary();
    table.string("username", 32).notNullable();
    table.string("thread", 64).notNullable();
    table.string("message", 1024).notNullable();
    table.string("timestamp").notNullable()
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("messages");
};
