/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("username", 32).notNullable()
    table.string("first_name", 32).notNullable()
    table.string("last_name", 32).notNullable()
    table.integer("gender", 1)
    table.string("email", 32).unique().notNullable().index();
    table.string("password", 255).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
