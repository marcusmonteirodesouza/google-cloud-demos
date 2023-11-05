/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  if (!(await knex.schema.hasTable('vendors'))) {
    await knex.schema.createTable('vendors', table => {
      table
        .uuid('id', {primaryKey: true})
        .defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name').notNullable().unique();
      table.string('address').notNullable();
      table.string('google_place_id').notNullable();
      table.timestamps(true, true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  if (await knex.schema.hasTable('vendors')) {
    await knex.schema.dropTable('vendors');
  }
};
