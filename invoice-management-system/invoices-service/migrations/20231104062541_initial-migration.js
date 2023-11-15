/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  if (!(await knex.schema.hasTable('invoices'))) {
    await knex.schema.createTable('invoices', table => {
      table
        .uuid('id', {primaryKey: true})
        .defaultTo(knex.raw('gen_random_uuid()'));

      table.string('vendor_id').notNullable();

      table.enu('status', ['created', 'inReview', 'approved', 'denied'], {
        useNative: true,
        enumName: 'invoice_status',
      });

      table.date('date');

      table.date('due_date');

      table.decimal('net_amount');

      table.decimal('total_tax_amount');

      table.decimal('total_amount');

      table.string('currency', 3);

      table.string('vendor_address');

      table.string('vendor_google_place_id');

      table.timestamps(true, true);
    });
  }

  if (!(await knex.schema.hasTable('invoice_documents'))) {
    await knex.schema.createTable('invoice_documents', table => {
      table
        .uuid('id', {primaryKey: true})
        .defaultTo(knex.raw('gen_random_uuid()'));

      table
        .uuid('invoice_id')
        .notNullable()
        .references('id')
        .inTable('invoices')
        .onDelete('CASCADE');

      table.string('gcs_bucket').notNullable();

      table.string('gcs_file').notNullable();

      table.timestamps(true, true);

      table.unique(['gcs_bucket', 'gcs_file']);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  if (await knex.schema.hasTable('invoice_documents')) {
    await knex.schema.dropTable('invoice_documents');
  }

  if (await knex.schema.hasTable('invoices')) {
    await knex.schema.dropTable('invoices');
  }
};
